const { User } = require('../models');

async function validarCodigoAgente(code) {
    if (!code || typeof code !== 'string') return null;

    const lastNumeric = code.replace('DHC', '') || '0000';
    const nextNumeric = String(parseInt(lastNumeric)).padStart(4, '0');
    const codeAg = `DHC${nextNumeric}`;

    const existingUser = await User.findOne({
        where: { codeAg }
    });

    return existingUser || null;
}

module.exports = { validarCodigoAgente };
