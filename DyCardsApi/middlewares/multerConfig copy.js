// middlewares/multerConfig.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/perfiles'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nombre = `perfil_${Date.now()}${ext}`;
    cb(null, nombre);
  }
});

/* const storage = multer.diskStorage({
  destination: '/var/www/DyCardsApi/uploads/perfiles',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nombre = `perfil_${Date.now()}${ext}`;
    cb(null, nombre);
  }
}); */


const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB 
});

module.exports = upload;
