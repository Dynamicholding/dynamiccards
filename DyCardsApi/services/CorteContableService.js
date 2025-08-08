const { Movement, Account, RecordCut } = require('../models');

class CorteContableService {
    static async ejecutarCorteMensual() {
        try {
            const accounts = await Account.findAll();

            for (const account of accounts) {
                const ahorro = parseFloat(account.saldo_ahorro);
                const inversionActual = parseFloat(account.saldo_inversiones);

                // Solo si el ahorro supera el umbral de corte
                if (ahorro >= 100000) {
                    // Transfiere ahorro a inverciones
                    let nuevoSaldoInversion = inversionActual + ahorro;

                    // Aplica utilidad del 3%
                    const utilidad = nuevoSaldoInversion * 0.03;
                    nuevoSaldoInversion += utilidad;

                    // Actualiza todos los saldos
                    await account.update({
                        saldo_ahorro: 0,
                        saldo_inversiones: nuevoSaldoInversion
                    });

                    // Dejar la trasabilidad del corte
                    try {
                        await RecordCut.create({
                           account_id: account.id,
                            cutoff_date: new Date(),
                            generated_profit: ahorro,
                            transferred_savings: utilidad,
                            investment_balance: nuevoSaldoInversion
                        });
                    }catch(e){
                        console.error('Error al crear RecordCut:', e);
                    }

                    // Registra movimiento contable de corte
                    await Movement.create({
                        account_id: account.id,
                        type: 'Corte Mensual',
                        amount: ahorro,
                        desc: `Ahorro transferido a inversiones con utilidad del 3% (${utilidad.toFixed(2)}).`,
                        date: new Date()
                    });
                    console.log('ID de cuenta:', account.id, account.account_id);

                }
            }
            return { success: true, message: 'Corte mensual ejecutado exitosamente.' };
        } catch (error) {
            console.error('Error en el corte mensual:', error);
            return { success: false, message: 'Error al ejecutar corte mensual.' };
        }
    }
}
module.exports = CorteContableService;