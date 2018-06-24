import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostComponent from '../components/post';
import { deletePost } from '../actions/posts';
import { fetchThread } from '../actions/thread';

class Post extends React.Component {

  onDeleteClick() {
    this.props.deletePost(this.props.item._id)
      .then(() => this.props.fetchThread());
  }

  render() {
    return (
      <PostComponent item={ this.props.item } onDeleteClick = {() => this.onDeleteClick()} />
    );
  }
}

Post.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.required,
    content: PropTypes.string.required
  }),
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(deletePost(id)),
  fetchThread: () => dispatch(fetchThread())
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
