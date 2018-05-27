import React from 'react';
import PropTypes from 'prop-types';

const Thread = ({ items }) => (
  <div className="thread">
    { items.map((item, index) => (
      <div key={index}>{ item.content }</div>
    )) }
  </div>
);

Thread.propTypes = {
  items: PropTypes.array
};

export default Thread;
