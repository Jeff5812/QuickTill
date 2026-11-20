# QuickTill

QuickTill is a simple web-based checkout application built for the Group 6 Cloud & DevOps Bootcamp capstone project.

The application allows users to browse available products, add items to a shopping basket, adjust quantities, view the order total, and simulate a checkout.

## Technologies Used

**Frontend**
- React
- Vite
- JavaScript
- CSS

**Backend**
- Node.js
- Express.js

## Project Structure

```text
QuickTill/
├── frontend/    # React + Vite application
├── backend/     # Express API
└── README.md
```

## Prerequisites

Before running the application, ensure you have installed:

- Node.js (LTS recommended)
- npm
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Onifaith22/QuickTill.git
cd QuickTill
```

### 2. Set up the backend

Open a terminal and navigate to the backend directory:

```bash
cd backend
npm install
```

Start the backend server:

```bash
node server.js
```

The API runs at:

`http://localhost:5000`

### 3. Set up the frontend

Open a second terminal and navigate to the frontend directory:

```bash
cd QuickTill/frontend
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application in your browser:

`http://localhost:5173`

**Important:** Keep both the frontend and backend servers running while using the application.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Checks API health |
| GET | `/version` | Returns application version |
| POST | `/api/checkout` | Processes a simulated checkout |

## Checkout

QuickTill currently supports simulated checkout. It validates the submitted basket and calculates the order total.

No real payment processing or database integration is currently implemented.

## Contributing

Team members are welcome to explore, test, and suggest improvements to QuickTill.

1. Fork or clone the repository.
2. Make changes on your own copy or branch.
3. Test your changes locally.
4. Submit a pull request for review.

The main repository is maintained centrally to keep the project consistent.

## Project Context

QuickTill is the application used by Group 6 for the **Zero-Downtime Blue-Green Deployment** capstone project.

Docker, Azure App Service deployment slots, GitHub Actions, health-check gates, and rollback procedures will be documented as the team implements them.