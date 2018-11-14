import React from "react";
import PropTypes from 'prop-types';
import classnames from "classnames";
import { Icon } from 'react-icons-kit';

let uniqueFileId = 0;

class InputFile extends React.Component {

  componentDidMount() {
    uniqueFileId++;
  }

  onChange(e) {
    const file = e.target.files[0];

    if (file['type'].indexOf('image') < 0) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const thumb = reader.result;
      if (this.props.onChange) {
        this.props.onChange(file, thumb);
      }
    };
    reader.readAsDataURL(file);
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
          onChange={ e => this.onChange(e) } />
      </div>
    );
  }
}

InputFile.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func
};

export default InputFile;
