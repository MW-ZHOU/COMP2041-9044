#!/bin/bash
small=()
medium=()
large=()
for i in *
do
	num_lines=`wc -l "$i" | cut -d' ' -f1`
	file_name=`wc -l "$i" | cut -d' ' -f2`
	#use test command as the if condition
	if [ $num_lines -lt 10 ]
	then
		small+=("$file_name")
	elif [ $num_lines -lt 100 ]
	then
		medium+=("$file_name")
	else
		large+=("$file_name")
	fi
done
echo "Small files: "${small[*]}
echo "Medium-sized files: "${medium[*]}
echo "Large files: " ${large[*]}
