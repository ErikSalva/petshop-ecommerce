import { DataTypes } from "sequelize";
import db from '../config/db.js';


const Order = db.define('orders', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    total_price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },
    status_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }

})

export default Order;