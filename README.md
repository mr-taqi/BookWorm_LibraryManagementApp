
# Library Management System (MERN Stack)

A production-grade Library Management System built using the MERN stack (MongoDB, Express, React, Node.js). This application features robust authentication, role-based access, secure OTP flows, admin dashboards, real-world book issuing/returning logic, and a responsive interface.

## Features

- User authentication with JWT and email OTP verification
- Role-based dashboards for Admins and Members
- CRUD for books (add, edit, delete, view)
- Book issuing and returning with fine calculation
- Password management: forgot/reset flows
- Admin panel for user and book management
- Automated overdue detection and fine automation (NodeCron)
- Email notifications for key actions (Nodemailer)
- Responsive design (Tailwind CSS, React)
- State management with Redux Toolkit

## Tech Stack

| Layer      | Technology             |
| ---------- | ---------------------- |
| Frontend   | React.js, Tailwind CSS |
| Backend    | Node.js, Express.js    |
| Database   | MongoDB (Mongoose ORM) |
| State Mgmt | Redux Toolkit          |
| Auth       | JWT, bcrypt.js         |
| Mailing    | Nodemailer             |
| Automation | NodeCron               |

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 8.x
- MongoDB (local or hosted)
- Git

### Installation

#### 1. Clone the repository


git clone <your-repo-url>
cd <project-root>

#### 2. Backend Setup

cd backend
npm install

Create a `.env` file in `/backend` (refer to `.env.example`):

MONGODB_URI=
JWT_SECRET=
MAIL_USER=
MAIL_PASS=
...

Start the backend server:


npm run dev


#### 3. Frontend Setup


cd ../frontend
npm install


Create a `.env` file in `/frontend`:


REACT_APP_API_BASE_URL=http://localhost:5000


Start the frontend:


npm start


#### 4. Access Application

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)

## Project Structure


/frontend
  /src
    /components
    /pages
    /redux
    ...

/backend
  /controllers
  /models
  /routes
  /middlewares
  server.js

.env.example


## Core Modules

- /auth     - Authentication, OTP, roles
- /books    - Book CRUD, search, filter
- /borrow   - Issuing and returning logic, fines, automation
- /admin    - User & book management, dashboards

## Customization

- Mail integration (Nodemailer) set via `.env`
- Fine/overdue settings are customizable in backend config
- Extendable: add wishlists, recommendations, etc.

```
## Screenshots

*(Add screenshots/gifs here)*
```

## Credits

- Redux Toolkit: [Docs](https://redux-toolkit.js.org/)
- Tailwind CSS: [Docs](https://tailwindcss.com/)

## License

MIT

---

_Clone, run, and extend! PRs and issues welcome._
