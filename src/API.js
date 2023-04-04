const onResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  throw res;
};

class Api {
  constructor(baseUrl) {
    this._headers = {
      "Content-Type": "application/json",
    };

    this._baseUrl = baseUrl;
  }

  setToken(token) {
    this._headers = {
      "content-type": "application/json",
      Authorization: token,
    };
  }

  signIn(email, password) {
    return fetch(`https://api.react-learning.ru/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(onResponse);
  }

  signUp(email, group, password) {
    return fetch(`https://api.react-learning.ru/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, group, password }),
    }).then(onResponse);
  }

  getPostById(id) {
    return fetch(`${this._baseUrl}/posts/${id}`, {
      headers: this._headers,
    }).then(onResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(onResponse);
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(onResponse);
  }

  setUserAvatar(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(url),
    }).then(onResponse);
  }

  getUserById(userId) {
    return fetch(`https://api.react-learning.ru/users/${userId}`, {
      headers: this._headers,
    }).then(onResponse);
  }

  getPosts() {
    return fetch(`${this._baseUrl}/posts`, {
      headers: this._headers,
    }).then(onResponse);
  }

  createPost(post) {
    return fetch(`${this._baseUrl}/posts`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(post),
    }).then(onResponse);
  }

  setPost(postId, data) {
    return fetch(`${this._baseUrl}/posts/${postId}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(onResponse);
  }

  delPost(postId) {
    return fetch(`${this._baseUrl}/posts/${postId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(onResponse);
  }

  createComment(postId, comment) {
    return fetch(`${this._baseUrl}/posts/comments/${postId}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(comment),
    }).then(onResponse);
  }

  delComment(postId, commentId) {
    return fetch(`${this._baseUrl}/posts/comments/${postId}/${commentId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(onResponse);
  }

  // search(searchQuery) {
  //     return fetch(
  //         `${this._baseUrl}/products/search?query=${searchQuery}`,
  //         this._requestInit
  //     ).then(onResponce)
  // }

  changePostLike(postId, isLike) {
    return fetch(`${this._baseUrl}/posts/likes/${postId}`, {
      method: !isLike ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(onResponse);
  }
}

// const config = {
//   baseUrl: "https://api.react-learning.ru/v2/group-10",
// token:
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzZmUwMDU5Yjk4YjAzOGY3N2IzYmEiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc1ODg3NTU5LCJleHAiOjE3MDc0MjM1NTl9.x1FR1Mk25UaVZzRK3DcnXQ-kOhiPP4nMuXzS8pMwrVg",
// };

const api = new Api("https://api.react-learning.ru/v2/group-10");

export default api;
