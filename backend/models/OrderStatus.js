import { DataTypes } from "sequelize";
import db from '../config/db.js';

const OrderStatus = db.define('order_statuses',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
    }
})

export default OrderStatus