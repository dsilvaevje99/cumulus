export function getSummary(keyword: string) {
  if (
    keyword === "cloudy" ||
    keyword === "partlycloudy_day" ||
    keyword === "partlycloudy_polartwilight"
  ) {
    return "overskyet";
  } else if (
    keyword === "sunny" ||
    keyword === "fair_day" ||
    keyword === "clearsky_day"
  ) {
    return "sol";
  } else if (
    keyword === "rain" ||
    keyword === "lightrain" ||
    keyword === "heavyrain"
  ) {
    return "regn";
  } else if (
    keyword === "rainshowers_day" ||
    keyword === "rainshowers_night" ||
    keyword === "lightrainshowers_day" ||
    keyword === "lightrainshowers_night"
  ) {
    return "regnbyger";
  } else if (
    keyword === "partlycloudy_night" ||
    keyword === "fair_night" ||
    keyword === "clearsky_night"
  ) {
    return "oppholdsvær";
  } else if (keyword === "fog") {
    return "tåke";
  } else if (
    keyword === "lightsnow" ||
    keyword === "lightsnowshowers_day" ||
    keyword === "lightsnowshowers_night" ||
    keyword === "snow" ||
    keyword === "heavysnow"
  ) {
    return "snø";
  } else if (
    keyword === "lightsleet" ||
    keyword === "lightsleetshowers_day" ||
    keyword === "lightsleetshowers_night" ||
    keyword === "sleet" ||
    keyword === "heavysleet"
  ) {
    return "sludd";
  } else if (
    keyword === "clearsky_polartwilight" ||
    keyword === "fair_polartwilight"
  ) {
    return "midnattsol";
  } else {
    console.log(keyword);
    return "N/A";
  }
}

export function getHighestAndLowest(timeseries: Array<any>) {
  let lowest = 100;
  let highest = -100;

  timeseries.forEach((timeserie) => {
    const temp = timeserie.data.instant.details.air_temperature;
    if (temp < lowest) {
      lowest = Math.round(temp);
    }
    if (temp > highest) {
      highest = Math.round(temp);
    }
  });

  return { lowest, highest };
}
