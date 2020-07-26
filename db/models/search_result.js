'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SearchResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SearchResult.init({
    topic: DataTypes.STRING,
    language: DataTypes.STRING,
    result: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'search_results',
  });
  return SearchResult;
};