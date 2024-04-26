// src/types.ts
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface Comment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}

export interface PostProps {
    post: Post;
    user: User;
    comments: Comment[];
}

export interface CommentProps {
    comment: Comment;
}
