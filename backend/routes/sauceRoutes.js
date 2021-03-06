const express = require('express');
const router = express.Router();
const sauceController = require('../controllers/sauceController');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', auth, sauceController.displaySauces);                 //Get all sauces
router.get('/:id', auth, sauceController.displayOneSauce);            //Get one sauce
router.post('/', auth, multer, sauceController.createSauce);          //Post a new sauce
router.put('/:id', auth, multer, sauceController.updateSauce);        //Update a sauce
router.delete('/:id', auth, sauceController.deleteSauce);             //Delete sauce
router.post('/:id/like', auth, sauceController.like)                   //Like OR Dislike a sauce

module.exports = router;