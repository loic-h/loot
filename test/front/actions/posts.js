const expect = require('chai').expect;
const api = require('../../utils/api');
const posts = require('../../fixtures/posts');

const {
  FETCH_POSTS_LOAD,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  loadPosts,
  successPosts,
  errorPosts,
  fetchPosts
} = require('../../../src/js/actions/posts');

describe('for posts', () => {

  describe('should define type', () => {

    it('for loading fetch', () => {
      expect(FETCH_POSTS_LOAD).to.equal('FETCH_POSTS_LOAD');
    });

    it('for successed fetch', () => {
      expect(FETCH_POSTS_SUCCESS).to.equal('FETCH_POSTS_SUCCESS');
    });

    it('for error fetch', () => {
      expect(FETCH_POSTS_ERROR).to.equal('FETCH_POSTS_ERROR');
    });

  });

  it('should define action for loading fetch', () => {
    const action = loadPosts();
    expect(action.type).to.equal(FETCH_POSTS_LOAD);
  });

  it('should define action for successed fetch', () => {
    const action = successPosts('foo');
    expect(action.type).to.equal(FETCH_POSTS_SUCCESS);
    expect(action.posts).to.equal('foo');
  });

  it('should define action for error fetch', () => {
    const action = errorPosts();
    expect(action.type).to.equal(FETCH_POSTS_ERROR);
  });

  describe('for loading fetch', done => {

    it('should load successful posts', done => {
      const result = fetchPosts(api, posts);
      const actions = [];
      const expectedActions = [
        { type: FETCH_POSTS_LOAD },
        { type: FETCH_POSTS_SUCCESS, posts }
      ];
      const dispatch = (action) => actions.push(action);
      result(dispatch)
        .then(payload => {
          expect(actions).to.deep.equal(expectedActions);
          expect(payload).to.equal(posts);
          done();
        });
    });

    it('should fail', done => {
      const result = fetchPosts(api, null)
      result(() => {}).catch(err => {
          expect(err).to.equal('error');
          done();
        });
    });

  });
});
