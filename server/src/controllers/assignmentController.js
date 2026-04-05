import Assignment from '../models/Assignment.js';
import path from 'path';

// ── GET /api/assignments
export const listAssignments = async (req, res) => {
  try {
    const filter = { institution: req.user.institutionId, isActive: true };
    if (req.query.class) filter.class = req.query.class;
    if (req.query.subject) filter.subject = req.query.subject;
    if (req.query.createdBy) filter.createdBy = req.query.createdBy;
    const assignments = await Assignment.find(filter)
      .populate('subject', 'name')
      .populate('class', 'name')
      .populate('createdBy', 'name')
      .select('-submissions')
      .sort('-createdAt');
    res.json(assignments);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── GET /api/assignments/:id
export const getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOne({ _id: req.params.id, institution: req.user.institutionId })
      .populate('subject', 'name')
      .populate('class', 'name')
      .populate('createdBy', 'name')
      .populate('submissions.student', 'fullName admissionNo');
    if (!assignment) return res.status(404).json({ message: 'Assignment not found.' });
    res.json(assignment);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── POST /api/assignments
export const createAssignment = async (req, res) => {
  try {
    const { title, description, subject, class: classId, section, academicYear, dueDate, maxMarks } = req.body;
    if (!title || !subject || !classId || !dueDate) {
      return res.status(400).json({ message: 'title, subject, class and dueDate required.' });
    }
    const assignment = await Assignment.create({
      institution: req.user.institutionId,
      academicYear, class: classId, section, subject,
      createdBy: req.user._id, title, description, dueDate,
      maxMarks: maxMarks || 100,
    });
    res.status(201).json(assignment);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── PUT /api/assignments/:id
export const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndUpdate(
      { _id: req.params.id, institution: req.user.institutionId },
      req.body, { new: true }
    );
    if (!assignment) return res.status(404).json({ message: 'Assignment not found.' });
    res.json(assignment);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── POST /api/assignments/:id/submit  (student submits file)
export const submitAssignment = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });
    const assignment = await Assignment.findOne({ _id: req.params.id, institution: req.user.institutionId });
    if (!assignment) return res.status(404).json({ message: 'Assignment not found.' });

    // Remove any previous submission by this student
    assignment.submissions = assignment.submissions.filter(
      s => s.student?.toString() !== req.user.studentId?.toString()
    );

    assignment.submissions.push({
      student: req.body.studentId || req.user.studentId,
      fileUrl: `/uploads/submissions/${req.file.filename}`,
      fileName: req.file.originalname,
      submittedAt: new Date(),
    });
    await assignment.save();
    res.json({ message: 'Assignment submitted successfully.' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── PATCH /api/assignments/:id/grade/:studentId
export const gradeSubmission = async (req, res) => {
  try {
    const assignment = await Assignment.findOne({ _id: req.params.id, institution: req.user.institutionId });
    if (!assignment) return res.status(404).json({ message: 'Assignment not found.' });
    const submission = assignment.submissions.find(s => s.student?.toString() === req.params.studentId);
    if (!submission) return res.status(404).json({ message: 'Submission not found.' });
    submission.grade = req.body.grade;
    submission.remarks = req.body.remarks;
    await assignment.save();
    res.json({ message: 'Submission graded.' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
