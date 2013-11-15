var URL = 'http://sandiego.craigslist.org';

exports.listing = function (req, res) {

    var request = require('request'),
        cheerio = require('cheerio'),
        strformat = require('strformat');

    var url = strformat('{0}/search/apa?s={1}&query={2}&minAsk={3}&maxAsk={4}&hasPic=1', URL, req.query.start, req.query.query, req.query.min, req.query.max);

    var result = { posts: [] };

    var s = request(url, function (e, r, b) {
        if (e) throw e;

        $ = cheerio.load(b);

        $('.content p').each(function (i, e) {
            var post = {
                id: encodeURIComponent($(e).find('a').attr('href')).replace(/\.[^/.]+$/, ""),
                date: $(e).find('.date').html(),
                name: $(e).find('a:nth-child(2)').html(),
                price: $(e).find('.price').html(),
            };

            result.posts.push(post);
        });

        res.json(200, result);

    });
}

exports.posting = function (req, res) {

    var request = require('request');
    var cheerio = require('cheerio');
    var string = require('string');
    var strformat = require('strformat');

    var url = strformat('{0}{1}.html', URL, decodeURIComponent(req.params.id));

    var s = request(url, function (e, r, b) {
        if (e) throw e;

        $ = cheerio.load(b);

        var result = {
            url: url,
            images: []
        };

        $('.body').find('a').each(function (i, e) {
            var s = $(e).attr('href');

            if (string(s).contains('images'))
                result.images.push(s);
        });

        res.json(200, result);
    });
}
