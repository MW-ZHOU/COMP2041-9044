#!/bin/bash
filename=$1
numBackup=$(ls -la| egrep "\.$filename\.[0-9]+" | wc -l)
#currentBackup=$((numBackup+1))
cat $filename > .$filename.$numBackup
echo "Backup of '$filename' saved as '.$filename.$numBackup'"
