# Employee Task Manager

A full-stack web application for managing employees and tasks with a modern UI and MongoDB backend.

## Project Structure

```
employee-task-manager/
├── ems-frontend/             # React Frontend (Simplified)
│   ├── public/
│   │   └── index.html       # Main HTML template
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── auth/
│   │   │   │   └── LoginForm.js
│   │   │   ├── dashboard/
│   │   │   │   ├── DashboardSection.js
│   │   │   │   └── StatCard.js
│   │   │   ├── employees/
│   │   │   │   ├── EmployeeList.js
│   │   │   │   └── EmployeeModal.js
│   │   │   ├── tasks/
│   │   │   │   ├── TaskList.js
│   │   │   │   └── TaskModal.js
│   │   │   └── common/
│   │   │       └── Navbar.js
│   │   ├── styles/
│   │   │   └── index.css    # CSS styles
│   │   ├── App.js           # Main React component
│   │   └── index.js         # React entry point
│   └── package.json         # React dependencies
├── backend/                  # Backend files
│   ├── server.js            # Main server file
│   ├── package.json         # Node.js dependencies
│   ├── config.env           # Environment variables
│   ├── models/              # MongoDB models
│   │   ├── Employee.js      # Employee model
│   │   ├── Task.js          # Task model
│   │   └── User.js          # User model
│   ├── routes/              # API routes
│   │   ├── auth.js          # Authentication routes
│   │   ├── employees.js     # Employee CRUD routes
│   │   └── tasks.js         # Task CRUD routes
│   └── seedData.js          # Sample data seeder
└── README.md                # This file

```

## Features

- **Employee Management**: Add, edit, delete, and search employees
- **Task Management**: Create, assign, and track tasks
- **Dashboard**: Overview of employees and tasks statistics
- **Authentication**: Secure login system with JWT
- **Responsive Design**: Works on desktop and mobile devices
- **MongoDB Integration**: Persistent data storage

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)

## Installation & Setup

### 1. Backend Setup

```bash
cd backend
npm install
```
### 2. frontend 
```bash
cd frontend
npm start
```
### 3. Environment Configuration

The MongoDB connection string is already configured in `backend/config.env`:
```
MONGODB_URI=mongodb+srv://harigami2023:UT2bLD5RfWh1J61E@cluster0.g2vkoh3.mongodb.net/todo_employee_db?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### 3. Initialize Admin User

Before running the application, you need to create an admin user.
Use any REST client (Postman/Insomnia/curl):
- POST http://localhost:5000/api/auth/init

### 4. Start the Backend Server

```bash
cd backend
npm start
```

For development with auto-restart:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 5. Access the Application

Open your browser and navigate to `http://localhost:3000`for frontend

## Default Login Credentials

- **Email**: admin@company.com
- **Password**: admin123

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/init` - Initialize admin user

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
- `GET /api/employees/search/:query` - Search employees

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/employee/:employeeId` - Get tasks by employee
- `GET /api/tasks/status/:status` - Get tasks by status

## Technologies Used

### Frontend
React.js

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation

### Database
- MongoDB Atlas (cloud database)

## Development

The application is structured as a monorepo with separate frontend and backend directories. The backend serves the frontend static files and provides API endpoints for data management.

### Key Features Implemented

1. **Separation of Concerns**: Frontend and backend are clearly separated
2. **RESTful API**: Clean API design with proper HTTP methods
3. **Data Validation**: Input validation on both frontend and backend
4. **Error Handling**: Comprehensive error handling throughout the application
5. **Security**: JWT authentication and password hashing
6. **Responsive Design**: Mobile-first responsive design
7. **Real-time Updates**: UI updates automatically when data changes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
