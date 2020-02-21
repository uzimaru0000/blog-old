module Api exposing (..)

import Bytes exposing (Bytes)
import Http
import Json.Decode as JD
import Json.Encode as JE
import Model exposing (..)
import Task exposing (Task)
import Time


type alias Draft =
    { title : String
    , content : String
    , tags : List String
    , image : String
    , date : Time.Posix
    , ogp : String
    }


draftEncoder : Draft -> JE.Value
draftEncoder { title, content, tags, image, date, ogp } =
    JE.object
        [ ( "title", JE.string title )
        , ( "content", JE.string content )
        , ( "tags", JE.list JE.string tags )
        , ( "image", JE.string image )
        , ( "date", JE.int <| Time.posixToMillis date )
        , ( "ogp", JE.string ogp )
        ]



-- CONST


endPoint : String
endPoint =
    "https://blog.uzimaru.com/api"


imgurEndPoint : String
imgurEndPoint =
    "https://api.imgur.com/3/image"



-- HELPER


jsonResolver : JD.Decoder a -> Http.Resolver Http.Error a
jsonResolver decoder =
    Http.stringResolver
        (\res ->
            case res of
                Http.BadUrl_ str ->
                    Result.Err <| Http.BadUrl str

                Http.Timeout_ ->
                    Result.Err Http.Timeout

                Http.NetworkError_ ->
                    Result.Err Http.NetworkError

                Http.BadStatus_ meta _ ->
                    Result.Err <| Http.BadStatus meta.statusCode

                Http.GoodStatus_ _ body ->
                    JD.decodeString decoder body
                        |> Result.mapError (JD.errorToString >> Http.BadBody)
        )


bearerToken : String -> String
bearerToken =
    (++) "Bearer "


imgurClientID : String -> String
imgurClientID =
    (++) "Client-ID"



-- REQUEST


getEntry : String -> Task Http.Error Entry
getEntry id =
    Http.task
        { method = "GET"
        , headers = []
        , url = [ endPoint, "entry", id ] |> String.join "/"
        , body = Http.emptyBody
        , resolver = jsonResolver entry
        , timeout = Nothing
        }


getEntries : Task Http.Error (List Entry)
getEntries =
    Http.task
        { method = "GET"
        , headers = []
        , url = [ endPoint, "entries?size=64" ] |> String.join "/"
        , body = Http.emptyBody
        , resolver = jsonResolver <| JD.field "entries" <| JD.list entry
        , timeout = Nothing
        }


postEntry : String -> Draft -> Task Http.Error ()
postEntry token draft =
    Http.task
        { method = "POST"
        , headers = [ Http.header "Authorization" <| bearerToken token ]
        , url = [ endPoint, "entry" ] |> String.join "/"
        , body = Http.jsonBody <| draftEncoder draft
        , resolver = jsonResolver <| JD.succeed ()
        , timeout = Nothing
        }


removeEntry : String -> String -> Task Http.Error ()
removeEntry token id =
    Http.task
        { method = "DELETE"
        , headers = [ Http.header "Authorization" <| bearerToken token ]
        , url = [ endPoint, "entry", id ] |> String.join "/"
        , body = Http.emptyBody
        , resolver = jsonResolver <| JD.succeed ()
        , timeout = Nothing
        }


login : { id : String, password : String } -> Task Http.Error String
login { id, password } =
    Http.task
        { method = "POST"
        , headers = []
        , url = [ endPoint, "signin" ] |> String.join "/"
        , body =
            JE.object
                [ ( "id", JE.string id )
                , ( "password", JE.string password )
                ]
                |> Http.jsonBody
        , resolver = jsonResolver (JD.field "token" JD.string)
        , timeout = Nothing
        }
