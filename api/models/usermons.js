'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usermons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Usermons.init({
    name: DataTypes.STRING,
    shiny: DataTypes.BOOLEAN,
    dex: DataTypes.INTEGER,
    ball: DataTypes.STRING,
    level: DataTypes.INTEGER,
    types: DataTypes.ARRAY,
    gender: DataTypes.ARRAY,
    ability: DataTypes.STRING,
    hp: DataTypes.INTEGER,
    atk: DataTypes.INTEGER,
    def: DataTypes.INTEGER,
    spAtk: DataTypes.INTEGER,
    spDef: DataTypes.INTEGER,
    spd: DataTypes.INTEGER,
    eggMoves: DataTypes.ARRAY
  }, {
    sequelize,
    modelName: 'Usermons',
  });
  return Usermons;
};