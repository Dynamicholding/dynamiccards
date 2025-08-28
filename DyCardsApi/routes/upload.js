// routes/upload.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig');

router.post('/upload', upload.single('imagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Archivo no válido' });
  }

  // Aquí puedes guardar el nombre en MySQL si lo deseas
  res.json({ filename: req.file.filename });
});

module.exports = router;
