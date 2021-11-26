const request = require ('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2Vva2ltbSIsImEiOiJja3ZybXMzc3Qwc3JiMzFxcHkzZWM1cDRxIn0.2stR-mHtBmlQ5Bp3PiZj6A&limit=1'
    request({url:url, json:true}, (error, response) => {
        if(error){
            callback('unable to connect to location services', undefined)
        } else if  (response.body.features.length === 0) {
            callback('unable to find location. try another search', undefined)
        } else {
            callback(undefined,{
                // longitude: response.body.features[0].center[0],
                // latitute: response.body.features[0].center[1],
                place: response.body.features[0].text,
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode 