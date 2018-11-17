const log4js = require('log4js');
const path = require('path');
const fs = require('fs');
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
    const infos = await saveFile(req.files);
    if (infos) {
      doc.files = infos;
      doc.thumbs = await makeThumbs(doc.file.hash, doc.file.name);
    }
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

const saveFile = files => {
  return new Promise((resolve, reject) => {
    if (Object.keys(files).length > 0) {
      const { name, md5, mimetype } = files.file;
      const infos = { hash: md5(), name };
      if (mimetype.indexOf('image') !== 0) {
        reject(new Error("Wrong file type"));
      } else {
        const filepath = path.join(config.path.files, infos.hash);
        fs.access(filepath, fs.constants.F_OK, err => {
          if (err) {
            files.file.mv(filepath, err => {
              if (err) {
                reject(err);
              } else {
                resolve(infos);
              }
            });
          } else {
            resolve(doc);
          }
        });
      }
    } else {
      reject(null);
    }
  });
};
