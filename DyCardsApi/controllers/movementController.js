const Movement = require('../models/Movement');
const Account = require('../models/Account');
const User = require('../models/User');
const { validarNumeroCelular } = require('../utils/validarCelular');

/* LISTAR MOVIMIENTOS */
/* exports.getAllMovements = async (req, res) => {
  console.log(req.body);
  
  try {
    const movements = await Movement.findAll();
    res.json(movements);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener movimientos' });
  }
}; */

/** Recuoerar movimientos por cuenta */
exports.getMovementsByPhone = async (req, res) => {
  try {
    const { phone } = req.params;
    if (!phone || phone.length < 7) {
      return res.status(400).json({ error: 'Número de teléfono invalido' });
    }

    // 1. Buscar usuario
    const user = await User.findOne({ where: { phone } });
    console.log("Users: ", user);

    if (!user) {
      return res.status(404).json({ error: 'Cuenta no encontrada para el usuario' });
    }

    // 2. Buscar cuenta
    const account = await Account.findOne({ where: { users_id: user.id } });
    if (!account) {
      return res.status(404).json({ error: 'Cuenta no encontrada para el usuario' });
    }

    // 3. Buscar movimientos
    const movements = await Movement.findAll({
      where: { account_id: account.id },
      order: [['date', 'DESC']]
    });

    // 4. Respuesta estructurada
    res.json({
      numeroCuenta: account.account_num,
      saldo: account.saldo_total,
      movements
    });

  } catch (err) {
    console.error('Error en consulta por teléfono:', err);
    res.status(500).json({ error: 'No se pudo recuperar los movimientos por teléfono' });
  }
};

/* CREAR MOVIMIENTOS */
exports.movementCredit = async (req, res) => {
  try {
    const { type, amount, account_num } = req.body;

    // Validar datos
    if (!type || !amount || !account_num) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    // Buscar cuanta
    const account = await Account.findOne({ where: { account_num } });
    if (!account) {
      return res.status(404).json({ message: 'Cuenta no encontrada' });
    }

    // Crear Movimiento
    const newMovement = await Movement.create({
      account_id: account.id,
      type,
      amount
    });

    // Actualizar datos
    let saldoTotal = parseFloat(account.saldo_total);
    let ahorro = parseFloat(account.saldo_ahorro);
    const monto = parseFloat(amount);

    // Calculando el 10% para el ahorro
    let montoAhorro = monto * 0.10;
    let montoSaldo = monto;

    // Asignar nuevos valores
    saldoTotal += montoSaldo;
    ahorro += montoAhorro;

    // Actualizar campos
    await account.update({
      saldo_total: saldoTotal,
      saldo_ahorro: ahorro
    });

    montoSaldo = 0;
    montoAhorro = 0;
    console.log('Controlador alcanzado:', req.body);
    res.status(201).json({ movimiento: newMovement, cuenta_actualizada: account });
  } catch (err) {
    console.error(err);
    console.error('Error detallado:', err);
    res.status(400).json({ error: 'Error al registrar movimiento y actualizar saldos' });
  }
};

exports.movementDebit = async (req, res) => {
  try {
    let { type, amount, account_num } = req.body;

    // Buscar cuenta
    const account = await Account.findOne({ where: { account_num } });
    if (!account) {
      return res.status(404).json({ message: 'Cuenta no encontrada' });
    }

    let nuevoSaldo = parseFloat(account.saldo_total);
    const monto = Number(amount);

    if (isNaN(monto)) {
      return res.status(400).json({ message: 'Monto inválido' });
    }

    // Verificar fondos suficientes
    if (nuevoSaldo < parseFloat(monto)) {
      return res.status(400).json({ message: 'Saldo insuficiente' });
    }

    nuevoSaldo -= parseFloat(monto);

    // Crear movimiento
    const newMovement = await Movement.create({
      account_id: account.id,
      type,
      amount: -monto
    });

    // Actualizar saldo de la cuenta
    account.saldo_total = nuevoSaldo;
    await account.save();

    return res.json({
      message: `Movimiento de tipo ${type} registrado correctamente`,
      newMovement,
      saldo_actual: nuevoSaldo
    })

  } catch (error) {
    console.error('Error en createMovement:', error);
    res.status(500).json({ message: 'Error al registrar el movimiento' });
  }
};

exports.createMovement = async (req, res) => {
  try {
    console.log('BODY:', req.body);

    let { type, amount, account_num, } = req.body;

    /* const validacion = validarNumeroCelular(account_num); */

    /* if (!validacion.valido) {
      return res.status(400).json({ error: validacion.mensaje });
    }

    console.log(validacion.numeroE164); */

    // Si el número no empieza con '+57', lo convertimos
    if (!account_num.startsWith('+57')) {
      account_num = '+57' + account_num;
    }


    // 1. Obtener la cuenta asociada
    const account = await Account.findOne({ where: { account_num } });
    if (!account || !account.id) {
      return res.status(400).json({ error: 'Cuenta no encontrada o sin ID válido' });
    }


    // 2. Crear el movimiento
    const newMovement = await Movement.create({
      account_id: account.id,
      type,
      amount
    });

    // 3. Lógica para actualizar saldos
    let saldoTotal = parseFloat(account.saldo_total);
    let ahorro = parseFloat(account.saldo_ahorro);
    let inversiones = parseFloat(account.saldo_inversiones);
    const monto = parseFloat(amount);

    // 7.5% a saldo, 10% a ahorro, Para la comisión
    if (type === 'Consulta' || type === 'Proceso') {
      let montoSaldo = monto * 0.075;
      let montoAhorro = montoSaldo * 0.10;

      saldoTotal += montoSaldo;
      ahorro += montoAhorro;

      // 4. Actualizar saldo
      await account.update({
        saldo_total: saldoTotal,
        saldo_ahorro: ahorro,
      });

      montoSaldo = 0;
      montoAhorro = 0;
    }

    res.status(201).json({ movimiento: newMovement, cuenta_actualizada: account });
  } catch (err) {
    console.error(err);
    console.error('Error detallado:', err);
    res.status(400).json({ error: 'Error al registrar movimiento y actualizar saldos' });
  }
};



/* ACTUALIZAR MOVIMIENTOS */
exports.updateMovement = async (req, res) => {
  try {
    const { id } = req.params;
    /* await Movement.update(req.body, { where: { id_movement: id } }); */
    await Movement.update(req.body, { where: { movements_id: id } });

    res.json({ message: 'Movimiento actualizado correctamente' });
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar movimiento' });
  }
};

/* ELIMINAR MOVIMIENTOS */
exports.deleteMovement = async (req, res) => {
  try {
    const { id } = req.params;
    await Movement.destroy({ where: { id_movement: id } });
    res.json({ message: 'Movimiento eliminado correctamente' });
  } catch (err) {
    res.status(400).json({ error: 'Error al eliminar movimiento' });
  }
};
