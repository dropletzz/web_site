require('./vendor/tmpl');

const Parser = require('rss-parser');
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const parser = new Parser();
const regex = new RegExp('src\\s*=\\s*"(.+?)"');

parser.parseURL(CORS_PROXY + 'http://www.rssmix.com/u/3835380/rss.xml', function(err, feed) {
  const items = feed.items;
  const html = items.reduce((txt, item) => {
    const match =  regex.exec(item.content);
    const data = {
      date: item['dc:date'].substring(0, 16),
			url: item.link,
			title: item.title,
			img: match[1]
    };
    txt += tmpl('slide_tmpl', data);
    return txt
  }, '');
  document.getElementById('slides').innerHTML = html;
  document.body.classList.add('slides');
});
