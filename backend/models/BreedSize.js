import { DataTypes } from 'sequelize';
import db from '../config/db.js';

// BreedSizes
const BreedSize = db.define('breed_sizes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default BreedSize;