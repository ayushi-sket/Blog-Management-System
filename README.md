# Blog Management System

## Overview

The Blog Management System is a full-stack web application developed using the MERN stack. It allows users to register, log in, create and manage blog posts based on their roles. The project implements authentication, authorization, role-based access control (RBAC), blog approval workflow, likes, dislikes, comments, and complete CRUD functionality.

---

## Technology Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

### Database
- MongoDB
- Mongoose

---

# Project Setup Instructions

## Clone the Repository

```bash
git clone <repository-link>
```

Move into the project folder.

```bash
cd Blog-Management-System
```

---

## Backend Setup

Go to backend folder.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Start the backend server.

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## Frontend Setup

Open another terminal.

Move to frontend folder.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start the React application.

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/blogDB
JWT_SECRET=blog_secret_key
```

---

# User Roles

## Admin

- View all users
- View all blogs
- Change user roles
- Approve blog posts
- Reject blog posts
- Delete any blog
- Manage the application

---

## Author

- Register
- Login
- Create blogs
- Edit own blogs
- Delete own blogs
- Submit blogs for approval

---

## Reader

- Register
- Login
- View approved blogs
- Like blogs
- Dislike blogs
- Comment on blogs

---

# API Documentation

Base URL

```
http://localhost:5000/api
```

---

# Authentication APIs

## Register

```
POST /api/auth/register
```

Example Body

```json
{
    "name":"John",
    "email":"john@gmail.com",
    "password":"123456",
    "role":"Author"
}
```

---

## Login

```
POST /api/auth/login
```

Example Body

```json
{
    "email":"john@gmail.com",
    "password":"123456"
}
```

---

## Get Profile

```
GET /api/auth/profile
```

Headers

```
Authorization : Bearer <token>
```

---

# User APIs

## Get All Users

```
GET /api/users
```

Authorization Required

Admin Only

---

## Change User Role

```
PUT /api/users/:id/role
```

Example Body

```json
{
    "role":"Author"
}
```

Authorization Required

Admin Only

---

## Get All Blogs

```
GET /api/users/admin/all-blogs
```

Authorization Required

Admin Only

---

# Blog APIs

## Create Blog

```
POST /api/blogs
```

Example Body

```json
{
    "title":"React Hooks",
    "content":"This blog explains React Hooks.",
    "category":"React",
    "status":"Draft"
}
```

---

## Get Approved Blogs

```
GET /api/blogs/approved
```

---

## Get My Blogs

```
GET /api/blogs/my-blogs
```

Authorization Required

---

## Get Blog By ID

```
GET /api/blogs/:id
```

---

## Update Blog

```
PUT /api/blogs/:id
```

Authorization Required

---

## Delete Blog

```
DELETE /api/blogs/:id
```

Authorization Required

---

## Submit Blog For Approval

```
PUT /api/blogs/:id/submit
```

Author Only

---

## Approve Blog

```
PUT /api/blogs/:id/approve
```

Admin Only

---

## Reject Blog

```
PUT /api/blogs/:id/reject
```

Admin Only

---

## Like Blog

```
PUT /api/blogs/:id/like
```

---

## Dislike Blog

```
PUT /api/blogs/:id/dislike
```

---

# Comment APIs

## Add Comment

```
POST /api/comments/:blogId
```

Example Body

```json
{
    "text":"Very informative blog."
}
```

---

## Delete Comment

```
DELETE /api/comments/:id
```

---

# Database Schema

## User Schema

| Field | Type |
|--------|------|
| name | String |
| email | String |
| password | String |
| role | Admin / Author / Reader |
| createdAt | Date |
| updatedAt | Date |

---

## Blog Schema

| Field | Type |
|--------|------|
| title | String |
| content | String |
| author | ObjectId |
| category | String |
| status | Draft / Pending / Approved / Rejected |
| likes | Array |
| dislikes | Array |
| createdAt | Date |
| updatedAt | Date |

---

## Comment Schema

| Field | Type |
|--------|------|
| blog | ObjectId |
| user | ObjectId |
| text | String |
| createdAt | Date |
| updatedAt | Date |

---

# Features

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcryptjs
- Protected Routes
- Role Based Access Control
- Admin Dashboard
- Author Dashboard
- Reader Dashboard
- Blog CRUD Operations
- Blog Approval Workflow
- Like and Dislike System
- Comment System
- MongoDB Integration
- Responsive Frontend
- Frontend and Backend Integration

---

# Application Screenshots

## Login Page

(Add Login Screenshot Here)

---

## Register Page

(Add Register Screenshot Here)

---

## Reader Dashboard

(Add Reader Dashboard Screenshot Here)

---

## Author Dashboard

(Add Author Dashboard Screenshot Here)

---

## Admin Dashboard

(Add Admin Dashboard Screenshot Here)

---

## Create Blog Page

(Add Create Blog Screenshot Here)

---

## Blog Details Page

(Add Blog Details Screenshot Here)

---

## Blog Approval Workflow

(Add Approval Screenshot Here)

---

# Project Structure

```
Blog-Management-System
│
├── backend
│   ├── config
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── .env
│
└── frontend
    ├── src
    ├── public
    ├── package.json
    └── vite.config.js
```

---

# Testing

1. Start MongoDB Compass.
2. Start Backend Server.
3. Start Frontend Server.
4. Register Author and Reader accounts.
5. Change one user role to Admin in MongoDB Compass.
6. Login as Author.
7. Create a Blog.
8. Submit Blog for Approval.
9. Login as Admin.
10. Approve or Reject the Blog.
11. Login as Reader.
12. Read Approved Blogs.
13. Like, Dislike and Comment on Blogs.

---

# Team Members

**Mridul**

**Ayushi**

Backend Internship Project
