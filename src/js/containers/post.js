import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostComponent from '../components/post';
import { deletePost, updatePost, isPostInAction, errorPostInAction } from '../actions/posts';
import { fetchThread } from '../actions/thread';

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      body: props.body,
      mockBody: null,
      showActions: false
    }
  }

  onDeleteClick() {
    this.props.isPostInAction(this.state.body._id, 'delete');
  }

  onEditClick() {
    this.props.isPostInAction(this.state.body._id, 'edit');
    this.setState({ savedBody: { ...this.state.body } });
  }

  onMouseInOut(hover = true) {
    if (!this.props.isInAction) {
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
                this.props.isPostInAction(this.state.body._id, false);
                this.setState({ savedBody: null });
              });
          }
        },
        cancel: {
          label: "cancel",
          onClick: () => {
            this.props.isPostInAction(this.state.body._id, false);
            this.setState({
              body: this.state.savedBody,
              savedBody: null
            });
          }
        }
      }
    }

    if (this.props.isDeleting) {
      return {
        save: {
          label: "confirm deletion",
          onClick: () => {
            this.props.deletePost(this.state.body._id)
              .then(() => {
                this.props.isPostInAction(this.state.body._id, false);
                this.props.fetchThread();
              });
          }
        },
        cancel: {
          label: "cancel",
          onClick: () => {
            this.props.isPostInAction(this.state.body._id, false);
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

const mapStateToProps = (state, props) => {
  const action = state.posts.inAction[props.body._id];
  return {
    isInAction: !!action,
    isEditing: !!action && action.action === 'edit',
    isDeleting: !!action && action.action === 'delete'
  }
};

const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(deletePost(id)),
  updatePost: (id, body) => dispatch(updatePost(id, body)),
  fetchThread: () => dispatch(fetchThread()),
  isPostInAction: (id, action) => dispatch(isPostInAction(id, action)),
  errorPostInAction: (id, error) => dispatch(errorPostInAction(id, error))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
