const express = require('express');
const router = express.Router();

module.exports = (controller) => {
  router.get('/', controller.list);
  router.get('/:query', controller.search);

  return router;
}
