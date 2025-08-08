const User = require('./User');
const Account = require('./Account');
const Movement = require('./Movement');
const RecordCut = require('./RecordCut');

// Relaciones
User.hasMany(Account, { foreignKey: 'users_id', as: 'account' });
Account.belongsTo(User, { foreignKey: 'users_id', as: 'user' });

Account.hasMany(Movement, { foreignKey: 'account_id', as: 'movements' });
Movement.belongsTo(Account, { foreignKey: 'account_id',  as: 'account' });

Account.hasMany(RecordCut, { foreignKey: 'account_id', as: 'record_cut' });
RecordCut.belongsTo(Account, { foreignKey: 'account_id', as: 'account' });


module.exports = { User, Account, Movement, RecordCut };