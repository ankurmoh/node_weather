const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7d36db4acfa97ddbd220d3cdca6d200b&query=' + latitude + ',' + longitude + '&units=f'
    //'http://api.weatherstack.com/current?access_key=7d36db4acfa97ddbd220d3cdca6d200b&query=37.8267,-122.4233&units=f
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. The temperature feels like ' + body.current.feelslike + '. The % of rainfall is ' + body.current.precip + '. The wind speed currently is ' + body.current.wind_speed +' miles per hour.')
        }
    })
}

module.exports = forecast