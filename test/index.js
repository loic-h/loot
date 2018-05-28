process.env.NODE_ENV = 'test';

describe('Application', () => {
  require('./app');;
});

describe('Frontend', () => {
  require('./front');;
});
