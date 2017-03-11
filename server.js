
var fs = require('fs')
var http = require('http')
var jsreport = require('jsreport')()

var contents = '{{#each items}}<h1>Count: {{journeyCount}}</h1>{{/each}}' // fs.readFileSync('template.html').toString();
var scripts = fs.readFileSync('scripts.js').toString();

jsreport
.init()
.then(function () {
  console.log('jsreport initialized..')

  http.createServer(function (req, res) {
    jsreport.render({
      "template": {
        "content": contents,
        "engine": "handlebars",
        "phantom": {
          "orientation": "potrait",
          "width": "350px"
        },
        "recipe": "phantom-pdf",
        "scripts": [{
          content: scripts
        }]
      },
      "data": {
        "items": [{
          "journeyCount": 168,
          "journeyDate": "03-09-2017"
        }, {
          "journeyCount": 267,
          "journeyDate": "03-08-2017"
        }, {
          "journeyCount": 252,
          "journeyDate": "03-07-2017"
        }, {
          "journeyCount": 303,
          "journeyDate": "03-06-2017"
        }, {
          "journeyCount": 58,
          "journeyDate": "03-05-2017"
        }, {
          "journeyCount": 143,
          "journeyDate": "03-04-2017"
        }, {
          "journeyCount": 352,
          "journeyDate": "03-03-2017"
        }]
      }
    })
    .then(function (out) {
      out.stream.pipe(res);
    })
    .catch(function (e) {
      res.end(e.message);
    });
  }).listen(1337, '127.0.0.1', undefined, function() {
    console.log('SERVER LISTEN ON:', this.address().port)
  });
})
.catch(function(err) {
  console.error('jsreport error on start:', err)
})
