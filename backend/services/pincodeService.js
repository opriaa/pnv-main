const pincodeRepository = require("../repositories/pincodeRepository");
const ApiError = require("../utils/ApiError");

const checkPincode = async (code) => {
  const pincode = await pincodeRepository.findByPincode(code);
  if (!pincode) {
    return {
      pincode: code,
      deliveryAvailable: false,
      message: "Delivery not available for this pincode",
    };
  }
  return pincode;
};

const listAll = (query) =>
  pincodeRepository.findAll({
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 50,
  });

const createPincode = (data) => pincodeRepository.create(data);

const updatePincode = async (id, data) => {
  const pincode = await pincodeRepository.updateById(id, data);
  if (!pincode) throw new ApiError(404, "Pincode not found");
  return pincode;
};

const deletePincode = async (id) => {
  const pincode = await pincodeRepository.deleteById(id);
  if (!pincode) throw new ApiError(404, "Pincode not found");
  return pincode;
};

module.exports = {
  checkPincode,
  listAll,
  createPincode,
  updatePincode,
  deletePincode,
};
