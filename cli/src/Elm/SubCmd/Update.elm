module SubCmd.Update exposing (..)

import Api
import Http
import Json.Decode as JD
import Model exposing (Entry)
import Port
import Prompts
import SubCmd.Remove exposing (Msg(..))
import Task
import Time


type Msg
    = GetEntry (Result Http.Error Entry)
    | GetEntries (Result Http.Error (List Entry))
    | UpdateEntry (Result Http.Error ())
    | ChoiceEntry String
    | Choice State
    | UpdateTitle String
    | UpdateContent String
    | UpdateOGP String
    | UpdateImage String
    | UpdateTags (List String)
    | InputImageFile String
    | NoOp


type State
    = Init
    | ChoiceEntry_
    | ChoiceProps_
    | UpdateTitle_
    | UpdateOGP_
    | UpdateContent_
    | InputImageFile_
    | UpdateImage_
    | UpdateTags_
    | End


type alias Model =
    { token : String
    , state : State

    -- entry data
    , id : String
    , title : String
    , content : String
    , image : String
    , tags : List String
    , date : Time.Posix
    , ogp : String
    }


init : String -> Maybe String -> ( Model, Cmd Msg )
init token maybeId =
    ( { token = token
      , state = Init
      , id = ""
      , title = ""
      , content = ""
      , image = ""
      , tags = []
      , date = Time.millisToPosix 0
      , ogp = ""
      }
    , initCmd maybeId
    )


exec : Msg -> Model -> ( Model, Cmd Msg )
exec msg model =
    case msg of
        GetEntry (Ok entry) ->
            ( { model
                | state = ChoiceProps_
                , id = entry.id
                , title = entry.title
                , content = entry.content
                , image = entry.image
                , tags = entry.tags
                , date = entry.date
                , ogp = entry.ogp
              }
            , choicePropsCmd
            )

        GetEntries (Ok entries) ->
            ( { model | state = ChoiceEntry_ }
            , entries
                |> List.map toItem
                |> Prompts.select "Select update entry : "
                |> Port.output
            )

        UpdateEntry (Ok _) ->
            ( model, Cmd.none )

        ChoiceEntry id ->
            ( model, Task.attempt GetEntry <| Api.getEntry id )

        Choice state ->
            case state of
                End ->
                    ( model
                    , Task.attempt UpdateEntry <|
                        Api.updateEntry
                            model.token
                            model.id
                            { title = model.title
                            , content = model.content
                            , tags = model.tags
                            , image = model.image
                            , date = model.date
                            , ogp = model.ogp
                            }
                    )

                UpdateContent_ ->
                    ( { model | state = UpdateContent_ }
                    , Port.openFile model.content
                    )

                _ ->
                    ( { model | state = state }, inputCmd state )

        UpdateTitle title ->
            ( { model | state = UpdateOGP_, title = title }
            , Port.makeOGP title
            )

        UpdateTags tags ->
            ( { model | state = ChoiceProps_, tags = tags }
            , choicePropsCmd
            )

        UpdateOGP ogp ->
            ( { model
                | state = ChoiceProps_
                , ogp = ogp
              }
            , choicePropsCmd
            )

        InputImageFile file ->
            ( { model | state = UpdateImage_ }
            , Port.uploadImage file
            )

        UpdateImage image ->
            ( { model | state = ChoiceProps_, image = image }
            , choicePropsCmd
            )

        UpdateContent content ->
            ( { model | state = ChoiceProps_, content = content }
            , choicePropsCmd
            )

        _ ->
            ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    case model.state of
        ChoiceEntry_ ->
            JD.decodeValue (JD.map ChoiceEntry JD.string)
                >> Result.withDefault NoOp
                |> Port.input

        ChoiceProps_ ->
            JD.decodeValue (JD.map Choice stateDecoder)
                >> Result.withDefault NoOp
                |> Port.input

        UpdateTitle_ ->
            JD.decodeValue (JD.map UpdateTitle JD.string)
                >> Result.withDefault NoOp
                |> Port.input

        UpdateOGP_ ->
            Port.uploadResult UpdateOGP

        UpdateTags_ ->
            JD.decodeValue (JD.map UpdateTags <| JD.list JD.string)
                >> Result.withDefault NoOp
                |> Port.input

        InputImageFile_ ->
            JD.decodeValue (JD.map InputImageFile JD.string)
                >> Result.withDefault NoOp
                |> Port.input

        UpdateImage_ ->
            Port.uploadResult UpdateImage

        UpdateContent_ ->
            Port.readFile UpdateContent

        _ ->
            Sub.none


initCmd : Maybe String -> Cmd Msg
initCmd maybeId =
    case maybeId of
        Just id ->
            Task.attempt GetEntry <| Api.getEntry id

        Nothing ->
            Task.attempt GetEntries Api.getEntries


inputCmd : State -> Cmd Msg
inputCmd state =
    case state of
        UpdateTitle_ ->
            Prompts.text "Input Title : "
                |> Port.output

        UpdateTags_ ->
            Prompts.list "Input Tags : "
                |> Port.output

        InputImageFile_ ->
            Prompts.text "Input Image path : "
                |> Port.output

        _ ->
            Cmd.none


choicePropsCmd : Cmd Msg
choicePropsCmd =
    [ UpdateTitle_
    , InputImageFile_
    , UpdateContent_
    , UpdateTags_
    , Init
    , End
    ]
        |> List.map stateToItem
        |> Prompts.select "Select update field : "
        |> Port.output


toItem : Entry -> Prompts.Item
toItem { id, title, content } =
    { title = title
    , value = id
    , description = content |> String.slice 0 16 |> String.replace "\n" " "
    }


stateToItem : State -> Prompts.Item
stateToItem state =
    case state of
        UpdateTitle_ ->
            { title = "title"
            , value = "UpdateTitle"
            , description = ""
            }

        InputImageFile_ ->
            { title = "image"
            , value = "InputImageFile"
            , description = ""
            }

        UpdateContent_ ->
            { title = "content"
            , value = "UpdateContent"
            , description = ""
            }

        UpdateTags_ ->
            { title = "tags"
            , value = "UpdateTags"
            , description = ""
            }

        End ->
            { title = "end"
            , value = "End"
            , description = ""
            }

        Init ->
            { title = "----------"
            , value = ""
            , description = ""
            }

        _ ->
            { title = "", value = "", description = "" }


stateDecoder : JD.Decoder State
stateDecoder =
    JD.string
        |> JD.map
            (\v ->
                case v of
                    "UpdateTitle" ->
                        UpdateTitle_

                    "InputImageFile" ->
                        InputImageFile_

                    "UpdateContent" ->
                        UpdateContent_

                    "UpdateTags" ->
                        UpdateTags_

                    "End" ->
                        End

                    _ ->
                        Init
            )
