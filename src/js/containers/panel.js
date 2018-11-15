import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePost, savePost, mockPost } from '../actions/post';
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
            this.props.savePost(this.props.mockedBody)
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
          onUploadChange: (file, thumb) => {
            const mockedBody = {
              ...this.props.mockedBody,
              thumb
            };
            this.props.mockPost(mockedBody);
          }
        }
      }
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
  savePost: body => dispatch(savePost(props.id, body)),
  fetchThread: () => dispatch(fetchThread()),
  resetPost: body => dispatch(mockPost(props.id)),
  mockPost: body => dispatch(mockPost(props.id, body)),
  hideControls: () => {
    dispatch(togglePostControls(props.id, false));
    dispatch(selectPostControls(props.id, false));
  }
});

Panel.propTypes = {
  id: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
