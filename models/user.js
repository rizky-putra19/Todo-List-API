'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    username: DataTypes.STRING,
    gender: DataTypes.ENUM('male', 'female'),
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  user.associate = function(models) {
    user.hasMany(models.task)
  };
  return user;
};