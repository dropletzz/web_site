const logImage = require('console-image')

const Parser = require('rss-parser');
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const parser = new Parser();
const regex = new RegExp('src\\s*=\\s*"(.+?)"');

parser.parseURL(CORS_PROXY + 'http://devopsreactions.tumblr.com/rss', function(err, feed) {
  const items = feed.items;
  const random = Math.floor(Math.random() * items.length);
  const item = items[random];
  const url = regex.exec(item.content);
  const image = url[1];
  console.log(item.title);
	logImage(image);
})

