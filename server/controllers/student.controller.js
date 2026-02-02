const Student = require("../models/Student");

exports.create = async (req, res) => {
  const student = await Student.create({
    ...req.body,
    institutionId: req.user.institutionId
  });
  res.json(student);
};

exports.list = async (req, res) => {
  const students = await Student.find({ institutionId: req.user.institutionId });
  res.json(students);
};
