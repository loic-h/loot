import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Textarea from './textarea';
import PostControls from '../containers/post-controls';
import Panel from '../containers/panel';
import UrlCard from '../components/url-card';

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
      <div className="post__body">
        <Textarea
          className={classnames({
            'post__content': true,
            'post__content--editable': isEditing
          })}
          onChange={value => onBodyChange('content', value)}
          autoFocus={true}
          value={isEditing ? body.content : body.mappedContent}
          edit={isEditing} />
        { body.metas && (
          <UrlCard
            className="post__url-card"
            url={body.metas.url}
            title={body.metas.title}
            description={body.metas.description} />
        ) }
      </div>
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
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  onBodyChange: PropTypes.func.isRequired
};

Post.defaultProps = {
  onMouseOver: () => {},
  onMouseOut: () => {}
}
export default Post;
