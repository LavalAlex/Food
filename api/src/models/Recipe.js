const { DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    summary:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    score:{
      type: DataTypes.INTEGER
    }, 
    health:{
      type: DataTypes.INTEGER
    },
    step:{
      type: DataTypes.ARRAY(DataTypes.JSON)
    },
    createInDB :{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dishTypes:{
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    }
  });
};
