// const request = require ('request')

// const forecast = (latitude, longitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=cce65bdb4f49da2ebfc88f785e4fc0ba&query=' + latitude + ',' + longitude + '&units=m'
    
//     request({url:url, json:true}, (error, response) => {
//         if(error){
//             callback('unable to connect to location services', undefined)
//         } else if  (response.body.error) {
//             callback('unable to find location. try another search', undefined)
//         } else {
//             callback (undefined, {
//                 temperature: response.body.current.temperature,
//                 feelslike: response.body.current.feelslike})
//         }
//     })
// }

// module.exports = forecast 

const request = require('request')

const forecast = (place, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cce65bdb4f49da2ebfc88f785e4fc0ba&query=' + place + '&units=m'

    request({ url: url, json: true }, (error, response) => {
        console.log(response.body)
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out." +"It is now " + response.body.location.localtime)
        }
    })
}

module.exports = forecast