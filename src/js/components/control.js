import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon } from 'react-icons-kit';

class Control extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      icon: this.props.id
    }
  }

  onMouseOver() {
    if (this.props.hover) {
      this.setState({ icon: this.props.hover });
    }
  }

  onMouseLeave() {
    if (this.props.hover) {
      this.setState({ icon: this.props.id });
    }
  }

  render() {
    const classes = {
      'control': true,
      'is-active': this.props.active
    };
    this.props.modifiers.forEach(modifier => classes[`control--${modifier}`] = true);
    return (
      <button
        className={classnames(classes)}
        onClick={ () => this.props.onClick() }
        onMouseOver={ () => this.onMouseOver() }
        onMouseLeave={ () => this.onMouseLeave() }
      >
        <Icon icon={ this.state.icon } />
      </button>
    );
  }
}

Control.propTypes = {
  id: PropTypes.object, // svg icon
  hover: PropTypes.object, // svg icon
  label: PropTypes.string,
  modifiers: PropTypes.array,
  active: PropTypes.bool,
  onClick: PropTypes.func
};

Control.defaultProps = {
  modifiers: []
};

export default Control;
