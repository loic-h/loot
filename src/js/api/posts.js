export default {
  list: (base = '') => {
    return new Promise((resolve, reject) => {
      fetch(`${base}/api/posts`)
        .catch(err => reject(err))
        .then(res => res.json())
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
          } else {
            return res.json();
          }
        })
        .then(json => resolve(json));
    });
  }
}
