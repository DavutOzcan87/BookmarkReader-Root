#!/bin/bash
echo "starting..."
echo "ps :run this script as sudo"

systemctl stop bookmarkreader
cp bookmarkreader.service /lib/systemd/system/

systemctl daemon-reload
echo "starting service"
systemctl start bookmarkreader

"echo service status"
systemctl status bookmarkreader



echo "FINISHED"