#!/bin/bash

existed_directories=() # empty list of directories
counter=0

for object in *; do

    # if this is a directory (not a file)
    if [[ -d $object ]]; then

        # add directory to the list of existed directories
        existed_directories+=($object)
        counter=`echo "$counter + 1" | bc`
    fi

done

# remove the last object
unset 'existed_directories[${#existed_directories[@]}-1]'
counter=`echo "$counter - 1" | bc`

echo ${existed_directories[@]}
#echo ${existed_directories[-1]}

for object in ${existed_directories[@]}; do

    # reomve archive directory
    rm -R $object

done

# report the number of directories deleted
echo "The number of directories deleted: $counter"