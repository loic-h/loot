const express = require('express');
const router = express.Router();

const lootController = require('../controllers/loot');

router.get('/', lootController.list);
router.get('/:id', lootController.detail);
router.post('/', lootController.create);
router.delete('/:id', lootController.delete);
router.patch('/:id', lootController.update);

module.exports = router;
