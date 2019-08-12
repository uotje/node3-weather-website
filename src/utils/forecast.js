const request = require('request');

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/f825670e5729da4332704745e80bea6f/' + encodeURIComponent(lat) + ',' + encodeURIComponent(lon) + '?units=si&lang=fi';

    request ({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const temp = body.currently.temperature;
            const preciprob = body.currently.precipProbability * 100;
            const summary = body.daily.data[0].summary;

            const message = summary + ' It is currently ' + temp + ' degrees out. There is a ' + preciprob + '% chance of rain.'
            callback(undefined, message);
        }
    });
};

module.exports = forecast;