import React from 'react';
import { PostProps } from './types';
import Comment from './Comment';

const Post: React.FC<PostProps> = ({ post, user, comments }) => {
    return (
        <div className="post-container">
            <h2 className="post-title">{post.title}</h2>
            <small className="post-author">by {user.name}</small>
            <p className="post-body">{post.body}</p>
            <h3>Comments:</h3>
            {comments.map(comment => (
                <div key={comment.id} className="comment-container">
                    <Comment comment={comment} />
                </div>
            ))}
        </div>
    );
}

export default Post;
