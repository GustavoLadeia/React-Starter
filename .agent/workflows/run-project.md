---
description: how to run the RepasseCarros project locally
---

# RepasseCarros - Local Execution Guide

Follow these steps to start the backend and frontend and view the marketplace in your browser.

## 1. Database & Backend Setup

Open a terminal and run these commands to initialize the database and start the API server:

```powershell
# Navigate to backend directory
cd RepasseCarros/backend

# Install dependencies (if not already done)
npm install

# (Optional) Seed the database with fresh car advertisements
// turbo
npm run db:seed

# Start the backend server
// turbo
npm run dev
```
The backend will be running at `http://localhost:3000`.

## 2. Frontend Setup

Open a **separate** terminal and run these commands to start the React application:

```powershell
# Navigate to frontend directory
cd RepasseCarros/frontend

# Install dependencies (if not already done)
npm install

# Start the frontend dev server
// turbo
npm run dev
```

## 3. Visualize in Browser

Once both servers are running, open your browser and go to:
[http://localhost:5173](http://localhost:5173)

### Verification Steps
1. **Home Page**: You should see 5 car advertisements with real images.
2. **Search**: Try searching for "Civic" or "Jeep".
3. **Login**: Click "Entrar" and use your Google account or email.
4. **Proposals**: Click on a car, fill in the proposal value, and click "ENVIAR PROPOSTA".
