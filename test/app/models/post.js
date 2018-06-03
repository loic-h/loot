const chai = require('chai');
const mongoose = require('mongoose');
const config = require('../../../config');
const Post = require('../../../app/models/post');
const posts = require('../../fixtures/posts-without-ids');

const expect = chai.expect;

describe('Model Post', () => {

  describe('unit testing', () => {

    it ('should be invalid if content is empty', done => {
      const post = new Post();
      post.validate(err => {
        expect(err).to.exist;
        done();
      })
    });

    it ('should save content', done => {
      const post = new Post({
        content: 'Lorem ipsum'
      });
      post.validate(err => {
        expect(err).not.to.exist;
        done();
      })
    });
  });

  describe('integration testing', () => {
    before(() => {
      mongoose.connect(config.MONGO_URI);
    });

    after(done => {
      mongoose.connection.db.dropDatabase(() => {
        mongoose.disconnect(done);
      });
    });

    it ('should save a post', done => {
      Post.insertMany(posts, (err, res) => {
        expect(err).not.to.exist;
        expect(res.length).to.equal(2);
        done();
      });
    });
  });
});
