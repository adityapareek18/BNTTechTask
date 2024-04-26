const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = () => {
    return fetch(`${BASE_URL}/posts`).then(res => res.json());
};

export const fetchUsers = () => {
    return fetch(`${BASE_URL}/users`).then(res => res.json());
};

export const fetchComments = () => {
    return fetch(`${BASE_URL}/comments`).then(res => res.json());
};
