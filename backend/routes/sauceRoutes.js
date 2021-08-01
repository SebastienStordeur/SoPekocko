const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauceController');

router.get('/', sauceController.displaySauces);         //Get all sauces
router.get('/:id', sauceController.displayOneSauce);    //Get one sauce
router.post('/', sauceController.createSauce);          //Post a new sauce
router.put('/:id', sauceController.updateSauce);        //Update a sauce
router.delete(':id', sauceController.deleteSauce);      //Delete sauce
//router.post('/like', sauceController.like)    //A définir

module.exports = router;