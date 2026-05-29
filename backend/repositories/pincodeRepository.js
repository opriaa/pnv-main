const Pincode = require("../models/Pincode");

const findByPincode = (pincode) => Pincode.findOne({ pincode }).lean();

const findAll = ({ page = 1, limit = 50 } = {}) => {
  const skip = (page - 1) * limit;
  return Pincode.find().sort({ pincode: 1 }).skip(skip).limit(limit).lean();
};

const create = (data) => Pincode.create(data);

const updateById = (id, data) =>
  Pincode.findByIdAndUpdate(id, data, { new: true, runValidators: true });

const deleteById = (id) => Pincode.findByIdAndDelete(id);

const bulkInsert = (docs) => Pincode.insertMany(docs, { ordered: false });

module.exports = {
  findByPincode,
  findAll,
  create,
  updateById,
  deleteById,
  bulkInsert,
};
