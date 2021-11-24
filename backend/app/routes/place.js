const express = require("express");
const router = express.Router();
const place = require("../controller/place.controller");

// /api/place: GET, POST, DELETE
// /api/place/:id: GET, PUT, DELETE
// /api/place/inCountry/:country: GET

// Create a new place
/* router.post("/", place.create);

// Retrieve all places
router.get("/", place.findAll);

// Retrieve all places in a country
router.get("/:country", place.findAllInCountry);

// Retrieve a single place with id
router.get("/:id", place.findOne);

// Update a place with id
router.put("/:id", place.update);

// Delete a place with id
router.delete("/:id", place.delete);

// Delete all places
router.delete("/", place.deleteAll); */

// Search for city
router.get("/search/:searchQuery", place.searchForCity);

module.exports = router;
