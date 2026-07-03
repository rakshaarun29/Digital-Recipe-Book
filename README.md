# 🍽️ Digital Recipe Book (RecipeRealm)

## 📌 Problem Statement

The objective of this project is to develop a full-stack web application that allows users to discover, create, manage, and share recipes through a secure and user-friendly platform. The application provides authentication, recipe management, search functionality, and personalized user features.

---

## 🎯 Objectives

- Build a full-stack recipe sharing web application
- Implement secure user authentication using JWT
- Allow users to create, edit, and delete recipes
- Enable recipe search and filtering
- Provide a personalized dashboard and favorites system
- Store and manage data using MongoDB

---

## 🧠 Concepts Used

- Full-Stack Web Development
- RESTful API Design
- JWT Authentication
- CRUD Operations
- Client-Server Architecture
- Database Management using MongoDB
- Responsive UI Design

---

## 🖥️ Tools & Technologies

### Frontend
- React
- Vite
- React Router
- Axios

### Backend
- Express.js
- Node.js
- MongoDB
- Mongoose
- JWT
- bcrypt.js
- Multer

---

## 📂 Project Structure

```
Digital-Recipe-Book/

├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   ├── uploads/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup & Execution

### Step 1: Clone the Repository

```bash
git clone <repository-url>
```

### Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd client
npm install
```

### Step 4: Configure Environment Variables

**Server (.env)**

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_ORIGIN=http://localhost:5173
```

**Client (.env)**

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 5: Start the Backend

```bash
npm run dev
```

### Step 6: Start the Frontend

```bash
npm run dev
```

Open the application at:

```
http://localhost:5173
```

---

## ✨ Features

### User Authentication

- User Registration
- User Login
- JWT Authentication
- Password Encryption

### Recipe Management

- Create Recipes
- Edit Recipes
- Delete Recipes
- Upload Recipe Images

### Recipe Discovery

- Browse Recipes
- Search by Title
- Filter by Cuisine
- Trending Recipes

### User Features

- Personalized Dashboard
- Favorite Recipes
- Profile Management

---

## 📊 Core Functionalities

| Module | Description |
|----------|-------------|
| Authentication | Secure user login and registration |
| Recipe Management | Full CRUD operations on recipes |
| Search & Filter | Find recipes by title or cuisine |
| Favorites | Save and manage favorite recipes |
| Dashboard | View and manage personal recipes |

---

## 📸 Proof of Execution

Include screenshots of:

- Home Page
- Browse Recipes
- Recipe Details
- Login & Registration
- User Dashboard
- Favorites Page
- Add Recipe Page

---

## 🔍 Observations

- JWT ensures secure authentication.
- MongoDB efficiently stores recipe and user data.
- React provides a fast and responsive user experience.
- REST APIs enable smooth communication between frontend and backend.
- Users can easily manage and organize their recipes.

---

## ✅ Conclusion

This project successfully demonstrates the development of a modern full-stack recipe sharing platform using the MERN stack. It integrates secure authentication, database management, RESTful APIs, and responsive frontend development to provide an intuitive recipe management experience.

---

## 📚 References

- React Documentation
- Express.js Documentation
- MongoDB Documentation
- Mongoose Documentation
- JWT Documentation
- Vite Documentation
