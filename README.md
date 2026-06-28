# Task Tracker

A MERN stack task tracker with create, read, update, and delete task support.

## Project structure

- `backend/` - Express API and MongoDB models
- `frontend/` - React app built with Vite

## Setup

1. Install dependencies
   ```bash
   npm install
   ```
2. Configure MongoDB in `backend/.env`
   ```text
   MONGO_URI=mongodb://127.0.0.1:27017/task_tracker
   PORT=5001
   ```
3. Start backend
   ```bash
   cd backend
   npm run dev
   ```
4. Start frontend
   ```bash
   cd frontend
   npm run dev
   ```

## Deployment

### Option 1: Deploy backend and frontend separately

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the frontend `dist/` folder on Vercel, Netlify, or any static host.
3. Deploy the backend on Render, Railway, Heroku, or another Node.js host.
4. Set the frontend environment variable `VITE_API_URL` to the backend URL if hosting separately.

### Option 2: Deploy as one full-stack app

1. Build the frontend locally:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `backend/` folder to a Node host in production mode.
3. The backend serves the frontend build from `frontend/dist` and exposes `/api/tasks`.
4. Set environment variables on the host:
   - `MONGO_URI`
   - `PORT` if not provided automatically

### Recommended hosts

- Frontend: Vercel, Netlify
- Backend: Render, Railway, Heroku

## Features

- Create / edit / delete tasks
- Search, filter by status, sort
- Responsive UI
- Dynamic updates without refresh
- Toast notifications
- Reusable React components
- Environment variables for API base URL

## API

- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Local scripts

From the root project directory:

- Install all dependencies: `npm install`
- Start backend: `cd backend && npm run dev`
- Start frontend: `cd frontend && npm run dev`
- Build frontend: `cd frontend && npm run build`
