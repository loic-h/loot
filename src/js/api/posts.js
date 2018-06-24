export default {
  list: (base = '') => {
    return new Promise((resolve, reject) => {
      fetch(`${base}/api/posts`)
        .catch(err => reject(err))
        .then(res => {
          if (res.status !== 200) {
            return reject(res.status);
          }
          return res.json();
        })
        .then(json => resolve(json));
    });
  },

  add: (body, base = '') => {
    return new Promise((resolve, reject) => {
      const request = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      };
      fetch(`${base}/api/posts`, request)
        .catch(err => reject(err))
        .then(res => {
          if (res.status !== 201) {
            return reject(res.status);
          }
          return res.json();
        })
        .then(json => resolve(json));
    });
  },

  delete: (id, base = '') => {
    return new Promise((resolve, reject) => {
      const request = {
        method: 'DELETE'
      };
      fetch(`${base}/api/posts/${id}`, request)
      .catch(err => reject(err))
      .then(res => {
        if (res.status !== 204) {
          return reject(res.status);
        }
        return resolve(id);
      })
    });
  }
}
