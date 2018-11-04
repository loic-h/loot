const ogs = require('open-graph-scraper');

const urlRegex = /((?:https?(?::\/\/))(?:www\.)?(?:[a-zA-Z\d-_.]+(?:\.[a-zA-Z\d]{2,})|localhost)(?:(?:[-a-zA-Z\d:%_+.~#!?&//=@]*)(?:[,](?![\s]))*)*)/g;

function getUrls(input) {
  return input.match(urlRegex) || [];
}

function mapUrls(input) {
  return input.replace(urlRegex, match => `<a href="${match}">${match}</a>`);
}

function getMetas(url) {
  return new Promise((resolve, reject) => {
    ogs({ url }, (err, res) => {
      if (err) {
        reject();
      } else {
        const metas = {
          url,
          title: res.data.ogTitle,
          description: res.data.ogDescription
        };
        resolve(metas);
      }
    });
  });
}

module.exports = {
  getUrls,
  mapUrls,
  getMetas
};
