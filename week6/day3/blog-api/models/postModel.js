const pool = require('../config/database');

class PostModel {
    static async getAllPosts() {
        try {
            const result = await pool.query(
                'SELECT * FROM posts ORDER BY created_at DESC'
            );
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    static async getPostById(id) {
        try {
            const result = await pool.query(
                'SELECT * FROM posts WHERE id = $1',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async createPost(title, content) {
        try {
            const result = await pool.query(
                'INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *',
                [title, content]
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async updatePost(id, title, content) {
        try {
            const result = await pool.query(
                'UPDATE posts SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
                [title, content, id]
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
    
    static async deletePost(id) {
        try {
            const result = await pool.query(
                'DELETE FROM posts WHERE id = $1 RETURNING *',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PostModel;