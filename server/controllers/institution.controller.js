const Institution = require("../models/Institution");

exports.create = async (req, res) => {
  const institution = await Institution.create(req.body);
  res.json(institution);
};

exports.list = async (req, res) => {
  const data = await Institution.find();
  res.json(data);
};
