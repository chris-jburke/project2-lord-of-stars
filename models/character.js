'use strict';
module.exports = (sequelize, DataTypes) => {
  const character = sequelize.define('character', {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    img: DataTypes.STRING
  }, {});
  character.associate = function(models) {
    models.character.hasMany(models.user)
    models.character.belongsToMany(models.quote, {through: "charactersQuotes"})
    // associations can be defined here
  };
  return character;
};