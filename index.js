var supercrawler = require("supercrawler"),
		crawled = [],
		_ = require('lodash'),
		argv = require('yargs').argv,
		crawler = new supercrawler.Crawler({
		// Tme (ms) between requests
		interval: 1000,
		// Maximum number of requests at any one time.
		concurrentRequestsLimit: 5,
		// Time (ms) to cache the results of robots.txt queries.
		robotsCacheTime: 3600000,
		// Query string to use during the crawl.
		userAgent: "Mozilla/5.0 (compatible; supercrawler/1.0; +https://github.com/brendonboshell/supercrawler)"

		}),
		matchExpr = "^" + argv.url.replace(/\//g, '\\/');


crawler.addHandler("text/html", supercrawler.handlers.htmlLinkParser({
	urlFilter: function (x) {
		if (!x.match(matchExpr)) {
			if (!_.includes(crawled, x)) {
				console.log(x);
				crawled.push(x);
			}
			return false;
		}
		return true;
	}
}));

crawler.on("crawlurl", function (url) {
	console.log(url);
});

crawler.getUrlList()
	.insertIfNotExists(new supercrawler.Url(argv.url))
	.then(function () {
		return crawler.start();
	});
