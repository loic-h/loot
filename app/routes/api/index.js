const express = require('express');
const routerLoot = require('./loot');
const controllerLoot = require('../../controllers/loot');

const router = express.Router();
router.use('/loots', routerLoot(controllerLoot));

module.exports = router;
