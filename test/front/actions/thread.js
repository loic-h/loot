const chai = require('chai');
const fetchMock = require('fetch-mock');
const thunk = require('redux-thunk').default;
const configureMockStore = require('redux-mock-store');
const posts = require('../../fixtures/posts');

const expect = chai.expect;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const {
  FETCH_THREAD_LOAD,
  FETCH_THREAD_SUCCESS,
  FETCH_THREAD_ERROR,
  loadThread,
  successThread,
  errorThread,
  fetchThread
} = require('../../../src/js/actions/thread');

describe('for thread', () => {

  describe('should define type', () => {

    it('for loading thread', () => {
      expect(FETCH_THREAD_LOAD).to.equal('FETCH_THREAD_LOAD');
    });

    it('for successed thread', () => {
      expect(FETCH_THREAD_SUCCESS).to.equal('FETCH_THREAD_SUCCESS');
    });

    it('for error thread', () => {
      expect(FETCH_THREAD_ERROR).to.equal('FETCH_THREAD_ERROR');
    });

  });

  it('should define action for loading thread', () => {
    const action = loadThread();
    expect(action.type).to.equal(FETCH_THREAD_LOAD);
  });

  it('should define action for success thread', () => {
    const action = successThread('foo');
    expect(action.type).to.equal(FETCH_THREAD_SUCCESS);
    expect(action.postIds).to.equal('foo');
  });

  it('should define action for error thread', () => {
    const action = errorThread();
    expect(action.type).to.equal(FETCH_THREAD_ERROR);
  });

  describe('for fetching', () => {

    it.only('should successfully load thread', done => {
      fetchMock.getOnce('/api/posts', {
        body: posts,
        headers: { 'content-type': 'application/json'}
      });

      const store = mockStore();

      store.dispatch(fetchThread())
        .then(payload => {
          expect(store.getActions()).to.deep.include({ 'type': FETCH_THREAD_LOAD });
          const successAction = store.getActions().find(action => action.type === FETCH_THREAD_SUCCESS);
          expect(successAction).to.be.not.undefined;
          expect(successAction).to.have.deep.property('postIds')
            .that.deep.equal(['post_1', 'post_2']);
          done();
        });
    });
  });

});
