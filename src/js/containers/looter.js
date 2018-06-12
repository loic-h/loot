import React from 'react';
import { connect } from 'react-redux';
import LooterComponent from '../components/looter';
import { focusLooter, blurLooter, valueLooter } from '../actions/looter';

class Looter extends React.Component {

  onPlaceholderClick() {
    this.props.focusLooter();
  }

  onInputBlur() {
    if (this.props.value === "") {
      this.props.blurLooter();
    }
  }

  onInputChange(value) {
    this.props.valueLooter(value);
  }

  render() {
    return (
      <LooterComponent
        value={this.props.value}
        focused={this.props.focus}
        onPlaceholderClick={() => this.onPlaceholderClick()}
        onInputBlur={() => this.onInputBlur()}
        onInputChange={value => this.onInputChange(value)} />
    )
  }
}

const mapStateToProps = state => ({
  focus: state.looter.focus,
  value: state.looter.value
});

const mapDispatchToProps = dispatch => ({
  focusLooter: () => dispatch(focusLooter()),
  blurLooter: () => dispatch(blurLooter()),
  valueLooter: value => dispatch(valueLooter(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Looter);
