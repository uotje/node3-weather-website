const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoibm96MSIsImEiOiJjanhsdXN2M3AwMjF3M25scGpnYjhqbXBzIn0.cXKRXe9sm3MebQiNSV13yQ';

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect location services!', undefined);
        } else if (!body.features || body.features.length === 0) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, {
                lat: body.features[0].geometry.coordinates[1],
                lon: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;