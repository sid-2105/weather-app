const express = require ('express')
const path =require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
// console.log(__filename)
const app = express()
//this will run the app on provided port by server else on 3000
 const port = process.env.PORT || 3000

//customizing views path
const publicDirectory= path.join(__dirname,'../public')
const viewspath= path.join(__dirname,'../templates/views')
const partialpath= path.join(__dirname,'../templates/partials')
//setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)

//giving static path to server
app.use(express.static(publicDirectory))
//app.com --> Default or home page
app.get('',(req,res)=>{
    res.render('index',{
        title:'Home',
        name:'AtmoSense',
        text:'Forecasting the Future, Today!!'
    })
})
app.get('/about',(req,res)=>{
         res.render("about",{
            title:'About',
            name:'Siddharth Mishra',
            Designation:'Backend Developer'
         })
    })

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helptext:'How can I help u?'
    })
})

//app.com/weather
app.get('/weather',(req,res)=>{
    if(!req.query.address){
             res.send({
            error:'Please provide address!!'
        })
    }
    else{
        geocode (req.query.address,(error, data={})=>{
            if(error)
                return res.send({error})
    
            const{latitude,longitude,location}=data
            forecast(latitude, longitude, (error, forecastdata) => {
                if(error)
                    return res.send(error)
        
               res.send({
                forecast:forecastdata,
                location,
                address:req.query.address

               })
         })
            
        })
    }
    
})
   

app.get('/help/*',(req,res)=>{
    res.render('notfound',{
        title:'Invalid request',
        error:'202-Content not found:('
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        error:'404-Page not found :('
    })
})

//starting server
app.listen(3000,()=>{
     console.log("Server is running at port:" +port)
})


// //app.com/help
// app.get('/help',(req,res)=>{
//     res.send({
//         name:"Siddharth",
//         age:21
//     })
// })

// //app.com/about
// app.get('/about',(req,res)=>{
//     res.send("<h3>Don't know about me!</h3>")
// })


//app.get('/products',(req,res)=>{
    //     if(!req.query.search){
    //        return res.send({
    //             error:'you must provide search here'
    //         })
    //     }
    //     console.log(req.query)
    //     res.send({
    //         products:[]
    //     })
    // })