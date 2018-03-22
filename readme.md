## To start node Project

## Prerequisite.
Download node package from https://nodejs.org/en/download/. Install node to your machine.
Download mongodb package from https://www.mongodb.com/download-center#community. Install mongodb in your machine.

## For windows user
To run mongod, open command prompt, navigate to this location in your local machine C:\Program Files\MongoDB\Server\3.4\bin.
Type mongod.exe

-------------------------------------------------------------------------------------------------------------------------------------

## To start Node server

## Note:
If you not installed your node_modules package, Please run this command below.
npm install 


## For Windows
Set ENVIRONMENT=dev|prod
node server.js

## For Linux or Mac
export ENVIRONMENT=dev|prod
node server.js


------------------------------------------------------------------------------------------------------------------------------------------------
## To import mongodb seed file
mongorestore -d <database-name> <your-backup-directory>