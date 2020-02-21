module Model exposing (..)

import Json.Decode as JD
import Json.Encode as JE
import Time exposing (..)


type alias Entry =
    { id : String
    , title : String
    , content : String
    , tags : List String
    , image : String
    , date : Time.Posix
    , ogp : String
    }


entry : JD.Decoder Entry
entry =
    JD.map7 Entry
        (JD.field "id" JD.string)
        (JD.field "title" JD.string)
        (JD.field "content" JD.string)
        (JD.field "tags" <| JD.list JD.string)
        (JD.field "image" JD.string)
        (JD.field "date" <| JD.map Time.millisToPosix JD.int)
        (JD.field "ogp" JD.string)


entryEncoder : Entry -> JE.Value
entryEncoder { id, title, content, tags, image, date, ogp } =
    JE.object
        [ ( "id", JE.string id )
        , ( "title", JE.string title )
        , ( "content", JE.string content )
        , ( "tags", JE.list JE.string tags )
        , ( "image", JE.string image )
        , ( "date", date |> Time.posixToMillis |> JE.int )
        , ( "ogp", JE.string ogp )
        ]
