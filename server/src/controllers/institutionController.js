import AcademicYear from '../models/AcademicYear.js';
import Class from '../models/Class.js';
import Subject from '../models/Subject.js';
import User from '../models/User.js';
import { sendWelcomeEmail } from '../utils/emailService.js';

// ═══════════════ ACADEMIC YEAR ═══════════════

export const listAcademicYears = async (req, res) => {
  try {
    const years = await AcademicYear.find({ institution: req.user.institutionId }).sort('-startDate');
    res.json(years);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const createAcademicYear = async (req, res) => {
  try {
    const { name, startDate, endDate, isCurrent } = req.body;
    if (!name || !startDate || !endDate) return res.status(400).json({ message: 'Name, startDate and endDate required.' });
    if (isCurrent) {
      await AcademicYear.updateMany({ institution: req.user.institutionId }, { isCurrent: false });
    }
    const year = await AcademicYear.create({ institution: req.user.institutionId, name, startDate, endDate, isCurrent: !!isCurrent });
    res.status(201).json(year);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const updateAcademicYear = async (req, res) => {
  try {
    if (req.body.isCurrent) {
      await AcademicYear.updateMany({ institution: req.user.institutionId }, { isCurrent: false });
    }
    const year = await AcademicYear.findOneAndUpdate(
      { _id: req.params.id, institution: req.user.institutionId },
      req.body, { new: true }
    );
    if (!year) return res.status(404).json({ message: 'Academic year not found.' });
    res.json(year);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const deleteAcademicYear = async (req, res) => {
  try {
    await AcademicYear.findOneAndDelete({ _id: req.params.id, institution: req.user.institutionId });
    res.json({ message: 'Academic year deleted.' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ═══════════════ CLASSES ═══════════════

export const listClasses = async (req, res) => {
  try {
    const filter = { institution: req.user.institutionId };
    if (req.query.academicYear) filter.academicYear = req.query.academicYear;
    const classes = await Class.find(filter)
      .populate('academicYear', 'name')
      .populate('classTeacher', 'name email')
      .sort('name');
    res.json(classes);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const createClass = async (req, res) => {
  try {
    const { name, academicYear, sections, classTeacher } = req.body;
    if (!name || !academicYear) return res.status(400).json({ message: 'Name and academicYear required.' });
    const cls = await Class.create({
      institution: req.user.institutionId, name, academicYear,
      sections: sections || [], classTeacher: classTeacher || null,
    });
    res.status(201).json(cls);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const updateClass = async (req, res) => {
  try {
    const cls = await Class.findOneAndUpdate(
      { _id: req.params.id, institution: req.user.institutionId },
      req.body, { new: true }
    );
    if (!cls) return res.status(404).json({ message: 'Class not found.' });
    res.json(cls);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const deleteClass = async (req, res) => {
  try {
    const cls = await Class.findOneAndDelete({ _id: req.params.id, institution: req.user.institutionId });
    if (!cls) return res.status(404).json({ message: 'Class not found.' });
    res.json({ message: 'Class deleted.' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ═══════════════ SUBJECTS ═══════════════

export const listSubjects = async (req, res) => {
  try {
    const filter = { institution: req.user.institutionId };
    if (req.query.class) filter.class = req.query.class;
    if (req.query.academicYear) filter.academicYear = req.query.academicYear;
    const subjects = await Subject.find(filter)
      .populate('class', 'name')
      .populate('teacher', 'name email')
      .sort('name');
    res.json(subjects);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const createSubject = async (req, res) => {
  try {
    const { name, code, class: classId, academicYear, teacher } = req.body;
    if (!name || !classId || !academicYear) return res.status(400).json({ message: 'Name, class and academicYear required.' });
    const subject = await Subject.create({
      institution: req.user.institutionId, name, code, class: classId, academicYear, teacher: teacher || null,
    });
    res.status(201).json(subject);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findOneAndUpdate(
      { _id: req.params.id, institution: req.user.institutionId },
      req.body, { new: true }
    );
    if (!subject) return res.status(404).json({ message: 'Subject not found.' });
    res.json(subject);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findOneAndDelete({ _id: req.params.id, institution: req.user.institutionId });
    if (!subject) return res.status(404).json({ message: 'Subject not found.' });
    res.json({ message: 'Subject deleted.' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ═══════════════ FACULTY (Admin-level) ═══════════════

export const listFaculty = async (req, res) => {
  try {
    const faculty = await User.find({ institutionId: req.user.institutionId, role: 'faculty' })
      .select('-password').sort('name');
    res.json(faculty);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const createFaculty = async (req, res) => {
  try {
    const { name, email, phone, password = 'Vidhya@123' } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name and email required.' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered.' });
    const user = await User.create({
      name, email, phone, password, role: 'faculty',
      institutionId: req.user.institutionId, isVerified: true,
    });
    await sendWelcomeEmail({ to: email, name, role: 'Faculty', password, institutionName: '' });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const updateFaculty = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, institutionId: req.user.institutionId, role: 'faculty' },
      rest, { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ message: 'Faculty not found.' });
    res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

export const toggleFacultyStatus = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, institutionId: req.user.institutionId, role: 'faculty' });
    if (!user) return res.status(404).json({ message: 'Faculty not found.' });
    user.isActive = !user.isActive;
    await user.save();
    res.json({ isActive: user.isActive });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
