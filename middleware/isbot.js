const isbot = require('isbot')
const path = require('path');

module.exports = (req, res, next) => {
  // console.log('Chrome-Lighthouse');
  if (isbot(req.get('user-agent'))) {
    // true if crawler user agent detected
    res.locals.agent = true;
    next(); 
  }else {
    res.locals.agent = false;
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  } 
}
