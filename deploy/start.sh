#!/bin/bash
echo "starting $(date)" 
cd /home/davut/projects/BookmarkReader-Root/backend/
echo $(pwd) 
/home/davut/.nvm/versions/node/v9.5.0/bin/node bin/www
