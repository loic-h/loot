const express = require('express');
const routerPost = require('./post');
const routerPosts = require('./posts');
const controllerPost = require('../../controllers/post');
const controllerPosts = require('../../controllers/posts');

const router = express.Router();
router.use('/post', routerPost(controllerPost));
router.use('/posts', routerPosts(controllerPosts));

module.exports = router;
