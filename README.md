🌱 About Kṣetravya

Kṣetravya (क्षेत्रव्य) is a full-stack digital agricultural ecosystem designed to connect farmers, agricultural workers, landowners, equipment providers, sellers, transporters, companies and consumers through one integrated platform.

The name draws inspiration from Kṣetra (क्षेत्र) — meaning field, cultivated land, territory or domain.

Kṣetravya represents a connected digital domain where land, people, technology, knowledge and commerce come together to support modern agriculture.

Rather than functioning as just an agricultural marketplace, Kṣetravya aims to bring multiple agricultural activities and services into one unified digital environment.

🎯 Vision

To create a connected agricultural ecosystem where participants can discover opportunities, exchange resources, manage agricultural activities, communicate and access useful information through technology.

🚀 Core Features

👨‍🌾 1. Agricultural Ecosystem

Dedicated profiles for different agricultural participants.

Role-based dashboards and access.

Farmer and worker management.

Land-related activities.

Agricultural service connections.

💼 2. Agricultural Work Marketplace

Farmers can create and publish job opportunities.

Workers can discover available jobs.

Workers can apply for suitable opportunities.

Job applications and related information are persistently stored.

Job and application notifications.

🛠️ 3. Tools & Equipment Management

Add and manage agricultural equipment.

Store equipment information.

Equipment image support.

Connect agricultural participants with available resources.

🛒 4. Agricultural Marketplace

Product listing and management.

Buying and selling workflows.

Shopping cart functionality.

Order-related data management.

Marketplace notifications.

💬 5. Real-Time Communication

A communication system designed to connect farmers and workers.

Real-time messaging.

WebSocket and STOMP integration.

Typing indicators.

Online/offline presence.

Message read status.

File and image sharing.

🔔 6. Notification System

Job-related notifications.

Application updates.

Marketplace alerts.

Weather and market-related alerts.

Read/unread notification management.

🌦️ 7. Smart Agriculture

Agricultural information and decision-support features designed to help users access useful information.

Weather information.

Agricultural market-price information.

Crop insights.

Agricultural analytics.

Decision-support features.

🔐 8. Authentication & Authorization

User registration and login.

Spring Security integration.

JWT-based authentication.

Role-based authorization.

Secure access to protected resources.

BCrypt password hashing.

👥 User Roles

Kṣetravya supports multiple participant categories within the agricultural ecosystem.

Role

Purpose

FARMER

Manage agricultural activities and find resources

WORKER

Discover jobs and connect with farmers

COMPANY

Participate in agricultural services and business activities

SELLER

Manage and sell agricultural products

LAND_OWNER

Participate in land-related activities

TOOL_OWNER

Manage agricultural tools and equipment

TRANSPORTER

Participate in agricultural transportation

CONSUMER

Explore and participate in marketplace activities

ADMIN

Manage and oversee the platform

🏗️ Technology Stack

Kṣetravya uses a full-stack architecture combining modern frontend technologies with a Java-based backend.

Frontend

React.js

JavaScript

Vite

React Router

Axios

Three.js

React Three Fiber

Framer Motion

Backend

Java 17

Spring Boot 3

Spring Framework

Spring Security

Spring Data JPA

Hibernate

RESTful APIs

JWT Authentication

BCrypt

WebSocket

STOMP

Maven

Database

MySQL

Relational Database Management

Persistent data storage

Development & Deployment

Git

GitHub

Docker / Docker Compose

Vercel

Render

🔄 System Architecture

The application follows a client-server architecture.

             KṢETRAVYA PLATFORM
                     |
          +----------+----------+
          |                     |
     FRONTEND                BACKEND
          |                     |
     React.js              Spring Boot
     Vite                  REST APIs
     Axios                 Spring Security
     React Router          JWT Authentication
          |                     |
          +----------+----------+
                     |
              DATA & SERVICES
                     |
                  MySQL
                     |
             JPA / Hibernate

          REAL-TIME COMMUNICATION
                     |
              WebSocket + STOMP
                     |
          Farmer ↔ Worker Messaging

Application Flow

Users interact with the React frontend.

Frontend requests are sent to backend REST APIs.

Spring Security and JWT handle authentication and authorization.

Spring Boot processes application business logic.

Spring Data JPA and Hibernate interact with the database.

WebSocket and STOMP support real-time communication.

Responses are delivered to the frontend and displayed to users.

📂 Project Structure

Ksetravya/
│
├── .github/
│   └── workflows/
│
├── backend/
│   └── Spring Boot Application
│
├── database/
│   └── Database Resources
│
├── frontend/
│   └── React Application
│
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md

⚙️ Getting Started

Follow these steps to set up the project locally.

Prerequisites

Make sure you have the following installed:

Java 17 or later

Maven

Node.js and npm

MySQL

Git

1. Clone the Repository

git clone https://github.com/ChakradharReddyKapurapu/Ksetravya.git

cd Ksetravya

2. Configure the Database

Start your MySQL server.

Create the database required by the application.

Configure the database connection details.

Check the database/ directory for available database resources.

3. Configure Environment Variables

Refer to .env.example for the required configuration variables.

Create the necessary local environment configuration for the frontend and backend.

Important: Never commit actual passwords, JWT secrets, API keys or production credentials.

4. Run the Backend

cd backend

mvn spring-boot:run

Make sure the database configuration is correct before starting the application.

5. Run the Frontend

Open another terminal:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

Open the local URL displayed by Vite in your browser.

🔒 Security Considerations

Security is an important part of the Kṣetravya architecture.

JWT-based authentication.

Spring Security integration.

Role-based access control.

BCrypt password hashing.

Protected backend resources.

Environment-based configuration for sensitive credentials.

🌐 Deployment

Kṣetravya uses a separated frontend and backend deployment architecture.

Component

Deployment

Frontend

Vercel

Backend

Render

Database

MySQL-compatible database service

Live Application:

https://ksetravya.vercel.app/

💡 What Makes Kṣetravya Different?

Traditional agricultural platforms often focus on a single activity, such as selling products or finding agricultural workers.

Kṣetravya takes a broader approach by bringing different agricultural participants and activities into a connected digital environment.

Its focus is on connecting:

People with agricultural opportunities.

Farmers with workers.

Users with agricultural tools and resources.

Buyers with sellers.

Agricultural participants through real-time communication.

Users with relevant agricultural information.

The goal is to build an integrated digital environment rather than isolated agricultural services.

📚 Key Engineering Concepts Demonstrated

Building Kṣetravya involved bringing multiple technologies and software engineering concepts together.

Full-stack application development.

REST API development and integration.

Authentication and authorization.

Database design and persistence.

Role-based access control.

Real-time communication using WebSockets.

Frontend and backend integration.

Environment configuration.

Deployment and production debugging.

Cross-origin resource sharing (CORS).

🔮 Future Enhancements

Potential directions for expanding the ecosystem include:

AI-powered crop recommendations.

Advanced agricultural analytics.

Intelligent farmer assistance.

Improved agricultural supply-chain connectivity.

Location-based agricultural services.

Enhanced marketplace capabilities.

More data-driven agricultural decision support.

👨‍💻 Project Creator

Chakradhar Reddy Kapurapu

Computer Science Engineering Student | Java Full-Stack Developer

Kṣetravya is a project built to explore how modern software engineering can connect real-world agricultural activities through technology.
