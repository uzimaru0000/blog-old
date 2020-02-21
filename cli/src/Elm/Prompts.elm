module Prompts exposing (..)

import Json.Encode as JE


type alias Item =
    { title : String
    , value : String
    , description : String
    }


itemEncoder : Item -> JE.Value
itemEncoder { title, value, description } =
    JE.object
        [ ( "title", JE.string title )
        , ( "value", JE.string value )
        , ( "description", JE.string description )
        ]


select : String -> List Item -> JE.Value
select message choices =
    JE.object
        [ ( "type", JE.string "select" )
        , ( "name", JE.string "value" )
        , ( "message", JE.string message )
        , ( "choices", JE.list itemEncoder choices )
        ]


text : String -> JE.Value
text message =
    JE.object
        [ ( "type", JE.string "text" )
        , ( "name", JE.string "value" )
        , ( "message", JE.string message )
        ]


password : String -> JE.Value
password message =
    JE.object
        [ ( "type", JE.string "password" )
        , ( "name", JE.string "value" )
        , ( "message", JE.string message )
        ]


list : String -> JE.Value
list message =
    JE.object
        [ ( "type", JE.string "list" )
        , ( "name", JE.string "value" )
        , ( "message", JE.string message )
        , ( "hint", JE.string "separate \",\"" )
        , ( "seperator", JE.string "," )
        ]
