import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostComponent from '../components/post';
import { deletePost, updatePost, isPostEditing } from '../actions/posts';
import { fetchThread } from '../actions/thread';

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      body: props.body,
      showActions: false
    }
  }

  onDeleteClick() {
    this.props.deletePost(this.state.body._id)
      .then(() => this.props.fetchThread());
  }

  onEditClick() {
    this.props.isPostEditing(this.state.body._id, true);
  }

  onMouseInOut(hover = true) {
    if (!this.props.isEditing) {
      this.setState({ showActions: hover });
    } else {
      this.setState({ showActions: true });
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

  getActions() {
    if (this.props.isEditing) {
      return {
        save: {
          label: "save",
          onClick: () => {
            this.props.updatePost(this.state.body._id, {
              content: this.state.body.content
            })
              .then(() => {
                this.props.isPostEditing(this.state.body._id, false);
              });
          }
        },
        cancel: {
          label: "cancel",
          onClick: () => {
            this.props.isPostEditing(this.state.body._id, false);
          }
        }
      }
    }

    return {
      edit: {
        label: "edit",
        onClick: body => this.onEditClick()
      },
      delete: {
        label: "delete",
        onClick: body => this.onDeleteClick()
      }
    }
  }

  render() {
    return (
      <PostComponent
        body={ this.state.body }
        actions={ this.getActions() }
        showActions={ this.state.showActions }
        isEditing={ this.props.isEditing }
        onMouseOver={ () => this.onMouseInOut(true) }
        onMouseOut={ () => this.onMouseInOut(false) }
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

const mapStateToProps = (state, props) => ({
  isEditing: !!state.posts.editing[props.body._id]
});

const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(deletePost(id)),
  updatePost: (id, body) => dispatch(updatePost(id, body)),
  fetchThread: () => dispatch(fetchThread()),
  isPostEditing: (id, isEditing) => dispatch(isPostEditing(id, isEditing))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
