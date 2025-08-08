const { User, Account } = require('../models');

// Validación de fortaleza de contraseña
function isStrongPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
}

/* Listar todo */
exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll({ where: { status: 1 } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

/** Crear usuario */
/**************** */
const bcrypt = require('bcryptjs');
const { validarNumeroCelular } = require('../utils/validarCelular');

exports.create = async (req, res) => {
  try {
    // Validar nueva contraseña
    const defaultPassword = 'Dyn12345.*';
    if (!isStrongPassword(defaultPassword)) {
      return res.status(400).json({
        message: 'La contraseña debe tener mínimo 8 caracteres, con mayúsculas, minúsculas, números y un carácter especial.'
      });
    }
    
    const hashed = await bcrypt.hash(defaultPassword, 10);
    const user = await User.create({ 
      ...req.body, 
      pass: hashed,
      status: 'active',
      updatedAt: null,
      createdBy: req.user.id
    });

     // Validar celular
    const validacion = validarNumeroCelular(user.phone);

    const nrocta = validacion.numeroE164;
    if (!validacion.valido) {
      return res.status(400).json({ error: validacion.mensaje });
    }

    /** Crear cuenta asociada al usuario */
    await Account.create({
      users_id: user.id,
      account_num: nrocta
    });

    res.status(201).json({ message: 'Usuario creado', data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Ocurrio un error al crear el usuario :(',
      error: error.message
    });
  }
};

/* Buscar x id */
exports.getById = async (req, res) => {
  const data = await User.findByPk(req.params.id);
  res.json(data);
};

/* Actualizar */
exports.update = async (req, res) => {
  const data = await User.update(req.body, {
    where: { id: req.params.id }
  });
  res.json({ message: 'Actualizado' });
};

/* Eliminar */
exports.remove = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await User.update(
      { status: 2 },
      { where: { id } }
    );

    if (result[0] === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario desactivado correctamente :)' });

  } catch (error) {
    res.status(500).json({ message: 'Error al desactivar usuario', error: error.message });
  }
  /* await User.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Eliminado' }); */
};
