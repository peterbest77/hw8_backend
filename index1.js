var express = require('express');
var app = express();
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1') ;
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/sendCity', function(req, res) {
    var temp = req.query.name;
    var request = require('request');
    var options = {
    // hostname: '127.0.0.1',
    // port: app.get('port'),
    path: '/sendCity',
        
    method: 'GET',
        url:'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+ temp + '&types=(cities)&key=AIzaSyCYBTxxl7O-Jothulmd1oe3Dcl-pnFUn2g',
    json: true
};

request(options, function(error, response, body){
    if(error) {
        console.log(error);


    }
    else {

        console.log(body['status']);
        res.send(body);
    }
});
});

app.get('/abc', function (res,rep) {
    rep.send('Hello, word!');
});



app.get('/tomorrow', function(req, res) {
   var lat = req.query.lat;
   var lng = req.query.lng;
   var street = lat+","+lng;
    const url = 'https://api.tomorrow.io/v4/timelines?location='+street+'&fields=temperature&fields=temperatureApparent&fields=temperatureMin&fields=temperatureMax&fields=windSpeed&fields=windDirection&fields=humidity&fields=pressureSeaLevel&fields=uvIndex&fields=weatherCode&fields=precipitationProbability&fields=precipitationType&fields=sunriseTime&fields=sunsetTime&fields=visibility&fields=moonPhase&fields=cloudCover&units=imperial&timesteps=current&timesteps=1h&timesteps=1d&timezone=America/Los_Angeles&apikey=YyAFenHBBvWKX4VZYkRY0SNjrpGEchNL';

    var request = require('request');
    var options = {

    path: '/tomorrow',
    method: 'GET',
        url:url,
    json: true
};

request(options, function(error, response, body){
    if(error) {
        console.log(error);
        res.send("error");

    }
    else {

        console.log(body);
        res.send(body);
    }
});
});

app.listen(3000);