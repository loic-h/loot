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
    selectedControl: state.postControls.selectedControls[props.id]
  }
};

const mapDispatchToProps = (dispatch, props) => ({
  deletePost: () => dispatch(deletePost(props.id)).then(id => {
    dispatch(fetchThread())
  }),
  fetchThread: () => dispatch(fetchThread()),
  hideControls: () => {
    dispatch(togglePostControls(props.id, false));
    dispatch(selectPostControls(props.id, false));
  }
});

Panel.propTypes = {
  id: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
