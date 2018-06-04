const expect = require('chai').expect;
let reducer = require('../../../src/js/reducers/thread');
const posts = require('../../fixtures/posts-with-ids');

const initialState = reducer.initialState;
reducer = reducer.default;

const {
  FETCH_THREAD_LOAD,
  FETCH_THREAD_SUCCESS,
  FETCH_THREAD_ERROR
} = require('../../../src/js/actions/thread');

describe('thread', () => {

  it('should return initial state', () => {
    const state = reducer(undefined, {});
    expect(state).to.equal(initialState);
  });

  it('should handle FETCH_THREAD_LOAD', () => {
    const state = reducer([], { type: FETCH_THREAD_LOAD });
    expect(state).to.deep.equal({ isFetching: true });
  });

  it('should handle FETCH_THREAD_SUCCESS', () => {
    const state = reducer(initialState, { type: FETCH_THREAD_SUCCESS, postIds: ["post_1"] });
    expect(state).to.have.deep.property('postIds', ["post_1"]);
    expect(state).to.have.property('isFetching': false);
  });

  it('should merge results on FETCH_THREAD_SUCCESS', () => {
    const state = reducer({ postIds: ["post_1"] }, { type: FETCH_THREAD_SUCCESS, postIds: ["post_2"] });
    expect(state).to.have.deep.property('postIds', ["post_1", "post_2"]);
  });
});
