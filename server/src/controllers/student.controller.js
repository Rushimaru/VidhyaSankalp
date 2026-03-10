const Student = require('../models/Student.model');

/* format mongoose validation errors ── */
const formatValidationError = (err) =>
  Object.values(err.errors).map((e) => e.message).join(', ');

/* ──handle duplicate key error ── */
const formatDuplicateError = (err) => {
  const field = Object.keys(err.keyPattern)[0];
  const label = field === 'admissionNo' ? 'Admission No.' : 'Login Email';
  return `${label} already exists. Please use a different one.`;
};

/* Create a new student */
const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    return res.status(201).json({
      success: true,
      message: `Student "${student.fullName}" saved successfully!`,
      data: { ...student.toObject(), password: undefined },
    });

  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ success: false, message: formatDuplicateError(err) });

    if (err.name === 'ValidationError')
      return res.status(422).json({ success: false, message: formatValidationError(err) });

    console.error('[createStudent]', err);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

/* List students with pagination + search */
const getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', classSelection, section, academicYear } = req.query;

    /* Build filter */
    const filter = {};
    if (search)        filter.$text = { $search: search };
    if (classSelection) filter.classSelection = classSelection;
    if (section)       filter.section = section;
    if (academicYear)  filter.academicYear = academicYear;

    const skip  = (Number(page) - 1) * Number(limit);
    const total = await Student.countDocuments(filter);

    const students = await Student.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    return res.json({
      success: true,
      data:    students,
      meta: {
        total,
        page:  Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });

  } catch (err) {
    console.error('[getAllStudents]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

/* Get single student by MongoDB _id */
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('-password');
    if (!student)
      return res.status(404).json({ success: false, message: 'Student not found.' });

    return res.json({ success: true, data: student });

  } catch (err) {
    if (err.name === 'CastError')
      return res.status(400).json({ success: false, message: 'Invalid student ID.' });

    console.error('[getStudentById]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

/* Update student */
const updateStudent = async (req, res) => {
  try {
    /* Prevent password being sent back in response */
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updated)
      return res.status(404).json({ success: false, message: 'Student not found.' });

    return res.json({
      success: true,
      message: `Student "${updated.fullName}" updated successfully!`,
      data: updated,
    });

  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ success: false, message: formatDuplicateError(err) });

    if (err.name === 'ValidationError')
      return res.status(422).json({ success: false, message: formatValidationError(err) });

    if (err.name === 'CastError')
      return res.status(400).json({ success: false, message: 'Invalid student ID.' });

    console.error('[updateStudent]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

/* Delete student */
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student)
      return res.status(404).json({ success: false, message: 'Student not found.' });

    return res.json({
      success: true,
      message: `Student "${student.fullName}" deleted successfully.`,
    });

  } catch (err) {
    if (err.name === 'CastError')
      return res.status(400).json({ success: false, message: 'Invalid student ID.' });

    console.error('[deleteStudent]', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent };