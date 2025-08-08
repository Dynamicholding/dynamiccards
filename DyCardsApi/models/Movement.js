const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Movement = sequelize.define('Movement', {
    movements_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'account',
            key: 'account_id'
        },
        index: true
  },
    type: {
        type: DataTypes.ENUM('Depósito', 'Retiro', 'Inversión'),
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'movements',
    timestamps: false
});

module.exports = Movement;
