import express from "express";
import uniqid from "uniqid";
import {
  validateString,
  validateRequiredField as validate,
} from "../Utility/validation.js";
import { filterObj as filter } from "../Utility/filters.js";
import { getPhoto } from "../Utility/data_access.js";
import { locationDB } from "../db.js";
const router = express.Router();

export default router;

// CREATE (OPTIONAL) - POST /destinations - needs/recieves {location, destination, description}
// both location and destination are required, descrpition is optional
// create a new destination in destinationsDB with a photo from unsplash
router.post(
  "/",
  (req, res, next) => {
    let { location, destination } = req.body;
    validateString(location, destination, res);
    next();
  },
  async (req, res) => {
    const { location, destination, description } = req.body;
    const locPhoto = await getPhoto(location, destination);
    locationDB[uniqid()] = {
      destination,
      location,
      photo: locPhoto,
      description,
    };
    res.send({ message: "success" });
  }
);
// READ => DO THIS
router.get("/", (req, res) => {
  // filter the destination
  res.send(locationDB);
});

// GET /destinations/city/:myCity => send back the whole db
router.get("/city/:myCity", (req, res) => {
  console.log(req.params.myCity);
  filter(locationDB, req.params.myCity, res);
});

// UPDATE (OPTIONAL)
router.put(
  "/:id",
  (req, res, next) => {
    let { location, destination } = req.body;
    if (location !== undefined && !validate(location)) {
      return res
        .status(400)
        .send(`Error: soemthing is wrong with the client data.`);
    }
    if (destination !== undefined && !validate(destination)) {
      return res
        .status(400)
        .send(`Error: soemthing is wrong with the client data.`);
    }
    next();
  },
  async (req, res) => {
    let isLocorDest = false;
    const objId = req.params.id;
    const { location, destination, description } = req.body;
    if (location) {
      isLocorDest = true;
      locationDB[objId].location = location;
    }
    if (destination) {
      isLocorDest = true;
      locationDB[objId].destination = destination;
    }
    if (description) {
      locationDB[objId].description = description;
    }
    if (isLocorDest) {
      const newPhoto = await getPhoto(
        locationDB[objId].location,
        locationDB[objId].destination
      );
      locationDB[objId].photo = newPhoto;
    }
    res.send(locationDB);
  }
);

// DELETE (OPTIONAL)
router.delete("/:id", (req, res) => {
  const objId = req.params.id;
  delete locationDB[objId];
  res.send(locationDB);
});
