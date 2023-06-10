import axiosInstance from '../services/AxiosInstance';

export function getPosts() {
    return axiosInstance.get(`posts`);
}

export function createPost(postData) {
    return axiosInstance.post(`/posts/addPost`, postData);
}

export function updatePost(post, postId) {
    return axiosInstance.put(`posts/editPost/${postId}`, post);
}

export function deletePost(postId) {
    return axiosInstance.delete(`posts/${postId}`);
}

export function formatPosts(postsData) {
    let posts = [];
    for (let key in postsData) {
        posts.push({ ...postsData[key], id: key });
    }

    return posts;
}
