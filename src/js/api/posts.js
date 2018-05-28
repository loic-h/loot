export default {
  list: (base = '') => {
    return new Promise((resolve, reject) => {
      fetch(`${base}/api/posts`)
        .catch(err => reject(err))
        .then(res => res.json())
        .then(json => resolve(json));
    });
  }
}
