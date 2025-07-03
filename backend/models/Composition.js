import { DataTypes } from 'sequelize';
import db from '../config/db.js';


const Composition = db.define('compositions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  ingredient: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Composition