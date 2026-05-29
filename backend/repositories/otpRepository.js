const OtpRequest = require("../models/OtpRequest");

const create = (data) => OtpRequest.create(data);

const findLatestByEmail = (email) =>
  OtpRequest.findOne({ email, verified: false }).sort({ createdAt: -1 });

const markVerified = (id) =>
  OtpRequest.findByIdAndUpdate(id, { verified: true });

const incrementAttempts = (id) =>
  OtpRequest.findByIdAndUpdate(id, { $inc: { attempts: 1 } });

module.exports = { create, findLatestByEmail, markVerified, incrementAttempts };
