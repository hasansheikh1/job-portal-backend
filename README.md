# Job Portal Backend

A Node.js backend for a job portal application, supporting users, employers, jobs, and applications.

## Features
- User registration and authentication (JWT)
- Employer and job management
- Application tracking
- Modular structure (controllers, models, routes, middlewares)

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd job-portal-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your values.

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Run tests:**
   ```bash
   npm test
   ```

## API Usage Example

- **Register User:**
  ```http
  POST /api/auth/register
  Content-Type: application/json
  {
    "firstname": "John",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **Login User:**
  ```http
  POST /api/auth/login
  Content-Type: application/json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

## Project Structure
```
config/         # Configuration files
controller/     # Business logic
middlewares/    # Express middlewares
models/         # Mongoose models
routes/         # API route definitions
utils/          # Utility functions
```

## License
MIT 