# fileManager-NodeJS
![image](https://github.com/futoid/fileManager-NodeJS/assets/65010518/77416e41-1b5b-44f5-9622-7ea9a320f133)
# Tech Technologies
- NodeJS
- AMAZON S3
### npm Packages
- express
- aws-sdk
- multer, multer-s3
- jsonwebtoken, bcrypt
- sequelize, sequelize-cli
- dotenv, body-parser
- pg, pg-hstore
- nodemon (dev dependency)
# API's defined in depth
Every API starts with `/api/v1` here `api` defines that the link is an API, and `v1` mentions the version of the API.
All endpoints are defined in the way they'll be used in real life.
### User API
1. **Let's register our users first.**\
`.../user/signup` \
This takes body params, the user's **EMAIL**, and **PASSWORD**. Raw passwords without encryption are not recommended to store in the database, so using _**BCRYPT**_ to encrypt passwords.
#### 
2. **Getting a user token for LOGIN and further authorization to access other endpoints** \
   `.../user/signin` \
   Request body parameter **[RBP]**: User's **EMAIL** and **PASSWORD** \
   Response: **JWT** token
#### 
3. **We'll be needing some API to get user details from JWT token** \
   `.../user/currentUser` \
   x-access-token (header parameter)**[RHP]**: JWT Token
   Response: User Details 
####
### Folder API
  There can be factorial ways to define the relationship between **folders** and **subfolders**. Here I'm storing the **parentFolder** name of a file by default it's _**root**_. 
  1. **Creating Folders** \
   `.../folder/create` \
  **RBP**: UserId, folderName, parentFolder \
  **RHP**: x-access-token (jwt token) \
  **Response**: JSON data showing Success if folder created / Error 
###
2. **Get all folders associated with a user** \
   `.../folder/all` \
   **RBP**: userId\
  **RHP**: x-access-token (jwt token) \
   **Response**: Folder Data / Error 
####
3. **Update folder properties** \
   `.../folder/update` \
   **parentFolder** is very useful information to handle the subfolders.\
   **RBP**: userId , folderId, folderName(optional), parentFolder(optional)  \
  **RHP**: x-access-token (jwt token) \
   **Response** : Update success message with updated details / Error    
####
### File API
Using Amazon S3 bucket to store files and Postgres database to store metadata of the file. 
1. **Uploading file to S3** \
`/uploadPage` \
This endpoint will open an HTML interface to upload files. \
`/upload` \
The above endpoint will upload the file and return the data from S3 bucket 
####
2. **Adding file data to POSTGRES database** \
   `../file/add` \
   **RBP**: userId, fileName \
   **RHP**: x-access-token (jwt token) \
   **Response** : Created success message with file details / Error 
####
3. **Getting files**
  - without search query parameter \
    `../file/get` \
  **RBP**: userId \
  **RHP**: x-access-token (jwt token) \
  **Response** : All file data associated with a user / Error 
####
  - with the search parameter  
   `../file/get?search=anyName` \
  **RBP**: userId \
  **RHP**: x-access-token (jwt token) \
  **Query Parameters** : anyName \
  **Response** : Search query result / Error 
####
4. **Update a File** \
  `../file/update`\
  **RBP**: userId, filed, fileName(optional) , parentFolder(optional), isPublic(optional) \
  **RHP**: x-access-token (jwt token) \
  **Response** : Updated data with success message / Error  
####
5. **Share file to Public** \
  This endpoint is used to share files with anyone over the internet but it should be made public by the owner of the file **[isPublic]**. \
  `/file?id=fileId` \
    **Query Parameter**: fileId \
    **Response** : file data / Error 
####

# Folder Structure Explained in .\src
   - `\apis`:
     API folder handles all the endpoint names and versions.
   - `\config`:
     CONFIG folder handled database connection, database configuration, and environment variable exports
   - `\controller`:
     CONTROLLER layer folder handles all requests and responses that an API endpoint is getting.
   - `\middlewares`:
     MIDDLEWARES have two middleware files one is to verify the user inputs and another to check the authorization of the user.
   - `\migration`:
     This folder tracks all changes in the schema of any particular table.
   - `\models`:
     MODELS folder contains all schema information about a table.
   - `\respository`:
     REPOSITORY layer has access to directly create changes in the database.
   - `\seeders`:
     SEEDERS folder is used to insert sample data into the tables
   - `\service`:
     SERVICE layer very important layer that contains all business logic and complexities.
   - `\index.html`:
     HTML file provides interface to upload file
   - `\index.js`
     MAIN file which handles the start server and handles all requests.

# Local Development Setup
### INSTALL
[Node](https://nodejs.org/en/download) \
[Postgres](https://www.postgresql.org/download/)
### Open terminal
1. Clone this repository 
 ```
git clone git clone git@github.com:futoid/fileManager-NodeJS.git
```
3. Installing all dependency 
```
npm install
```
5. Creating NEW DATABASE
```
psql -U <PSQL_USERNAME>
```
Create a new database. And remember this DATABASE_NAME. 
```
CREATE DATABASE <DATABASE_NAME>
```
## change `/src/config/config.json`
```
{
  "development": {
    "username": PSQL_USERNAME,
    "password": POSTGRES_PASSWORD,
    "database": DATABASE_NAME,
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```
## create `.env`
```
PORT = PORT
JWT_KEY = STRONG KEY - ANYTHING not common
DEV_DATABASE_URL = postgres://<PSQL_USERNAME>:<PSQL_USERNAME>@127.0.0.1:5432/<DATABASE_NAME>
USERNAME = PSQL_USERNAME
DB_PASSWORD = POSTGRES_PASSWORD

# S3 Access Keys
S3_REGION = 
ACCESS_KEY = 
SECRET_KET = 
```
## Creating Tables
```
npx sequelize db:migrate
```
This command will create all required tables into our DATABASE as mentioned in `./src/models` folder
## RUNNING PROJECT
```
npm start
```
# Test all endpoints in any API testing tool.
Created by: Aliek Mandal
