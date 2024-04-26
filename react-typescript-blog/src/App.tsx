// src/App.tsx
import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import { Post as PostType, User, Comment } from './types';
import {fetchComments, fetchPosts, fetchUsers} from "./api";

const App: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    Promise.all([fetchPosts(), fetchUsers(), fetchComments()]).then(([posts, users, comments]) => {
      setPosts(posts);
      setUsers(users);
      setComments(comments);
      //TODO: put url in constant and reuse in urls
      //TODO: move requests to separate functions
    });
  }, []);

  return (
      <div className="App">
        {posts.map(post => {
          const user = users.find(u => u.id === post.userId);
          const postComments = comments.filter(c => c.postId === post.id);
          return (
              <Post key={post.id} post={post} user={user!} comments={postComments} />
          );
        })}
      </div>
  );
}

export default App;
