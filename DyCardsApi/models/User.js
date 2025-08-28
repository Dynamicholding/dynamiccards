const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: DataTypes.STRING(30),
  last_name: DataTypes.STRING(30),
  dni: DataTypes.STRING(10),
  phone: DataTypes.STRING(10),
  email: DataTypes.STRING(45),
  pass: DataTypes.STRING(65),
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  },
  
  father_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  reset_token: DataTypes.TEXT,
  reset_token_expiry: DataTypes.DATE,

  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  
  codeAg: {
    type: DataTypes.STRING,
    allowNull: true
  },

  role: {
    type: DataTypes.ENUM('user', 'admin'),
    allowNull: false,
    defaultValue: 'user'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },

  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = User;
