import { combineReducers } from 'redux';
import posts from './posts';
import thread from './thread';

export default combineReducers({
  posts,
  thread
});
