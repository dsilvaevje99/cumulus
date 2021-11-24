export async function timezoneAdjust(lat, lon, milliseconds) {
  try {
    let res = await fetch(
      encodeURI(
        `https://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.VUE_APP_TIMEZONEDB_API_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`
      )
    );

    if (res.ok) {
      let data = await res.json();
      const timestamp = milliseconds / 1000;
      const currentTimezoneOffset = new Date().getTimezoneOffset();
      // newTimestamp = original timestamp plus TimezoneDB's offset in seconds plus current timezone
      // offset (in minutes, *60 to convert to seconds), all *1000 to convert back to milliseconds
      const newTimestamp = new Date(
        (timestamp + data.gmtOffset + currentTimezoneOffset * 60) * 1000
      );
      if (!isNaN(newTimestamp)) {
        return newTimestamp.getHours();
      } else {
        console.log(data, newTimestamp);
        return new Date(milliseconds).getHours();
      }
    } else {
      return new Date(milliseconds).getHours();
    }
  } catch (e) {
    console.error(e);
    return new Date(milliseconds).getHours();
  }
}
