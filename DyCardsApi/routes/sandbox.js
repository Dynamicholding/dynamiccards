const express = require('express');
const router = express.Router();
const CorteContableService = require('../services/CorteContableService');

router.post('/corte', async (req, res) => {
  try {
    await CorteContableService.ejecutarCorteMensual();
    res.status(200).json({ mensaje: 'Corte ejecutado en entorno sandbox' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
