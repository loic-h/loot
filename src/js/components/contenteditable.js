import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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
    if (this.props.edit && !prevProps.edit) {
      this.input.focus();
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

  caret() {
    const range = document.createRange();
    range.selectNodeContents(this.input);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  render() {
    const classes = classnames
    return (
      <div
        className={classnames({
          'contenteditable': true,
          [this.props.className]: true,
          'contenteditable--edit': this.props.edit
        })}
        onBlur={e => this.onBlur(e)}
        onFocus={e => this.onFocus(e)}
        contentEditable={this.props.edit}
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
  placeholder: PropTypes.string,
  edit: PropTypes.bool
};

ContentEditable.defaultProps = {
  edit: true
};

export default ContentEditable;
