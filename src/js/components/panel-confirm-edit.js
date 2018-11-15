import React from 'react';
import PropTypes from 'prop-types';
import ControlList from './control-list';
import { x, check, image } from 'react-icons-kit/feather/';

const PanelConfirm = ({
  label,
  onConfirm,
  onCancel,
  onUploadChange
}) => {
  const controls = {
    upload: {
      id: "upload",
      iconDefault: image,
      onFileChange: onUploadChange
    },
    confirm: {
      id: "confirm",
      iconDefault: check,
      onClick: onConfirm
    },
    cancel: {
      id: "cancel",
      iconDefault: x,
      onClick: onCancel
    }
  }
  return (
    <div className="panel panel--confirm panel-confirm">
      <div className="panel-confirm__label">
        { label }
      </div>
      <ControlList controls={ controls } controlModifiers={ ["light"] } />
    </div>
  );
}

PanelConfirm.propTypes = {
  postId: PropTypes.string,
  label: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
}

PanelConfirm.defaultProps = {
  label: ""
}

export default PanelConfirm;
