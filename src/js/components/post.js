import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ item, onDeleteClick }) => (
  <div className="post">
    <div className="post__content">
      { item.content }
    </div>
    <div className="post__controls">
      <button className="post__control" onClick={ () => onDeleteClick(item._id) }>
        delete
      </button>
    </div>
  </div>
);

Post.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }),
  onDeleteClick: PropTypes.func.isRequired
};

export default Post;
