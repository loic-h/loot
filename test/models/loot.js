const chai = require('chai');
const mongoose = require('mongoose');
const config = require('../../config');
const Loot = require('../../app/models/loot');
const lootFixture = require('../fixtures/loots.json');

const expect = chai.expect;

describe('Model Loot', () => {

  describe('unit testing', () => {

    it ('should be invalid if content is empty', done => {
      const loot = new Loot();
      loot.validate(err => {
        expect(err).to.exist;
        done();
      })
    });

    it ('should save content', done => {
      const loot = new Loot({
        content: 'Lorem ipsum'
      });
      loot.validate(err => {
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

    it ('should save a loot', done => {
      Loot.insertMany(lootFixture, (err, res) => {
        expect(err).not.to.exist;
        expect(res.length).to.equal(2);
        done();
      });
    });
  });
});
