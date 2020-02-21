module SubCmd.Help exposing (..)

import Port


exec : () -> Cmd msg
exec _ =
    Port.exit
        ( 0
        , how2
            ++ "\n\n"
            ++ description
            ++ "\n\n"
            ++ ([ get
                , list
                , login
                , post
                , remove
                ]
                    |> String.join "\n"
               )
        )


description : String
description =
    "This command is using blog's CMS"


how2 : String
how2 =
    "$ blog <sub-cmd>"


get : String
get =
    "get <id> : Get blog entry"


post : String
post =
    "post <md-file-path> <img-file-path> : Post blog entry"


list : String
list =
    "ls : Listing blog entries"


login : String
login =
    "login : Login CMS"


remove : String
remove =
    "rm [id] : Remove blog entry"
