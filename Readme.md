#Url Shortner Web Application

## cloning this repository:

git clone https://github.com/Vandan00/Url-Shortner-Mern.git

## Go to root directory and run this command:

npm install

## Go to client and run the following command:

npm install

## Make a .env file in your root directory:

PORT = Write your Server port
MONGODB_URL = Url for you database
MONGO_DB_NAME = Database name
DB_User = Your username
DB_Password = Your database password

NODE_ENV = deployment/produciton
JWT_SECRET = any set of alphabets and numbers for secret token.

## API's:

### Creating user:

http://localhost:5000/api/users

### Loging User:

http://localhost:5000/api/users/login

### Creating Url:

Post - http://localhost:5000/api/urls/create

### Deleting Url:

Delete request - http://localhost:5000/api/id
