#!/bin/bash

for imgFile in *
do
	if echo $imgFile | egrep '*.jpg$' >/dev/null
	then
		imgName=`echo $imgFile | cut -d'.' -f1`
		if [ -f "$imgName.png" ]
		then
			echo "$imgName.png already exists" 1>&2
		else
			convert "$imgFile" "$imgName.png"
			rm "$imgFile"
		fi
	fi
done
exit 0
