import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ContentEditable from './contenteditable';

const Looter = ({
  value,
  focused,
  onPlaceholderClick,
  onInputBlur,
  onInputChange,
  onSubmitClick,
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
        <ContentEditable
          className="looter__input looter__bordered-input"
          placeholder="Add, Search, #Filter..."
          onBlur={e => onInputBlur(e)}
          onChange={value => onInputChange(value)}
          autoFocus={true}
          html={value} />
        <button
          className="looter__submit"
          onClick={e => onSubmitClick()}
          disabled={value === ''} >
          Add
        </button>
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
  onSubmitClick: PropTypes.func.isRequired,
  inputDisabled: PropTypes.bool
};

export default Looter;
