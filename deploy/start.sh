#!/bin/bash
echo "starting $(date)" >> /tmp/bookmarkreader.log
cd /home/davut/projects/BookmarkReader-Root/backend/
echo $(pwd) >> /tmp/bookmarkreader.txt
/home/davut/.nvm/versions/node/v9.5.0/bin/node bin/www >> /tmp/bookmarkreader.txt