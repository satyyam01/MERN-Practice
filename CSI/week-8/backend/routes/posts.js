const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

// Public: get all posts, get post by id
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);

// Protected: create, update, delete
router.post('/', auth, postController.createPost);
router.put('/:id', auth, postController.updatePost);
router.delete('/:id', auth, postController.deletePost);

module.exports = router; 