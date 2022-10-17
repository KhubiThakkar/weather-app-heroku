const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()   // creates a new instance of application
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)     // used when you want to sent the "views" folder name to something else
hbs.registerPartials(partialsPath)  // setup the path of the Partials folder

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Khubi Thakkar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Khubi Thakkar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'this is some helpful text!',
        title: 'Help Page',
        name: 'Khubi Thakkar'
        
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (err, data) => {
        if (err) {
            return res.send({
                error: err
            })
        }
        forecast(data.longitude, data.latitude, (err, response) =>{
            if (err){
                return res.send({
                    error: err
                })
            }
            res.send({
                location: data.place,
                forecast: response
            })
        })
    })
})

// 404 Page Configuration
app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not Found',
        title: '404 Page',
        name: 'Khubi Thakkar'
        
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not Found!',
        title: '404 Page',
        name: 'Khubi Thakkar'
        
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port ', port)
})