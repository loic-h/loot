const mongoose = require('mongoose');
const urlUtils = require('../lib/url');

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
  image: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

postSchema.pre('save', function(next) {
  this.mappedContent = mapContent(this.content);
  const url = urlUtils.getUrls(this.content)[0];
  urlUtils.getMetas(url)
    .then(metas => this.metas = metas)
    .catch(() => this.metas = null)
    .finally(next);
});

// Save mapped content on int
postSchema.post('init', function(doc) {
  this.mappedContent = mapContent(doc.content);
  const url = urlUtils.getUrls(doc.content)[0];
  urlUtils.getMetas(url)
    .then(metas => this.metas = metas)
    .catch(() => this.metas = null)
    .finally(() => {
      this.save();
    });
});

function mapContent(content) {
  content = urlUtils.mapUrls(content);
  return content;
}

module.exports = mongoose.model('post', postSchema);
