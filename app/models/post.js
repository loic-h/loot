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

postSchema.pre('save', function(next) {
  this.mappedContent = mapContent(this.content);
  next();
});

// Save mapped content on int
// postSchema.post('init', function(doc) {
//   this.mappedContent = mapContent(doc.content);
// });

function mapContent(content) {
  content = mapUrls(content);
  return content;
}

module.exports = mongoose.model('post', postSchema);
