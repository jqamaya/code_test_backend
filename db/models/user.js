'use strict';
const {
  Model
} = require('sequelize');
const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static generateSalt = function() {
      return crypto.randomBytes(16).toString('base64')
    }
    static encryptPassword = function(plainText, salt) {
        return crypto
            .createHash('RSA-SHA256')
            .update(plainText)
            .update(salt)
            .digest('hex')
    }
    static correctPassword = function(enteredPassword) {
      return User.encryptPassword(enteredPassword, this.salt()) === this.password()
    }
  };
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      get() {
        return() => this.getDataValue('password')
      }
    },
    salt: {
      type: DataTypes.STRING,
      get() {
        return() => this.getDataValue('salt')
      }
    },
    is_admin: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  
  const setSaltAndPassword = user => {
    if (user.changed('password')) {
      user.salt = User.generateSalt()
      user.password = User.encryptPassword(user.password(), user.salt())
    }
  }
  User.beforeCreate(setSaltAndPassword);
  User.beforeUpdate(setSaltAndPassword);

  User.prototype.correctPassword = function(enteredPassword) {
    return User.encryptPassword(enteredPassword, this.salt()) === this.password()
  }

  return User;
};