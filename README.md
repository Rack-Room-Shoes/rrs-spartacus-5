command to pack and move files to the root dir:
find . -type d -maxdepth 1 -mindepth 1 -exec bash -c "cd {} &&  npm pack && mv *.tgz ../"  \;
