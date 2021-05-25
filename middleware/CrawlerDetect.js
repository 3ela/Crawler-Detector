const {Crawler} = require('es6-crawler-detect');
const path = require('path');

module.exports = (req, res, next) => {
    var CrawlerDetector = new Crawler(req);

    if (CrawlerDetector.isCrawler()) {
      // true if crawler user agent detected
      res.locals.agent = true;
      res.locals.crawlers = CrawlerDetector.getMatches(); 
      next(); 
    }else {
      res.locals.agent = false;
      res.sendFile(path.join(__dirname, '../dist/index.html'))
    } 
  }
