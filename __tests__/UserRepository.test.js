const UserRepository = require('../src/repositories/UserRepository');
let User = require('../db/models').users;

describe('Get User', () => {
  it('should get the user', async () => {
    const result = {
      "id": 1, 
      "username": "superadmin",
      "first_name": "Admin", 
      "last_name": "User", 
      "email": "admin@admin.com"
    };
    const mock = jest.spyOn(User, 'findOne');
    mock.mockResolvedValue(result);

    const res = UserRepository.getUser({
      body: {
        username: 'superadmin',
        password: 'password'
      }
    });
    await expect(res).resolves.not.toBeNull();
  });
  it('should not get the user due to incorrect password', async () => {
    const mock = jest.spyOn(User, 'findOne');
    mock.mockResolvedValue(null);

    const res = UserRepository.getUser({
      body: {
        username: 'superadmin',
        password: 'fjadkdfjafsd'
      }
    });
    await expect(res).resolves.toBeNull();
  });

  it('should not get the user due to incorrect username', async () => {
    const mock = jest.spyOn(User, 'findOne');
    mock.mockResolvedValue(null);

    const res = UserRepository.getUser({
      body: {
        username: 'fdafdja',
        password: 'password'
      }
    });
    await expect(res).resolves.toBeNull();
  });

  it('should not get the user due to incorrect credentials', async () => {
    const mock = jest.spyOn(User, 'findOne');
    mock.mockResolvedValue(null);

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
    const result = {
      "id": 1, 
      "username": "superadmin",
      "first_name": "Admin", 
      "last_name": "User", 
      "email": "admin@admin.com"
    };
    const mock = jest.spyOn(User, 'findByPk');
    mock.mockResolvedValue(result);

    const res = UserRepository.getUserById(1);
    await expect(res).resolves.not.toBeNull();
  });
  it('should not get the user', async () => {
    const mock = jest.spyOn(User, 'findByPk');
    mock.mockResolvedValue(null);

    const res = UserRepository.getUserById(100);
    await expect(res).resolves.toBeNull();
  });
});