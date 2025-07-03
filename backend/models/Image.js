import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Image = db.define('images', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  snapshot_image:{
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Image;
