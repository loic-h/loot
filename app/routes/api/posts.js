const express = require('express');
const router = express.Router();

module.exports = (controller) => {
  router.get('/', controller.list);
  router.get('/:searchString', controller.search);

  return router;
}
