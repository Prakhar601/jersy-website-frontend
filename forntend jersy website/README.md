# Jersey Customization Website

A modern web application for customizing and ordering jerseys with a React frontend and Node.js backend.

## Local Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation Steps

#### 1. Install Dependencies

Navigate to both frontend and backend directories and install dependencies:

```bash
# Frontend dependencies
cd frontend
npm install

# Backend dependencies (when backend is added)
cd ../backend
npm install
```

#### 2. Environment Configuration

**Frontend:**

Copy the example environment file and configure:

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env` and set:
```
VITE_API_BASE=http://localhost:3000
```

Adjust `VITE_API_BASE` if your backend runs on a different URL.

**Backend:**

Backend environment configuration will be added when the backend is implemented.

#### 3. Start Development Servers

**Option A: Two Terminals**

Terminal 1 - Start backend:
```bash
cd backend
npm run mock
```

Terminal 2 - Start frontend:
```bash
cd frontend
npm run dev
```

**Option B: Single Command (Root)**

From the project root:
```bash
npm run start:all
```

> **Note:** `start:all` runs both frontend and backend concurrently. You may prefer separate terminals for easier log viewing.

### Accessing the Application

- **Frontend:** http://localhost:5173 (Vite default port)
- **Backend Mock Server:** http://localhost:3000

## Seeding LocalStack (Backend)

When the backend is implemented with AWS LocalStack integration, seed the local environment:

```bash
cd backend
./scripts/init-localstack.sh
```

Or on Windows:
```bash
cd backend
bash scripts/init-localstack.sh
```

This will populate your local AWS services with initial data for development.

## Project Structure

```
├── frontend/          # React + Vite frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks (useApi, useCart)
│   │   ├── pages/         # Route-based page components
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── styles.css     # Global styles
│   ├── .env.example       # Environment variable template
│   └── package.json
├── backend/          # Node.js backend (to be added)
└── README.md         # This file
```

## Features

- **Product Catalog:** Browse available jerseys
- **Customization:** Visual editor with color swatches, text overlays, fonts, and mask effects
- **Shopping Cart:** LocalStorage-based cart with export and email checkout
- **Responsive UI:** Modern, mobile-friendly interface

## Technology Stack

### Frontend
- React 18
- React Router
- Vite
- CSS (minimal, modern styling)

### Backend (Planned)
- Node.js
- Express.js
- LocalStack (AWS services emulation)

## Development Scripts

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production

### Backend (Planned)
- `npm run mock` - Start mock server for local development

### Root
- `npm run start:all` - Run both frontend and backend concurrently

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT

