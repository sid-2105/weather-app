const request = require ('request')
const forecast= (latitude,longitude,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=319942c0147b7ed579c60597ee8d713e&query='+latitude+','+longitude+'&units=f'
    // request({url: url,json: true},(error,response)=>{
    //     if(error){
    //         callback("Unabe to connect to weather stack api",undefined)
    //     }
    //     else if(response.body.error){
    //         callback("Not a valid location",undefined)
    //     }else{
    //         callback(undefined, "It is currently "+response.body.current.temperature+" degree F but it feels like "+response.body.current.feelslike+" degree F. Weather is "+response.body.current.weather_descriptions[0] )
    //     }
    // })
    // using shorthand and destructuring
    request({url,json: true},(error,{body})=>{
        if(error){
            callback("Unabe to connect to weatherstack API",undefined)
        }
        else if(body.error){
            callback("Please enter a valid location",undefined)
        }else{
            callback(undefined, "It is currently "+body.current.temperature+"\u00B0F but it feels like "+body.current.feelslike+"\u00B0F. Weather is "+body.current.weather_descriptions[0]+"." )
        }
    })
}
module.exports = forecast