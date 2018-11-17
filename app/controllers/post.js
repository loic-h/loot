const log4js = require('log4js');
const path = require('path');
const Post = require('../models/post');
const config = require('../../config');
const makeThumbs = require('../lib/thumbs');

const logger = log4js.getLogger('controllers:post');

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

exports.update = async (req, res) => {
  Post.findById(req.params.id, async (err, doc) => {
    if (err) {
      return logger.error(err);
    }
    Object.assign(doc, req.body);
    await saveFile(doc, req);
    doc.thumbs = await makeThumbs(doc.file.hash, doc.file.name);
    doc.save((err, response) => {
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
  })
  .catch(err => {
    res.sendStatus(500);
    logger.error(err);
  });
};

const saveFile = (doc, req) => {
  return new Promise((resolve, reject) => {
    if (Object.keys(req.files).length > 0) {
      const { name, md5, mimetype } = req.files.file;
      if (mimetype.indexOf('image') == 0) {
        doc.file = { hash: md5(), name };
        req.files.file.mv(path.join(config.path.files, doc.file.hash), err => {
          if (err) {
            reject(err);
          } else {
            resolve(doc);
          }
        });
      }
    } else {
      resolve(doc);
    }
  });
};
