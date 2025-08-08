const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RecordCut = sequelize.define('RecordCut', {
  recordcut_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'account',
      key: 'account_id'
    }
  },
  cutoff_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  generated_profit: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0.00 },
  transferred_savings: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0.00 },
  investment_balance: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0.00 }
}, {
  tableName: 'record_cut',
  timestamps: false
});

module.exports = RecordCut;