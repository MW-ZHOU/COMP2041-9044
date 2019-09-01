#!/bin/bash
for argument in "$@"
do
    # This use of a regex is a bash extension missing from many Shells
    # It should be avoided if portability is a concern
    if [[ "$argument" =~ '^-?[0-9]+$' ]]
    then
        echo "$0: argument '$argument' is not an integer" 1>&2
        exit 1
    fi
done
