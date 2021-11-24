const db = require("../models");
const Place = db.place;

// Create and Save a new place
/* exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a place
  const place = new Place({
    city: req.body.city,
    lat: req.body.lat,
    lng: req.body.lon,
    country: req.body.country,
    iso3: req.body.iso3,
    admin_name: req.body.adminName,
  });

  // Save place in the database
  place
    .save(place)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the place.",
      });
    });
}; */

// Retrieve all places from the database.
/* exports.findAll = (req, res) => {
  const content = req.query.content;
  var condition = content
    ? { content: { $regex: new RegExp(content), $options: "i" } }
    : {};

  Place.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving blogs.",
      });
    });
}; */

// Find a single place with an id
/* exports.findOne = (req, res) => {
  const id = req.params.id;

  Place.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found place with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving place with id=" + id });
    });
}; */

// Update a place by the id in the request
/* exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Place.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update place with id=${id}. Maybe place was not found!`,
        });
      } else res.send({ message: "Place was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Place with id=" + id,
      });
    });
}; */

// Delete a place with the specified id in the request
/* exports.delete = (req, res) => {
  const id = req.params.id;

  Place.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete place with id=${id}. Maybe place was not found!`,
        });
      } else {
        res.send({
          message: "Place was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete place with id=" + id,
      });
    });
}; */

// Delete all places from the database.
/* exports.deleteAll = (req, res) => {
  Place.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} places were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all places.",
      });
    });
}; */

// Find all places in country
/* exports.findAllInCountry = (req, res) => {
  const country = req.params.country;
  Place.find({ country })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving places.",
      });
    });
}; */

// Search for cities in db
/* function findAllCitiesCursor(searchQuery) {
  return Place.find({ city: searchQuery }).cursor();
}
exports.searchForCity = async (req, res) => {
  const searchQuery = req.params.searchQuery;
  const placeCursor = await findAllCitiesCursor(searchQuery);
  let N = 0;
  await placeCursor.eachAsync((place) => {
    N++;
    res.send(place);
  });
  console.log("Finished looping through places");
}; */

exports.searchForCity = async (req, res) => {
  const searchQuery = req.params.searchQuery;
  if (!searchQuery) {
    return res.status(400).send({
      message: "Search query can not be empty!",
    });
  }

  Place.aggregate([
    {
      $search: {
        index: "cityIndex",
        text: {
          query: searchQuery,
          path: {
            wildcard: "*",
          },
        },
      },
    },
    {
      $limit: 6,
    },
  ])
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving places.",
      });
    });
};
