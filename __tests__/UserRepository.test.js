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
  it('should not get the user due to incorrect password', async () => {
    const res = UserRepository.getUser({
      body: {
        username: 'superadmin',
        password: 'fjadkdfjafsd'
      }
    });
    await expect(res).resolves.toBeNull();
  });

  it('should not get the user due to incorrect username', async () => {
    const res = UserRepository.getUser({
      body: {
        username: 'fdafdja',
        password: 'password'
      }
    });
    await expect(res).resolves.toBeNull();
  });

  it('should not get the user due to incorrect credentials', async () => {
    const res = UserRepository.getUser({
      body: {
        username: 'superadmin1',
        password: 'password1'
      }
    });
    await expect(res).resolves.toBeNull();
  });
});

describe('Get User By ID', () => {
  it('should get the user', async () => {
    const res = UserRepository.getUserById(1);
    await expect(res).resolves.not.toBeNull();
  });
  it('should not get the user', async () => {
    const res = UserRepository.getUserById(100);
    await expect(res).resolves.toBeNull();
  });
});