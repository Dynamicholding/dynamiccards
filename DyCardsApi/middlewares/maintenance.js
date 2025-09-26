module.exports = (req, res, next) => {
  const isMaintenance = process.env.MAINTENANCE_MODE === 'true';
  const maintenanceEnd = new Date(process.env.MAINTENANCE_END);
  const now = new Date();

  const exemptPaths = ['/admin', '/debug-env'];
  const isExempt = exemptPaths.some(prefix => req.originalUrl.startsWith(prefix));

  if (isMaintenance && now < maintenanceEnd && !isExempt) {
    const remaining = Math.ceil((maintenanceEnd - now) / 60000);
    return res.status(503).json({
      message: `La aplicación está en mantenimiento. Estará disponible en aproximadamente ${remaining} minutos.`,
    });
  }

  next();
};