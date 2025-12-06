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
