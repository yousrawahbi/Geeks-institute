const PostModel = require('../models/postModel');

class PostsController {
    static async getAllPosts(req, res) {
        try {
            const posts = await PostModel.getAllPosts();
            res.json({
                success: true,
                data: posts,
                count: posts.length
            });
        } catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({
                success: false,
                message: 'Server error while fetching posts'
            });
        }
    }

    static async getPostById(req, res) {
        try {
            const { id } = req.params;
            const post = await PostModel.getPostById(id);

            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: 'Post not found'
                });
            }

            res.json({
                success: true,
                data: post
            });
        } catch (error) {
            console.error('Error fetching post:', error);
            res.status(500).json({
                success: false,
                message: 'Server error while fetching post'
            });
        }
    }

    static async createPost(req, res) {
        try {
            const { title, content } = req.body;

            if (!title || !content) {
                return res.status(400).json({
                    success: false,
                    message: 'Title and content are required'
                });
            }

            const newPost = await PostModel.createPost(title, content);
            
            res.status(201).json({
                success: true,
                message: 'Post created successfully',
                data: newPost
            });
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({
                success: false,
                message: 'Server error while creating post'
            });
        }
    }

    static async updatePost(req, res) {
        try {
            const { id } = req.params;
            const { title, content } = req.body;

            const existingPost = await PostModel.getPostById(id);
            if (!existingPost) {
                return res.status(404).json({
                    success: false,
                    message: 'Post not found'
                });
            }

            if (!title || !content) {
                return res.status(400).json({
                    success: false,
                    message: 'Title and content are required'
                });
            }

            const updatedPost = await PostModel.updatePost(id, title, content);
            
            res.json({
                success: true,
                message: 'Post updated successfully',
                data: updatedPost
            });
        } catch (error) {
            console.error('Error updating post:', error);
            res.status(500).json({
                success: false,
                message: 'Server error while updating post'
            });
        }
    }

    static async deletePost(req, res) {
        try {
            const { id } = req.params;

            const existingPost = await PostModel.getPostById(id);
            if (!existingPost) {
                return res.status(404).json({
                    success: false,
                    message: 'Post not found'
                });
            }

            await PostModel.deletePost(id);
            
            res.json({
                success: true,
                message: 'Post deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting post:', error);
            res.status(500).json({
                success: false,
                message: 'Server error while deleting post'
            });
        }
    }
}

module.exports = PostsController;