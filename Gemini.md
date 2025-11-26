# Project: centralfti (centralapi-express)

This project is a Node.js web application built with the Express.js framework. Based on the file structure and dependencies, it serves as a central API for managing data in an educational institution, such as a university's Faculty of Technology and Information (FTI), as suggested by the package name "centralfti".

## Key Components & Technologies

*   **Framework**: Express.js (`app.js`, `routes/`)
*   **ORM**: Prisma (`prisma/schema.prisma`, `@prisma/client`). Prisma is used for database modeling, migrations, and querying.
*   **Language**: JavaScript
*   **Authentication**: Implements token-based authentication using JSON Web Tokens (`jsonwebtoken`) and password hashing with `bcrypt`. An `authenticateToken.js` middleware is in place to protect routes.
*   **Validation**: Uses `express-validator` for validating incoming request bodies to ensure data integrity.
*   **API Documentation**: An `openapi.yaml` file exists, indicating that the API is documented using the OpenAPI (Swagger) specification.

## Architecture

The application follows a standard layered architecture for an Express API:

*   **`bin/www`**: The main entry point that starts the HTTP server.
*   **`app.js`**: The core application file where middleware, routes, and configurations are set up.
*   **`routes/`**: Defines the API endpoints. The project has distinct routes for managing resources like:
    *   Authentication (`auth.js`)
    *   Users (`users.js`)
    *   Profile (`profile.js`)
    *   Students (`student.js`)
    *   Staff (`staff.js`)
    *   Lecturers (`lecturer.js`)
    *   Faculties (`faculty.js`)
    *   Departments (`departement.js`)
    *   Buildings (`building.js`)
    *   Rooms (`rooms.js`)
*   **`controllers/`**: Contains the business logic for each route, handling request processing and database interactions through the Prisma client.
*   **`middlewares/`**: Holds middleware functions, with a key example being `authenticateToken.js` for route protection.
*   **`validators/`**: Contains validation rules for request data using `express-validator`.

## Purpose

The primary goal of this API is to provide a centralized system for performing Create, Read, Update, and Delete (CRUD) operations on core institutional data. It is designed to be consumed by other client-facing applications, such as a student information system, an administrative dashboard, or a mobile application.
