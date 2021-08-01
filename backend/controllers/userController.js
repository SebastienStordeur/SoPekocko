const User = require('../models/userModel'); //Import user model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//signup

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 15)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: "Utilisateur crée"}))
        .catch(error => res.status(500).json({ message: "Impossible de créer l'utilisateur" + error}));
    })
}

//login 

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user) return res.status(401).json({ message: "Impossible de trouver cet utilisateur"})
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if(!valid) return res.status(401).json({ message: "Mot de passe incorrect"})
          res.status(200).json({
            userId: user._id,
            //token: "TOKEN",
            token: jwt.sign({ userId: user._id }, "SECRET_TOKEN", { expiresIn: '24h' })
           /*  token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresin: '24h' }
            ) */
          });
        })
        .catch(error => res.status(500).json({ message:  "erreur1" }));
    })
    .catch(error => res.status(500).json({message: "erreur 2"}))
}

/* function authentificateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(token == null) return res.sendStatus(401)

  jwt.verify(token, "SECRET_TOKEN", (err, user) => {
    if(err) return res.sendStatus(403) 
    req.user = user 
    next()
  })
} */