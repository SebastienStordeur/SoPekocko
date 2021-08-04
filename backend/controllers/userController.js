const User = require('../models/userModel'); //Import user model
const jwt = require('jsonwebtoken');         //Generate a token
const bcrypt = require('bcrypt');            //Hash our password

//signup
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 15)                      //Hash function 
    .then(hash => {                                         
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()                                         //Save in db
        .then(() => res.status(201).json({ message: "Utilisateur crée"}))
        .catch(error => res.status(500).json({ message: "Impossible de créer l'utilisateur" + error}));
    })
}

//login 
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user) return res.status(401).json({ message: "Impossible de trouver cet utilisateur"})                //If email isn't in the DB => error
      bcrypt.compare(req.body.password, user.password)                                                          //Compare both passwords, the one from login and the one from db
        .then(valid => {
          if(!valid) return res.status(401).json({ message: "Mot de passe incorrect"})                          //If psw isn't valid => error
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "SECRET_TOKEN", { expiresIn: '24h' })                         //Token available 24h
          });
        })
        .catch(error => res.status(500).json({ message:  "erreur1" }));
    })
    .catch(error => res.status(500).json({message: "erreur 2"}))
}