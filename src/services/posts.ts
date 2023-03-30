import Post from '../models/post';
import { PostInterface } from '../interfaces';
import sequelize from '../config/sequelize';
import { selectPostsQuery } from '../config/sequelize/queries';

const createPost = async (post: PostInterface) => {
    try {
        const newPost = await Post.create({
            user_id: post.user_id,
            date: post.date,
            text: post.text
        });

        return {
            newPost,
            error: null
        }
    } catch (err: any) {
        console.error(err);
        return {
            newPost: null,
            error: err.message
        }
    }
}

const deletePost = async (postId: number) => {
    try {
        await Post.destroy({ where: { id: postId }})
        return true;
    } catch (err: any) {
        console.error(err);
        return false;
    }
}

const getUserPosts = async (userId: number) => {
    try {
        const [ result ] = await sequelize.query(selectPostsQuery, { replacements: [userId]});
        return {
            posts: result,
            error: null
        }
    } catch (err: any) {
        return {
            posts: null,
            error: err.message
        }
    }
};

export {
    createPost,
    getUserPosts,
    deletePost
}