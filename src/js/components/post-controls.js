import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-icons-kit';

const PostControls = ({
  actions,
  showActions
}) => (
  <div className="post-controls">
    <div className="post-controls__header">
      { Object.keys(actions).map(key => (
        <button key={ key } className="post-controls__item" onClick={ () => actions[key].onClick() }>
          <Icon icon={ actions[key].icon } />
        </button>
      )) }
    </div>
  </div>
)

PostControls.propTypes = {
  actions: PropTypes.objectOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  })),
  isOpened: PropTypes.bool.isRequired
};;

export default PostControls;
