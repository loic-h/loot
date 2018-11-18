import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { savePost } from '../actions/post'
import PostComponent from '../components/post';

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.keyTimeout = null;
    this.state = {
      showActions: false
    }
  }

  onBodyChange(key, value) {
    if (this.keyTimeout) {
      clearTimeout(this.keyTimeout);
    }
    this.keyTimeout = setTimeout(() => {
      this.props.savePost(key, value);
    }, 1000);
  }

  onDeleteThumbClick() {
    this.props.savePost("file", null);
  }

  render() {
    return (
      <PostComponent
        id={ this.props.body._id }
        content={ this.props.body.mappedContent }
        metas={ this.props.body.metas }
        thumb={ this.props.body.thumbs && this.props.body.thumbs.desktop }
        isEditing={ this.props.isEditing }
        onBodyChange={ (key, value) => this.onBodyChange(key, value) }
        onDeleteThumbClick={ () => this.onDeleteThumbClick() } />
    );
  }
}

Post.propTypes = {
  body: PropTypes.shape({
    _id: PropTypes.string,
    content: PropTypes.string.required
  }),
  add: PropTypes.bool
};

const mapStateToProps = (state, props) => {
  const id = props.body._id;
  return {
    isEditing: state.postControls.selectedControls[id] === 'edit'
  }
};

const mapDispatchToProps = (dispatch, props) => ({
  savePost: (key, value) => dispatch(savePost(props.body._id, { [key]: value }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
