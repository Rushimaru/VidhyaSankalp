const StudyMaterial = require("../models/StudyMaterial");

exports.upload = async (req, res) => {
  const material = await StudyMaterial.create({
    ...req.body,
    uploadedBy: req.user._id,
    institutionId: req.user.institutionId
  });
  res.json(material);
};
