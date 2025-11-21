# Express.js RESTful API Boilerplate

This is a boilerplate project for creating a RESTful API server using Express.js. It includes user authentication, database integration with Prisma, and a structured project layout.

## Features

- **RESTful API:** A well-structured RESTful API for managing users and authentication.
- **User Authentication:** Secure user registration and login using JSON Web Tokens (JWT).
- **Database Integration:** Uses Prisma ORM for easy database access and management.
- **Middleware:** Includes middleware for token authentication.
- **Environment Variables:** Uses `dotenv` for managing environment variables.

## Technologies

- **Node.js:** A JavaScript runtime for building server-side applications.
- **Express.js:** A fast and minimalist web framework for Node.js.
- **Prisma:** A next-generation ORM for Node.js and TypeScript.
- **JSON Web Token (JWT):** For creating access tokens for authentication.
- **bcrypt:** A library for hashing passwords.
- **Nodemon:** For automatically restarting the server during development.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [NPM](https://www.npmjs.com/)
- A database (e.g., PostgreSQL, MySQL, SQLite)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add the following variables:

    ```
    DATABASE_URL="your-database-connection-string"
    JWT_SECRET="your-jwt-secret"
    ```

    Replace `"your-database-connection-string"` with your actual database connection string and `"your-jwt-secret"` with a secret key for signing JWTs. Check to `env.example` as example.

4.  **Run database migrations:**

    ```bash
    npx prisma migrate dev --name init
    ```

### Running the Application

- **Development:**

  ```bash
  npm run dev
  ```

  This will start the server with Nodemon, which will automatically restart the server on file changes.

- **Production:**

  ```bash
  npm start
  ```

  This will start the server in production mode.

## API Endpoints

### Authentication

- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Log in a user and get a JWT token.
- `GET /auth/profile`: Get the profile of the currently logged-in user.

### Users

- `GET /users`: Get a list of all users.
- `POST /users`: Create a new user.
- `PUT /users/:id`: Update a user's information.
- `DELETE /users/:id`: Delete a user.

## Project Structure

```
.
├── app.js
├── bin
│   └── www
├── controllers
│   ├── authController.js
│   └── userController.js
├── middlewares
│   └── authenticateToken.js
├── prisma
│   └── schema.prisma
├── public
├── routes
│   ├── auth.js
│   ├── index.js
│   └── users.js
└── ...
```

- **`app.js`**: The main application file where Express is configured.
- **`bin/www`**: The entry point of the application.
- **`controllers`**: Contains the business logic for each route.
- **`middlewares`**: Contains custom middleware, such as the authentication middleware.
- **`prisma`**: Contains the Prisma schema file for defining the database models.
- **`public`**: Contains static files, such as images, stylesheets, and JavaScript files.
- **`routes`**: Contains the route definitions for the API.
