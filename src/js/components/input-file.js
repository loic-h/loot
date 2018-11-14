import React from "react";
import PropTypes from 'prop-types';
import classnames from "classnames";
import { Icon } from 'react-icons-kit';

let uniqueFileId = 0;

class InputFile extends React.Component {

  componentDidMount() {
    uniqueFileId++;
  }

  onChange() {
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  render() {
    return (
      <div className={classnames(
        "input-file": true,
        this.props.className
      )}>
        <label
          htmlFor={`file_${uniqueFileId}`}
        >
          { this.props.children }
        </label>
        <input
          id={`file_${uniqueFileId}`}
          type="file"
          onChange={ () => this.onChange() } />
      </div>
    );
  }
}

InputFile.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func
};

export default InputFile;
