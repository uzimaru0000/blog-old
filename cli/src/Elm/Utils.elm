module Utils exposing (..)

import Parser exposing ((|.), Parser)
import Url.Builder as Builder

string : Parser String
string =
    Parser.getChompedString <|
        Parser.succeed ()
            |. Parser.chompIf (\c -> c /= ' ' && c /= '\t')
            |. Parser.chompWhile (\c -> c /= ' ' && c /= '\t')

makeOGP : String -> String
makeOGP title =
    Builder.crossOrigin
        "https://blog.uzimaru.com"
        [ "api", "ogp" ]
        [ Builder.string "title" title ]
