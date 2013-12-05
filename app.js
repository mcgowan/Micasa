var express = require('express');

var list = require('./routes/list'),
    site = require('./routes/site'),
    http = require('http'),
    path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(app.router);

app.use("/css", express.static(__dirname + '/site/css'));
app.use("/fonts", express.static(__dirname + '/site/fonts'));
app.use("/img", express.static(__dirname + '/site/img'));
app.use("/js", express.static(__dirname + '/site/js'));
app.use("/lib", express.static(__dirname + '/site/lib'));
app.use("/partials", express.static(__dirname + '/site/partials'));

app.get('/', site.index);
app.get('/site', site.index);
app.get('/list', list.list);
app.get('/list/:id', list.listing);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
