## Project Overview

**PNV** Manufacturing & Supply of Industrial Chemicals, Polymers & Lab Solutions. It is a full-stack web application with:

- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Frontend**: React (Vite) SPA
- **Architecture**: Repository → Service → Controller pattern with Joi validation middleware

## Environment Variables

### Backend (.env)

```
PORT=5001
MONGO_URI=<mongodb-connection-string>
CLIENT_URL=http://localhost:5173
RESEND_API_KEY=<resend-api-key>
JWT_SECRET=<jwt-secret>
ADMIN_EMAIL=<admin-notification-email>
FROM_EMAIL=onboarding@resend.dev
ADMIN_TOKEN=<admin-access-token>
IMAGEKIT_ID=sljqsazoe
IMAGEKIT_PUBLIC_KEY=<imagekit-public-key>
IMAGEKIT_PRIVATE_KEY=<imagekit-private-key>
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
