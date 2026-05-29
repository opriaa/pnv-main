const BankDetails = require("../models/BankDetails");

const get = () => BankDetails.findOne().lean();

const upsert = async (data) => {
  const existing = await BankDetails.findOne();
  if (existing) {
    return BankDetails.findByIdAndUpdate(existing._id, data, {
      new: true,
      runValidators: true,
    });
  }
  return BankDetails.create(data);
};

module.exports = { get, upsert };
