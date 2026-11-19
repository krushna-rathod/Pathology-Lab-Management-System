# Pathology Lab Management System

[![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Material-UI](https://img.shields.io/badge/UI-Material--UI%20v7-007FFF?logo=mui&logoColor=white)](https://mui.com/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Framework-Express%205-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

**Pathology Lab Management System** is a full-stack clinical laboratory and diagnostic management web application designed to streamline diagnostic lab workflows. It enables pathology centers to manage diagnostic test catalogs, register patients, track specimen testing statuses in real-time, record diagnostic parameters against reference ranges, and export branded medical test reports and prescriptions as printable PDF documents.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Technologies Used](#-technologies-used)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [Database Configuration](#-database-configuration)
- [API Endpoints Reference](#-api-endpoints-reference)
- [Author & Contact](#-author--contact)

---

## 🌟 Overview

Clinical laboratory operations require meticulous tracking of patient samples, accurate recording of diagnostic measurements against medical reference ranges, and prompt delivery of diagnostic reports. 

The **Pathology Lab Management System** delivers an integrated digital platform that connects front-desk reception, laboratory technicians, and administrators:
- Patients can view available diagnostic tests, pricing, and fasting instructions.
- Lab staff register patients, capture clinical details, and update test statuses (`Pending`, `In Progress`, `Completed`).
- Pathologists enter test parameter results and generate high-fidelity PDF diagnostic reports and prescriptions on demand.

---

## 🚀 Key Features

- 🧪 **Diagnostic Test Catalog**:
  - Full catalog of medical laboratory investigations (CBC, Lipid Profile, Liver Function, Blood Glucose, Thyroid, etc.).
  - Detailed normal and abnormal biological reference ranges.
  - Transparent pricing and patient preparation guidelines (e.g., fasting requirements).

- 📋 **Patient & Sample Registration**:
  - Record patient demographics (name, age, contact, residential address).
  - Track assigned pathologist/examiner and specimen examination dates.
  - Link tests dynamically to patient profiles.

- 🔄 **Real-Time Sample Status Pipeline**:
  - Filter and manage patients across test lifecycle stages: `Pending`, `In Progress`, and `Completed`.
  - Update progress dynamically as samples proceed through laboratory analysis.

- 📊 **Diagnostic Report Generator**:
  - Enter itemized quantitative and qualitative results for each diagnostic parameter.
  - Automatically pair values with measurement units and normal physiological ranges.

- 📄 **Digital Prescription & PDF Export**:
  - Download complete diagnostic test reports and medical prescriptions directly as PDF documents using `jsPDF` and `html2canvas`.
  - Ready for physical printing or digital sharing with patients and referring physicians.

- 🔐 **Role-Based Admin Authentication**:
  - Secure administrator login with JWT (JSON Web Tokens) and password encryption via `bcryptjs`.
  - Route guards on sensitive operations (sample management, test creation, and status updates).

- ✉️ **Inquiry & Contact System**:
  - Integrated customer inquiry form allowing patients to send queries directly to lab administrators.

---

## 🏛️ System Architecture

```text
┌───────────────────────────────────────────────────────────┐
│                      Client Layer                         │
│       React 19 SPA | Material-UI (MUI v7) Components      │
│       Client-Side PDF Generation (jsPDF + html2canvas)   │
│       Axios HTTP Client | React Router DOM 7              │
└─────────────────────────────┬─────────────────────────────┘
                              │ HTTP / REST APIs (Port 8080)
                              ▼
┌───────────────────────────────────────────────────────────┐
│                      API Layer                            │
│           Node.js & Express.js 5 Application              │
│       CORS Policy | Body Parser | JWT Route Middleware    │
└──────────────┬────────────────────────────┬───────────────┘
               │                            │
               ▼                            ▼
┌──────────────────────────────┐   ┌────────────────────────┐
│      Route Controllers       │   │   Auth & Security      │
│  - /auth (Admin JWT)         │   │  - bcryptjs Hashing    │
│  - /test (Test Catalog)      │   │  - JWT Bearer Tokens   │
│  - /patient (Patient Data)   │   │  - Protected Routes    │
│  - /contact (Inquiries)      │   │                        │
└──────────────┬───────────────┘   └───────────┬────────────┘
               │                               │
               ▼                               ▼
┌───────────────────────────────────────────────────────────┐
│                      Database Layer                       │
│                   MongoDB (Mongoose ODM)                  │
│       Collections: Admins | Tests | Patients | Contacts   │
└───────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technologies Used

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **UI Component Library**: [Material-UI (MUI v7)](https://mui.com/)
- **Icons**: [Material Icons](https://mui.com/material-ui/material-icons/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Routing**: [React Router DOM 7](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Document Generation**: [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ODM**: [Mongoose 9](https://mongoosejs.com/)
- **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **CORS Handling**: [cors](https://github.com/expressjs/cors)
- **Development Tooling**: [Nodemon](https://nodemon.io/)

---

## 📂 Folder Structure

```text
Pathology-Lab-Management-System/
├── Controllers/
│   ├── authController.js       # Admin registration and JWT authentication
│   ├── contactController.js    # Patient contact inquiries handler
│   ├── patient.js              # Patient CRUD, test result recording, status
│   └── test.js                 # Laboratory test catalog management
├── Models/
│   ├── admin.js                # Administrator credentials schema
│   ├── contactModel.js         # Patient inquiry schema
│   ├── patientModels.js        # Patient records, sample results, report schema
│   └── testModels.js           # Pathology test catalog schema
├── Routes/
│   ├── authRoutes.js           # /auth routes
│   ├── contactRoutes.js        # /contact routes
│   ├── patientRoutes.js        # /patient routes
│   └── testRoutes.js           # /test routes
├── middleware/
│   └── auth.js                 # JWT token verification middleware
├── frontend-pathology/         # React 19 Frontend application
│   ├── public/                 # Static assets and index.html
│   ├── src/
│   │   ├── Assets/             # Images and branding logos
│   │   ├── CommonComponents/   # Reusable Navbar, Footer, and Modals
│   │   ├── Components/         # Protected route guards
│   │   ├── Context/            # Authentication context provider
│   │   ├── Pages/
│   │   │   ├── HomeScreen/     # Public test catalog & inquiry landing page
│   │   │   ├── Login/          # Admin sign-in screen
│   │   │   ├── Prescription/   # Digital prescription view and PDF exporter
│   │   │   ├── ReportPage/     # Diagnostic test report viewer & generator
│   │   │   └── StatusPage/     # Specimen status tracking dashboard
│   │   ├── App.js              # Root router configuration
│   │   └── index.js            # React application entry point
│   ├── package.json            # Frontend dependencies
│   └── .gitignore              # Frontend git ignore rules
├── connection.js               # MongoDB connection initializer
├── index.js                    # Express server entry point
├── package.json                # Backend dependencies and scripts
├── .env.example                # Sample environment configuration
└── .gitignore                  # Git ignore rules for node_modules and secrets
```

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (`v18.0.0` or higher)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas connection string

---

### Backend Setup

1. **Open a terminal in the root directory:**
   ```bash
   cd "C:\Users\ratho\OneDrive\Desktop\Projects"
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   *(Ensure MongoDB is running on `mongodb://localhost:27017/pathology-backend` or update with your URI).*

4. **Start the backend server:**
   ```bash
   npm start
   ```
   The backend server will run on `http://localhost:8080`.

---

### Frontend Setup

1. **Open a new terminal and navigate to the frontend folder:**
   ```bash
   cd "C:\Users\ratho\OneDrive\Desktop\Projects\frontend-pathology"
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```
   The application will automatically open at `http://localhost:3000`.

---

## 🔐 Environment Variables

Create a `.env` file in the root project directory based on the following template:

```env
# Server Port
PORT=8080

# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/pathology-backend

# JWT Secret Key for Session Authentication
JWT_SECRET=your_jwt_secret_key_here
```

---

## 🗄️ Database Configuration

The application utilizes MongoDB to store clinical records:
- **`admins`**: Administrator accounts with encrypted passwords.
- **`tests`**: Available laboratory tests, reference ranges, fasting instructions, and pricing.
- **`patients`**: Patient personal info, test assignment, status (`Pending`, `In Progress`, `Completed`), and parameter test results.
- **`contacts`**: Public inquiries submitted through the contact form.

The backend connects automatically upon startup through `connection.js`.

---

## 🌐 API Endpoints Reference

| Module | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/auth/register` | Register an administrator account |
| | `POST` | `/auth/login` | Authenticate admin & receive JWT token |
| **Tests** | `GET` | `/test/get` | Fetch list of all laboratory tests |
| | `POST` | `/test/post` | Add a new test to the catalog |
| **Patients** | `POST` | `/patient/post` | Register a new patient and test order |
| | `GET` | `/patient/get/:id` | Fetch patient details by ID |
| | `GET` | `/patient/getStatus/:status`| Fetch patients by status (`Pending`, etc.) |
| | `PUT` | `/patient/:id` | Update patient details or test results |
| | `GET` | `/patient/:id/testDetails` | Fetch patient record with linked test data |
| | `DELETE` | `/patient/:id` | Remove a patient record |
| **Contact** | `POST` | `/contact` | Submit a customer inquiry |

---

## 👨‍💻 Author & Contact

**Krushna Rathod**  
- **GitHub Profile**: [@krushna-rathod](https://github.com/krushna-rathod)  
- **Repository**: [https://github.com/krushna-rathod/pathology-lab-management-system](https://github.com/krushna-rathod/pathology-lab-management-system)
