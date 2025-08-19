// CL_Routes/ClientRoute.js
const express = require("express");
const router = express.Router();
const path = require("path");
const ClientControl = require(path.join(__dirname, "../CL_Controllers/ClientControl")); // ✅ Robust

// Routes
router.get("/", ClientControl.getAllClients);
router.post("/", ClientControl.addClient);
router.get("/:id", ClientControl.getById);
router.put("/:id", ClientControl.updateClient);
router.delete("/:id", ClientControl.deleteClient);

module.exports = router;