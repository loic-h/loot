import React from 'react';
import { connect } from 'react-redux';
import ThreadComponent from '../components/thread';
import { fetchThread } from '../actions/thread';
import { addPost } from '../actions/post';

class Thread extends React.Component {

  componentDidMount() {
    this.props.fetchThread();
  }

  onAddClick(query) {
    if (query !== "") {
      this.props.addPost({
        content: query
      }).then(() => this.props.fetchThread());
    }
  }

  render() {
    return (
      <ThreadComponent
        items={this.props.items}
        addQuery={this.props.addQuery}
        onAddClick={query => this.onAddClick(query)} />
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.thread.postIds.map(id => state.posts.byId[id]),
  addQuery: state.thread.postIds.length <= 0 &&
    state.looter.value !== '' &&
    state.looter.value
});

const mapDispatchToProps = (dispatch) => ({
  fetchThread: () => dispatch(fetchThread()),
  addPost: body => dispatch(addPost(body)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
