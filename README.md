<div align="center">

# 🛒 Cartify  
### Full Stack MERN E-Commerce Web Application

A modern, scalable and fully functional e-commerce platform built using the MERN stack.  
Developed as a major team project to demonstrate full stack development, authentication, database design, and real-world business logic implementation.

</div>

---


## 📌 Project Overview

Cartify is a full stack e-commerce web application that allows users to:

- Browse products
- Add items to cart
- Place orders using Cash on Delivery
- Manage profile information
- View order history

The platform also provides an Admin Portal to manage products and monitor customer orders.

---

## 🎯 Project Objectives

- Build a complete MERN-based e-commerce application using a decoupled architecture
- Implement secure authentication and role-based access
- Manage cart and order processing
- Design scalable MongoDB schemas
- Maintain a clean, minimal, and highly interactive modern UI
- Simulate a real-world online shopping experience

---

## 🛠 Tech Stack

**Frontend:**
- HTML5 & CSS3
- JavaScript (ES6+)
- React.js
- Vite (Build Tool & Dev Server)
- Context API (State Management)

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB
- Mongoose

**Authentication:**
- Express Session / Credentials
- Role-Based Authorization

---

## 🏗 System Architecture

The application is decoupled into two separate services:

**Frontend (React.js + Vite)** — Runs on Port 5173  
        |  
        | (REST API via proxy)  
        |  
**Backend (Node + Express)** — Runs on Port 5001  
        |  
        |  
**MongoDB Database**

---

## 👤 User Module

### Sign Up
User registers with:
- Email
- Password

These details are stored in MongoDB and used automatically during checkout. *(Note: Admin registration is disabled for security; admin accounts must be seeded directly).*

### Login
User logs in using their Email and password.
After successful authentication, a session is established and the user is redirected to the Home/Products page.

---

## 🖥 User Pages

### Dashboard / Home
- Welcome message
- Featured products carousel
- Quick navigation to product categories

### Products Page
- Displays all available products
- Product name, image, price, and description
- Add to Cart functionality
- Interactive hover effects and modern glassmorphism design

### Cart Page
Displays:
- Selected products
- Quantity control
- Price per item
- Total cost

When user clicks Confirm Order:
- Order is saved in the database
- Product stock is updated
- The order becomes visible in the Admin portal

### Orders Page
Displays:
- Order ID
- Items list
- Total cost
- Delivery date
- Order status

---

## 👨‍💼 Admin Module

### Admin Login
Admin logs in with predefined admin credentials (e.g., `admin@gmail.com`).

### Admin Dashboard
Displays:
- Real-time customer orders
- View all products in a grid layout
- Add new product (with image upload)
- Delete products if required

All product management and order fulfillment operations are handled in this unified dashboard.

---

## 🗄 Database Design (MongoDB Collections)

**Roles (Users):**
- `_id`
- `email`
- `password`
- `role` (Admin / User)

**Products:**
- `_id`
- `name`
- `description`
- `price`
- `quantity` (Stock)
- `category`
- `image`

**Cart:**
- `_id`
- `email` (User reference)
- `items`: [ `productId`, `quantity` ]

**Orders:**
- `_id`
- `email` (Customer)
- `items`: [ `productId`, `quantity`, `price` ]
- `totalAmount`
- `deliveryDate`
- `status`
- `createdAt`

---

## ✨ Key Features

- **Decoupled MERN Stack** Implementation (React + Node/Express)
- Secure Session Authentication
- Role-Based Access Control
- Shopping Cart Management
- Order Processing System
- Centralized Product Management for Admin
- Automated Stock Updates
- Clean, Minimal, and Premium UI with Animations
- RESTful API Architecture

---

## 📚 Learning Outcomes

- Full Stack MERN Development & Decoupling
- React Component Architecture & Context State Management
- REST API Design
- MongoDB Schema Modeling
- Authentication & Authorization
- Business Logic Implementation
- Team Collaboration
- Deployment and Debugging

---

## 🚀 How to Run the Project Locally

Follow these steps carefully to set up Cartify on your system.

### 📥 1️⃣ Clone the Repository

```bash
git clone https://github.com/greeshmanth23-debug/Cartify.git
cd Cartify
```

### 📦 2️⃣ Install Dependencies

Because the app is decoupled, you must install dependencies for both the frontend and backend.

**For the Backend:**
```bash
cd server
npm install
```

**For the Frontend:**
```bash
cd ../client
npm install
```

### ⚙️ 3️⃣ Create Environment Variables

Create a `.env` file in the **`server`** directory and add the following:

```env
MONGO_URI=mongodb://127.0.0.1:27017/cartify
SESSION_SECRET=your_super_secret_key
PORT=5001
```

*(You can replace the `MONGO_URI` with your MongoDB Atlas string if you aren't running MongoDB locally).*

### 📁 4️⃣ Ensure Uploads Folder Exists

Make sure this folder exists inside the backend directory:

```bash
mkdir -p server/uploads
```
This folder stores uploaded product images.

### ▶️ 5️⃣ Start the Application

You will need two terminal windows/tabs to run the decoupled application.

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```
*You should see "Server is running on port 5001" and "Connected to MongoDB".*

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

### 🌐 6️⃣ Open in Browser

Visit the Vite development server in your browser:

```
http://localhost:5173
```

---

⭐ If you like this project, consider giving it a star!

## 🚀 Conclusion

Cartify is a complete MERN-based e-commerce platform designed with a clean workflow, centralized admin management, and a highly interactive modern React frontend.

The system demonstrates real-world architecture, secure authentication, structured database modeling, and practical e-commerce logic. This project showcases industry-ready development practices and full stack engineering principles.
