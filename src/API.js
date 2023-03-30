const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor({ baseUrl, token }) {

    this._token = `Bearer ${token}`;

    this._headers = {
      authorization: this._token,
      "Content-Type": "application/json",
    };

    this._requestInit = {
      headers: this._headers,
    };

    this._baseUrl = baseUrl;
  }

  // getProductList() {
  //     return fetch(`${this._baseUrl}/products`, this._requestInit).then(onResponse);
  // }

  getPostById(id) {
    return fetch(`${this._baseUrl}/posts/${id}`, this._requestInit).then(
      onResponse
    );
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, this._requestInit).then(
      onResponse
    );
  }

  getUserById(userId) {
    return fetch(`https://api.react-learning.ru/users/${userId}`, {
      headers: this._headers,
    }).then(onResponse);
  }

  getPosts() {
    return fetch(`${this._baseUrl}/posts`, this._requestInit).then(onResponse);
  }

  createPost(post) {
    return fetch(`${this._baseUrl}/posts`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(post),
    }).then(onResponse);
  }

  createComment(postId, comment) {
    return fetch(`${this._baseUrl}/posts/comments/${postId}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(comment),
    }).then(onResponse);
  }
  

  // search(searchQuery) {
  //     return fetch(
  //         `${this._baseUrl}/products/search?query=${searchQuery}`,
  //         this._requestInit
  //     ).then(onResponce)
  // }

  // changeLikeProductStatus(productID, like) {
  //     // Обычная реализация: 2 разных метода для удаления и постановки лайка.
  //     return fetch(`${this._baseUrl}/products/likes/${productID}`, {
  //         method: like ? "PUT" : "DELETE",
  //         headers: {
  //             authorization: this._token,
  //             "Content-Type": "application/json",
  //         },
  //     }).then(onResponce);
  // }
}

const config = {
  baseUrl: "https://api.react-learning.ru/v2/group-10",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UzZmUwMDU5Yjk4YjAzOGY3N2IzYmEiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc1ODg3NTU5LCJleHAiOjE3MDc0MjM1NTl9.x1FR1Mk25UaVZzRK3DcnXQ-kOhiPP4nMuXzS8pMwrVg",
};

const api = new Api(config);

export default api;
