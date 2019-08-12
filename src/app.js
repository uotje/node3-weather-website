const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

// define path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewPaths = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine nad vies location
app.set('view engine', 'hbs');
app.set('views', viewPaths);
hbs.registerPartials(partialPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'John Brown'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'John Doe'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Message',
        name: 'Donald'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        });
    };

    geocode(req.query.address, (error, {lat, lon, location} = {}) => {
        if (error) {
            return res.send({error});
        };

        forecast(lat, lon, (error, forecastData) => {
            if (error) {
                return res.send({error});
            };

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Trump',
        errormessage: 'Help article not found'
    });
});

app.get('*', (req,res) => {
    res.render ('404', {
        title: '404',
        name: 'Trump',
        errormessage: 'My 404 error page'
    });
});

app.listen(3004, () => {
    console.log('Sever is up on port 3004.');
});