const Account = require('../models/Account');
const User = require('../models/User');
const Movement = require('../models/Movement');

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener cuentas' });
  }
};


/* CREAR CUENTA */
exports.createAccount = async (req, res) => {
  try {
    const { users_id, saldo_total = 0, saldo_ahorro = 0, saldo_inversiones = 0 } = req.body;

    // Validar que el usuario exista
    const user = await User.findByPk(users_id);
    if (!user) {
      return res.status(404).json({ error: 'El usuario no existe' });
    }

    const newAccount = await Account.create({
      users_id,
      saldo_total,
      saldo_ahorro,
      saldo_inversiones
    });

    res.status(201).json(newAccount);
  } catch (err) {
    console.error('Error al crear cuenta:', err);
    res.status(400).json({ error: err.message });
  }
};


exports.updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    await Account.update(req.body, { where: { account_id: id } });
    res.json({ message: 'Cuenta actualizada correctamente' });
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar cuenta' });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    await Account.destroy({ where: { account_id: id } });
    res.json({ message: 'Cuenta eliminada correctamente' });
  } catch (err) {
    res.status(400).json({ error: 'Error al eliminar cuenta' });
  }
};

/* Historial de movimientos de una Cuenta */
exports.getAccountMovements = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID de cuenta inválido' });
    }


    // Validar que la cuenta exista
    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({ error: 'Cuenta no encontrada' });
    }

    if (account.id != id) {
      return res.status(403).json({ error: 'Acceso no autorizado a esta cuenta' });
    }

    // Obtener los movimientos relacionados
    console.log('Consultando movimientos para la cuenta:', id);
    const movements = await Movement.findAll({
      where: { account_id: id },
      order: [['date', 'DESC']]
    });

    /*     */
    res.json({
      accountId: account.id,
      accountName: account.name,
      movimientos: movements
    });

  } catch (err) {
    console.error('Error al consultar movimientos:', err);
    res.status(500).json({ error: 'No se pudo obtener el historial financiero' });
  }
};

/* BUSCAR POR USUARIO */
exports.getByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const account = await Account.findOne({ where: { users_id: userId } });

    if (!account) {
      return res.status(404).json({ error: 'Cuenta no encontrada para este usuario' });
    }

    res.json(account);
  } catch (err) {
    console.error('Error al obtener cuenta por usuario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

/** OBTENER NUMERO DE CUENTA X TELEFONO */
/* Obtener número de cuenta por teléfono de usuario */
exports.getAccountByPhone = async (req, res) => {
  try {
    const { phone } = req.params;

    console.log(phone);
    

    if (!phone || phone.length < 7) {
      return res.status(400).json({ error: 'Número de teléfono inválido' });
    }
 
    const user = await User.findOne({ where: { phone } });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado con ese teléfono' });
    }

    const account = await Account.findOne({ where: { users_id: user.id } });
    console.log("ID: " + user.id);
    

    if (!account) {
      return res.status(404).json({ error: 'No se encontró cuenta para ese usuario' });
    }

    res.json({ numeroCuenta: account.id, nombre: account.name });
  } catch (err) {
    console.error('Error en la consulta por teléfono:', err);
    res.status(500).json({ error: 'No se pudo recuperar la cuenta por teléfono' });
  }
};






