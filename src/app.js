const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(path.join(__dirname,'../public')))

// for index pages the '' can leave blank
app.get('', (req, res) => {
    res.render('index',{
    title: 'Weather App',
    name: 'Andrew Mead'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        helpText: 'helpful text',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/weather',(req, res) => 
    {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {place,location} = {}) => {
        if (error) {
            return res.send({ error})
        }
        
        console.log(place)
        //console.log(latitude)
        console.log(location)
        
        forecast(place, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: 'help not found',
        errorMessage: 'Help article not found',
        name: 'Andrew Mead'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: '404 page',
        errorMessage: 'Page not found',
        name: 'Andrew Mead'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Weather<h1>!')
// })

// app.get('/help',(req, res) => {
//     res.send([{
//         name: 'Andrew',
//         age: 27},{
//         name: 'Sarah',
//         age: 27}])
// })

// app.get('/about',(reqt, res) => {
//     res.send('<h2>About Page</h2>')
// })



// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('Server is up on port' + port)
})