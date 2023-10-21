const request = require("request");

const geoCode = (address, callback) => {
  request(
    {
      url: `https://api.api-ninjas.com/v1/geocoding?city=${address}`,
      headers: {
        "X-Api-Key": "LDVFCRyX8J79DtHGM8a9Sw==0TssPV67FBuxxEo0",
      },
      json: true,
    },
    (error, { body } = {}) => {
      if (error) {
        callback("Unable to connect to the server", undefined);
      } else if (body.length === 0) {
        callback("Unable to find the location. Try another search", undefined);
      } else {
        callback(undefined, {
          longitude: body[0].longitude,
          latitude: body[0].latitude,
          name: body[0].name,
          State: body[0].state,
        });
      }
    }
  );
};

module.exports = geoCode;
