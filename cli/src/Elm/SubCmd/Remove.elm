module SubCmd.Remove exposing (..)

import Api
import Http
import Json.Decode as JD
import Model exposing (Entry)
import Port
import Prompts
import Task


type Msg
    = NoOp
    | RemoveResult (Result Http.Error ())
    | GetEntries (Result Http.Error (List Entry))
    | SelectedRemoveEntry String


type alias Model =
    { token : String
    }


init : String -> Maybe String -> ( Model, Cmd Msg )
init token maybeId =
    case maybeId of
        Just id ->
            ( { token = token }
            , Task.attempt RemoveResult (Api.removeEntry token id)
            )

        Nothing ->
            ( { token = token }
            , Task.attempt GetEntries Api.getEntries
            )


toItem : Entry -> Prompts.Item
toItem { id, title } =
    { title = title
    , value = id
    , description = ""
    }


exec : Msg -> Model -> ( Model, Cmd Msg )
exec msg model =
    case msg of
        GetEntries (Ok entries) ->
            ( model
            , entries
                |> List.map toItem
                |> Prompts.select "Select remove entry : "
                |> Port.output
            )

        RemoveResult (Ok _) ->
            ( model
            , Port.exit ( 0, "Remove success" )
            )

        SelectedRemoveEntry id ->
            ( model
            , Task.attempt RemoveResult (Api.removeEntry model.token id)
            )

        _ ->
            ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    JD.decodeValue (JD.map SelectedRemoveEntry JD.string)
        >> Result.withDefault NoOp
        |> Port.input
