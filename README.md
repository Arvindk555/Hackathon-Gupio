📦 MERN Inventory & Order Manager

A full-stack MERN application to manage products, track inventory, and place customer orders.
This project includes:

🖥️ Frontend: React + Redux Toolkit + TailwindCSS

🚀 Backend: Node.js + Express

🗄️ Database: MongoDB

🌐 Deployment: Render (Backend) + Vercel / Netlify (Frontend)



🔥 Features
🧾 Product Management

Add new products

Edit product stock

Auto-update stock when orders are placed

Product status based on stock (Available / Out of Stock)

🛒 Order Management

Create and place orders

Real-time stock validation

Order summary with total price

View all past orders

🏗️ Architecture

Redux Toolkit for state management

Axios API client for backend communication

MongoDB for storing products & orders

Completely responsive UI


📂 Folder Structure

mern-inventory-order-manager/
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/
│   │   ├── features/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── server/                 # Node.js backend
    ├── models/
    ├── routes/
    ├── controllers/
    ├── server.js
    └── package.json



🚀 Tech Stack
| Component  | Technology                                  |
| ---------- | ------------------------------------------- |
| Frontend   | React, Redux Toolkit, TailwindCSS, Axios    |
| Backend    | Node.js, Express.js                         |
| Database   | MongoDB Atlas                               |
| Deployment | Render (Backend), Vercel/Netlify (Frontend) |

⚙️ Setup Instructions (Local System)
1️⃣ Clone the repository
git clone https://github.com/Arvindk555/Hackathon-Gupio.git
cd Hackathon-Gupio

🖥️ Backend Setup
cd server
npm install
npm start

Create a .env file:
MONGO_URI=your_mongo_atlas_url
PORT=5000

Backend will run on:
👉 http://localhost:5000

🌐 Frontend Setup
cd client
npm install
npm run dev

Frontend will run on:
👉 http://localhost:5173

🌍 Deployment (Render)
Backend:

Create a Web Service on Render

Connect GitHub

Set build command: npm install

Start command:npm start
Add environment variables (MongoDB URL)

Frontend:

Deploy using:

Vercel or

Netlify

Build command:npm run build

Publish directory:dist

