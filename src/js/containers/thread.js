import React from 'react';
import { connect } from 'react-redux';
import ThreadComponent from '../components/thread';
import { fetchThread } from '../actions/thread';

class Thread extends React.Component {

  componentDidMount() {
    this.props.fetchThread();
  }

  render() {
    return (
      <ThreadComponent items={this.props.items} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.thread.postIds.map(id => state.posts.byId[id])
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchThread: () => dispatch(fetchThread())
})

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
