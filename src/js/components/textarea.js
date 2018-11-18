import React from 'react';
import classnames from 'classnames';
import { Editor, EditorState, convertToRaw, ContentState, convertFromHTML, CompositeDecorator } from 'draft-js';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';

export default class Text extends React.Component {

  constructor(props) {
    super(props);
    this.decorator = new CompositeDecorator([
      {
       strategy: findLinkEntities,
       component: Link,
      }
    ]);
    this.state = {
      editorState: this.getStateFromHtml(props.value)
    };
  }

  componentDidMount() {
    if (this.props.edit) {
      this.input.focus();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value || (!prevProps.edit && this.props.edit)) {
      let editorState = this.getStateFromHtml(this.props.value);
      editorState = EditorState.moveFocusToEnd(editorState);
      this.setState({ editorState });
    }
  }


  onChange(editorState) {
    if (this.state.editorState && this.state.editorState.getCurrentContent() !== editorState.getCurrentContent()) {
      this.setState({editorState});
      this.props.onChange(this.getText(editorState));
    }
  }

  onFocus() {
    if (this.props.onFocus) {
      this.props.onFocus(this.getText(this.state.editorState));
    }
  }

  onBlur() {
    if (this.props.onBlur) {
      this.props.onBlur(this.getText(this.state.editorState));
    }
  }

  getText(state) {
    const blocks = convertToRaw(state.getCurrentContent()).blocks;
    const text = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    return text.trim();
  }

  getStateFromHtml(content) {
    if (content === "") {
      return EditorState.createEmpty();
    }
    let editorState;
    const blocksFromHTML = convertFromHTML(content);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return EditorState.createWithContent(contentState, this.decorator);
  }

  render() {
    return (
      <div className={classnames({
        'textarea': true,
        [`textarea--${this.props.name}`]: true,
        'textarea--focus': this.state.focus,
        [this.props.className]: this.props.className
      })}>
        { this.props.edit ? (
          <Editor
            ref={ el => this.input = el }
            editorState={ this.state.editorState }
            onChange={ state => this.onChange(state) }
            onBlur={ e => this.onBlur(e) } />
        ) : (
          <div className="textarea__content textarea__content--display">
            {this.props.render ? this.props.render(this.props.value) : (
              <div className={classnames({
                [this.props.textClassname]: this.props.textClassname
              })} dangerouslySetInnerHTML={{__html: this.props.value}} />
            )}
          </div>
        ) }
      </div>
    );
  }
}

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}
const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url}>
      {props.children}
    </a>
  );
};
