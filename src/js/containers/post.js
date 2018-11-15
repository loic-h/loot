import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { savePost } from '../actions/post'
import PostComponent from '../components/post';

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      body: props.body,
      showActions: false
    }
  }

  componentDidUpdate(prevProps) {

  }

  onBodyChange(key, value) {
    const body = {
      ...this.state.body,
      [key]: value
    };
    this.setState({ body });
    this.props.savePost(key, value);
  }

  render() {
    return (
      <PostComponent
        id={ this.state.body._id }
        content={ this.state.body.content }
        mappedContent={ this.state.body.mappedContent }
        metas={ this.state.body.metas }
        thumb={ this.state.body.thumb }
        content={ this.state.body.content }
        isEditing={ this.props.isEditing }
        onBodyChange={ (key, value) => this.onBodyChange(key, value) } />
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
