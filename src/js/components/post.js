import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ item }) => (
  <div className="post">
    { item.content }
  </div>
);

Post.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.required,
    content: PropTypes.string.required
  })
};

export default Post;
