module Main exposing (main)

import Parser exposing (Parser)
import Platform
import Port
import SubCmd exposing (SubCmd)
import SubCmd.Get as Get
import SubCmd.Help as Help
import SubCmd.List as List
import SubCmd.Login as Login
import SubCmd.Post as Post
import SubCmd.Remove as Remove
import SubCmd.Update as Update


type alias Flags =
    { argv : String
    , token : Maybe String
    }


type State
    = Get Get.Model
    | List List.Model
    | Login Login.Model
    | Update Update.Model
    | Remove Remove.Model
    | Post Post.Model
    | Help


type alias Model =
    { state : State
    , token : Maybe String
    }


type Msg
    = GetMsg Get.Msg
    | ListMsg List.Msg
    | LoginMsg Login.Msg
    | RemoveMsg Remove.Msg
    | UpdateMsg Update.Msg
    | PostMsg Post.Msg


subCmdParser : Parser SubCmd
subCmdParser =
    SubCmd.register
        [ SubCmd.help
        , SubCmd.get
        , SubCmd.post
        , SubCmd.list
        , SubCmd.update
        , SubCmd.login
        , SubCmd.remove
        ]


init : Flags -> ( Model, Cmd Msg )
init { argv, token } =
    let
        subCmd =
            Parser.run subCmdParser argv
                |> Result.withDefault SubCmd.Help

        ( state, cmd ) =
            case subCmd of
                SubCmd.Get id ->
                    Get.init id
                        |> Tuple.mapBoth Get (Cmd.map GetMsg)

                SubCmd.List ->
                    List.init ()
                        |> Tuple.mapBoth List (Cmd.map ListMsg)

                SubCmd.Login ->
                    if token == Nothing then
                        Login.init ()
                            |> Tuple.mapBoth Login (Cmd.map LoginMsg)

                    else
                        ( Help, Port.exit ( 0, "Already login 👍" ) )

                SubCmd.Remove maybeId ->
                    case token of
                        Just t ->
                            Remove.init t maybeId
                                |> Tuple.mapBoth Remove (Cmd.map RemoveMsg)

                        Nothing ->
                            ( Help, Port.exit ( 1, "This command required to login." ) )

                SubCmd.Post mdFilePath imageFilePath ->
                    case token of
                        Just t ->
                            Post.init t mdFilePath imageFilePath
                                |> Tuple.mapBoth Post (Cmd.map PostMsg)

                        Nothing ->
                            ( Help, Port.exit ( 1, "This command required to login." ) )

                SubCmd.Update maybeId ->
                    case token of
                        Just t ->
                            Update.init t maybeId
                                |> Tuple.mapBoth Update (Cmd.map UpdateMsg)

                        Nothing ->
                            ( Help, Port.exit ( 1, "This command required to login." ) )

                SubCmd.Help ->
                    ( Help, Help.exec () )
    in
    ( { state = state
      , token = token
      }
    , cmd
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GetMsg subMsg ->
            ( model, Get.exec subMsg |> Cmd.map GetMsg )

        ListMsg subMsg ->
            ( model, List.exec subMsg |> Cmd.map ListMsg )

        LoginMsg subMsg ->
            case model.state of
                Login subModel ->
                    Login.exec subMsg subModel
                        |> Tuple.mapBoth
                            (\x -> { model | state = Login x })
                            (Cmd.map LoginMsg)

                _ ->
                    ( model, Cmd.none )

        UpdateMsg subMsg ->
            case model.state of
                Update subModel ->
                    Update.exec subMsg subModel
                        |> Tuple.mapBoth
                            (\x -> { model | state = Update x })
                            (Cmd.map UpdateMsg)

                _ ->
                    ( model, Cmd.none )

        RemoveMsg subMsg ->
            case model.state of
                Remove subModel ->
                    Remove.exec subMsg subModel
                        |> Tuple.mapBoth
                            (\x -> { model | state = Remove x })
                            (Cmd.map RemoveMsg)

                _ ->
                    ( model, Cmd.none )

        PostMsg subMsg ->
            case model.state of
                Post subModel ->
                    Post.exec subMsg subModel
                        |> Tuple.mapBoth
                            (\x -> { model | state = Post x })
                            (Cmd.map PostMsg)

                _ ->
                    ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    case model.state of
        List subModel ->
            List.subscriptions subModel
                |> Sub.map ListMsg

        Login subModel ->
            Login.subscriptions subModel
                |> Sub.map LoginMsg

        Remove subModel ->
            Remove.subscriptions subModel
                |> Sub.map RemoveMsg

        Post subModel ->
            Post.subscriptions subModel
                |> Sub.map PostMsg

        Update subModel ->
            Update.subscriptions subModel
                |> Sub.map UpdateMsg

        _ ->
            Sub.none


main : Program Flags Model Msg
main =
    Platform.worker
        { init = init
        , update = update
        , subscriptions = subscriptions
        }
