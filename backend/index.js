require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const connectDB = require("./config/db");
const env = require("./config/env");
const errorHandler = require("./middlewares/errorHandler");

// Routes
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cmsRoutes = require("./routes/cmsRoutes");
const pincodeRoutes = require("./routes/pincodeRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);

// Connect to MongoDB
connectDB();

// Health routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/api/status", (req, res) => {
  res.json({
    backend: "✅ Running",
    database:
      mongoose.connection.readyState === 1 ? "✅ Connected" : "❌ Disconnected",
    databaseName: mongoose.connection.name || "N/A",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cms", cmsRoutes);
app.use("/api/pincode", pincodeRoutes);
app.use("/api/admin", adminRoutes);

// Serve frontend in production
const frontendDist = path.join(__dirname, "../frontend/web-app/dist");
app.use(express.static(frontendDist));

// SPA catch-all: serve index.html for any non-API route (fixes browser refresh)
app.get("*", (req, res, next) => {
  // Skip API routes — let them fall through to the 404 handler
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(frontendDist, "index.html"), (err) => {
    if (err) next(); // If dist doesn't exist (dev mode), fall through
  });
});

// 404 handler (only reached by unmatched /api routes or if dist is missing)
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${env.PORT}`);
  console.log(`🔗 Frontend allowed from: ${env.CLIENT_URL}`);
});
