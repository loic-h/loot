const mongoose = require('mongoose');
const mapUrls = require('../lib/url').mapUrls;

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  mappedContent: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

postSchema.post('save', (doc, next) => {
  this.update({ mappedContent: mapContent(doc.content) });
});

postSchema.post('init', (doc, next) => {
  mapContent(doc.content);
});

postSchema.pre('updateOne', function(next) {
  const content = this.getUpdate().content;
  if (content) {
    this.update({ mappedContent: mapContent(content) });
  }
  next();
});

function mapContent(content) {
  content = mapUrls(content);
  return content;
}

module.exports = mongoose.model('post', postSchema);
