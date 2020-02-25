'use strict';
module.exports = (sequelize, DataTypes) => {
  const charactersQuotes = sequelize.define('charactersQuotes', {
    quoteId: DataTypes.INTEGER,
    characterId: DataTypes.INTEGER
  }, {});
  charactersQuotes.associate = function(models) {
    // associations can be defined here
  };
  return charactersQuotes;
};