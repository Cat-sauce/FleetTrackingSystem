# FleetOS – Connected Vehicle Fleet Tracking System

> A modern full-stack fleet monitoring platform that simulates connected vehicle telemetry, monitors vehicle health in real time, detects faults, and provides interactive dashboards for fleet analytics.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

---

# 🚚 Overview

FleetOS is a real-time fleet monitoring system that simulates IoT telemetry from connected vehicles and provides an enterprise-style dashboard for monitoring fleet operations.

The project demonstrates how modern fleet management systems monitor vehicle location, engine health, driver behaviour, fuel consumption, diagnostics, and trip analytics using a FastAPI backend and a React frontend.

Although the telemetry is simulated, the overall architecture closely resembles real-world IoT fleet management systems.

---

# ✨ Features

## 🚛 Live Fleet Dashboard

- Real-time fleet KPIs
- Fleet health monitoring
- Active trips
- Average fleet speed
- Fault statistics
- Live vehicle count

## 🚗 Vehicle Monitoring

- Vehicle explorer
- Individual vehicle details
- Live GPS location
- Fuel level
- Engine temperature
- Odometer
- Driver information
- Vehicle health status

## 📊 Fleet Analytics

- Trip analytics
- Route utilization
- Fuel consumption
- Average speed analysis
- Vehicle health trends
- Fault distribution
- Fleet performance metrics

## 🚨 Alert Management

Real-time detection of:

- Engine overheating
- Low fuel
- OBD diagnostic faults
- Overspeed events

Features include:

- Fleet Health Cards
- Alert Summary
- Active Alerts
- Vehicle Details
- Alert History
- Browser Notifications
- Toast Notifications

## 🗺 Live Map

Interactive vehicle map displaying:

- Vehicle positions
- Fleet movement
- Road network visualization

## ⚙ Backend Simulation

Telemetry simulation includes:

- Vehicle movement
- Trip generation
- Driver assignment
- Fuel consumption
- Engine temperature
- Weather simulation
- Road types
- OBD fault generation

---

# 🏗 Architecture

```text
                Simulated Fleet Data
                       │
                       ▼
           Telemetry Generator (Python)
                       │
                       ▼
              FastAPI Backend API
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   Analytics      Alert Engine    Fleet API
        │              │
        └──────┬───────┘
               ▼
          React Frontend
               │
        Interactive Dashboard
```

---

# 🛠 Tech Stack

### Frontend

- React
- Vite
- Axios
- React Router
- React Toastify
- Leaflet
- CSS

### Backend

- FastAPI
- Uvicorn
- Pandas
- NumPy
- Python

### Deployment

- Frontend – Vercel
- Backend – Render

---

# 📂 Project Structure

```text
FleetTrackingSystem/

├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── services/
│   │   ├── models/
│   │   └── main.py
│   ├── data/
│   ├── config.py
│   ├── simulator.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/Cat-sauce/FleetTrackingSystem.git

cd FleetTrackingSystem
```

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 📡 API Endpoints

## Fleet

```
GET /analytics/overview
GET /vehicles
GET /health
```

## Alerts

```
GET /events
GET /events/active
```

## Analytics

```
GET /analytics/routes
GET /analytics/trips
GET /analytics/fuel
```

---

# 🌐 Live Demo

**Frontend**

https://fleet-tracking-system-lyart.vercel.app

**Backend**

https://fleettrackingsystem.onrender.com

---

# 🔮 Future Improvements

- MQTT Integration
- ESP32 Live Telemetry
- GPS Tracking
- Authentication & Authorization
- Role-Based Access Control
- Predictive Maintenance using Machine Learning
- WebSocket-Based Real-Time Updates
- Docker Deployment
- Kubernetes Support

---

# 📚 Learning Outcomes

This project demonstrates:

- FastAPI Backend Development
- React Frontend Development
- REST API Design
- Dashboard Development
- IoT Telemetry Simulation
- Fleet Management Concepts
- Data Visualization
- Alert Management System
- Deployment using Render & Vercel
- Environment Variable Management
- Full Stack Application Architecture

---

# 👨‍💻 Author

**Harsh Raj**

B.Tech Computer Science Engineering  
UPES Dehradun

- GitHub: https://github.com/Cat-sauce
- LinkedIn: *(Add your LinkedIn URL here)*

---

# 📄 License

This project is licensed under the MIT License.

---

⭐ If you found this project useful, consider giving the repository a star!
