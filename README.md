# 🏫 Campus Exchange - Frontend

A campus marketplace platform where students can buy, sell, and exchange items within their university community. This is the **frontend** part of the application built with modern web technologies.

![Campus Exchange Preview](https://img.shields.io/badge/Status-Development-yellow) ![Frontend](https://img.shields.io/badge/Frontend-React-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🛒 Core Features
- **User Authentication** - Secure login/signup for students
- **Product Listings** - Browse items by category
- **Smart Search** - Find items quickly with filters
- **User Profiles** - Personal dashboards with activity history
- **Messaging System** - In-app chat between buyers and sellers
- **Wishlist** - Save favorite items for later

### 🎯 Categories
- 📚 Textbooks & Academic Materials
- 💻 Electronics & Gadgets
- 🏠 Furniture & Home Essentials
- 👕 Clothing & Accessories
- 🎮 Entertainment & Hobbies
- 🚗 Transportation (Bicycles, Scooters)
- 🍔 Food & Kitchen Items

## 🚀 Getting Started

### Prerequisites
Make sure you have these installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Praseedkarn/campus-exchange.git
   cd campus-exchange
Install dependencies

bash
npm install
# or
yarn install
Environment Setup
Create a .env file in the root directory:

env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_GOOGLE_MAPS_API_KEY=your_key_here
Start the development server

bash
npm start
# or
yarn start
Open in browser
Navigate to http://localhost:3000

📁 Project Structure
text
campus-exchange/
├── public/                 # Static files
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/                    # Source code
│   ├── components/         # Reusable components
│   │   ├── common/        # Buttons, Modals, Loaders
│   │   ├── layout/        # Header, Footer, Sidebar
│   │   └── features/      # Feature-specific components
│   ├── pages/             # Page components
│   │   ├── Home/
│   │   ├── Auth/
│   │   ├── Marketplace/
│   │   └── Profile/
│   ├── services/          # API services
│   ├── utils/             # Helper functions
│   ├── context/           # React Context
│   ├── hooks/             # Custom hooks
│   ├── assets/            # Images, icons, styles
│   ├── App.js             # Main App component
│   └── index.js           # Entry point
├── .env.example           # Environment variables template
├── package.json           # Dependencies and scripts
└── README.md              # This file
🛠️ Technologies Used
Frontend Stack
React - UI library

React Router - Navigation

Axios - HTTP client

Context API - State management

CSS Modules/Styled Components - Styling

React Icons - Icon library

React Toastify - Notifications

Development Tools
ESLint - Code linting

Prettier - Code formatting

Git - Version control

📦 Available Scripts
bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
🔧 Configuration
For Developers
Code Style: Follow the existing ESLint configuration

Commit Messages: Use conventional commits

Branching: Create feature branches from main

Pull Requests: Add screenshots and descriptions

Environment Variables
Variable	Description	Default
REACT_APP_API_URL	Backend API URL	http://localhost:5000/api
REACT_APP_SOCKET_URL	WebSocket URL	http://localhost:5000
REACT_APP_ENV	Environment	development
🧪 Testing
bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage


⚠️ Important Notes
This is Frontend Only
⚠️ This repository contains only the frontend code. For full functionality:

Backend API is required (not included here)

Database setup needed

WebSocket server for real-time features

File upload service for images

Current Limitations
Mock data is being used

Authentication is simulated

No real database connection

Images are placeholder

Future Backend Integration
To connect with backend:

Update .env with real API URL

Implement proper authentication

Connect WebSocket for chat

Add file upload functionality

🐛 Troubleshooting
Common Issues
Port already in use: Change port with PORT=3001 npm start

Dependencies issues: Delete node_modules and package-lock.json, then npm install

API errors: Check if backend server is running

Build errors: Check Node.js version compatibility

Debugging
bash
# Check React version
npm list react

# Clear npm cache
npm cache clean --force

# Update dependencies
npm update
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.



📊 Project Status
Current Version: v1.0.0 (Frontend Only)
Backend Status: Planning Phase
Next Phase: Backend Integration
Live Demo: Coming Soon

Note: This is a university project for educational purposes. Not intended for commercial use.
