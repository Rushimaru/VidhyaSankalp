import Teacher from '../models/Teacher.js';

// Add new teacher
export const addTeacher = async (req, res) => {
  try {
    const schoolId = req.user._id;
    const { employeeId, loginEmail } = req.body;

    const [empExists, emailExists] = await Promise.all([
      Teacher.findOne({ employeeId, schoolId }),
      Teacher.findOne({ loginEmail }),
    ]);

    if (empExists)   return res.status(400).json({ message: 'Employee ID already exists in your school.' });
    if (emailExists) return res.status(400).json({ message: 'Login email is already in use.' });

    const teacher = await Teacher.create({ ...req.body, schoolId });

    res.status(201).json({
      message: 'Teacher added successfully.',
      teacher: {
        _id:        teacher._id,
        employeeId: teacher.employeeId,
        fullName:   teacher.fullName,
        designation: teacher.designation,
        department:  teacher.department,
      },
    });
  } catch (error) {
    console.error('Add teacher error:', error.message);
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

// Get all teachers for school
export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({ schoolId: req.user._id })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(teachers);
  } catch (error) {
    console.error('Get teachers error:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get single teacher
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ _id: req.params.id, schoolId: req.user._id })
      .select('-password');
    if (!teacher) return res.status(404).json({ message: 'Teacher not found.' });
    res.json(teacher);
  } catch (error) {
    console.error('Get teacher error:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Update teacher
export const updateTeacher = async (req, res) => {
  try {
    const { schoolId: _, password, ...updateData } = req.body;
    if (password && password.trim()) updateData.password = password;

    const teacher = await Teacher.findOneAndUpdate(
      { _id: req.params.id, schoolId: req.user._id },
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!teacher) return res.status(404).json({ message: 'Teacher not found.' });
    res.json({ message: 'Teacher updated successfully.', teacher });
  } catch (error) {
    console.error('Update teacher error:', error.message);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error.' });
  }
};

// Delete teacher
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findOneAndDelete({ _id: req.params.id, schoolId: req.user._id });
    if (!teacher) return res.status(404).json({ message: 'Teacher not found.' });
    res.json({ message: 'Teacher deleted successfully.' });
  } catch (error) {
    console.error('Delete teacher error:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};