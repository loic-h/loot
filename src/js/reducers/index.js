import { combineReducers } from 'redux';
import posts from './posts';
import thread from './thread';
import looter from './looter';

export default combineReducers({
  posts,
  thread,
  looter
});
