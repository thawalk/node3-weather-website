const path = require('path')
const express = require('express')
const { ppid } = require('process')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))


//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Tharun'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        message: "Email me your queries at tharunana@gmail.com",
        title: 'Help',
        name: 'Tharun'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Tharun'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }

    //if(req.query.address){
        geocode(req.query.address, (error, {latitude, longtitude, location } = {})=>{
            if (error) {
                return res.send({error:error})
            }
            
            forecast(latitude, longtitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                
                res.send({
                    forecast:forecastData,
                    location,
                    address: req.query.address
                })
            
            })
        })
    //}
   
    

    })

    


app.get('/products',(req,res) => {

    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }


    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: '404',
        name: 'Tharun',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req, res) => {
    res.render('error', {
        title: '404',
        name: 'Tharun',
        errorMessage: 'Page not found'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})

