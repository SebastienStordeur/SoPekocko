const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');


//Schema for each user
const userSchema = new mongoose.Schema(
  {
    email:
    {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      trim: true,     //delete spaces
      unique: true,
    },
    password:
    {
      type: String, 
      required: true,
    },
  },
  {
    timestamps: true, //Date de création et de mise à jour
  }
)

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);