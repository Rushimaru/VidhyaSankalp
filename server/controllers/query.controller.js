const Query = require("../models/Query");

exports.create = async (req, res) => {
  const q = await Query.create({
    ...req.body,
    institutionId: req.user.institutionId,
    raisedBy: req.user._id
  });
  res.json(q);
};

exports.list = async (req, res) => {
  const data = await Query.find({ institutionId: req.user.institutionId });
  res.json(data);
};
