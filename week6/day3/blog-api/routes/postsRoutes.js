const express = require('express');
const PostsController = require('../controllers/postsController');

const router = express.Router();

router.get('/', PostsController.getAllPosts);

router.get('/:id', PostsController.getPostById);

router.post('/', PostsController.createPost);

router.put('/:id', PostsController.updatePost);

router.delete('/:id', PostsController.deletePost);

module.exports = router;