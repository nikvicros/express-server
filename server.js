//GLOBAL CONSTANTS

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();


// HBS PARTIALS
hbs.registerPartials(__dirname + '/views/partials');

// HBS HELPERS
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear() 
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// USE HBS FOR TEMPLATE
app.set('view engine', 'hbs');

// SET PUB FOLDER - MIDDLEWARE

// LOG EVENTS - TIMESTAMP
app.use ((req, res, next) => {
    var now = new Date().toString();
    var log =`${now}: Method used: ${req.method} | File Accessed: ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log(log)
    });
    next();
});

// ACTIVE PORT
var activePort = process.env.PORT || 5000;
app.listen(activePort, () => {
  console.log(`Listening on port ${activePort}`)
});


// MAINTENANCE PAGE WITHOUT NEXT SO THE APP DOES NOT RUN THROUGH THE OTHER CODE BELOW
//app.use((req, res, next) => {
//    res.render('maint.hbs', {
//        pageTitle: 'BRB!',
//        welcomeMessage: 'We\'ll be right back!',
//        description: 'Maintenance Mode'
//    });
//});

app.use(express.static(__dirname + '/public'));

// HOMEPAGE
app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'Home Page',
        description: 'Home',
        welcomeMessage: 'Welcome to my site',     
    });
});

// ABOUT PAGE
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        description: 'About',
    });
});



