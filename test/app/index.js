require('./models/loot');
require('./controllers/loot');
require('./routes/api/loot');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

chai.use(chaiHttp);

const expect = chai.expect;

describe('/GET root', () => {
  it('should redirect to /loots', done => {
    chai.request(app)
      .get('/')
      .redirects(0)
      .end((err, res) => {
        expect(res).to.redirectTo('/loots');
        done();
      });
  });
});
