module SubCmd.Get exposing (..)

import Api
import Http
import Model exposing (Entry)
import Port
import Task


type Msg
    = GetEntry (Result Http.Error Entry)


type alias Model =
    ()


init : String -> ( Model, Cmd Msg )
init id =
    ( ()
    , Api.getEntry id
        |> Task.attempt GetEntry
    )


exec : Msg -> Cmd Msg
exec msg =
    case msg of
        GetEntry (Ok entry) ->
            Port.exit ( 0, entry.content )

        _ ->
            Cmd.none
