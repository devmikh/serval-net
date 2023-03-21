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

export {
    createPost
}