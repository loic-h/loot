module.exports = {
  list: (posts) => {
    return new Promise((resolve, reject) => {
      if (posts) {
        resolve(posts);
      } else {
        reject('error');
      }
    });
  }
}
