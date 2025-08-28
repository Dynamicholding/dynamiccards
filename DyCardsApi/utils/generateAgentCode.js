const { User } = require('../models');
const { Op } = require('sequelize');

const generateAgentCode = async () => {
  const lastUser = await User.findOne({
    order: [['codeAg', 'DESC']],
    where: {
      codeAg: { [Op.ne]: null }
    }
  });

  const lastNumeric = lastUser?.codeAg?.replace('DHC', '') || '0000';
  const nextNumeric = String(parseInt(lastNumeric) + 1).padStart(4, '0');

  return `DHC${nextNumeric}`;
};

module.exports = generateAgentCode;
