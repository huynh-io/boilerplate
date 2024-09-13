#!/usr/bin/env bash

# https://stackoverflow.com/questions/24112727/relative-paths-based-on-file-location-instead-of-current-working-directory
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd "$parent_path"
cd ../

echo 'Cleaning up old assets 🧹'
rm -rf public
cd frontend
rm -rf build

echo 'Building assets 🏗'
NODE_ENV=production npm run build

echo 'Moving assets to public directory 🚚'
cp -R build ../public
cd ../
