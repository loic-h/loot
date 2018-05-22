const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const bodyParser = require('body-parser')

const Loot = require('../../../app/models/loot');
const controller = require('../../../app/controllers/loot');
const lootFixture = require('../../fixtures/loots.json');
const db = require('../../utils/db');

const expect = chai.expect;

describe('Controller loot', () => {

  let app, router;

  before(async () => {
    await db.connect();
    await Loot.insertMany(lootFixture);
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

  it ('should list loots', done => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.lengthOf(2);
        done();
      });
  });

  it ('should detail a loot', done => {
    Loot.findOne({ content: lootFixture[0].content }, (err, item) => {
      chai.request(app)
        .get(`/${item._id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.content).to.equal(lootFixture[0].content);
          done();
        });
    });
  });

  it ('should send an error if try to access an unexisting loot', done => {
    chai.request(app)
      .get('/foo')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it ('should create a loot', done => {
    chai.request(app)
      .post('/')
      .send({ content: 'New loot' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body.content).to.equal('New loot');
        done();
      });
  });

  it ('should send an error if try to create a wrong loot', done => {
    chai.request(app)
      .post('/')
      .send({ content: '' })
      .end((err, res) => {
        expect(res).to.have.status(304);
        done();
      });
  });

  it ('should delete a loot', done => {
    Loot.findOne({ content: lootFixture[0].content }, (err, item) => {
      chai.request(app)
        .delete(`/${item._id}`)
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });

  it ('should send an error if try to delete an unexisting loot', done => {
    chai.request(app)
      .delete(`/foo`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it ('should update a loot', done => {
    Loot.findOne({}, (err, item) => {
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

  it ('should send an error if try to update an unexisting loot', done => {
    chai.request(app)
      .patch('/foo')
      .send({ content: 'New loot' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it ('should send an error if try to update a loot width wrong content', done => {
    Loot.findOne({}, (err, item) => {
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
