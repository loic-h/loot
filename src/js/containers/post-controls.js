import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ControlListComponent from '../components/control-list';
import { moreHorizontal, trash2, edit2, x, check } from 'react-icons-kit/feather/';
import { togglePostControls, selectPostControls } from '../actions/post-controls';


class PostControls extends React.Component {

  constructor(props) {
    super(props);

    this.controls = {
      more: {
        label: "open",
        id: moreHorizontal,
        onClick: () => this.props.togglePostControls(!this.props.isOpened)
      },
      close: {
        label: "close",
        id: x,
        onClick: () => this.props.togglePostControls(!this.props.isOpened)
      },
      edit: {
        label: "edit",
        id: edit2,
        onClick: () => this.props.selectPostControls('edit')
      },
      delete: {
        label: "delete",
        id: trash2,
        onClick: () => this.props.selectPostControls('delete')
      },
      deleteSelected: {
        label: "delete-selected",
        id: trash2,
        active: true,
        hover: x,
        onClick: () => {
          this.props.selectPostControls(false);
          this.props.togglePostControls(false);
        }
      },
      editSelected: {
        label: "edit-selected",
        id: edit2,
        active: true,
        hover: x,
        onClick: () => {
          this.props.selectPostControls(false);
          this.props.togglePostControls(false);
        }
      }
    }
  }

  getControls() {
    let controls;
    if (this.props.isDeleteSelected) {
      controls = ["deleteSelected"];
    }
    else if (this.props.isEditSelected) {
      controls = ["editSelected"];
    }
    else if (this.props.isOpened) {
      controls = ["edit", "delete", "close"];
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
      <ControlListComponent
        controls={ this.getControls() } />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    isOpened: state.postControls.opened.indexOf(props.id) >= 0,
    selectedControl: state.postControls.selectedControls[props.id],
    isDeleteSelected: state.postControls.selectedControls[props.id] === 'delete',
    isEditSelected: state.postControls.selectedControls[props.id] === 'edit'
  }
};

const mapDispatchToProps = (dispatch, props) => ({
  togglePostControls: toggle => dispatch(togglePostControls(props.id, toggle)),
  selectPostControls: action => dispatch(selectPostControls(props.id, action))
});

PostControls.propTypes = {
  id: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PostControls);
