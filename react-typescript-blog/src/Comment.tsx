import React from 'react';
import { CommentProps } from './types';

const Comment: React.FC<CommentProps> = ({ comment }) => {
    return (
        <div>
            <p className="comment-body">{comment.body}</p>
            <small className="comment-author">— {comment.name}</small>
        </div>
    );
}

export default Comment;
