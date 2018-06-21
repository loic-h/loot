const express = require('express');
const bodyParser = require('body-parser');
const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('../../../config');
const api = require('../../../src/js/api/posts').default;
const routeApi = require('../../../app/routes/api');

const expect = chai.expect;

describe('/posts', done => {

  let app, router, server;

  beforeEach(done => {
    app = express();
    app.use(bodyParser.json());
    router = express.Router();
    router.get('/posts', (req, res) => res.json({ "list": "ok" }));
    app.use('/api', router);
    server = app.listen(config.PORT, () => done());
  });

  afterEach(() => {
    server.close();
  });

  it('should serve GET', done => {
    api.list(config.BASE)
      .then(payload => {
        expect(payload).to.deep.equal({ "list": "ok" });
        done();
      });
  });

});
