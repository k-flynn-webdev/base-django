#!/bin/bash

## PATHS
nginx=$(dirname $0);
dir_project=$nginx/..;

## VARS
source $dir_project/.env

export APP_NAME=$APP_NAME
export API_IP=$API_IP
export API_PORT=$API_PORT
export APP_IP=$APP_IP
export APP_PORT=$APP_PORT
export WEB_URL=$WEB_URL

envsubst < $nginx/nginx.template > $WEB_URL
