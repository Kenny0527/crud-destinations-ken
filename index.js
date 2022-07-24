import express from "express";
import cors from "cors";
import destinationsRouter from "./Routes/destinations.js";
// const express = require("express");
// const cors = require("cors");
const server = express(); // This server is deaf

// Middleware setup
server.use(cors());
server.use(express.json());
server.use("/destinations", destinationsRouter);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
}); // Told the server to listen on port 3000

console.log(`Server is now listening: 3000`);
