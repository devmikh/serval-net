import Like from "../models/like"

const likePost = async(userId: number, postId: number) => {
    try {
        const liked = await Like.findAll({ where: { user_id: userId, post_id: postId}});
        if (liked) {
            // Unlike post
            await Like.destroy({
                where: {
                    user_id: userId,
                    post_id: postId
                }
            });
        } else {
            // Like post
            await Like.create({
                user_id: userId,
                post_id: postId
            })
        }
        return {
            error: null
        }
    } catch (error) {
        return {
            error
        }
    }
}

export {
    likePost
}