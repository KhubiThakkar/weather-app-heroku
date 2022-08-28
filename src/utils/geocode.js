const request = require('postman-request')

const geocode  = (location, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(location) + '.json?access_token=pk.eyJ1Ijoia2h1YmkiLCJhIjoiY2wydzFuZTJ1MDJ3eDNpano4bG14cjhqdSJ9.RvWGE8SPZtK4ZfGInc8WTQ&limit=1&limit=1'

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to the geocode API service', undefined)
        }
        else if (body.features.length === 0) {
            callback('Invalid Location', undefined)
        }
        else {
            callback(undefined, {
                place: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode