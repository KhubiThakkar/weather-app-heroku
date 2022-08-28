const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8f564e1189d53b62045d52ce52362e53&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather API Service', undefined)
        }
        else if (body.error) {
            callback('Unable to find location', undefined)
        } 
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast