#!/bin/bash

existed_directories=() # empty list of directories
object_suffix=""
flag=0
counter=0

for object in *; do

    # if this is a directory (not a file)
    if [[ -d $object ]]; then

        # add directory to the list of existed directories
        existed_directories+=($object)
    fi
done

for object in *; do

    # if this is a directory (not a file)
	if [[ -d $object ]]; then

        if [[ $object = "clear.sh" ]]; then


        fi
    fi
done

# report of the number of files that where transport
echo "The number of files that have been oredered: $counter"