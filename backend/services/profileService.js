const userRepository = require("../repositories/userRepository");
const ApiError = require("../utils/ApiError");

const getProfile = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) throw new ApiError(404, "User not found");
  return user;
};

const updateProfile = async (userId, data) => {
  const allowed = [
    "businessName",
    "gstNumber",
    "contactPerson",
    "phone",
    "billingAddress",
    "shippingAddress",
  ];

  const update = {};
  for (const key of allowed) {
    if (data[key] !== undefined) update[key] = data[key];
  }

  const user = await userRepository.updateById(userId, update);
  if (!user) throw new ApiError(404, "User not found");
  return user;
};

module.exports = { getProfile, updateProfile };
