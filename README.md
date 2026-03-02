<div align="center">

# 🛒 Cartify  
### Full Stack MERN E-Commerce Web Application

A modern, scalable and fully functional e-commerce platform built using the MERN stack.  
Developed as a major team project to demonstrate full stack development, authentication, database design, and real-world business logic implementation.

</div>

---
## Team Info

#Batch 8

| Name | Mobile Number |
|------|------------|
| R. Greeshmanth | 9052164495 |
| Thirth P | 9380008120 |
| Mohammed Basil | 9384721885 |
| Ahmed Khan | 971507861545 |
| Atharva Gadas | 7887418904 |

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
- Username
- Password
- role

These details are stored in MongoDB and used automatically during checkout.

### Login
User logs in using Username and password.
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

When user clicks Confirm Order:
- Order saved in database
- Product stock updated
- The order is shown in the admin page


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
- Total orders
- View all products
- Add new product
- Update existing product details
- Modify price
- Update stock
- Edit description
- Change product image
- Delete product if required

All product management operations are handled in this single admin page.

### View Page on same page
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

# The visual proofs
# Admin page
-Admin page
<img width="2880" height="5922" alt="screencapture-localhost-3000-admin-2026-03-01-21_46_51" src="https://github.com/user-attachments/assets/c9c3e524-21f1-4fd3-ba67-b7bd85c09306" />
-Add products section
<img width="1048" height="549" alt="Screenshot 2026-03-01 at 9 35 56 PM" src="https://github.com/user-attachments/assets/d6a53374-24b2-483c-bd2e-e58344612c59" />
-Products section
<img width="1371" height="801" alt="Screenshot 2026-03-01 at 9 36 44 PM" src="https://github.com/user-attachments/assets/fa4cacbb-69ef-49a0-807d-f75e256b580f" />
-Orders section

# User side
-Header and dashboard
<img width="2880" height="3914" alt="screencapture-localhost-3000-user-2026-03-01-21_39_56" src="https://github.com/user-attachments/assets/728574d0-b973-4726-b24c-4f3c28545876" />
-Products page
<img width="2880" height="1960" alt="screencapture-localhost-3000-userproducts-2026-03-01-21_40_55" src="https://github.com/user-attachments/assets/707b1fac-dd67-4602-a3f9-da41ec5ab902" />
-Cart
<img width="1400" height="778" alt="Screenshot 2026-03-01 at 9 42 30 PM" src="https://github.com/user-attachments/assets/bf3b1358-dc16-4cbd-9233-c6e83f742d13" />
-Orders page
<img width="2880" height="3834" alt="screencapture-localhost-3000-orders-2026-03-01-21_44_16" src="https://github.com/user-attachments/assets/22e6955a-12df-4c02-8ad0-1f36060f655e" />

---
## 🚀 How to Run the Project Locally

Follow these steps carefully to set up Cartify on your system.

---

### 📥 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/Cartify.git
cd Cartify
```

---

### 📦 2️⃣ Install Dependencies

```bash
npm install
```

This will install:
- Express
- Mongoose
- EJS
- Multer
- Express-session
- Dotenv
- And other required packages

---

### ⚙️ 3️⃣ Create Environment Variables

Create a `.env` file in the root directory and add the following:

```env
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_super_secret_key
PORT=3000
```

🔹 Replace `your_mongodb_connection_string` with your MongoDB Atlas URI.  
🔹 Use any strong random string for `SESSION_SECRET`.

---

### 📁 4️⃣ Ensure Uploads Folder Exists

Make sure this folder exists:

```
public/uploads/
```

This folder stores uploaded product images.

If it does not exist, create it manually.

---

### ▶️ 5️⃣ Start the Server

For development (recommended):

```bash
npx nodemon app.js
```

Or using Node:

```bash
node app.js
```

You should see:

```
Connected to MongoDB
Server is running on port 3000
```

---

### 🌐 6️⃣ Open in Browser

Visit:

```
http://localhost:3000
``
---

⭐ If you like this project, consider giving it a star!

## 🚀 Conclusion

Cartify is a complete MERN-based e-commerce platform designed with clean workflow and centralized product management for the admin.

The system demonstrates real-world architecture, secure authentication, structured database modeling, and practical e-commerce logic.

This project fulfills the requirements of a major web development internship project and showcases industry-ready development practices.

<div align="center">

Built with teamwork and full stack engineering principles.

</div>
