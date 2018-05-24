const express = require('express');
const router = express.Router();

module.exports = (controller) => {
  router.get('/', controller.list);
  router.get('/:id', controller.detail);
  router.post('/', controller.create);
  router.delete('/:id', controller.delete);
  router.patch('/:id', controller.update);

  return router;
}
