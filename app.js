var express = require('express');

var list = require('./routes/listing'),
    site = require('./routes/site'),
    http = require('http'),
    path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(app.router);


//app.use(express.static(path.join(__dirname, 'public')));
app.use("/js", express.static(__dirname + '/site/js'));

// development only
// if ('development' == app.get('env')) {
//     app.use(express.errorHandler());
// }


app.get('/', site.index);
app.get('/site', site.index);
app.get('/listing', list.listing);
app.get('/listing/:id', list.posting);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
