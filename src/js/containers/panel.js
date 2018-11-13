import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePost, updatePost, mockPost } from '../actions/post';
import { togglePostControls, selectPostControls } from '../actions/post-controls';
import { fetchThread } from '../actions/thread';
import PanelConfirm from '../components/panel-confirm';
import PanelConfirmEdit from '../components/panel-confirm-edit';

class Panel extends React.Component {

  constructor(props) {
    super(props);
    this.panels = {
      delete: {
        component: PanelConfirm,
        props: {
          label: "Do you want to delete this post?",
          onConfirm: () => this.props.deletePost(this.props.id),
          onCancel: () => this.props.hideControls()
        }
      },
      edit: {
        component: PanelConfirmEdit,
        props: {
          postId: this.props.id,
          label: "Save?",
          onConfirm: () => {
            this.props.updatePost(this.props.mockedBody)
              .then(() => {
                this.props.fetchThread();
                this.props.hideControls();
                this.props.resetPost();
            });
          },
          onCancel: () => {
            this.props.resetPost();
            this.props.hideControls();
          },
          onUploadClick: () => {
            console.log("upload");
          }
        }
      },
      delete: {
        component: PanelConfirm,
        props: {
          label: "Save?",
          onConfirm: () => console.log("save image"),
          onCancel: () => this.props.hideControls()
        }
      },
    };
  }

  render() {
    const panel = this.panels[this.props.selectedControl];
    const Component = panel && panel.component;
    if (Component) {
      return (
        <Component { ...panel.props }/>
      );
    }
    return null;
  }
}

const mapStateToProps = (state, props) => {
  return {
    selectedControl: state.postControls.selectedControls[props.id],
    mockedBody: state.post.mocked[props.id]
  }
};

const mapDispatchToProps = (dispatch, props) => ({
  deletePost: () => dispatch(deletePost(props.id)).then(id => {
    dispatch(fetchThread())
  }),
  updatePost: body => dispatch(updatePost(props.id, body)),
  fetchThread: () => dispatch(fetchThread()),
  resetPost: body => dispatch(mockPost(props.id)),
  hideControls: () => {
    dispatch(togglePostControls(props.id, false));
    dispatch(selectPostControls(props.id, false));
  }
});

Panel.propTypes = {
  id: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
