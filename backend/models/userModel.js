const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

//Schema for each user

const userSchema = new mongoose.Schema(
  {
    email:
    {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password:
    {
      type: String, 
      required: true,
      max: 1024,
      minLength: 6
    },
  },
  {
    timestamps: true, //Date de création et de mise à jour
  }
)

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);