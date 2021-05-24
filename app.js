const express = require('express');
const app = express();
const {Crawler, middleware} = require('es6-crawler-detect');
require('dotenv').config(); 
const path = require('path');

const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.get('*', (req, res) => {
  
  var CrawlerDetector = new Crawler(req);

  if ( CrawlerDetector.isCrawler() )
  {
    // true if crawler user agent detected
  }else {

  }
  
  
  res.render('business', {
    tag: "meta(charset='utf-8')",
    tag2: "meta(http-equiv='X-UA-Compatible', content='IE=edge')",
    name: 'business1',
    logo: 'https://snawnaw.com/img/logo3.ae147c78.png',
    description: ' BIG description'
  })
  // res.send(CrawlerDetector.getMatches())
});

app.listen(port, () => {
  console.log(`Crawler Detect listening at http://localhost:${port}`)
});