const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const bodyParser = require('body-parser')

const Post = require('../../../app/models/post');
const controller = require('../../../app/controllers/post');
const postFixture = require('../../fixtures/posts.json');
const db = require('../../utils/db');

const expect = chai.expect;

describe('Controller post', () => {

  let app, router;

  before(async () => {
    await db.connect();
    await Post.insertMany(postFixture);
  });

  after(async () => {
    await db.disconnect();
  });

  beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    router = express.Router();
    router.get('/', controller.list);
    router.get('/:id', controller.detail);
    router.post('/', controller.create);
    router.delete('/:id', controller.delete);
    router.patch('/:id', controller.update);
    app.use('/', router);
  });

  afterEach(() => {
    app = null;
    router = null;
  });

  it ('should list posts', done => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.lengthOf(2);
        done();
      });
  });

  it ('should detail a post', done => {
    Post.findOne({ content: postFixture[0].content }, (err, item) => {
      chai.request(app)
        .get(`/${item._id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.content).to.equal(postFixture[0].content);
          done();
        });
    });
  });

  it ('should send an error if try to access an unexisting post', done => {
    chai.request(app)
      .get('/foo')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it ('should create a post', done => {
    chai.request(app)
      .post('/')
      .send({ content: 'New post' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body.content).to.equal('New post');
        done();
      });
  });

  it ('should send an error if try to create a wrong post', done => {
    chai.request(app)
      .post('/')
      .send({ content: '' })
      .end((err, res) => {
        expect(res).to.have.status(304);
        done();
      });
  });

  it ('should delete a post', done => {
    Post.findOne({ content: postFixture[0].content }, (err, item) => {
      chai.request(app)
        .delete(`/${item._id}`)
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });

  it ('should send an error if try to delete an unexisting post', done => {
    chai.request(app)
      .delete(`/foo`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it ('should update a post', done => {
    Post.findOne({}, (err, item) => {
      chai.request(app)
        .patch(`/${item._id}`)
        .send({ content: 'New content' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.ok).to.equal(1);
          expect(res.body.nModified).to.equal(1);
          done();
        });
    });
  });

  it ('should send an error if try to update an unexisting post', done => {
    chai.request(app)
      .patch('/foo')
      .send({ content: 'New post' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it ('should send an error if try to update a post width wrong content', done => {
    Post.findOne({}, (err, item) => {
      chai.request(app)
        .patch('/foo')
        .send({ content: '' })
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
