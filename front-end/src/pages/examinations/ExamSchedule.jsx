import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SlideDrawer from '../../components/Slidedrawer';
import ConfirmModal from '../../components/ConfirmModal';

// Sample exam schedule data (matching HTML)
const initialSchedules = [
  { id: 1, className: 'Class 1 (A)', subject: 'English', examDate: '05 Jun 2015', startTime: '10:00 AM', endTime: '01:00 PM', duration: '3 hrs', room: '101' },
  { id: 2, className: 'Class 1 (A)', subject: 'English', examDate: '05 Jun 2015', startTime: '10:00 AM', endTime: '01:00 PM', duration: '3 hrs', room: '101' },
  { id: 3, className: 'Class 2 (B)', subject: 'Mathematics', examDate: '12 Jul 2016', startTime: '09:30 AM', endTime: '12:30 PM', duration: '3 hrs', room: '102' },
  { id: 4, className: 'Class 3 (C)', subject: 'Science', examDate: '18 Sep 2017', startTime: '11:00 AM', endTime: '02:00 PM', duration: '3 hrs', room: '103' },
  { id: 5, className: 'Class 4 (A)', subject: 'History', examDate: '02 Jan 2018', startTime: '08:30 AM', endTime: '11:30 AM', duration: '3 hrs', room: '104' },
  { id: 6, className: 'Class 5 (B)', subject: 'Geography', examDate: '10 Mar 2019', startTime: '12:00 PM', endTime: '03:00 PM', duration: '3 hrs', room: '105' },
  { id: 7, className: 'Class 6 (A)', subject: 'Bangla', examDate: '20 Apr 2020', startTime: '09:00 AM', endTime: '12:00 PM', duration: '3 hrs', room: '106' },
  { id: 8, className: 'Class 7 (C)', subject: 'Computer', examDate: '15 Aug 2021', startTime: '01:00 PM', endTime: '04:00 PM', duration: '3 hrs', room: '107' },
  { id: 9, className: 'Class 8 (B)', subject: 'Physics', examDate: '09 Oct 2022', startTime: '10:30 AM', endTime: '01:30 PM', duration: '3 hrs', room: '108' },
  { id: 10, className: 'Class 9 (A)', subject: 'Chemistry', examDate: '25 Dec 2023', startTime: '09:45 AM', endTime: '12:45 PM', duration: '3 hrs', room: '109' },
  { id: 11, className: 'Class 10 (C)', subject: 'Biology', examDate: '03 Feb 2024', startTime: '02:00 PM', endTime: '05:00 PM', duration: '3 hrs', room: '110' },
];

