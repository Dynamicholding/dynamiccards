// jobs/corte.job.js
const cron = require('node-cron');
const CorteContableService = require('../services/CorteContableService');

cron.schedule('0 0 * * *', async () => {
    const hoy = new Date();
    const mañana = new Date();
    mañana.setDate(hoy.getDate() + 1);

    if (mañana.getDate() === 1) {
        // Es el último día del mes
        console.log('Ejecutando corte contable automático...');
        const resultado = await CorteContableService.ejecutarCorteMensual();
        if (resultado.success) {
            console.log('Corte mensual ejecutado correctamente');
        } else {
            console.error('Falló el corte mensual:', resultado.message);
        }
    }
});
