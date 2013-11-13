exports.index = function (req, res) {

    var URL = 'http://sandiego.craigslist.org';

    var request = require('request');
    var cheerio = require('cheerio');
    var async = require('async');
    var strformat = require('strformat');

    var s = request(strformat('{0}/search/apa?query=carlsbad&minAsk=1600&maxAsk=2300&hasPic=1', URL), function (e, r, b) {

        if (e) throw e;

        //var calls = [];

        $ = cheerio.load(b);

        var result = { items: [] };

        $('.content p').each(function (i, e) {
            
            var item = { 
                date: $(e).find('.date').html(),
                name: $(e).find('a:nth-child(2)').html(),
                price: $(e).find('.price').html(),
                url: strformat('{0}{1}', URL, $(e).find('a').attr('href')),
                images: []
            };

            result.items.push(item);


        });

//var messageIds = req.params.messageIds.split(',');
    async.forEach(result.items, function(item, callback) { //The second argument (callback) is the "task callback" for a specific messageId
        
        //db.delete('messages', messageId, callback); //When the db has deleted the item it will call the "task callback". This way async knows which items in the collection have finished

        var s = request(item.url, function (e, r, b) {

            console.log(b);

            callback();
        });


    }, function(err) {
        if (err) return next(err);
        res.json(200, result);
    });


        //console.log($('.content').text());
        //res.json(200, result);

    });

}

//http://sandiego.craigslist.org/nsd/apa/4188325602.html
//http://stackoverflow.com/questions/10551499/simplest-way-to-wait-some-asynchronous-tasks-complete-in-javascript