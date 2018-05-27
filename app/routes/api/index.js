const express = require('express');
const routerPost = require('./post');
const controllerPost = require('../../controllers/post');

const router = express.Router();
router.use('/posts', routerPost(controllerPost));

module.exports = router;
