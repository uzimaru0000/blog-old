port module SubCmd.Login exposing (..)

import Api
import Http
import Json.Decode as JD
import Json.Encode as JE
import Port
import Prompts
import Task


type alias Model =
    { id : Maybe String
    }


type Msg
    = GetID String
    | GetPassword String
    | GetToken (Result Http.Error String)
    | NoOp


init : () -> ( Model, Cmd Msg )
init _ =
    ( { id = Nothing
      }
    , Prompts.text "Input ID : "
        |> Port.output
    )


exec : Msg -> Model -> ( Model, Cmd Msg )
exec msg model =
    case msg of
        GetID id ->
            ( { model | id = Just id }
            , Prompts.password "Input Password : "
                |> Port.output
            )

        GetPassword pw ->
            ( model
            , Task.attempt
                GetToken
                (Api.login
                    { id = Maybe.withDefault "" model.id
                    , password = pw
                    }
                )
            )

        GetToken (Ok token) ->
            ( model
            , save token
            )

        _ ->
            ( model, Port.exit ( 1, "Error" ) )


subscriptions : Model -> Sub Msg
subscriptions model =
    if model.id == Nothing then
        JD.decodeValue (JD.map GetID JD.string)
            >> Result.withDefault NoOp
            |> Port.input

    else
        JD.decodeValue (JD.map GetPassword JD.string)
            >> Result.withDefault NoOp
            |> Port.input



-- PORT


port save : String -> Cmd msg
