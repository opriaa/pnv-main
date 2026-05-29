const pincodeService = require("../services/pincodeService");

const checkPincode = async (req, res, next) => {
  try {
    const result = await pincodeService.checkPincode(req.params.code);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { checkPincode };
