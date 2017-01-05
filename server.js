var express = require('express')
var url = require('url');
var moment = require('moment');
var app = express();

app.get('*', function (req, res) {
  var timeData = getProvidedTimeFromURL(req.url);
  res.json(getTimeResponse(timeData));
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});

function getTimeResponse(timeString) {
  var naturalFormat = 'MMMM DD, YYYY';
  
  var respJson = { 
    "unix": null, 
    "natural": null 
  };
  
  if (Number(timeString)) {
    var unixTimeInMillis = Number(timeString);
    var date = moment.unix(unixTimeInMillis);
    respJson.unix = unixTimeInMillis;
    respJson.natural = date.format(naturalFormat);
  } else {
    var date = moment(timeString, naturalFormat);
    if (date.isValid()) {
      respJson.unix = date.unix();
      respJson.natural = timeString;
    }
  }
  
  return respJson;
}

function getProvidedTimeFromURL(reqURL) {
  return decodeURI(url.parse(reqURL).pathname.split('/')[1]);
}