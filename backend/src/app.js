/**
 * ------------------------------------------------------------
 * NeoMeet - Server Entry Point
 * ------------------------------------------------------------
 * This file:
 * 1. Initializes the Express application
 * 2. Connects to MongoDB
 * 3. Configures middleware
 * 4. Attaches Socket.io to the HTTP server
 * 5. Registers API routes
 * 6. Starts the server
 * ------------------------------------------------------------
 */

import express from "express";
import { createServer } from "node:http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

// Load .env first, then support the existing cp.env filename as a fallback.
dotenv.config();
dotenv.config({ path: ".env" });
// Create Express application instance
const app = express();
// Create HTTP server using Express app
// This is required to attach Socket.io
const server = createServer(app);
// Attach Socket.io to the HTTP server
connectToSocket(server);

// Application configuration
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// CORS configuration
// Allows frontend application to communicate with backend
// const corsOptions = {
//   origin: process.env.FRONTEND_URL || "*",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// };

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

// Global middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));

// Register API routes
app.use("/api/v1/users", userRoutes);

// Root route - basic health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "NeoMeet API Server",
    status: "Running",
    version: "1.0.0",
  });
});
console.log("Mongo URI:", process.env.MONGODB_URI);

// Simple test route
app.get("/home", (req, res) => {
  res.status(200).send("Hello World!");
});
console.log("Mongo URI:", process.env.MONGODB_URI);
/**
 * Connect to MongoDB and start the server.
 * The server will not start if database connection fails.
 */
const startServer = async () => {
  try {
    if (!MONGODB_URI || MONGODB_URI === "your_mongodb_uri") {
      throw new Error(
        "MONGODB_URI is missing. Set a valid MongoDB connection string in .env or cp.env."
      );
    }

    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");

    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit process if database connection fails
  }

};

startServer();
