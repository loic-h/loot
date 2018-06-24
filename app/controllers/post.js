const log4js = require('log4js');
const Post = require('../models/post');

const logger = log4js.getLogger('controllers:post');

exports.list = (req, res) => {
  Post.find({}, (err, items) => {
    if (err) {
      if (err.name === 'CastError') {
        res.sendStatus(404);
      } else {
        res.sendStatus(500);
      }
      logger.error(err);
    } else {
      res.json(items);
      logger.debug('list items', JSON.stringify(items));
    }
  }).sort({ created_at: -1 });
};

exports.detail = (req, res) => {
  Post.findOne({ _id: req.params.id }, (err, item) => {
    if (err) {
      if (err.name === 'CastError') {
        res.sendStatus(404);
      } else {
        res.sendStatus(500);
      }
      logger.error(err);
    } else {
      res.json(item);
      logger.debug('detail item', item);
    }
  });
};

exports.create = (req, res) => {
  Post.create(req.body, (err, item) => {
    if (err) {
      if (err.name === 'ValidationError') {
        res.sendStatus(304);
      } else {
        res.sendStatus(500);
      }
      logger.error(err);
    } else {
      res.status(201).json(item);
      logger.debug('create item', item);
    }
  });
};

exports.delete = (req, res) => {
  Post.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      if (err.name === 'CastError') {
        res.sendStatus(404);
      } else {
        res.sendStatus(500);
        logger.error(err);
      }
    } else {
      res.sendStatus(204);
      logger.debug('delete item', req.params.id);
    }
  });
};

exports.update = (req, res) => {
  Post.updateOne({ _id: req.params.id }, req.body, (err, response) => {
    if (err) {
      if (err.name === 'CastError') {
        res.sendStatus(404);
      } else if (err.name === 'ValidationError') {
        res.sendStatus(304);
      } else {
        res.sendStatus(500);
      }
      logger.error(err);
    } else {
      res.json(response);
      logger.debug('update item', response);
    }
  });
};
