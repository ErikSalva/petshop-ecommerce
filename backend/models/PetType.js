import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const PetType = db.define('pet_types', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

export default PetType;
