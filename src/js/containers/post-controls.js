import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostControlsComponent from '../components/post-controls';
import { moreHorizontal, trash2, edit2, x, check } from 'react-icons-kit/feather/';
import { fetchThread } from '../actions/thread';
import { deletePost, updatePost } from '../actions/post';
import { togglePostControls, selectPostControls } from '../actions/post-controls';


class PostControls extends React.Component {

  constructor(props) {
    super(props);

    this.defaultControls = {
      more: {
        label: "open",
        icon: moreHorizontal,
        onClick: () => this.onOpenClick()
      }
    };

    this.openedControls = {
      edit: {
        label: "edit",
        icon: edit2,
        onClick: () => this.onEditClick(),
      },
      delete: {
        label: "delete",
        icon: trash2,
        onClick: () => this.onDeleteClick()
      },
      more: {
        label: "close",
        icon: x,
        onClick: () => this.onOpenClick()
      }
    };

    this.deleteControls = {
      cancel: {
        label: "cancel",
        icon: x,
        onClick: () => this.props.selectPostControls(this.props.id, false)
      },
      confirm: {
        label: "confirm",
        icon: check,
        onClick: () => {
          this.props.deletePost(this.props.id)
            .then(() => {
              this.props.selectPostControls(this.props.id, false);
              this.props.fetchThread();
            });
        }
      }
    };
  }

  onOpenClick() {
    this.props.togglePostControls(this.props.id, !this.props.isOpened);
  }

  onDeleteClick() {
    this.props.selectPostControls(this.props.id, 'delete');
  }

  onEditClick() {
    this.props.selectPostControls(this.props.id, 'edit');
    this.setState({ savedBody: { ...this.state.body } });
  }

  getControls() {
    // if (this.props.isEditing) {
    //   return {
    //     save: {
    //       label: "save",
    //       onClick: () => {
    //         this.props.updatePost(this.props.id, {
    //           content: this.state.body.content
    //         })
    //           .then(() => {
    //             this.props.isPostInAction(this.props.id, false);
    //             this.setState({ savedBody: null });
    //           });
    //       }
    //     },
    //     cancel: {
    //       label: "cancel",
    //       onClick: () => {
    //         this.props.isPostInAction(this.props.id, false);
    //         this.setState({
    //           body: this.state.savedBody,
    //           savedBody: null
    //         });
    //       }
    //     }
    //   }
    // }
    //
    // if (this.props.isDeleting) {
    //   return {
    //     save: {
    //       label: "confirm deletion",
    //       onClick: () => {
    //         this.props.deletePost(this.props.id)
    //           .then(() => {
    //             this.props.isPostInAction(this.props.id, false);
    //             this.props.fetchThread();
    //           });
    //       }
    //     },
    //     cancel: {
    //       label: "cancel",
    //       onClick: () => {
    //         this.props.isPostInAction(this.props.id, false);
    //       }
    //     }
    //   }
    // }

    if (this.props.isOpened) {
      return this.openedControls;
    }

    if (this.props.isDeleteSelected) {
      console.log('yo')
      return this.deleteControls;
    }

    if (this.props.isEditSelected) {
      return this.editControls;
    }

    return this.defaultControls;
  }

  render() {
    return (
      <PostControlsComponent
        actions={ this.getControls() }
        isOpened={ this.props.isOpened } />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    isOpened: state.postControls.opened.indexOf(props.id) >= 0,
    isDeleteSelected: state.postControls.selectedControls[props.id] === 'delete',
    isEditSelected: state.postControls.selectedControls[props.id] === 'edit'
  }
};

const mapDispatchToProps = dispatch => ({
  togglePostControls: (id, toggle) => dispatch(togglePostControls(id, toggle)),
  selectPostControls: (id, action) => dispatch(selectPostControls(id, action)),
  deletePost: id => dispatch(deletePost(id)),
  updatePost: (id, body) => dispatch(updatePost(id, body)),
  fetchThread: () => dispatch(fetchThread())
});

PostControls.propTypes = {
  id: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PostControls);
