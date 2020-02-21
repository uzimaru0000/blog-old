module SubCmd.List exposing (..)

import Api
import Http
import Json.Decode as JD
import Model exposing (..)
import Port
import Prompts
import Task


type Msg
    = GetEntries (Result Http.Error (List Entry))
    | GetSelectedEntry String
    | NoOp


type alias Model =
    ()


init : () -> ( Model, Cmd Msg )
init _ =
    ( (), Task.attempt GetEntries Api.getEntries )


toItem : Entry -> Prompts.Item
toItem { id, title, content } =
    { title = title
    , value = "\n" ++ "ID : " ++ id ++ "\n\n" ++ content
    , description = ""
    }


exec : Msg -> Cmd Msg
exec msg =
    case msg of
        GetEntries (Ok entries) ->
            entries
                |> List.map toItem
                |> Prompts.select "Select Entry : "
                |> Port.output

        GetSelectedEntry content ->
            Port.exit ( 0, content )

        _ ->
            Port.exit ( 1, "Error" )


subscriptions : Model -> Sub Msg
subscriptions _ =
    JD.decodeValue (JD.map GetSelectedEntry JD.string)
        >> Result.withDefault NoOp
        |> Port.input
