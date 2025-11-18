

# 🩺 DOCBOOK — Doctor Appointment Backend

This repository contains the backend API for DOCBOOK, a doctor appointment web application. The API is built with Node.js, Express, and MongoDB (Mongoose) and exposes endpoints used by the frontend to register users, manage doctors' availability, and create/cancel appointments.

This README focuses on the backend project: setup, folder structure and a clear explanation of what each router is responsible for.

---

## Quick Overview

- **Base API paths mounted in `app.js`:**
	- `/auth` → Authentication and account management
	- `/doctor` → Doctor-specific actions and dashboards
	- `/patient` → Patient-specific actions
	- `/appointments` → Appointment creation, listing and updates

---

## Prerequisites

- Node.js (v16+ recommended)
- npm (comes with Node.js)
- A running MongoDB instance (local or cloud)

---

## Setup (Backend)

1. Install dependencies:

```powershell
cd DOCBOOK_Backend
npm install
```

2. Create a `.env` file in the project root with at least the following variables:

```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.example.mongodb.net/docbook
JWT_SECRET=your_jwt_secret_here
PORT=3000
```

3. Start the server:

```powershell
node app.js
# or add a start script to package.json and run `npm start`
```

The application listens on the port defined in `PORT` (defaults to `3000` in `app.js`).

---

## Project Structure (Backend)

- `app.js` — Main entrypoint where Express is configured and routers are mounted.
- `package.json` — Project dependencies.
- `models/` — Mongoose models (e.g., `Doctor.js`, `Appointment.js`, `Admin.js`, `patients .js`, `db.js`).
- `controllers/` — Request handlers and business logic.
	- `doctorController.js` — Handlers for doctor-related features.
	- `patientController.js` — Handlers for patient-related features.
	- `auth/` — Authentication controllers: `signUp.js`, `signIn.js`, `forgetPassword.js`.
- `routes/` — Route definitions that map endpoints to controller functions.
	- `authRoutes.js`
	- `doctorRoutes.js`
	- `patientRoutes.js`
	- `appointmentRoutes.js`
- `middleware/` — Middlewares for validation and authorization (e.g., `authValidation.js`, `isDocLogin.js`, `isPatientSigIn.js`).

Note: One of the model filenames includes a trailing space (`patients .js`) — consider renaming it to `patients.js` to avoid cross-platform issues.

---

## What Each Router Does (Responsibilities)

Below are concise descriptions of what each router group is responsible for. For exact endpoint names and request shapes, open the files in `routes/` and their corresponding controllers in `controllers/`.

- **`/auth` (Authentication routes)**
	- Primary responsibilities: user registration, login, and password recovery.
	- Controllers live under `controllers/auth/`:
		- `signUp.js`: create doctor or patient accounts (hash passwords, validate input).
		- `signIn.js`: verify credentials and return a JWT for authenticated requests.
		- `forgetPassword.js`: issue reset tokens or handle password reset flow.
	- Typical endpoints: `POST /auth/signup`, `POST /auth/signin`, `POST /auth/forget-password`.

- **`/doctor` (Doctor routes)**
	- Primary responsibilities: doctor profile management, availability/slot creation, and viewing doctor-specific appointments.
	- Handlers are usually in `controllers/doctorController.js`.
	- Middleware like `isDocLogin.js` will guard routes that require an authenticated doctor.
	- Typical endpoints: creating/updating doctor profile, creating time slots, listing appointments for the doctor, canceling or completing appointments.

- **`/patient` (Patient routes)**
	- Primary responsibilities: patient profile actions, browsing doctors, booking and canceling appointments.
	- Handlers are in `controllers/patientController.js`.
	- Middleware like `isPatientSigIn.js` protects patient-only endpoints.
	- Typical endpoints: patient registration/login (sometimes delegated to `/auth`), list available doctors, create a booking (`POST /patient/book`), cancel booking.

- **`/appointments` (Appointments routes)**
	- Primary responsibilities: appointment CRUD operations and listing (may include filtering by date, doctor or patient).
	- Uses `Appointment` model; controllers may be separate or part of `patientController.js` / `doctorController.js` depending on the codebase layout.
	- Typical endpoints: `GET /appointments` (list), `POST /appointments` (create), `PUT /appointments/:id` (update status/cancel), `DELETE /appointments/:id`.

---

## Middleware & Auth

- `middleware/authValidation.js` — likely validates incoming request bodies using Joi (or similar) to ensure required fields are present and properly formatted.
- `middleware/isDocLogin.js` — authorizes requests to doctor-only routes (validates JWT, checks role).
- `middleware/isPatientSigIn.js` — authorizes requests to patient-only routes.

---

## Models (high-level)

- `Doctor.js` — doctor profile, specialization, slots/availability, credentials.
- `Appointment.js` — appointment records (doctor, patient, time slot, status).
- `Admin.js` — admin user model (if used).
- `patients .js` — patient model (rename to `patients.js`).
- `db.js` — database connection (connects to MongoDB using `MONGO_URI`).

---

## Running & Development Tips

- To run in development, use `node app.js` after `npm install` and creating a `.env` file.
- Consider adding a `start` script in `package.json`:

```json
"scripts": {
	"start": "node app.js"
}
```

- To quickly run with environment variables in PowerShell (one-liner):

```powershell
$env:MONGO_URI = 'your_mongo_uri'; $env:JWT_SECRET='your_jwt_secret'; node app.js
```

---

## Next Steps & Recommendations

- Inspect `routes/*.js` to see exact endpoints and request shapes before wiring the frontend.
- Rename `models/patients .js` to `models/patients.js` to avoid filesystem problems.
- Add `start` and `dev` scripts (e.g., with `nodemon`) to `package.json` for easier development.
- Add example requests (Postman collection or example `curl` commands) to help frontend integration.

---

If you'd like, I can:

- Add example `curl`/Postman requests for each router.
- Add a small `API.md` file listing the exact endpoints by reading `routes/*.js`.
- Create a `start` script and a `dev` (nodemon) script in `package.json`.

Which of these would you like me to do next?
