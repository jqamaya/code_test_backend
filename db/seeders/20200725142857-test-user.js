'use strict';

const User = require('../models').users;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return User.create({
      username: 'superadmin',
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@admin.com',
      password: 'password',
      is_admin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
