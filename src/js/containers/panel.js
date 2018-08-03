import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePost, updatePost } from '../actions/post';
import { togglePostControls, selectPostControls } from '../actions/post-controls';
import PanelConfirm from '../components/panel-confirm';

class Panel extends React.Component {

  constructor(props) {
    super(props);
    this.panels = {
      delete: {
        component: PanelConfirm,
        props: {
          label: "Do you want to delete this post?",
          onConfirm: () => this.props.deletePost(this.props.id),
          onCancel: () => {
            this.props.hideControls()
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
    selectedControl: state.postControls.selectedControls[props.id]
  }
};

const mapDispatchToProps = (dispatch, props) => ({
  deletePost: () => dispatch(deletePost(props.id)),
  updatePost: body => dispatch(updatePost(id, body)),
  hideControls: () => {
    dispatch(togglePostControls(props.id, false));
    dispatch(selectPostControls(props.id, false));
  }
});

Panel.propTypes = {
  id: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);