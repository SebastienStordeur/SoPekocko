const Sauce = require("../models/sauceModel");
const fs = require("fs");

//Create a Sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`, //Reconstruction de la source de l'image (ici dossier images)
    likes: 0,
    dislikes: 0,
    /*     usersLiked: [''],
    usersDisliked: [''] */
    //req.protocol = http or https           req.get('host') => nom d'hôte          $req.file.filename = nom du fichier
  });
  //Save Sauce
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce créée" }))
    .catch((error) =>
      res.status(400).json({ message: "impossible de créer la sauce" })
    );
};

//Update a Sauce (only available for the creator) => See auth middleware
exports.updateSauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Sauce modifiée" }))
          .catch((error) => res.status(404).json(error));
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

//Delete a sauce (only avaiblable for the creator) => See auth middleware
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) //display the selected item with its id
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        //To delete the stored img
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//Display all sauces once logged in
exports.displaySauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

//Display the clicked sauce with its infos (see model)
exports.displayOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) //display the selected item with its id
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json(error));
};

//Manage like and dislikes
exports.like = (req, res, next) => {
  switch (req.body.like) {
    case 1:
      Sauce.updateOne(
        { _id: req.params.id },
        { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } }
      )
        .then(() => res.status(200).json({ message: "like envoyé" }))
        .catch((error) => res.status(400).json({ error }));
      break;

    case -1:
      Sauce.updateOne(
        { _id: req.params.id },
        { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: +1 } }
      )
        .then(() => {
          res.status(200).json({ message: "dislike envoyé" });
        })
        .catch((error) => res.status(400).json({ error }));
      break;

    case 0:
      Sauce.findOne({ _id: req.params.id }).then((sauce) => {
        if (sauce.usersLiked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
          )
            .then(() => res.status(200).json({ message: 'Like supprimé' }))
            .catch((error) => res.status(400).json({ error }));
        }
        if (sauce.usersDisliked.includes(req.body.userId)) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $pull: { usersDisliked: req.body.userId },
              $inc: { dislikes: -1 },
            }
          )
            .then(() => res.status(200).json({ message: 'Dislike supprimé' }))
            .catch((error) => res.status(400).json({ error }));
        }
      });
      break;

    default:
      console.log("Comportement par défaut");
      break;
  }
};
