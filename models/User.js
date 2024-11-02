const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (value) => {
        return value.includes("@");
      },
    },
    required: true,
  },
  phone: {
    type: String,
    validate: {
      validator: (val) => {
        return /^\d{10}$/.test(val);
      },
      message: (props) => `${props} should be of length 10`,
    },
  },
});

const users = mongoose.model("users", UserSchema);

module.exports = users;
