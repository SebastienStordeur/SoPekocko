const PasswordValidator = require('password-validator');
const pswSchema = new PasswordValidator;

pswSchema 
.is().min(8)
.is().max(64)
.has().uppercase(1)
.has().lowercase(1)
.has().digits(1)
.has().not().spaces()

// Longueur entre 8 et 64 caractères, doit contenir une minuscule, une majuscule
// un chiffre et aucun espace

module.exports = pswSchema;