port module Port exposing (..)

import Json.Decode as JD
import Json.Encode as JE


port input : (JD.Value -> msg) -> Sub msg


port output : JE.Value -> Cmd msg


port exit : ( Int, String ) -> Cmd msg
