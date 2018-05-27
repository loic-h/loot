export default {
  list: () => {
    return Promise((resolve, reject) => {
      fetch('/api/posts')
        .then(res => res.json())
        .then(json => resolve(json));
    });
  }
}
