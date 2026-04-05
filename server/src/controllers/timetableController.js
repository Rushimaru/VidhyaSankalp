import Timetable from '../models/Timetable.js';

// ── GET /api/timetable?class=&section=&academicYear=
export const getTimetable = async (req, res) => {
  try {
    const filter = { institution: req.user.institutionId };
    if (req.query.class) filter.class = req.query.class;
    if (req.query.section) filter.section = req.query.section;
    if (req.query.academicYear) filter.academicYear = req.query.academicYear;
    const timetable = await Timetable.findOne(filter)
      .populate('class', 'name')
      .populate('slots.subject', 'name')
      .populate('slots.teacher', 'name');
    res.json(timetable || null);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── GET /api/timetable/teacher/:userId
export const getTeacherTimetable = async (req, res) => {
  try {
    const timetables = await Timetable.find({
      institution: req.user.institutionId,
      'slots.teacher': req.params.userId,
    })
      .populate('class', 'name')
      .populate('slots.subject', 'name')
      .populate('slots.teacher', 'name');

    // Filter only slots assigned to this teacher
    const result = timetables.map(tt => ({
      ...tt.toObject(),
      slots: tt.slots.filter(s => s.teacher?.toString() === req.params.userId),
    }));
    res.json(result);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── POST /api/timetable  (upsert)
export const saveTimetable = async (req, res) => {
  try {
    const { class: classId, section, academicYear, slots } = req.body;
    if (!classId || !section || !academicYear) {
      return res.status(400).json({ message: 'class, section and academicYear required.' });
    }
    const timetable = await Timetable.findOneAndUpdate(
      { institution: req.user.institutionId, class: classId, section, academicYear },
      { slots, isActive: true },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(timetable);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ── DELETE /api/timetable/:id
export const deleteTimetable = async (req, res) => {
  try {
    await Timetable.findOneAndDelete({ _id: req.params.id, institution: req.user.institutionId });
    res.json({ message: 'Timetable deleted.' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
