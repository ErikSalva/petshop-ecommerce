import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Product = db.define('products', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  pet_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  average_rating: {
    type: DataTypes.DECIMAL,
    allowNull: true,
    defaultValue: 0
  },
  total_reviews: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  min_price: {
    type: DataTypes.DECIMAL,
    allowNull: true,
    defaultValue: null
  },
  max_price: {
    type: DataTypes.DECIMAL,
    allowNull: true,
    defaultValue: null
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
  
});

export default Product;
