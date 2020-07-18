const request = require('request')
const { builtinModules } = require('module')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=391f4fbba6e3fbfc9b2c55876b00878a&query=' + latitude + ',' + longtitude + '&units=f'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services', undefined)
        }
        else if (body.error){
            callback('Unable to find location', undefined)
        }
        else{
            console.log(body)
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " +  body.current.temperature + " degrees out & it actually feels like " + body.current.feelslike + " degrees out." + " The humidity is " + body.current.humidity + "%.")
        }
    })
}

module.exports = forecast