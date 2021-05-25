const express = require('express');
const app = express();
const path = require('path');
const Axios = require('axios');
const CrawlerMiddleWare = require('./middleware/CrawlerDetect');
var morgan = require('morgan')

// Server variables
require('dotenv').config(); 
const port = process.env.PORT || 3000;
const apiURL = process.env.DEV ? process.env.TEST_API_URL + 'api/' : process.env.LIVE_API_URL + 'api/';

//Axios Defaults
Axios.defaults.baseURL = apiURL;

// Server MiddleWare
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './dist')));
app.use(morgan('tiny'));
app.use(CrawlerMiddleWare);

var appVars = {
  logo: 'https://snawnaw.com/img/logo3.ae147c78.png',
  description: 'My description for the home ',
  reservationDescription: 'My description for the reservation ',
  type: 'website'
} 
//Server Routes
app.get(['/', '/:locale?'], (req, res) => {
  res.status(200).render('Home', {
    name: 'Home',
    type: appVars.type,
    description: appVars.description,
    image: appVars.logo,
    locale: req.params.locale || 'de'
  });
});

app.get(['/:locale/reservation'], (req, res) => {
  res.status(200).render('Reservation', {
    name: 'Reservation',
    type: 'reservation.list',
    description: appVars.reservationDescription,
    image: appVars.logo,
    locale: req.params.locale || 'de'
  });   
});

app.get([
  '/:id(\\d+)/reservation', 
  '/:locale/:id(\\d+)/reservation',
  '/:id(\\d+)/checkin', 
  '/:locale/:id(\\d+)/checkin'
], (req, res) => {
  Axios.get(`business/${req.params.id}`, {
    // business_id: req.params.id,
    lang: 'en'
  }).then(response => {
    let data = response.data.data;
    console.log(data.description)
    if(data) {
      res.status(200).render('BusinessReservation', {
        name: data.name,
        type: 'business.reservation',
        description: data.description ? data.description : data.name,
        image: data.media.length > 0 ? data.media[0].url : appVars.logo,
        id: data.business_id,
        locale: req.params.locale || 'de'
      });
    }
  }).catch(err => console.log(err))
  
});

app.get([
  '/:id(\\d+)', 
  '/:locale/:id(\\d+)', 
  '/:locale/:id(\\d+)/:BName?', 
  '/:locale/:id(\\d+)/:BName?/:TName?'
], (req, res) => {
  Axios.get(`business/${req.params.id}`, {
    // business_id: req.params.id,
    lang: 'en'
  }).then(response => {
    let data = response.data.data;
    console.log(data.description)
    if(data) {
      res.status(200).render('Business', {
        name: data.name,
        type: 'business.profile',
        description: data.description ? data.description : data.name,
        image: data.media.length > 0 ? data.media[0].url : appVars.logo,
        id: data.business_id,
        locale: req.params.locale || 'de'
      });
    }
  }).catch(err => console.log(err))
  
});


app.listen(port, () => {
  console.log(`Crawler Detect listening at http://localhost:${port}`)
});