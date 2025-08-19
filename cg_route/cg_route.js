const express = require("express");
const router = express.Router();
const Caregiver = require("../cg_model/cg_model");
const caregiverController = require("../cg_controlers/cg_controlers");

router.get("/", caregiverController.getAllCaregivers);
router.post("/", caregiverController.addCaregiver);
router.get("/:id", caregiverController.getById);
router.put("/:id", caregiverController.updateCaregiver);
router.delete("/:id", caregiverController.deleteCaregiver);

module.exports = router;