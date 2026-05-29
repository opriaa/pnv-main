const bankDetailsRepository = require("../repositories/bankDetailsRepository");

const getBankDetails = () => bankDetailsRepository.get();

const upsertBankDetails = (data) => bankDetailsRepository.upsert(data);

module.exports = { getBankDetails, upsertBankDetails };
