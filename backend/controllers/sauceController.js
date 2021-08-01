const Sauce = require('../models/sauceModel');

exports.createSauce = (req, res, next) => {
  delete req.body._id;
  const sauce = new Sauce ({
    ...req.body
  });
  sauce.save()
    .then(() => res.status(201).json({ message: "Sauce créée"}))
    .catch(error => res.status(400).json({ error }));
}

exports.updateSauce = (req, res, next) => {
  Sauce.updateOne()
}

exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne()
}

exports.displaySauces = (req, res, next) => {
  Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json(error));
}

exports.displayOneSauce = (req, res, next) => {

}