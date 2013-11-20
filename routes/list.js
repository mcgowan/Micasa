var URL = 'http://sandiego.craigslist.org';

exports.list = function (req, res) {

    var request = require('request'),
        cheerio = require('cheerio'),
        strformat = require('strformat');

    var url = strformat('{0}/search/apa?s={1}&query={2}&minAsk={3}&maxAsk={4}&hasPic=1', URL, req.query.start, req.query.query, req.query.min, req.query.max);

    var result = { listings: [] };

    var s = request(url, function (error, response, body) {
        
        if (error) throw error;

        if (response.statusCode == 200){

            $ = cheerio.load(body);

            $('.content p').each(function (index, element) {
                var listing = {
                    id: encodeURIComponent($(element).find('a').attr('href')).replace(/\.[^/.]+$/, ""),
                    price: $(element).find('.price').html(),
                    date: $(element).find('.date').html(),
                    name: $(element).find('a:nth-child(2)').html(),
                };

                result.listings.push(listing);
            });

            res.json(200, result);
        };
    });
}

exports.listing = function (req, res) {

    var request = require('request'),
        cheerio = require('cheerio'),
        string = require('string'),
        strformat = require('strformat'),
        _ = require('underscore');

    var url = strformat('{0}{1}.html', URL, decodeURIComponent(req.params.id));

    var s = request(url, function (error, response, body) {
        
        if (error) throw error;

        if (response.statusCode == 200){

            $ = cheerio.load(body);

            var result = {
                url: url,
                images: []
            };

            var img = $('.iw').find('#ci').find('#iwi').attr('src');
            if (img) result.images.push(img);

            $('.body').find('a').each(function (i, e) {
                var s = $(e).attr('href');

                if (string(s).contains('images'))
                    result.images.push(s);
            });

            result.images = _.uniq(result.images);

            res.json(200, result);
        };
    });
}
