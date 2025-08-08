function validarNumeroCelular(num) {
  const limpio = num.replace(/\D/g, '');

  if (!/^3\d{9}$/.test(limpio)) {
    return {
      valido: false,
      mensaje: 'Número inválido. Debe comenzar con 3 y tener 10 dígitos.',
    };
  }

  const numeroE164 = `+57${limpio}`;
  return {
    valido: true,
    numeroE164,
  };
}

module.exports = { validarNumeroCelular };
