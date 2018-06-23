const expect = require('chai').expect;
let reducer = require('../../../src/js/reducers/posts');
const posts = require('../../fixtures/posts-with-ids');

const initialState = reducer.initialState;
reducer = reducer.default;

const {
  FETCH_POSTS_LOAD,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  ADD_POST_LOAD,
  ADD_POST_SUCCESS,
  ADD_POST_ERROR
} = require('../../../src/js/actions/posts');

describe('posts', () => {

  it('should return initial state', () => {
    const state = reducer(undefined, {});
    expect(state).to.equal(initialState);
  });

  it('should handle FETCH_POSTS_LOAD', () => {
    const state = reducer([], { type: FETCH_POSTS_LOAD });
    expect(state).to.deep.include({
      isFetching: true,
      errorFetching: false
    });
  });

  it('should handle FETCH_POSTS_SUCCESS', () => {
    const state = reducer(initialState, { type: FETCH_POSTS_SUCCESS, posts });
    expect(state).to.have.deep.property('byId', { "post_1": posts[0], "post_2": posts[1] });
    expect(state).to.deep.include({
      isFetching: false,
      errorFetching: false
    });
  });

  it('should handle ADD_POST_LOAD', () => {
    const state = reducer([], { type: ADD_POST_LOAD });
    expect(state).to.deep.include({
      isAdding: true,
      errorAdding: false
    });
  });

  it('should handle ADD_POST_SUCCESS', () => {
    const state = reducer(initialState, { type: ADD_POST_SUCCESS, post: posts[0] });
    expect(state).to.have.deep.property('byId', { "post_1": posts[0] });
    expect(state).to.deep.include({
      isAdding: false,
      errorAdding: false
    });
  });
});
