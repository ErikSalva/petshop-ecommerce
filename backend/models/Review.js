import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Review = db.define('reviews', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default Review