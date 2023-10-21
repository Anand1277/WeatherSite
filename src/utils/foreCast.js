const request = require("request");

const foreCast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c9fa40cbcce97ec959c18e92665edea1&query=${latitude},${longitude}&units=f`;
  request({ url, json: true }, (error, { body } = {}) => {
    //   console.log(response.body.current);
    if (error) {
      callback("Unable to connect to the weather Server", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const curData = body.current;
      callback(
        undefined,
        `${curData.weather_descriptions[0]}. The temperature is ${curData.temperature} degree farenheight. There is ${curData.precip}% chance of rain`
      );
    }
  });
};

module.exports = foreCast;
