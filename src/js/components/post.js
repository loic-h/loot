import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Textarea from './textarea';
import { Icon } from 'react-icons-kit';
import { trash2 } from 'react-icons-kit/feather/';
import PostControls from '../containers/post-controls';
import Panel from '../containers/panel';
import UrlCard from '../components/url-card';

const Post = ({
    id,
    content,
    mappedContent,
    metas,
    thumb,
    isEditing,
    onMouseOver,
    onMouseOut,
    onBodyChange,
    onDeleteThumbClick
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
        { thumb && (
          <div className="post__thumb">
            <img
              className="post__image"
              src={ thumb } />
            { isEditing && (
              <button
                className="post__delete-thumb"
                onClick={ onDeleteThumbClick }
              >
                <Icon icon={ trash2 } />
              </button>
            ) }
          </div>
        ) }
        <Textarea
          className={classnames({
            'post__content': true,
            'post__content--editable': isEditing
          })}
          textClassname="post-mark"
          onChange={value => onBodyChange('content', value)}
          autoFocus={true}
          value={content}
          edit={isEditing} />
        { metas && (
          <UrlCard
            className="post__url-card"
            url={metas.url}
            title={metas.title}
            description={metas.description}
            image={!thumb && metas.image} />
        ) }
      </div>
      <div className="post__footer">
        <PostControls id={ id }/>
      </div>
    </div>
    <div className="post__panel">
      <Panel id={ id } />
    </div>
  </div>
);

Post.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  metas: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string
  }),
  thumb: PropTypes.string,
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
