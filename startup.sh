#!/usr/bin/env bash
# removes all sqlite .db files from db dir
db_file="$(/usr/bin/ls "$PWD"/db/*.db)"
if [ -f "${db_file}" ]; then
    /usr/bin/rm "${db_file}"
else
    echo 'no .db file found'
fi
