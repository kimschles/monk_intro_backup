var routes = require('routes')(),
    fs = require('fs'),
    // Configure Monk Driver in the router
    db = require('monk')('localhost/music'),
    bands = db.get('bands');

routes.addRoute('/bands', function(req, res, url) {
  res.setHeader('Content-Type', 'text/html')
  if (req.method === 'GET') {
    var template = ''
    bands.find({}, function(err, docs) {
      console.log(docs);
      if (err) res.end('Broken')
      docs.forEach(function(band){
        template += '<h2>' + band.name + '</h2>'
      })
      res.end(template)
    })
  }
})
module.exports = routes
