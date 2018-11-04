import React from 'react';
import PropTypes from 'prop-types';
import Post from '../containers/post';

const Thread = ({
  items,
  addQuery,
  onAddClick
}) => (
  <div className="thread">
    <div className="thread__container">
      { items.length > 0 ?
        items.map((item, index) => (
          <Post key={item._id} body={item} />
        )) : addQuery ? (
          <button className="thread__new" onClick={e => onAddClick(addQuery)}>
            Add new Loot
          </button>
        ) : (
          <div className="thread__empty">
            No Post
          </div>
        )
      }
    </div>
  </div>
);

Thread.propTypes = {
  items: PropTypes.array,
  onAddClick: PropTypes.func
};

export default Thread;
