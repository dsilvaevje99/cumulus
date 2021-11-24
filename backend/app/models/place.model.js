module.exports = (mongoose) => {
  const Place = mongoose.model(
    "Place",
    mongoose.Schema({
      city: String,
      lat: Number,
      lng: Number,
      country: String,
      iso3: String,
      admin_name: String,
    }),
    "cities"
  );

  return Place;
};
