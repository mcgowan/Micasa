var URL = 'http://sandiego.craigslist.org';

exports.listing = function (req, res) {

    var request = require('request');
    var cheerio = require('cheerio');
    var strformat = require('strformat');

    var result = { posts: [] };

    var row = 0;

    var more = true;

    do {
        var url = strformat('{0}/search/apa?s={1}&query={2}&minAsk={3}&maxAsk={4}&hasPic=1',
            URL, row, req.query.query, req.query.min, req.query.max);

        console.log(strformat('{0} - {1} - fetching 100 rows...', url, row));

        var s = request(url, function (e, r, b) {
            if (e) throw e;

            $ = cheerio.load(b);

            posts = $('.content p');

            console.log(posts.length);

            posts.each(function (i, e) {
                var post = {
                    id: encodeURIComponent($(e).find('a').attr('href')).replace(/\.[^/.]+$/, ""),
                    date: $(e).find('.date').html(),
                    name: $(e).find('a:nth-child(2)').html(),
                    price: $(e).find('.price').html(),
                };

                result.posts.push(post);

            });

            more = posts.length > 0;

        });

        row = row + 100;

        more = row <= 1000;

    }
    while (more);

    res.json(200, result);

}

exports.post = function (req, res) {

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
