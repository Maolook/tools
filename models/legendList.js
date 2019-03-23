"use strict"

module.exports = function(sequelize, DataTypes) {
    var LegendList = sequelize.define("LegendList", {
      name: DataTypes.STRING,
      sex:DataTypes.STRING,
      age:DataTypes.INTEGER,
    });
   
    return LegendList;
  };