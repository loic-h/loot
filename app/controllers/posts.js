const log4js = require('log4js');
const Post = require('../models/post');

const logger = log4js.getLogger('controllers:post');

exports.list = (req, res) => {
  const options = {};
  if (req.query.query) {
    options.content = { $regex: req.query.query }
  }
  Post.find(options, (err, items) => {
    if (err) {
      if (err.name === 'CastError') {
        res.sendStatus(404);
      } else {
        res.sendStatus(500);
      }
      logger.error(err);
    } else {
      res.json(items);
    }
  }).sort({ created_at: -1 });
};
