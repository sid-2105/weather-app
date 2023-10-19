const request = require('request')
// const latitude=response.body.features[0].center[0]
// const longitude=response.body.features[0].center[1]
// const location=response.body.features[0].place_name
// const inform ={
//     latitude,
//     longitude,
//     location
// }
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1Ijoic2lkLTA1MDkiLCJhIjoiY2xtdXhxeGs3MDM5azJtcnUzNTRzZHJuMyJ9.0PxJro1PlUKhBIXLhiOaMQ'

    request({url, json: true},(error, {body})=>{
             
             if(error){
                 callback("Unable to connect mapbox services", undefined)
             }
             else if(body.features.length === 0){
                 callback("Please enter a valid location", undefined)
             }else{
                callback(undefined,{
                    latitude:body.features[0].center[0],
                    longitude:body.features[0].center[1],
                    location:body.features[0].place_name
                })
             }
})
}

module.exports = geocode