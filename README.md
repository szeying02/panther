# Panther 

A forum where users can create, read, update and delete posts / threads and comments, combined with a basic authentication system. 

## Tech Stack

1. React.js framework (Frontend)
2. Golang (Backend)
3. PostgreSQL (Database)

## Features

1. Username & Password Authentication System
2. JSON Web Tokens and Session Cookies
3. CRUD forum for threads and comments
4. A search function that allows for the searching of threads using keywords and the filtering of threads' categories

## Screenshot

![Home](/screenshots/Home.png)
![Login](/screenshots/Login.png)
![Forum](/screenshots/Forum.png)
![Thread](/screenshots/Thread.png)
![Search](/screenshots/Search.png)

## Getting Started

1. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) this repo and [Clone](https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-your-forked-repository) your forked repo.

### Set up database (PostgreSQL)

1. [Install PostgreSQL](https://www.postgresql.org/download/)
2. Open terminal and type the following:
```bash 
psql postgres
```
3. Create the database called panther.
```bash
CREATE DATABASE panther;
```
4. Connect to the newly created database.
```bash
\c panther
```
5. Create tables in the database by copying and pasting everything in the file ```server/database/postgresql/table_creation.sql```.
6. (Optional) Insert dummy daata into the database by copying and pasting everything in the file ```server/database/postgresql/insert_dummy_data.sql```.

### Set up backend (Golang)

1. Replace the username and password configuration with your own at ```server/database/database.go```.
2. Return to the root directory of this project and key into the terminal:
```bash
go run .
```

### Set up frontend (React.js)

1. Navigate to the client (frontend) folder with:
```bash
cd client
```
2. Install dependencies with:
```bash
npm install
```
3. Run the development server with:
```bash
npm start
```

## Navigating the Code

```
.
├── client
│   ├── node_modules
│   ├── public  
│   ├── src 				# Contains all functional frontend source code
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── yarn.lock
├── server
│   ├── api					# Encapsulates the API 
│   ├── database
│   	├── postgresql		# Contains SQL files to setup PostgreSQL database
│   	├── queries			# Contains the Golang and SQL queries
│   ├── middleware			# Encapsulates middleware used in the application
│   ├── models				# Definitions of objects used in the application
│   ├── router				# Defines routes that are used in the application
├── go.mod
├── go.sum
├── LICENSE
├── main.go
├── README.md
```


### Notable files

- ```package.json``` contains the important metadata for the frontend of the application.
- ```main.go``` contains the main entry point for the backend of the application.
- ```go.mod``` contains the important metadata for the backend of the application.

## Contributor(s)
- Lim Sze Ying A0240350X