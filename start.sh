#!/bin/bash
export $(cat .env | xargs)

echo "Install dependencies"
yarn

if [ $NODE_ENV = 'development' ];
then
  echo "Run development server"
  yarn dev
else
  echo "Run production server"
  yarn start
fi
