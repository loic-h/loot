const http = require('http');
const https = require('https');
const url = require('url');
const linkifyUrls = require('linkify-urls');

function mapUrls(text) {
  return linkifyUrls(text);
}

function isUrl(query, next) {
  let chunks = url.parse(query);
  if (!chunks.protocol) {
    chunks = url.parse('http://' + query);
  }
  if (!chunks.host) {
    if (next) {
      next(new Error('Can\'t parse url'));
    }
    return;
  }
  const protocol = chunks.protocol || 'http:';
  const options = {
    protocol: protocol,
    host: chunks.host,
    path: chunks.path,
    timeout: 2000
  };
  const request = protocol === 'https:' ? https : http;
  request.get(options, res => onGet(res, next))
    .on('error', e => {
      if (next) {
        next(e);
      }
    });
}

function onGet(res, next) {
  let error;
  switch (res.statusCode) {
    case 301:
    case 302:
      return isurl(res.headers.location, next);
      break;
    case 200:
      break;
    default:
      error = new Error(`Request Failed.\nStatus Code: ${res.statusCode}`);
  }
  if (error) {
    next(error.message);
    // consume response data to free up memory
    res.resume();
    return;
  }
  let html = '';
  res.setEncoding('utf8');
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    next(false, scrapMeta(html));
  });
}

module.exports = {
  mapUrls
};
