#!/bin/bash

## PATHS
dir_project_production=$(dirname $0);
dir_project=$dir_project_production/..;

## VARS
source $dir_project/.env

# Add App to PM2 processes
pm2 start ./run_api_production.sh --name "$WEB_NAME-app"

# Add Build to PM2 processes
cd ../builder;
pm2 start npm --name "$WEB_NAME-builder" -- start
