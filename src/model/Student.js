const mongoose = require("mongoose");
const validator = require("validator");
const studentScheme = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  age: {
    type: Number,
    required: true,
    min: 2,
    max: 150,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "E-mail already exists"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error();
      }
    },
  },
  phone: {
    type: String,
    required: true,
    unique: [true, "Mobile NO: already exists"],
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error();
      }
    },
    min: 10,
    max: 12,
  },
  department: {
    type: String,
    required: true,
    min: 3,
  },
  native: {
    type: String,
    required: false,
    min: 3,
  },
});

const Students = new mongoose.model("student", studentScheme);

module.exports = Students;
