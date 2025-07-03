import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const ProductBreedSize = db.define('product_breed_sizes', {
  product_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true
  },
  breed_size_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  timestamps: false,
  tableName: 'product_breed_sizes'
});

export default ProductBreedSize;
