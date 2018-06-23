const expect = require('chai').expect;
const fetchMock = require('fetch-mock');
const thunk = require('redux-thunk').default;
const configureMockStore = require('redux-mock-store');
const posts = require('../../fixtures/posts-without-ids');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const {
  FETCH_POSTS_LOAD,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  loadPosts,
  successPosts,
  errorPosts,
  fetchPosts,
  ADD_POST_LOAD,
  ADD_POST_SUCCESS,
  ADD_POST_ERROR,
  addPostLoad,
  addPostSuccess,
  addPostError,
  addPost
} = require('../../../src/js/actions/posts');

describe('for posts', () => {

  afterEach(() => {
    fetchMock.restore();
  });

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

    it('for loading add', () => {
      expect(ADD_POST_LOAD).to.equal('ADD_POST_LOAD');
    });

    it('for successed add', () => {
      expect(ADD_POST_SUCCESS).to.equal('ADD_POST_SUCCESS');
    });

    it('for error add', () => {
      expect(ADD_POST_ERROR).to.equal('ADD_POST_ERROR');
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

  describe('fetch', done => {

    it('should successfully load posts', done => {
      fetchMock.getOnce('/api/posts', {
        body: posts,
        headers: { 'content-type': 'application/json'}
      });

      const store = mockStore();

      const expectedActions = [
        { type: FETCH_POSTS_LOAD },
        { type: FETCH_POSTS_SUCCESS, posts }
      ];

      store.dispatch(fetchPosts())
        .then(payload => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          expect(payload).to.deep.equal(posts);
          done();
        });
    });

    it('should fail', done => {
      fetchMock.getOnce('/api/posts', { throws: 'error' });

      const store = mockStore();

      store.dispatch(fetchPosts())
        .catch(err => {
          expect(err).to.equal('error');
          expect(store.getActions()).to.deep.include({ 'type': FETCH_POSTS_ERROR });
          done();
        });
    });
  });

  it('should define action for loading add', () => {
    const action = addPostLoad();
    expect(action.type).to.equal(ADD_POST_LOAD);
  });

  it('should define action for successed add', () => {
    const action = addPostSuccess('foo');
    expect(action.type).to.equal(ADD_POST_SUCCESS);
    expect(action.post).to.equal('foo');
  });

  it('should define action for error add', () => {
    const action = addPostError();
    expect(action.type).to.equal(ADD_POST_ERROR);
  });

  describe('add', () => {

    it('should success', done => {
      const store = mockStore();
      const post = posts[0];

      fetchMock.postOnce('/api/posts', {
        status: 201,
        body: post,
        headers: { 'content-type': 'application/json'}
      });

      const expectedActions = [
        { type: ADD_POST_LOAD },
        { type: ADD_POST_SUCCESS, post }
      ];

      store.dispatch(addPost())
        .then(payload => {
          expect(store.getActions()).to.deep.equal(expectedActions);
          expect(payload).to.deep.equal(post);
          done();
        });
    });

    it('should fail', done => {
      const store = mockStore();

      fetchMock.postOnce('/api/posts', { throws: 'error' });

      store.dispatch(addPost())
        .catch(err => {
          expect(err).to.equal('error');
          expect(store.getActions()).to.deep.include({ 'type': ADD_POST_ERROR, error: err });
          done();
        });
    });
  });
});
