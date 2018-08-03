import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ContentEditable from './contenteditable';
import PostControls from '../containers/post-controls';
import Panel from '../containers/panel';

const Post = ({
    body,
    isEditing,
    onMouseOver,
    onMouseOut,
    onBodyChange
  }) => (
  <div
    className={classnames({
      'post': true
    })}
    onMouseOver={ () => onMouseOver() }
    onMouseOut={ () => onMouseOut() }
  >
    <div className="post__container">
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
      <div className="post__footer">
        <PostControls id={ body._id }/>
      </div>
    </div>
    <div className="post__panel">
      <Panel id={ body._id } />
    </div>
  </div>
);

Post.propTypes = {
  body: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }),
  isEditing: PropTypes.bool.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  onBodyChange: PropTypes.func.isRequired
};

export default Post;
