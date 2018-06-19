import React from 'react';
import { connect } from 'react-redux';
import LooterComponent from '../components/looter';
import { focusLooter, blurLooter, valueLooter } from '../actions/looter';
import { addPost } from '../actions/posts';

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

  onSubmitClick() {
    if (this.props.value !== "") {
      this.props.addPost({
        content: this.props.value
      });
    }
  }

  render() {
    return (
      <LooterComponent
        value={this.props.value}
        focused={this.props.focus}
        onPlaceholderClick={() => this.onPlaceholderClick()}
        onInputBlur={() => this.onInputBlur()}
        onInputChange={value => this.onInputChange(value)}
        onSubmitClick={value => this.onSubmitClick(value)} />
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
  valueLooter: value => dispatch(valueLooter(value)),
  addPost: body => dispatch(addPost(body))
});

export default connect(mapStateToProps, mapDispatchToProps)(Looter);
