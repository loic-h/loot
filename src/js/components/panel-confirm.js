import React from 'react';
import PropTypes from 'prop-types';
import ControlList from './control-list';
import { x, check } from 'react-icons-kit/feather/';

const PanelConfirm = ({
  label,
  onConfirm,
  onCancel
}) => {
  const controls = {
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
  label: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
}

PanelConfirm.defaultProps = {
  label: ""
}

export default PanelConfirm;
