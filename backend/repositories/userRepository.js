const User = require("../models/User");

const findByEmail = (email) => User.findOne({ email });

const findById = (id) => User.findById(id);

const create = (data) => User.create(data);

const updateById = (id, data) =>
  User.findByIdAndUpdate(id, data, { new: true, runValidators: true });

module.exports = { findByEmail, findById, create, updateById };
