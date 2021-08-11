const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');
const mongooseHidden = require('mongoose-hidden')({ hidden: {email: true, password: true} }); //Masquage des données

//Schema for each user
const userSchema = new mongoose.Schema(
  {
    email:
    {
      type: String,
      required: true,
      validate: [isEmail], //email validation
      lowercase: true,
      trim: true,     //delete spaces
      unique: true,
      hide: true,
    },
    password:
    {
      type: String, 
      required: true,
      hide: true,
    },
  },
  {
    timestamps: true, //Date de création et de mise à jour
  }
)

userSchema.plugin(mongooseUniqueValidator);
userSchema.plugin(mongooseHidden);

module.exports = mongoose.model('User', userSchema);