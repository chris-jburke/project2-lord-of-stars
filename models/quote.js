'use strict';
module.exports = (sequelize, DataTypes) => {
  const quote = sequelize.define('quote', {
    name: DataTypes.STRING,
    quote: DataTypes.STRING
  }, {});
  quote.associate = function(models) {
  	models.quote.belongsToMany(models.character, {through: "charactersQuotes"})
    // associations can be defined here
  };
  return quote;
};