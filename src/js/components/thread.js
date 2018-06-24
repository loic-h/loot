import React from 'react';
import PropTypes from 'prop-types';
import Post from '../containers/post';

const Thread = ({ items }) => {
  return (
  <div className="thread">
    <div className="thread__container">
      { items.map((item, index) => (
        <Post key={item._id} body={item} />
      )) }
    </div>
  </div>
)};

Thread.propTypes = {
  items: PropTypes.array
};

export default Thread;
