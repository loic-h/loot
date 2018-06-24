import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostComponent from '../components/post';
import { deletePost, isPostEditing } from '../actions/posts';
import { fetchThread } from '../actions/thread';

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showActions: false
    }
  }

  onDeleteClick() {
    this.props.deletePost(this.props.body._id)
      .then(() => this.props.fetchThread());
  }

  onEditClick() {
    this.props.isPostEditing(this.props.body._id, true);
  }

  onMouseInOut(hover = true) {
    if (!this.props.isEditing) {
      this.setState({ showActions: hover });
    } else {
      this.setState({ showActions: true });
    }
  }

  getActions() {
    if (this.props.isEditing) {
      return {
        save: {
          label: "save",
          onClick: () => {
            console.log('save');
          }
        },
        cancel: {
          label: "cancel",
          onClick: () => {
            this.props.isPostEditing(this.props.body._id, false);
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
        body={ this.props.body }
        actions={ this.getActions() }
        showActions={ this.state.showActions }
        isEditing={ this.props.isEditing }
        onMouseOver= { () => this.onMouseInOut(true) }
        onMouseOut= { () => this.onMouseInOut(false) } />
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
  editPost: id => dispatch(editPost(id)),
  fetchThread: () => dispatch(fetchThread()),
  isPostEditing: (id, isEditing) => dispatch(isPostEditing(id, isEditing))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
