## Project Overview

**PNV** Manufacturing & Supply of Industrial Chemicals, Polymers & Lab Solutions. It is a full-stack web application with:

- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Frontend**: React (Vite) SPA
- **Architecture**: Repository → Service → Controller pattern with Joi validation middleware

## Environment Variables

```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5001
```

## Running the Project

### Backend

```bash
cd backend
npm install
npm run dev      # nodemon, port 5001
npm run seed     # seed database
```

### Frontend

```bash
cd frontend/web-app
npm install
npm run dev      # Vite dev server, port 5173


```
