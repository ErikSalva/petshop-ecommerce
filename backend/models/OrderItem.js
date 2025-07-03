import { DataTypes } from "sequelize";
import db from '../config/db.js';

const OrderItem = db.define('order_items', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },

    order_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    variant_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    subtotal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },
    // Campos snapshot para mantener el historial confiable
    //  La imagen la obvio
    product_title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    variant_weight: {
        type: DataTypes.STRING,
        allowNull: false
    },

    unit_price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    pet_type_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default OrderItem