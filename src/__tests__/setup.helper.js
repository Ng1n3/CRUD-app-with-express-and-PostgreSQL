const req = require('supertest');
const sequelize = require('../db/sequelize');
const { app } = require('../app');

//Global setup
beforeAll(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error('Test database sync failed: ', error)
    throw error;
  }
});

// a must test to satisfy jest
describe("Setup Test", () => {
  it('should run without issues', () => {
    expect(true).toBe(true);
  })
})

// Global close
afterAll(async () => {
  try {
    await sequelize.close();
  } catch (error) {
    console.error('Failed to close test database : ', error)
    throw error;
  }
});

// create a test helper
const createTestClient = () => {
  return req(app);
};

module.exports = {
  createTestClient,
  sequelize
};
