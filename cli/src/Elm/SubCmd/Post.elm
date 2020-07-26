module SubCmd.Post exposing (..)

import Api
import Http
import Json.Decode as JD
import Port
import Prompts
import Task
import Time


type Msg
    = NoOp
    | GetTime Time.Posix
    | ReadMDFile String
    | UploadImageFile String
    | UploadOGP String
    | InputTitle String
    | InputTags (List String)
    | PostResult (Result Http.Error ())


type State
    = ReadMDFile_
    | UploadImage_
    | UploadOGP_
    | InputTitle_
    | InputTags_


type alias Model =
    { token : String
    , state : State
    , imageFilePath : String

    -- draft data
    , title : String
    , content : String
    , image : String
    , tags : List String
    , date : Time.Posix
    , ogp : String
    }


init : String -> String -> String -> ( Model, Cmd Msg )
init token mdFilePath imageFilePath =
    ( { token = token
      , state = ReadMDFile_
      , imageFilePath = imageFilePath
      , title = ""
      , content = ""
      , image = ""
      , tags = []
      , date = Time.millisToPosix 0
      , ogp = ""
      }
    , [ Port.read mdFilePath
      , Task.perform GetTime Time.now
      ]
        |> Cmd.batch
    )


exec : Msg -> Model -> ( Model, Cmd Msg )
exec msg model =
    case msg of
        GetTime time ->
            ( { model | date = time }
            , Cmd.none
            )

        ReadMDFile content ->
            ( { model | content = content, state = UploadImage_ }
            , Port.uploadImage model.imageFilePath
            )

        UploadImageFile image ->
            ( { model | image = image, state = InputTitle_ }
            , Prompts.text "Input entry title : "
                |> Port.output
            )

        InputTitle title ->
            ( { model | title = title, state = InputTags_ }
            , Prompts.list "Input tags : "
                |> Port.output
            )

        InputTags tags ->
            ( { model | tags = tags, state = UploadOGP_ }
            , Port.makeOGP model.title
            )

        UploadOGP ogp ->
            ( { model | ogp = ogp }
            , Task.attempt
                PostResult
                (Api.postEntry
                    model.token
                    { title = model.title
                    , content = model.content
                    , tags = model.tags
                    , image = model.image
                    , date = model.date
                    , ogp = ogp
                    }
                )
            )

        PostResult (Ok _) ->
            ( model
            , Port.exit ( 0, "Post success" )
            )

        _ ->
            ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    case model.state of
        ReadMDFile_ ->
            Port.readFile ReadMDFile

        UploadImage_ ->
            Port.uploadResult UploadImageFile

        UploadOGP_ ->
            Port.uploadResult UploadOGP

        InputTitle_ ->
            JD.decodeValue (JD.map InputTitle JD.string)
                >> Result.withDefault NoOp
                |> Port.input

        InputTags_ ->
            JD.decodeValue (JD.map InputTags <| JD.list JD.string)
                >> Result.withDefault NoOp
                |> Port.input
