const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');

const router = require('../../../../app/routes/api/post');

chai.use(chaiHttp);

const expect = chai.expect;

describe('Api post routes', () => {

  const controller = {
    list: (req, res) => res.send('list'),
    detail: (req, res) => res.send('detail'),
    create: (req, res) => res.send('create'),
    delete: (req, res) => res.send('delete'),
    update: (req, res) => res.send('update')
  };

  const app = express();
  app.use('/posts', router(controller));

  it('GET /posts should serve controller list', () => {
    chai.request(app)
      .get('/posts')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('list');
      });
  });

  it('GET /posts/:id should serve controller detail', () => {
    chai.request(app)
      .get('/posts/foo')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('detail');
      });
  });

  it('POST /posts should serve controller create', () => {
    chai.request(app)
      .post('/posts')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('create');
      });
  });

  it('DELETE /posts/:id should serve controller delete', () => {
    chai.request(app)
      .delete('/posts/foo')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('delete');
      });
  });

  it('DELETE /posts should not be served', () => {
    chai.request(app)
      .delete('/posts')
      .end((err, res) => {
        expect(res).to.have.status(404);
      });
  });

  it('PATCH /posts/:id should serve controller update', () => {
    chai.request(app)
      .patch('/posts/foo')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal('update');
      });
  });

  it('PATCH /posts should not be served', () => {
    chai.request(app)
      .patch('/posts')
      .end((err, res) => {
        expect(res).to.have.status(404);
      });
  });
});
