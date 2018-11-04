import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Textarea from './textarea';

const Looter = ({
  value,
  focused,
  onPlaceholderClick,
  onInputBlur,
  onInputChange,
  inputDisabled
}) => (
  <div className={classnames({ 'looter': true, 'looter--focus': focused })}>
    {!focused ? (
      <div
        className="looter__placeholder looter__bordered-input"
        onClick={e => onPlaceholderClick(e)}>
        Loot
      </div>
    ) : (
      <div className="looter__form">
        <Textarea
          className="looter__input looter__bordered-input"
          placeholder="Add, Search, #Filter..."
          onBlur={e => onInputBlur(e)}
          onChange={value => onInputChange(value)}
          value={value}
          edit={true} />
      </div>
    )}
  </div>
);

Looter.propTypes = {
  value: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
  onPlaceholderClick: PropTypes.func.isRequired,
  onInputBlur: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  inputDisabled: PropTypes.bool
};

export default Looter;
