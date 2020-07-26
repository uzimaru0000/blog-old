port module Port exposing (..)

import Json.Decode as JD
import Json.Encode as JE


port input : (JD.Value -> msg) -> Sub msg


port output : JE.Value -> Cmd msg


port exit : ( Int, String ) -> Cmd msg


port read : String -> Cmd msg


port uploadImage : String -> Cmd msg


port uploadResult : (String -> msg) -> Sub msg


port readFile : (String -> msg) -> Sub msg


port makeOGP : String -> Cmd msg


port openFile : String -> Cmd msg
