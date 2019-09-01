#!/bin/bash
if (($# != 2))
then
	echo "Usage: ./echon.sh <number of lines> <string>" 1>&2
	exit 1
elif echo "$1" | egrep -v '^[0-9]+$' >/dev/null
then
	echo "./echon.sh: argument 1 must be a non-negative integer" 1>&2
	exit 1
else
	for ((i=1;i<=$1;i++))
	do
		echo $2
	done
	exit 0
fi

