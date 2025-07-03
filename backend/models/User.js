import { DataTypes, UUIDV4 } from "sequelize";
import db from '../config/db.js';
import bcrypt from 'bcrypt'


const User = db.define('users', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
        allowNull: false
    },

    is_confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING
    }
},{
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password_hash = await bcrypt.hash(user.password_hash, salt);
        }
    },

    scopes: {
        withoutSensitiveInfo: {
            attributes: {
                exclude: ['password_hash', 'token', 'is_confirmed', 'createdAt', 'updatedAt']
            }
        }
    }
});

// Metodo para verificar el password

User.prototype.verifyPassword = async function(password) {
    // no use el compareSync para que no me detuviera el event loop de Node
    return await bcrypt.compare(password, this.password_hash);
};  

export default User