import React from 'react';
import PropTypes from 'prop-types';
import Control from './control';

const ControlList = ({
  id,
  controls,
  controlModifiers
}) => (
  <div className="control-list">
    { Object.keys(controls).map(key => (
      <Control key={ key } { ...controls[key] } modifiers={ controlModifiers } />
    )) }
  </div>
)

ControlList.propTypes = {
  controls: PropTypes.object,
  controlModifiers: PropTypes.array
};

export default ControlList;
