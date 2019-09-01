#!/bin/bash
# check whether there is a cmd line arg
case $# in
    1) # ok...
        ;;
    *)
        echo "Usage: $0 dir"
        exit 1
esac

# then make sure that it is a directory
if test ! -d $1
then
    echo "$1 is not a directory"
    echo "Usage: $0 dir"
    exit 1
fi


# change into the specified directory
cd $1

# for each plain file in the directory
for f in * # .*
do
    case $f in
        # .|..) #ignore . and ..
        #     ;;
        *)
            if test -f $f
            then
                rm $f
            fi
            ;;
    esac
done

# for each subdirectory
for d in * # .*
do
    case $d in
        # .|..) # ignore . and ..
        #     ;;
        *)
            if test -d $d
            then
                echo -n "Delete $d? "
                read answer
                if test "$answer" = "yes"
                then
                    rmall $d
                fi
            fi
            ;;
    esac
done
