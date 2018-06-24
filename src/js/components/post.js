import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ContentEditable from './contenteditable';

const Post = ({
    body,
    actions,
    isEditing,
    showActions,
    onMouseOver,
    onMouseOut,
    onBodyChange
  }) => (
  <div
    className={classnames({
      'post': true,
      'post--show-actions': showActions
    })}
    onMouseOver={ () => onMouseOver() }
    onMouseOut={ () => onMouseOut() }>
    { isEditing ? (
      <ContentEditable
        className="post__content post__content--editable"
        onChange={value => onBodyChange('content', value)}
        autoFocus={true}
        html={body.content} />
    ) : (
      <div className="post__content">
        { body.content }
      </div>
    )}
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
  onMouseOut: PropTypes.func.isRequired,
  onBodyChange: PropTypes.func.isRequired
};

export default Post;
