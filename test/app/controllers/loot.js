const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');

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
    router = express.Router();
    app.use('/', router);
  });

  afterEach(() => {
    app = null;
    router = null;
  });

  it ('should list loots', done => {
    router.get('/', controller.list);
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res.text).to.equal('NOT IMPLEMENTED: Loot list');
        done();
      });
  });

  it ('should detail a loot', done => {
    router.get('/:id', controller.detail);
    Loot.findOne({}, (err, item) => {
      chai.request(app)
        .get(`/${item._id}`)
        .end((err, res) => {
          expect(res.text).to.equal('NOT IMPLEMENTED: Loot detail');
          done();
        });
    });
  });
});
