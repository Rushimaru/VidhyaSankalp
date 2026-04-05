import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';

// ── POST /api/attendance/mark
export const markAttendance = async (req, res) => {
  const { class: classId, section, date, subject, records, academicYear } = req.body;
  try {
    if (!classId || !section || !date || !records?.length) {
      return res.status(400).json({ message: 'class, section, date and records required.' });
    }
    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    const existing = await Attendance.findOne({
      institution: req.user.institutionId,
      class: classId, section, date: attendanceDate,
      subject: subject || null,
    });

    if (existing) {
      existing.records = records;
      existing.markedBy = req.user._id;
      await existing.save();
      return res.json({ message: 'Attendance updated.', attendance: existing });
    }

    const attendance = await Attendance.create({
      institution: req.user.institutionId,
      academicYear, class: classId, section, date: attendanceDate,
      subject: subject || null, markedBy: req.user._id, records,
    });
    res.status(201).json({ message: 'Attendance marked.', attendance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── GET /api/attendance?class=&section=&date=&month=
export const getAttendance = async (req, res) => {
  try {
    const filter = { institution: req.user.institutionId };
    if (req.query.class) filter.class = req.query.class;
    if (req.query.section) filter.section = req.query.section;
    if (req.query.date) {
      const d = new Date(req.query.date);
      d.setHours(0, 0, 0, 0);
      filter.date = d;
    } else if (req.query.month && req.query.year) {
      const start = new Date(req.query.year, req.query.month - 1, 1);
      const end = new Date(req.query.year, req.query.month, 0, 23, 59, 59);
      filter.date = { $gte: start, $lte: end };
    }
    const records = await Attendance.find(filter)
      .populate('class', 'name')
      .populate('markedBy', 'name')
      .populate('records.student', 'fullName admissionNo rollNumber')
      .sort('-date');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── GET /api/attendance/summary/:studentId
export const getStudentAttendanceSummary = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { month, year, academicYear } = req.query;

    const filter = { institution: req.user.institutionId };
    if (academicYear) filter.academicYear = academicYear;
    if (month && year) {
      filter.date = {
        $gte: new Date(year, month - 1, 1),
        $lte: new Date(year, month, 0, 23, 59, 59),
      };
    }

    const records = await Attendance.find(filter);
    const summary = { P: 0, A: 0, L: 0, HD: 0, total: 0 };
    const dailyRecords = [];

    records.forEach(att => {
      const studentRecord = att.records.find(r => r.student?.toString() === studentId);
      if (studentRecord) {
        summary[studentRecord.status]++;
        summary.total++;
        dailyRecords.push({ date: att.date, status: studentRecord.status });
      }
    });

    const percentage = summary.total ? ((summary.P / summary.total) * 100).toFixed(1) : 0;
    res.json({ summary, percentage, dailyRecords });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
