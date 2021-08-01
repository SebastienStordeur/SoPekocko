const Sauce = require('../models/sauceModel');

exports.createSauce = (req, res, next) => {
  delete req.body._id;
  const sauce = new Sauce ({
    ...req.body
  });
  sauce.save()
    .then(() => res.status(201).json({ message: "Sauce créée"}))
    .catch(error => res.status(400).json({ message: 'impossible de creer la sauce' }));
}

 exports.updateSauce = (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id:req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée'}))
    .catch(error => res.status(404).json(error));
}

exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimée'}))
    .catch(error => res.status(400).json({ error }));
} 

exports.displaySauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json({ sauces }))
    .catch(error => res.status(404).json({ error }));
}

exports.displayOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json(error));
} 

