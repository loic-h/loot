const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');

const router = require('../../../../app/routes/api/loot');

chai.use(chaiHttp);

const expect = chai.expect;

describe('Api loot routes', () => {

  const controller = {
    list: (req, res) => res.send('list'),
    detail: (req, res) => res.send('detail'),
    create: (req, res) => res.send('create'),
    delete: (req, res) => res.send('delete'),
    update: (req, res) => res.send('update')
  };

  const app = express();
  app.use('/loots', router(controller));

  it('GET /loots should serve controller list', () => {
    chai.request(app)
      .get('/loots')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('list');
      });
  });

  it('GET /loots/:id should serve controller detail', () => {
    chai.request(app)
      .get('/loots/foo')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('detail');
      });
  });

  it('POST /loots should serve controller create', () => {
    chai.request(app)
      .post('/loots')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('create');
      });
  });

  it('DELETE /loots/:id should serve controller delete', () => {
    chai.request(app)
      .delete('/loots/foo')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('delete');
      });
  });

  it('DELETE /loots should not be served', () => {
    chai.request(app)
      .delete('/loots')
      .end((err, res) => {
        expect(res).to.have.status(404);
      });
  });

  it('PATCH /loots/:id should serve controller update', () => {
    chai.request(app)
      .patch('/loots/foo')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('update');
      });
  });

  it('PATCH /loots should not be served', () => {
    chai.request(app)
      .patch('/loots')
      .end((err, res) => {
        expect(res).to.have.status(404);
      });
  });
});
