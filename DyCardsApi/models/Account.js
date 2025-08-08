const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Account = sequelize.define('Account', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true, 
    field: 'account_id' 
  },
  users_id: { type: DataTypes.INTEGER, allowNull: false },
  account_num: { type: DataTypes.STRING, unique: true }, // ← número de celular
  saldo_total: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0.00 },
  saldo_ahorro: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0.00 },
  saldo_inversiones: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0.00 }
}, {
  tableName: 'account',
  timestamps: false
});

module.exports = Account;
