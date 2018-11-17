const log4js = require('log4js');
const Post = require('../models/post');

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

exports.update = (req, res) => {
  Post.findById(req.params.id, (err, doc) => {
    if (err) {
      return logger.error(err);
    }
    Object.assign(doc, req.body);
    saveFile(doc, req)
      .then(doc => {
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
  });
};

const saveFile = (doc, req) => {
  return new Promise((resolve, reject) => {
    if (Object.keys(req.files).length > 0) {
      const { name, md5, mimetype } = req.files.file;
      if (mimetype.indexOf('image') == 0) {
        doc.file = { hash: md5(), name };
        req.files.file.mv(`files/${doc.file.hash}`, function(err) {
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
