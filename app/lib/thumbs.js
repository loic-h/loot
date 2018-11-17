const fs = require('fs');
const path = require('path');
const mmm = require('mmmagic');
const gm = require('gm');
const config = require('../../config');

const makeThumbs = (hash, filename, next) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(config.path.files, hash);
    const thumbs = getThumbs(filepath);
    const promises = [];
    const files = {};
    Object.keys(thumbs).forEach((thumbKey, index) => {
      promises.push(new Promise(resolve => {
        const size = thumbs[thumbKey];
        const filepath = path.join(thumbKey, hash);
        const destpath = path.join(config.path.thumbs, filepath);
        const dest = path.join(destpath, filename);
        const src = path.join(config.path.files, hash);
        try {
          fs.accessSync(destpath);
        } catch(e) {
          fs.mkdirSync(destpath, { recursive: true });
        }
        const afterWrite = err => {
          if (err) {
            reject(err);
            return;
          }
          files[thumbKey] = path.join('/thumbs', filepath, filename);
          resolve();
        }
        if (size.width && size.height && size.crop) {
          gm(src)
            .resize(size.width, size.height, '^')
            .crop(size.width, size.height)
            .write(dest, afterWrite);
        } else {
          gm(src)
            .resize(size.width, size.height, '>')
            .write(dest, afterWrite);
        }
      }));
    });
    Promise.all(promises)
      .then(() => {
        resolve(files);
      })
      .catch(reject);
  });
}

const getThumbs = filepath => {
  const thumbs = {};
  Object.keys(config.imagesizes).forEach(key => {
    const size = config.imagesizes[key];
    thumbs[key] = {
      width: size.width,
      height: size.height,
      crop: size.crop
    };
  });
  return thumbs;
}

module.exports = makeThumbs;
