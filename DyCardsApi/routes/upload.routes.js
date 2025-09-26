const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// 📂 Ruta donde se guardarán las imágenes
const uploadDir = path.join(__dirname, '../uploads/avatars');

// 🛠️ Verificar que la carpeta exista
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 🔒 Validación de tipo de archivo
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imagenes PNG'), false);
  }
};

// 📁 Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const dni = req.body.dni || 'anonimo'; // ← puedes pasar el dni desde el frontend
    const ext = path.extname(file.originalname);
    const filename = `${dni}-${Date.now()}${ext}`;
    cb(null, filename);
  }
});

// 🛡️ Configuración de multer
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter
});


// 📤 Ruta para subir avatar
router.post('/upload-avatar', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se recibió archivo válido' });
  }

  res.json({
    message: 'Imagen subida exitosamente',
    filename: req.file.filename,
    path: `/uploads/avatars/${req.file.filename}`
  });
});

module.exports = router;
