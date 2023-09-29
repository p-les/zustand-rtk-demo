import { combineReducers } from 'redux';

import messageSlice from './features/messages/messages.slice';
import postsSlice from './features/posts/posts.slice';

export default combineReducers({
	messages: messageSlice,
	posts: postsSlice,
});
