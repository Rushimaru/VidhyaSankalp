import Student from '../models/Student.js';

// ── Helper: read a cookie value from request headers ──────────────────────────
const getCookieValue = (req, name) => {
  const cookies = req.headers.cookie || '';
  const found = cookies
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${name}=`));
  return found ? found.split('=')[1] : null;
};

// @desc   Add new student
// @route  POST /api/students
// @access Private
export const addStudent = async (req, res) => {
  try {
    // Get schoolId from cookie
    const schoolId = getCookieValue(req, 'userId');

    if (!schoolId) {
      return res.status(401).json({ message: 'School ID not found. Please log in again.' });
    }

    const { admissionNo, loginEmail } = req.body;

    // Check duplicates within same school
    const [admissionExists, emailExists] = await Promise.all([
      Student.findOne({ admissionNo, schoolId }),
      Student.findOne({ loginEmail }),
    ]);

    if (admissionExists) {
      return res.status(400).json({ message: 'Admission number already exists in your school.' });
    }
    if (emailExists) {
      return res.status(400).json({ message: 'Login email is already in use.' });
    }

    const student = await Student.create({ ...req.body, schoolId });

    res.status(201).json({
      message: 'Student added successfully.',
      student: {
        _id:          student._id,
        admissionNo:  student.admissionNo,
        fullName:     student.fullName,
        classSection: student.classSection,
        section:      student.section,
        schoolId:     student.schoolId,
      },
    });
  } catch (error) {
    console.error('Add student error:', error.message);

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ message: `${field} already exists.` });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// @desc   Get all students for logged-in school
// @route  GET /api/students
// @access Private
export const getStudents = async (req, res) => {
  try {
    const schoolId = getCookieValue(req, 'userId');

    if (!schoolId) {
      return res.status(401).json({ message: 'School ID not found. Please log in again.' });
    }

    const students = await Student.find({ schoolId })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(students);
  } catch (error) {
    console.error('Get students error:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc   Get single student
// @route  GET /api/students/:id
// @access Private
export const getStudentById = async (req, res) => {
  try {
    const schoolId = getCookieValue(req, 'userId');

    const student = await Student.findOne({ _id: req.params.id, schoolId })
      .select('-password');

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.json(student);
  } catch (error) {
    console.error('Get student error:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc   Update student
// @route  PUT /api/students/:id
// @access Private
export const updateStudent = async (req, res) => {
  try {
    const schoolId = getCookieValue(req, 'userId');
    const { password, schoolId: _, ...updateData } = req.body;

    const student = await Student.findOneAndUpdate(
      { _id: req.params.id, schoolId },
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.json({ message: 'Student updated successfully.', student });
  } catch (error) {
    console.error('Update student error:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc   Delete student
// @route  DELETE /api/students/:id
// @access Private
export const deleteStudent = async (req, res) => {
  try {
    const schoolId = getCookieValue(req, 'userId');

    const student = await Student.findOneAndDelete({ _id: req.params.id, schoolId });

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.json({ message: 'Student deleted successfully.' });
  } catch (error) {
    console.error('Delete student error:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};