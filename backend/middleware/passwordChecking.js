const pswSchema = require('../models/passwordModel');

module.exports = (req,res,next) => {
  if(!pswSchema.validate(req.body.password)) res.status(400).json({ message : "Veuillez choisir un mot de passe plus fort (maj, min, chiffre et 8+caractères)"})
  else next();
}