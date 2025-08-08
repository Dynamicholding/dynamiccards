// authController.js
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');

const JWT_SECRET = process.env.JWT_SECRET;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

// Configurar transportador de correos
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS
  }
});

// Validación de fortaleza de contraseña
function isStrongPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
}

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body; // <--- cambia "pass" por "password"
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const user = await User.findOne({ where: { email, status: 1 } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, user.pass); // <--- mantiene user.pass
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ 
      id: user.id, 
      role: user.role,
      email: user.email 
    }, JWT_SECRET, { expiresIn: '15m' });

    res.json({
      message: 'Login exitoso',
      token,
      user: { 
        id: user.id, 
        name: `${user.first_name} ${user.last_name}`, 
        email: user.email, 
        phone: user.phone,
        avatar: user.avatar,
        role: user.role 
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
  }
};


// ✉️ FORGOT PASSWORD – envía correo con enlace para resetear
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) return res.status(400).json({ message: 'El email es requerido' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '15m' });
    const expiryDate = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
    await user.update({ reset_token: token, reset_token_expiry: expiryDate });

    const link = `http://localhost:4200/reset-password/${token}`;
    const tplPath = path.join(__dirname, '../templates/reset-password.html');
    let htmlTpl = fs.readFileSync(tplPath, 'utf8')
                      .replace('{{name}}', user.first_name)
                      .replace('{{resetLink}}', link);

    await transporter.sendMail({
      from: `"DyCards Soporte" <${MAIL_USER}>`,
      to: user.email,
      subject: '💡 Restablece tu contraseña en DyCards',
      html: htmlTpl
    });

    res.json({ message: 'Correo enviado con el enlace para restablecer contraseña' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al enviar correo', error: err.message });
  }
};

// RESET PASSWORD – valida token, cambia contraseña, envía confirmación
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPass } = req.body;

  try {
    // Verificar token y obtener payload
    const payload = jwt.verify(token, JWT_SECRET);

    // Buscar usuario con token válido y no expirado
    const user = await User.findOne({
      where: {
        id: payload.id,
        reset_token: token,
        reset_token_expiry: { [Op.gt]: new Date() }
      }
    });

    if (!user) return res.status(400).json({ message: 'Token inválido o expirado' });

    // Validar nueva contraseña
    if (!isStrongPassword(newPass)) {
      return res.status(400).json({
        message: 'La contraseña debe tener mínimo 8 caracteres, con mayúsculas, minúsculas, números y un carácter especial.'
      });
    }

    const hashed = await bcrypt.hash(newPass, 10);
    await user.update({
      pass: hashed,
      reset_token: null,
      reset_token_expiry: null,
      last_password_reset: new Date()
    });

    // Enviar correo de confirmación
    const tplSuccess = path.join(__dirname, '../templates/password-changed.html');
    let successHtml = fs.readFileSync(tplSuccess, 'utf8')
                        .replace('{{name}}', user.first_name);

    await transporter.sendMail({
      from: `"DyCards Soporte" <${MAIL_USER}>`,
      to: user.email,
      subject: '✔️ Tu contraseña fue cambiada con éxito',
      html: successHtml
    });

    res.json({ message: 'Contraseña restablecida y confirmación enviada por correo' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error al restablecer contraseña', error: err.message });
  }
};
