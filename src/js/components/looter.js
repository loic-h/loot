import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Looter = ({
  value,
  focused,
  onPlaceholderClick,
  onInputBlur,
  onInputChange
}) => (
  <div className={classnames({ 'looter': true, 'looter--focus': focused })}>
    <div className="looter__box">
      {!focused ? (
        <div
          className="looter__placeholder"
          onClick={e => onPlaceholderClick(e)}>
          Loot
        </div>
      ) : (
        <input
          type="text"
          className="looter__input"
          placeholder="Add, Search, #Filter..."
          onBlur={e => onInputBlur(e)}
          onChange={e => onInputChange(e.target.value)}
          autoFocus
          value={value} />
      )}
    </div>
  </div>
);

Looter.propTypes = {
  value: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
  onPlaceholderClick: PropTypes.func.isRequired,
  onInputBlur: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired
};

export default Looter;
