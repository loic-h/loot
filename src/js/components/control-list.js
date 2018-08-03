import React from 'react';
import PropTypes from 'prop-types';
import Control from './control';

const ControlList = ({
  id,
  controls
}) => (
  <div className="control-list">
    { Object.keys(controls).map(key => (
      <Control key={ key } {...controls[key]} />
    )) }
  </div>
)

ControlList.propTypes = {
  controls: PropTypes.object
};

export default ControlList;
