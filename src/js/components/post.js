import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Post = ({
    body,
    actions,
    isEditing,
    showActions,
    onMouseOver,
    onMouseOut
  }) => (
  <div
    className={classnames({
      'post': true,
      'post--show-actions': showActions
    })}
    onMouseOver={ () => onMouseOver() }
    onMouseOut={ () => onMouseOut() }>
     {isEditing}
    <div className="post__content">
      { body.content }
    </div>
    <div className="post__controls">
      { Object.keys(actions).map(key => (
        <button key={ key } className="post__control" onClick={ () => actions[key].onClick() }>
          { actions[key].label}
        </button>
      )) }
    </div>
  </div>
);

Post.propTypes = {
  body: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }),
  actions: PropTypes.objectOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  })),
  isEditing: PropTypes.bool.isRequired,
  showActions: PropTypes.bool.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired
};

export default Post;
