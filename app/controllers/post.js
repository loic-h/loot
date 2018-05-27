const log4js = require('log4js');
const Post = require('../models/post');

const logger = log4js.getLogger('controllers:post');

exports.list = (req, res) => {
  Post.find({}, (err, items) => {
    if (err) {
      if (err.name === 'CastError') {
        res.sendStatus(404);
      } else {
        logger.error(err);
        res.sendStatus(500);
      }
    } else {
      res.json(items);
    }
  });
};

exports.detail = (req, res) => {
  Post.findOne({ _id: req.params.id }, (err, item) => {
    if (err) {
      if (err.name === 'CastError') {
        res.sendStatus(404);
      } else {
        logger.error(err);
        res.sendStatus(500);
      }
    } else {
      res.json(item);
    }
  });
};

exports.create = (req, res) => {
  Post.create(req.body, (err, item) => {
    if (err) {
      if (err.name === 'ValidationError') {
        res.sendStatus(304);
      } else {
        logger.error(err);
        res.sendStatus(500);
      }
    } else {
      res.status(201).json(item);
    }
  });
};

exports.delete = (req, res) => {
  Post.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      if (err.name === 'CastError') {
        res.sendStatus(404);
      } else {
        logger.error(err);
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(204);
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
        logger.error(err);
        res.sendStatus(500);
      }
    } else {
      res.json(response);
    }
  });
};