const ExamSchedule = () => {
  // ---------- State ----------
  const [schedules, setSchedules] = useState(initialSchedules);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer states
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null); // { id, className, subject, examDate, startTime, endTime, duration, room }

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, scheduleId: null, scheduleInfo: '' });

  // ---------- Filtered data ----------
  const filteredSchedules = useMemo(() => {
    return schedules.filter((s) =>
      s.className.toLowerCase().includes(search.toLowerCase()) ||
      s.subject.toLowerCase().includes(search.toLowerCase()) ||
      s.room.toLowerCase().includes(search.toLowerCase())
    );
  }, [schedules, search]);

  const paginatedSchedules = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredSchedules.slice(start, start + rowsPerPage);
  }, [filteredSchedules, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredSchedules.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedSchedules.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const openAddDrawer = () => {
    setEditingSchedule(null);
    setAddDrawerOpen(true);
  };

  const openEditDrawer = (schedule) => {
    setEditingSchedule(schedule);
    setEditDrawerOpen(true);
  };

  const closeAddDrawer = () => setAddDrawerOpen(false);
  const closeEditDrawer = () => {
    setEditDrawerOpen(false);
    setEditingSchedule(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const className = formData.get('className');
    const section = formData.get('section');
    const room = formData.get('room');
    const subject = formData.get('subject');
    const examDate = formData.get('examDate');
    const startTime = formData.get('startTime');
    const endTime = formData.get('endTime');
    const duration = formData.get('duration');

    // Combine class and section
    const fullClassName = `${className} (${section})`;

    const newId = Math.max(...schedules.map((s) => s.id), 0) + 1;
    setSchedules([...schedules, { 
      id: newId, 
      className: fullClassName, 
      subject, 
      examDate, 
      startTime, 
      endTime, 
      duration, 
      room 
    }]);
    closeAddDrawer();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const className = formData.get('className');
    const section = formData.get('section');
    const room = formData.get('room');
    const subject = formData.get('subject');
    const examDate = formData.get('examDate');
    const startTime = formData.get('startTime');
    const endTime = formData.get('endTime');
    const duration = formData.get('duration');

    const fullClassName = `${className} (${section})`;

    setSchedules((prev) =>
      prev.map((s) =>
        s.id === editingSchedule.id ? { 
          ...s, 
          className: fullClassName, 
          subject, 
          examDate, 
          startTime, 
          endTime, 
          duration, 
          room 
        } : s
      )
    );
    closeEditDrawer();
  };

  const openDeleteModal = (schedule) => {
    setDeleteModal({ open: true, scheduleId: schedule.id, scheduleInfo: `${schedule.className} - ${schedule.subject}` });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, scheduleId: null, scheduleInfo: '' });
  };

  const confirmDelete = () => {
    setSchedules((prev) => prev.filter((s) => s.id !== deleteModal.scheduleId));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteModal.scheduleId));
    closeDeleteModal();
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const exportPDF = () => alert('Export as PDF');
  const exportExcel = () => alert('Export as Excel');

  return (
    <div className="dashboard-main-body">
      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Exam Schedule</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Exam Schedule</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={openAddDrawer}
        >
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>
          Add Schedule
        </button>
      </div>

      {/* Main Card */}
      <div className="mt-24">
        <div className="card h-100">
          <div className="card-body p-0 dataTable-wrapper">
            {/* Toolbar */}
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-16 px-20 py-12 border-bottom border-neutral-200">
              <div className="d-flex flex-wrap align-items-center gap-16">
                {/* Export Dropdown */}
                <div className="dropdown">
                  <button
                    type="button"
                    className="px-12 py-5-px border border-neutral-300 radius-8 d-flex align-items-center gap-20"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="d-flex align-items-center gap-1 text-secondary-light text-sm">
                      <i className="ri-file-upload-line text-md line-height-1"></i> Export
                    </span>
                    <span><i className="ri-arrow-down-s-line"></i></span>
                  </button>
                  <ul className="dropdown-menu p-12 border bg-base shadow">
                    <li>
                      <button
                        type="button"
                        className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-10"
                        onClick={exportPDF}
                      >
                        <i className="ri-file-3-line"></i> PDF
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-10"
                        onClick={exportExcel}
                      >
                        <i className="ri-file-excel-line"></i> Excel
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Search */}
                <form className="navbar-search dt-search m-0" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    className="dt-input bg-transparent radius-4"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearch}
                  />
                  <iconify-icon icon="ion:search-outline" className="icon"></iconify-icon>
                </form>
              </div>

              {/* Rows per page */}
              <div className="d-flex align-items-center gap-8 text-secondary-light">
                <span>Rows per page:</span>
                <div className="dt-length">
                  <select
                    className="dt-input form-control form-select"
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="p-0">
              <table className="table bordered-table mb-0 data-table">
                <thead>
                  <tr>
                    <th scope="col">
                      <div className="form-check style-check d-flex align-items-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={paginatedSchedules.length > 0 && selectedIds.length === paginatedSchedules.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Class</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Exam Date</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">End Time</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Room</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSchedules.map((schedule, index) => {
                    const isSelected = selectedIds.includes(schedule.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <tr key={schedule.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(schedule.id)}
                            />
                            <label className="form-check-label">{sl.toString().padStart(2, '0')}</label>
                          </div>
                        </td>
                        <td>{schedule.className}</td>
                        <td>{schedule.subject}</td>
                        <td>{schedule.examDate}</td>
                        <td>{schedule.startTime}</td>
                        <td>{schedule.endTime}</td>
                        <td>{schedule.duration}</td>
                        <td>{schedule.room}</td>
                        <td>
                          <div className="btn-group">
                            <button
                              type="button"
                              className="text-primary-light text-xl"
                              data-bs-toggle="dropdown"
                              data-bs-display="static"
                              aria-expanded="false"
                            >
                              <iconify-icon icon="tabler:dots-vertical"></iconify-icon>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-lg-end border p-12">
                              <li>
                                <button
                                  type="button"
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openEditDrawer(schedule)}
                                >
                                  <i className="ri-edit-2-line"></i> Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openDeleteModal(schedule)}
                                >
                                  <i className="ri-delete-bin-6-line"></i> Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {paginatedSchedules.length === 0 && (
                    <tr>
                      <td colSpan="9" className="text-center py-20">
                        No schedules found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredSchedules.length > 0 && (
              <div className="d-flex justify-content-end align-items-center gap-3 p-20 border-top">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  disabled={currentPage === 1}
                  onClick={() => goToPage(currentPage - 1)}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  disabled={currentPage === totalPages}
                  onClick={() => goToPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Schedule Drawer */}
      <SlideDrawer
        isOpen={addDrawerOpen}
        onClose={closeAddDrawer}
        title="Add New Exam Schedule"
      >
        <form onSubmit={handleAddSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="className" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Class
              </label>
              <select
                id="className"
                name="className"
                className="form-control form-select"
                required
              >
                <option value="" disabled selected>Select a class</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="section" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Section
              </label>
              <select
                id="section"
                name="section"
                className="form-control form-select"
                required
              >
                <option value="" disabled selected>Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="room" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Room
              </label>
              <select
                id="room"
                name="room"
                className="form-control form-select"
                required
              >
                <option value="" disabled selected>Select Room</option>
                <option value="101">101</option>
                <option value="102">102</option>
                <option value="103">103</option>
                <option value="104">104</option>
                <option value="105">105</option>
                <option value="106">106</option>
                <option value="107">107</option>
                <option value="108">108</option>
                <option value="109">109</option>
                <option value="110">110</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="subject" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                className="form-control form-select"
                required
              >
                <option value="" disabled selected>Select a subject</option>
                <option value="English">English</option>
                <option value="Bangla">Bangla</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
                <option value="Computer">Computer</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="examDate" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Exam Date
              </label>
              <input
                type="date"
                className="form-control"
                id="examDate"
                name="examDate"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="startTime" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Start Time
              </label>
              <input
                type="time"
                className="form-control"
                id="startTime"
                name="startTime"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="endTime" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                End Time
              </label>
              <input
                type="time"
                className="form-control"
                id="endTime"
                name="endTime"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="duration" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Duration
              </label>
              <input
                type="text"
                className="form-control"
                id="duration"
                name="duration"
                placeholder="e.g., 3 hrs"
                required
              />
            </div>
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-center gap-3 mt-8">
                <button
                  type="button"
                  className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-50 py-11 radius-8"
                  onClick={closeAddDrawer}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary-600 border border-primary-600 text-md px-28 py-12 radius-8"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </SlideDrawer>

      {/* Edit Schedule Drawer */}
      <SlideDrawer
        isOpen={editDrawerOpen}
        onClose={closeEditDrawer}
        title="Edit Exam Schedule"
      >
        <form onSubmit={handleEditSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="classNameEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Class
              </label>
              <select
                id="classNameEdit"
                name="className"
                className="form-control form-select"
                defaultValue={editingSchedule?.className?.split(' (')[0] || ''}
                required
              >
                <option value="" disabled>Select a class</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="sectionEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Section
              </label>
              <select
                id="sectionEdit"
                name="section"
                className="form-control form-select"
                defaultValue={editingSchedule?.className?.match(/\(([^)]+)\)/)?.[1] || ''}
                required
              >
                <option value="" disabled>Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="roomEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Room
              </label>
              <select
                id="roomEdit"
                name="room"
                className="form-control form-select"
                defaultValue={editingSchedule?.room || ''}
                required
              >
                <option value="" disabled>Select Room</option>
                <option value="101">101</option>
                <option value="102">102</option>
                <option value="103">103</option>
                <option value="104">104</option>
                <option value="105">105</option>
                <option value="106">106</option>
                <option value="107">107</option>
                <option value="108">108</option>
                <option value="109">109</option>
                <option value="110">110</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="subjectEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Subject
              </label>
              <select
                id="subjectEdit"
                name="subject"
                className="form-control form-select"
                defaultValue={editingSchedule?.subject || ''}
                required
              >
                <option value="" disabled>Select a subject</option>
                <option value="English">English</option>
                <option value="Bangla">Bangla</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
                <option value="Computer">Computer</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="examDateEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Exam Date
              </label>
              <input
                type="date"
                className="form-control"
                id="examDateEdit"
                name="examDate"
                defaultValue={editingSchedule?.examDate || ''}
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="startTimeEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Start Time
              </label>
              <input
                type="time"
                className="form-control"
                id="startTimeEdit"
                name="startTime"
                defaultValue={editingSchedule?.startTime || ''}
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="endTimeEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                End Time
              </label>
              <input
                type="time"
                className="form-control"
                id="endTimeEdit"
                name="endTime"
                defaultValue={editingSchedule?.endTime || ''}
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="durationEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Duration
              </label>
              <input
                type="text"
                className="form-control"
                id="durationEdit"
                name="duration"
                defaultValue={editingSchedule?.duration || ''}
                placeholder="e.g., 3 hrs"
                required
              />
            </div>
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-center gap-3 mt-8">
                <button
                  type="button"
                  className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-50 py-11 radius-8"
                  onClick={closeEditDrawer}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary-600 border border-primary-600 text-md px-28 py-12 radius-8"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      </SlideDrawer>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title={`Delete Schedule`}
        message={`Are you sure you want to delete ${deleteModal.scheduleInfo}?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />
    </div>
  );
};

export default ExamSchedule;