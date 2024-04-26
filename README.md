# Course Selling Website

## Description

This is a course selling app where users can sign up, view courses, and purchase them. Admins can sign up and create courses. 
This project uses Node.js, Express, and MongoDB to store data persistently.

## Getting Started Locally

### 1. Copy code

```bash
git clone <repository_url>
```

### 2. Install dependencies

```bash
cd <project_directory>
npm install
```

### 3. Set up environment variables

Create a .env file in the root directory and add the following variables:

```bash
JWT_SECRET_KEY=""
DB_USER = ""
DB_PASSWORD = ""
DB_HOST = ""
```

## **Start the server:**

 ```bash
 node index.s
 ```

 ---

## Routes

### Course Route:

- **Get /courses/**
- Description: Return all Courses Details.



### Admin Routes:

- **POST /admin/signup**
- Description: Creates a new admin account.
- Input Body: `{ username: 'admin', password: 'pass' }`
- **POST /admin/signin**
- Description: Return a jwt Token.
- Input Body: `{ username: 'admin', password: 'pass' }`

- **POST /admin/courses**
- Description: Creates a new course.
- Input: Headers: `{ 'Bearer': 'JwtToken'},`
- Body: `{ title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }`

- **GET /admin/courses**
- Description: Returns all the courses of admin.
- Input: Headers: `{ 'Bearer': 'JwtToken'}`


### User routes

- **POST /users/signup**
- Description: Creates a new user account.
- Input: `{ username: 'user', password: 'pass' }`

- **POST /user/signin**
- Description: Return a jwt Token.
- Input Body: `{ username: 'user', password: 'pass' }`

- **GET /users/courses**
- Description: Lists all the courses of user.
- Input: Headers: `{ 'Bearer': 'username', 'password': 'password' }`


- **POST /users/courses/:courseId**
- Description: Purchases a course. `courseId` in the URL path should be replaced with the ID of the course to be purchased.
- Input: Headers: `{ 'Bearer': 'username', 'password': 'password' }`




