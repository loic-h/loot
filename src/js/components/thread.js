import React from 'react';
import PropTypes from 'prop-types';
import Post from '../components/post';

const Thread = ({ items }) => (
  <div className="thread">
    { items.map((item, index) => (
      <Post key={index} item={item} />
    )) }
  </div>
);

Thread.propTypes = {
  items: PropTypes.array
};

export default Thread;
