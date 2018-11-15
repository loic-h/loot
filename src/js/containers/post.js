import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mockPost } from '../actions/post';
import PostComponent from '../components/post';

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      body: props.body,
      mockBody: null,
      showActions: false
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.mockedBody && this.props.mockedBody.thumb &&
      (
        !prevProps.mockedBody ||
        this.props.mockedBody.thumb !== prevProps.mockedBody.thumb
      )
    ) {
      this.setState({ body:
        {
          ...this.props.body,
          thumb: this.props.mockedBody.thumb
        }
      })
    }
    // On cancel retrieve saved body
    else if (prevProps.mockedBody && !this.props.mockedBody) {
      this.setState({ body: this.props.savedBody });
    // Update the field
    } else if (prevProps.body !== this.props.body) {
      this.setState({ body: this.props.body });
    }
  }

  onBodyChange(key, value) {
    const body = {
      ...this.state.body,
      [key]: value
    };
    this.setState({ body });
    this.props.mockPost(body);
  }

  render() {
    return (
      <PostComponent
        body={ this.state.body }
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
    isEditing: state.postControls.selectedControls[id] === 'edit',
    mockedBody: state.post.mocked[id],
    savedBody: state.posts.byId[id]
  }
};

const mapDispatchToProps = (dispatch, props) => ({
  mockPost: body => {
    dispatch(mockPost(body._id, body));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
