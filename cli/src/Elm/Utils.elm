module Utils exposing (..)

import Parser exposing ((|.), Parser)


string : Parser String
string =
    Parser.getChompedString <|
        Parser.succeed ()
            |. Parser.chompIf (\c -> c /= ' ' && c /= '\t')
            |. Parser.chompWhile (\c -> c /= ' ' && c /= '\t')
