import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class ContentEditable extends React.Component {

  componentDidMount(prevProps) {
    if (this.props.autoFocus) {
      ReactDOM.findDOMNode(this.input).focus();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.html !== prevProps.html) {
      this.caret();
    }
  }

  caret() {
    const range = document.createRange();
    range.selectNodeContents(this.input);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  render() {
    return (
      <div
        className={this.props.className}
        onBlur={e => this.props.onBlur(e)}
        onInput={e => this.props.onChange(e.target.innerHTML)}
        contentEditable="true"
        placeholder={this.props.placeholder}
        ref={el => this.input = el}
        dangerouslySetInnerHTML={{__html: this.props.html}} />
    );
  }
}

ContentEditable.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  html: PropTypes.string,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string
};

export default ContentEditable;
