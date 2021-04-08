#!/bin/bash
sleep 1s

source .env

script_location=$(dirname $0)
echo $script_location/..
cd $script_location/../app
pwd

npm run serve -- --port $APP_PORT --host $APP_IP

