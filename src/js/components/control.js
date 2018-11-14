import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon } from 'react-icons-kit';
import InputFile from './input-file';

class Control extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      icon: this.props.iconDefault
    }
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  onMouseOver() {
    if (this.props.iconHover) {
      this.setState({ icon: this.props.iconHover });
    }
  }

  onMouseLeave() {
    if (this.props.iconHover) {
      this.setState({ icon: this.props.iconDefault });
    }
  }

  onFileChange(file) {
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  render() {
    const classes = {
      'control': true,
      'is-active': this.props.active,
      [`control--${this.props.id}`]: true
    };
    this.props.modifiers.forEach(modifier => classes[`control--${modifier}`] = true);
    if (this.props.id === "upload") {
      return (
        <div
          className={classnames(classes)}
          onClick={ () => this.onClick() }
          onMouseOver={ () => this.onMouseOver() }
          onMouseLeave={ () => this.onMouseLeave() }
        >
          <InputFile
            className="control__input control__input--file"
            onChange={file => onFileChange(file)}
          >
            <Icon icon={ this.state.icon } />
          </InputFile>
        </div>
      );
    }
    return (
      <button
        className={classnames(classes)}
        onClick={ () => this.onClick() }
        onMouseOver={ () => this.onMouseOver() }
        onMouseLeave={ () => this.onMouseLeave() }
      >
        <Icon icon={ this.state.icon } />
      </button>
    );
  }
}

Control.propTypes = {
  id: PropTypes.string,
  iconDefault: PropTypes.object, // svg icon
  iconHover: PropTypes.object, // svg icon
  label: PropTypes.string,
  modifiers: PropTypes.array,
  active: PropTypes.bool,
  onClick: PropTypes.func
};

Control.defaultProps = {
  modifiers: []
};

export default Control;
