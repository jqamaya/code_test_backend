const request = require('supertest');
const UserRepository = require('../src/repositories/UserRepository');

describe('Get User', () => {
  it('should get the user', async () => {
    const res = UserRepository.getUser({
      body: {
        username: 'superadmin',
        password: 'password'
      }
    });
    await expect(res).resolves.not.toBeNull();
  });
});