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

    this.controls = {
      more: {
        label: "open",
        icon: moreHorizontal,
        onClick: () => this.props.togglePostControls(this.props.id, !this.props.isOpened)
      },
      close: {
        label: "close",
        icon: x,
        onClick: () => this.props.togglePostControls(this.props.id, !this.props.isOpened)
      },
      edit: {
        label: "edit",
        icon: edit2,
        onClick: () => {
          this.props.selectPostControls(this.props.id, 'edit');
          this.setState({ savedBody: { ...this.state.body } });
        }
      },
      delete: {
        label: "delete",
        icon: trash2,
        onClick: () => this.props.selectPostControls(this.props.id, 'delete')
      },
      cancel: {
        label: "cancel",
        icon: x,
        onClick: () => this.props.selectPostControls(this.props.id, false)
      },
      confirmDelete: {
        label: "confirm",
        icon: check,
        onClick: () => {
          this.props.deletePost(this.props.id)
            .then(() => {
              this.props.selectPostControls(this.props.id, false);
              this.props.fetchThread();
            });
        }
      },
      confirmEdit: {
        label: "confirm",
        icon: check,
        onClick: () => {

        }
      }
    }
  }

  getControls() {
    let controls;
    if (this.props.isOpened) {
      controls = ["edit", "delete", "close"];
    }
    else if (this.props.isDeleteSelected) {
      controls = ["cancel", "confirmDelete"];
    }
    else if (this.props.isEditSelected) {
      controls = ["cancel", "confirmEdit"];
    }
    else {
      controls = ["more"];
    }

    return this.getControlsFromKeys(controls);
  }

  getControlsFromKeys(keys) {
    return keys.reduce((obj, key) => {
      obj[key] = this.controls[key];
      return obj;
    }, {});
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
