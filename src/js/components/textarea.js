import React from 'react';
import classnames from 'classnames';

export default class Text extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      height: '1em',
      focus: false
    };
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    if (this.props.edit) {
      this.setInputHeight();
      this.input.focus();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.edit && (!prevProps.edit || prevProps.value !== this.props.value)) {
      this.setInputHeight();
    }

    if (this.input && this.props.edit && !prevProps.edit) {
      this.input.focus();
    }
  }

  setInputHeight() {
    if (this.props.edit) {
      this.input.style.height = `${this.ghost.clientHeight}px`;
    }
  }

  getGhostValue(value) {
    value = value && value !== '' ? value : ' ';
    return value.replace(/\r?\n$/g,'<br/>&nbsp;');
  }

  onChange(event) {
    this.props.onChange(event.target.value);
  }

  onFocus() {
    this.setState({focus: true});
  }

  onBlur() {
    this.setState({focus: false});
  }

  remove() {
    this.props.remove(this.props.name);
  }

  render() {
    return (
      <div className={classnames({
        'textarea': true,
        [`textarea--${this.props.name}`]: true,
        'textarea--focus': this.state.focus,
        [this.props.className]: this.props.className
      })}>
        {this.props.edit ? (
          <div className="textarea__content textarea__content--input">
            <textarea
              className="textarea__input"
              {...this.props.attr}
              ref={el => this.input = el}
              name={this.props.name}
              value={this.props.value}
              onChange={event => this.onChange(event)}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              placeholder={this.props.placeholder} />
            <div
              ref={el => this.ghost = el}
              className="textarea__ghost"
              contentEditable="true"
              dangerouslySetInnerHTML={{__html: this.getGhostValue(this.props.value)}}>
            </div>
          </div>
        ) : (
          <div className="textarea__content textarea__content--display">
            {this.props.render ? this.props.render(this.props.value) : (
              <div dangerouslySetInnerHTML={{__html: this.props.value}} />
            )}
          </div>
        )}
      </div>
    );
  }
}
