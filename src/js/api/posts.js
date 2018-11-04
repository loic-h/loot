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

  search: (query, base = '') => {
    return new Promise((resolve, reject) => {
      fetch(`${base}/api/posts?query=${encodeURIComponent(query)}`)
        .catch(err => reject(err))
        .then(res => {
          if (res.status !== 200) {
            return reject(res.status);
          }
          return res.json();
        })
        .then(json => resolve(json));
    });
  }
}
