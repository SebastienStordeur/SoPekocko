const PasswordValidator = require('password-validator');
const pswSchema = new PasswordValidator;

pswSchema 
.is().min(8)
.is().max(64)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().symbols()
.has().not().spaces()

// Longueur entre 8 et 64 caractères, doit contenir une minuscule, une majuscule
// un chiffre et aucun espace

module.exports = pswSchema;