#!/bin/bash
if (("$#" > 0))
then
	for img in "$@"
	do
		display "$img"
	done
	for img in "$@"
	do
		read -p "Address to e-mail this image to? " emailAddr
		#if echo $emailAddr | egrep '.*@.*\.com'
		read -p "Message to accompany image? " msg
		subj=`echo "$img" | cut -d'.' -f1`
		echo "$msg" | mutt -s "$subj!" -e 'set copy=no' -a "$img" -- "$emailAddr"
		echo "$img" sent to "$emailAddr"
	done
else
	echo "Usage: ./email_image.sh <name of image 1> <name of image 2>..."
fi
