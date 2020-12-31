module SubCmd exposing (..)

import Parser exposing ((|.), (|=), Parser)
import Utils


type SubCmd
    = Get String
    | Post String (Maybe String)
    | List
    | Update (Maybe String)
    | Remove (Maybe String)
    | Login
    | Help



-- Parser


get : Parser SubCmd
get =
    Parser.succeed Get
        |. Parser.keyword "get"
        |. Parser.spaces
        |= Utils.string


post : Parser SubCmd
post =
    Parser.succeed Post
        |. Parser.keyword "post"
        |. Parser.spaces
        |= Utils.string
        |. Parser.spaces
        |= Parser.oneOf 
            [ Utils.string |> Parser.map Just
            , Parser.succeed Maybe.Nothing
            ]


list : Parser SubCmd
list =
    Parser.succeed List
        |. Parser.keyword "ls"


update : Parser SubCmd
update =
    Parser.succeed Update
        |. Parser.keyword "update"
        |. Parser.spaces
        |= Parser.oneOf
            [ Utils.string |> Parser.map Just
            , Parser.succeed Maybe.Nothing
            ]


remove : Parser SubCmd
remove =
    Parser.succeed Remove
        |. Parser.keyword "rm"
        |. Parser.spaces
        |= Parser.oneOf
            [ Utils.string |> Parser.map Just
            , Parser.succeed Nothing
            ]


login : Parser SubCmd
login =
    Parser.succeed Login
        |. Parser.keyword "login"


help : Parser SubCmd
help =
    Parser.succeed Help
        |. Parser.keyword "--help"


register : List (Parser SubCmd) -> Parser SubCmd
register parsers =
    Parser.oneOf parsers
