# fileManager-NodeJS
![image](https://github.com/futoid/fileManager-NodeJS/assets/65010518/77416e41-1b5b-44f5-9622-7ea9a320f133)
## API's defined in depth
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


 


