const log4js = require('log4js');
const mongoose = require('mongoose');
const urlUtils = require('../lib/url');

const logger = log4js.getLogger('models:post');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  mappedContent: {
    type: String
  },
  metas: {
    url: String,
    title: String,
    description: String,
    image: String
  },
  file: {
    hash: String,
    name: String,
    extension: String
  },
  thumbs: {
    type: Object
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

postSchema.pre('save', function(next) {
  console.log("yo", this.isModified('file'), typeof this.file);
  this.mappedContent = mapContent(this.content);
  const url = urlUtils.getUrls(this.content)[0];
  if (this.isModified('content')) {
    urlUtils.getMetas(url)
      .then(metas => this.metas = metas)
      .catch(() => this.metas = null)
      .finally(next);
  } else {
    next();
  }
});

// Save mapped content on init
// postSchema.post('init', function(doc) {
//   this.mappedContent = mapContent(doc.content);
//   const url = urlUtils.getUrls(doc.content)[0];
//   urlUtils.getMetas(url)
//     .then(metas => this.metas = metas)
//     .catch(() => this.metas = null)
//     .finally(() => {
//       this.save();
//     });
// });

const mapContent = content => {
  content = urlUtils.mapUrls(content);
  return content;
}

module.exports = mongoose.model('post', postSchema);
