# Student Records and Academic Progress Management System

## Overview

The **Student Records and Academic Progress Management System** is a web-based application designed to manage student information and academic records in an organized manner. It provides a centralized platform for storing, accessing, and maintaining student-related information through a user-friendly interface.

The project uses a React-based frontend, a Node.js and Express backend, and MongoDB for database management.

## Objectives

- Maintain student records in a centralized database.
- Simplify the process of accessing and managing student information.
- Provide a user-friendly interface for interacting with student records.
- Organize academic information for easier monitoring and retrieval.
- Demonstrate full-stack web development using the MERN stack.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React.js |
| Development Server | Vite |
| Backend | Node.js |
| Backend Framework | Express.js |
| Database | MongoDB |
| Database Connectivity | Mongoose |
| API Communication | REST APIs |

## Project Structure

```text
student-management-system-main/
└── student-management-system-main/
    ├── client/
    ├── server/
    │   ├── .env
    │   ├── package.json
    │   └── ...
    ├── docs/
    ├── screenshots/
    ├── package.json
    └── README.md
```

## Prerequisites

Make sure the following software is installed:

- Node.js and npm
- MongoDB Community Server
- Git (optional, for version control)

## Installation and Setup

### 1. Download the Project

Download or extract the project repository to your local system.

Open a terminal in the inner project directory containing the `client` and `server` folders.

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd server
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory and add the following configuration:

```env
MONGO_URI=mongodb://127.0.0.1:27017/student_records
PORT=5000
```

Ensure that MongoDB is running locally before starting the backend.

Start the backend server:

```bash
npm start
```

The backend should run at:

`http://localhost:5000`

### 3. Configure the Frontend

Open a **separate terminal** in the project root directory, where the `client` folder is located.

Navigate to the frontend directory:

```bash
cd client
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

`http://localhost:5173`

Keep both the backend and frontend terminals running while using the application.

## Database Configuration

The application uses MongoDB to store student-related records.

The default local database connection is:

```text
mongodb://127.0.0.1:27017/student_records
```

The database is named `student_records`. The collections and stored fields depend on the backend models and implemented application features.

## Backend and API

The backend is built using Node.js and Express.js. It handles incoming requests, application logic, and communication with the MongoDB database.

The frontend communicates with the backend through HTTP requests to the configured API endpoints.

Refer to the backend routes and controllers for the available API operations.

## Running the Application

1. Start MongoDB.
2. Start the backend server from the `server` directory.
3. Start the frontend development server from the `client` directory.
4. Open the frontend URL in your browser.
5. Test the available application features.

## Testing Checklist

- [ ] Verify that the frontend loads correctly.
- [ ] Verify that the backend server starts successfully.
- [ ] Confirm that the backend connects to MongoDB.
- [ ] Test the implemented student record operations.
- [ ] Verify that data is stored and retrieved correctly.
- [ ] Check that errors and invalid inputs are handled appropriately.

## Security Considerations

- Keep environment variables and database credentials out of public repositories.
- Do not commit the `.env` file.
- Validate user input on the backend.
- Configure appropriate access controls and error handling.
- Use suitable authentication and authorization mechanisms if implemented.

##Create By

- Srushti Ravindra



**Project:** Student Records and Academic Progress Management System  
**Category:** Full-Stack Web Development  
**Technology:** MERN Stack
