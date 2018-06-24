import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class ContentEditable extends React.Component {

  componentDidMount(prevProps) {
    if (this.props.autoFocus) {
      ReactDOM.findDOMNode(this.input).focus();
      this.caret();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.html !== prevProps.html) {
      this.caret();
    }
  }

  onBlur(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  onFocus(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  onChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.innerHTML)
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
        onBlur={e => this.onBlur(e)}
        onFocus={e => this.onFocus(e)}
        onInput={e => this.onChange(e)}
        contentEditable="true"
        placeholder={this.props.placeholder}
        ref={el => this.input = el}
        dangerouslySetInnerHTML={{__html: this.props.html}} />
    );
  }
}

ContentEditable.propTypes = {
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  html: PropTypes.string,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string
};

export default ContentEditable;
