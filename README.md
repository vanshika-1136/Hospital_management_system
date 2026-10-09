# 🏥 Hospital Management System

### Full-Stack Healthcare Management Application

A full-stack **Hospital Management System** designed to streamline healthcare operations by providing role-based access to patient registration, medical records, doctor management, and ICU allocation.

The application uses **JWT-based authentication and role-based authorization** to provide different capabilities to Admins, Doctors, ICU Heads, and Patients.

> ⚠️ **Disclaimer:** This project is developed for educational purposes and does not replace a production-grade healthcare system.

---

## ✨ Features

### 🔐 Authentication & Authorization

- Secure user authentication using **JWT**
- Password hashing using **bcrypt**
- Role-based access control
- Protected API routes

### 👨‍⚕️ Doctor

- Access assigned patient information
- Manage medical records
- View and update relevant patient data

### 🧑‍💼 Admin

- Manage users and healthcare operations
- Register and manage patients
- Manage doctors
- Access administrative dashboards

### 🏥 ICU Management

- ICU allocation management
- Track ICU-related patient information
- Role-specific ICU access through the ICU Head role

### 🧑‍🦽 Patient

- Patient registration
- Access personal medical information
- View relevant medical records

---

## 🏗️ Application Architecture

```text id="9c3n2f"
                ┌─────────────────┐
                │      Client     │
                │   React + Vite  │
                └────────┬────────┘
                         │
                         │ HTTP / REST API
                         ▼
                ┌─────────────────┐
                │     Backend     │
                │ Node.js +       │
                │ Express.js      │
                └────────┬────────┘
                         │
                ┌────────▼────────┐
                │ Authentication  │
                │ JWT + bcrypt     │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │   PostgreSQL    │
                │    Database     │
                └─────────────────┘
```

---

## 🔄 How It Works

```text id="x9qj3a"
User Login
    ↓
JWT Authentication
    ↓
Role Verification
    ↓
Protected Routes
    ↓
REST API
    ↓
PostgreSQL
    ↓
Response
    ↓
React Dashboard
```

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js
- REST APIs

### Database

- PostgreSQL

### Authentication

- JSON Web Tokens (JWT)
- bcrypt

### Testing

- Thunder Client

### Deployment

- Vercel
- Render
- Neon PostgreSQL

---

## 🗄️ Database

The application uses a relational **PostgreSQL database** with interconnected tables for managing healthcare-related data.

The database handles entities such as:

- Users
- Patients
- Doctors
- Medical Records
- ICU-related information
- Role-specific data

Relational database design helps maintain consistency and relationships between healthcare entities.

---

## 🔑 Role-Based Access Control

| Role | Main Responsibilities |
|---|---|
| **Admin** | Manage users, patients and system operations |
| **Doctor** | Manage and access assigned patient information |
| **ICU Head** | Manage ICU-related operations |
| **Patient** | Access personal healthcare information |

Each role receives access only to the API routes and functionality relevant to that role.

---

## 📡 REST API

The backend is organized into role-specific API routes.

```text id="8c8c7p"
/api/auth
/api/admin
/api/doctor
/api/patient
/api/patients
```

Authentication middleware validates JWT tokens before allowing access to protected resources.

---

## 🔐 Security

The application implements:

- JWT-based authentication
- Password hashing with bcrypt
- Protected API endpoints
- Role-based authorization
- Server-side authentication middleware

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Hospital_management_system
```

### 2. Install dependencies

For the frontend:

```bash
npm install
```

For the backend:

```bash
cd server
npm install
```

### 3. Configure environment variables

Create the required `.env` files for the frontend and backend.

Example:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

> ⚠️ Never commit `.env` files, database credentials, JWT secrets, or other sensitive information to GitHub.

### 4. Run the application

Start the backend:

```bash
npm run dev
```

Start the frontend from the project root:

```bash
npm run dev
```

---

## 🎯 Key Learning Outcomes

Through this project, I gained practical experience in:

- Designing RESTful APIs
- Connecting React applications with backend services
- PostgreSQL relational database design
- JWT authentication
- Role-based authorization
- Backend middleware
- API testing
- Frontend-backend integration
- Deploying a full-stack application

---

## 🔮 Future Improvements

- Appointment scheduling
- Prescription management
- Doctor-patient appointment workflow
- Email/SMS notifications
- Advanced analytics dashboard
- Audit logging
- Improved healthcare data security
- Automated testing

---

## 👩‍💻 Author

**Vanshika**

B.E. Computer Science & Engineering  
UIET, Panjab University, Chandigarh

🔗 GitHub: `vanshika-1136`

🔗 LinkedIn: `vanshika-dhariya-486a872b1`

---

⭐ If you find this project interesting, consider giving the repository a star!
