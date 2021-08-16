const multer = require('multer');

//Convert images format to jpg or png
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); //Null if no error + folder name
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); //Replace space by _
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');