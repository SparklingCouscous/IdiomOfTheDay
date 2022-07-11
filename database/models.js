const { DataTypes } = require('sequelize');

const ModelNames = {
  Idiom: 'Idiom',
};

const Models = {
  Idiom: {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Idiom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Meaning: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Origin: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
}

module.exports = {
  Models,
  ModelNames,
};