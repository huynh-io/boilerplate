#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
# Change to the root directory of the project
cd $SCRIPT_DIR/..

echo 'Cleaning up old assets 🧹'
rm -rf public
rm -rf frontend/build

echo 'Building assets 🏗'
cd frontend && NODE_ENV=production npm run build && cd ../

echo 'Moving assets to public directory 🚚'
cp -r frontend/build public
