import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

  onBodyChange(key, value) {
    this.setState({
      body: {
        ...this.state.body,
        [key]: value
      }
    })
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
    _id: PropTypes.string.required,
    content: PropTypes.string.required
  }),
};

const mapStateToProps = (state, props) => {
  const id = props.body._id;
  console.log(id, state.postControls.selectedControls[id]);
  return {
    isEditing: state.postControls.selectedControls[id] === 'edit'
  }
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
