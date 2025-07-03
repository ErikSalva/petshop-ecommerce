import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Favorite = db.define('Favorite', {
    user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,

    }
    }, {
        tableName: 'favorites',
        timestamps: false,
});

export default Favorite