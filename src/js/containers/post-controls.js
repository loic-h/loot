import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ControlListComponent from '../components/control-list';
import { moreHorizontal, trash2, edit2, x, check, image } from 'react-icons-kit/feather/';
import { togglePostControls, selectPostControls } from '../actions/post-controls';
import { savePost } from '../actions/post';

class PostControls extends React.Component {

  constructor(props) {
    super(props);

    this.controls = {
      more: {
        id: 'open',
        iconDefault: moreHorizontal,
        onClick: () => this.props.togglePostControls(!this.props.isOpened)
      },
      close: {
        id: 'close',
        iconDefault: x,
        onClick: () => this.props.togglePostControls(!this.props.isOpened)
      },
      edit: {
        id: 'edit',
        iconDefault: edit2,
        onClick: () => this.props.selectPostControls('edit')
      },
      editSelected: {
        id: 'edit-selected',
        iconDefault: edit2,
        active: true,
        iconHover: x,
        onClick: () => {
          this.props.selectPostControls(false);
          this.props.togglePostControls(false);
        }
      },
      deleteSelected: {
        id: 'delete-selected',
        iconDefault: trash2,
        active: true,
        iconHover: x,
        onClick: () => {
          this.props.selectPostControls(false);
          this.props.togglePostControls(false);
        }
      },
      delete: {
        id: 'delete',
        iconDefault: trash2,
        onClick: () => this.props.selectPostControls('delete')
      },
      upload: {
        id: 'upload',
        iconDefault: image,
        onFileChange: file => this.props.saveFile(file)
      }
    }
  }

  getControls() {
    let controls;
    if (this.props.isDeleteSelected) {
      controls = ['deleteSelected'];
    }
    else if (this.props.isEditSelected) {
      controls = ['editSelected'];
    }
    else if (this.props.isOpened) {
      controls = ['upload', 'edit', 'delete', 'close'];
    }
    else {
      controls = ['more'];
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
  selectPostControls: action => dispatch(selectPostControls(props.id, action)),
  saveFile: file => dispatch(savePost(props.id, { file }))
});

PostControls.propTypes = {
  id: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PostControls);
