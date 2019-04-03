require('./vendor/tmpl');

const Parser = require('rss-parser');
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const parser = new Parser();

parser.parseURL(CORS_PROXY + 'http://www.rssmix.com/u/8256402/rss.xml', function(err, feed) {
  const items = feed.items;
  const html = items.reduce((txt, item) => {
    const data = {
      date: item['dc:date'].substring(0, 16),
      url: item.link,
      title: item.title,
      author: item.creator
    };
    txt += tmpl('post_tmpl', data);
    return txt
  }, '');
  document.getElementById('posts').innerHTML = html;
  document.body.classList.add('blog');
});
