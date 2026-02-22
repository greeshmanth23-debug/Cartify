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

## 👥 Team Information

This project was developed by a team of 4 members.

Team Members:
- R.Greeshmanth
- Member2
- Member3
- Member4

Team contributions included frontend development, backend API development, database design, authentication, testing, and integration.

---

## 🎯 Project Objectives

- Build a complete MERN-based e-commerce application
- Implement secure authentication and role-based access
- Manage cart and order processing
- Design scalable MongoDB schemas
- Maintain a clean and minimal workflow
- Simulate a real-world online shopping experience

---

## 🛠 Tech Stack

Frontend:
- HTML
- CSS
- Javascript /ejs
- CSS /Bootstrap

Backend:
- Node.js
- Express.js

Database:
- MongoDB
- Mongoose

Authentication:
- JWT (JSON Web Token)
- Role-Based Authorization

---

## 🏗 System Architecture

Frontend (ejs)
        |
        |
REST API (Node + Express)
        |
        |
MongoDB Database

---

## 👤 User Module

### Sign Up
User registers with:
- Full Name
- Email
- Password
- Phone
- Address

These details are stored in MongoDB and used automatically during checkout.

### Login
User logs in using email and password.
After successful authentication, a JWT token is generated and user is redirected to Dashboard.

---

## 🖥 User Pages

### Dashboard
- Welcome message
- Featured products
- Quick navigation

### Products Page
- Displays all products
- Product name, image, price
- Add to Cart functionality
- View product details

### Cart Page
Displays:
- Selected products
- Quantity control
- Price per item
- Total cost

When user clicks Checkout:
A popup modal appears showing:
- Name (auto-filled)
- Phone (auto-filled)
- Address (auto-filled)
- Total cost
- Payment mode: Cash on Delivery
- Confirm Order button

When user clicks Confirm Order:
- Order saved in database
- Product stock updated
- Cart cleared

Then another popup appears:
Order successfully placed  
Expected delivery: 5-7 days

### Orders Page
Displays:
- Order ID
- Items list
- Total cost
- Delivery date
- Order status

### Settings Page
User can:
- View profile details
- Update:
  - Name
  - Phone
  - Address
  - Password

Changes are updated in MongoDB.

---

## 👨‍💼 Admin Module

### Admin Login
Admin logs in with admin credentials.

### Admin Dashboard
Displays:
- Total users
- Total orders
- Total revenue

### Products Page (Admin)

This page replaces the separate Add Product page.

Admin can:
- View all products
- Add new product
- Update existing product details
- Modify price
- Update stock
- Edit description
- Change product image
- Delete product if required

All product management operations are handled in this single Products page.

### View Orders Page
Admin can see:
- Order ID
- Customer name
- Items list
- Total cost
- Delivery address
- Delivery date
- Order status

---

## 🗄 Database Design (MongoDB Collections)

Users:
- _id
- name
- email
- password
- phone
- address
- role

Products:
- _id
- name
- description
- price
- stock
- image

Cart:
- _id
- userId
- items:
  - productId
  - quantity

Orders:
- _id
- userId
- items:
  - productId
  - quantity
  - price
- totalAmount
- deliveryDate
- status
- createdAt

---

## ✨ Key Features

- MERN Stack Implementation
- Secure JWT Authentication
- Role-Based Access Control
- Shopping Cart Management
- Order Processing System
- Centralized Product Management for Admin
- Stock Update After Order
- Popup-Based Checkout and Confirmation
- Clean and Minimal UI
- RESTful API Architecture

---

## 📚 Learning Outcomes

- Full Stack MERN Development
- REST API Design
- MongoDB Schema Modeling
- Authentication & Authorization
- State Management in React
- Business Logic Implementation
- Team Collaboration
- Deployment and Debugging

---

## 🚀 Conclusion

Cartify is a complete MERN-based e-commerce platform designed with clean workflow and centralized product management for the admin.

The system demonstrates real-world architecture, secure authentication, structured database modeling, and practical e-commerce logic.

This project fulfills the requirements of a major web development internship project and showcases industry-ready development practices.

<div align="center">

Built with teamwork and full stack engineering principles.

</div>
