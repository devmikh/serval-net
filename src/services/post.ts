import Post from '../models/post';
import { PostInterface } from '../interfaces';

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

const getUserPosts = async (userId: number) => {
    try {
        const posts = await Post.findAll({
            where: {
              user_id: userId
            }
        });
        return {
            posts,
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
    getUserPosts
}