'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  task.init({
    title: DataTypes.STRING,
    status: DataTypes.ENUM('undone', 'done'),
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'task',
  });
  task.associate = function(models) {
    task.belongsTo(models.user, { foreignKey: 'userId' })
  }
    return task;
};