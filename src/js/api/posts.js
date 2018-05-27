export default {
  list: () => {
    return new Promise((resolve, reject) => {
      fetch('/api/posts')
        .then(res => res.json())
        .then(json => resolve(json));
    });
  }
}
