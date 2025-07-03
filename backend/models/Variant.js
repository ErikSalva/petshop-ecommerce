import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Variant = db.define('variants', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  weight_value: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  weight_unit_id: {
    type: DataTypes.ENUM('g', 'kg'),
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default Variant