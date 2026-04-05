import Student from '../models/Student.js';
import XLSX from 'xlsx';

// ── Helper: resolve schoolId from either old user._id or new institutionId-aware system
const getSchoolId = (user) => user.institutionId || user._id;

// ── Add new student
export const addStudent = async (req, res) => {
  try {
    const schoolId = getSchoolId(req.user);
    const { admissionNo, loginEmail } = req.body;
    const [admissionExists, emailExists] = await Promise.all([
      Student.findOne({ admissionNo, schoolId }),
      Student.findOne({ loginEmail }),
    ]);
    if (admissionExists) return res.status(400).json({ message: 'Admission number already exists in your school.' });
    if (emailExists) return res.status(400).json({ message: 'Login email is already in use.' });
    const student = await Student.create({ ...req.body, schoolId });
    res.status(201).json({
      message: 'Student added successfully.',
      student: { _id: student._id, admissionNo: student.admissionNo, fullName: student.fullName, classSection: student.classSection, section: student.section },
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ message: `${field} already exists.` });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: Object.values(error.errors).map(e => e.message).join(', ') });
    }
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// ── Get all students
export const getStudents = async (req, res) => {
  try {
    const schoolId = getSchoolId(req.user);
    const filter = { schoolId };
    if (req.query.class) filter.classSection = req.query.class;
    if (req.query.section) filter.section = req.query.section;
    if (req.query.search) {
      filter.$or = [
        { fullName: { $regex: req.query.search, $options: 'i' } },
        { admissionNo: { $regex: req.query.search, $options: 'i' } },
      ];
    }
    const students = await Student.find(filter).select('-password').sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// ── Get single student
export const getStudentById = async (req, res) => {
  try {
    const schoolId = getSchoolId(req.user);
    const student = await Student.findOne({ _id: req.params.id, schoolId }).select('-password');
    if (!student) return res.status(404).json({ message: 'Student not found.' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// ── Update student
export const updateStudent = async (req, res) => {
  try {
    const schoolId = getSchoolId(req.user);
    const { password, schoolId: _, ...updateData } = req.body;
    const student = await Student.findOneAndUpdate({ _id: req.params.id, schoolId }, updateData, { new: true, runValidators: true }).select('-password');
    if (!student) return res.status(404).json({ message: 'Student not found.' });
    res.json({ message: 'Student updated successfully.', student });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: Object.values(error.errors).map(e => e.message).join(', ') });
    }
    res.status(500).json({ message: 'Server error.' });
  }
};

// ── Delete student
export const deleteStudent = async (req, res) => {
  try {
    const schoolId = getSchoolId(req.user);
    const student = await Student.findOneAndDelete({ _id: req.params.id, schoolId });
    if (!student) return res.status(404).json({ message: 'Student not found.' });
    res.json({ message: 'Student deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// ── Bulk upload via Excel
export const bulkUploadStudents = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No Excel file uploaded.' });
    const schoolId = getSchoolId(req.user);
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    if (!rows.length) return res.status(400).json({ message: 'Excel sheet is empty.' });

    const results = { created: 0, skipped: 0, errors: [] };
    for (const row of rows) {
      try {
        const loginEmail = row.loginEmail || row.email || `${row.admissionNo}@student.vidhyasankalp.com`;
        const exists = await Student.findOne({ $or: [{ admissionNo: row.admissionNo, schoolId }, { loginEmail }] });
        if (exists) { results.skipped++; continue; }
        await Student.create({
          schoolId,
          admissionNo: row.admissionNo || '',
          fullName: row.fullName || row.name || '',
          gender: row.gender || 'Male',
          dateOfBirth: row.dateOfBirth ? new Date(row.dateOfBirth) : new Date('2000-01-01'),
          classSection: row.classSection || row.class || '',
          section: row.section || 'A',
          academicYear: row.academicYear || req.body.academicYear || '',
          category: row.category || 'General',
          religion: row.religion || 'Hindu',
          motherTongue: row.motherTongue || 'Hindi',
          nationality: row.nationality || 'Indian',
          phoneNumber: row.phoneNumber || row.phone || '0000000000',
          fathersName: row.fathersName || row.father || '',
          fathersPhone: row.fathersPhone || '0000000000',
          mothersName: row.mothersName || row.mother || '',
          currentAddress: row.currentAddress || row.address || '',
          loginEmail,
          password: row.password || 'Vidhya@123',
        });
        results.created++;
      } catch (e) {
        results.errors.push({ row: row.admissionNo, error: e.message });
      }
    }
    res.json({ message: `Bulk upload complete. Created: ${results.created}, Skipped: ${results.skipped}`, ...results });
  } catch (error) {
    res.status(500).json({ message: 'Bulk upload failed: ' + error.message });
  }
};

// ── Dashboard stats (count students per class etc)
export const getStudentStats = async (req, res) => {
  try {
    const schoolId = getSchoolId(req.user);
    const total = await Student.countDocuments({ schoolId });
    const active = await Student.countDocuments({ schoolId, isActive: true });
    const byClass = await Student.aggregate([
      { $match: { schoolId } },
      { $group: { _id: '$classSection', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    res.json({ total, active, inactive: total - active, byClass });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};