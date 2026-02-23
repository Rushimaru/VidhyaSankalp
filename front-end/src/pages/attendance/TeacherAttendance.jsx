import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Sample teacher attendance data (matching HTML rows)
const initialTeachers = [
  { id: 1, teacherId: 'AD52365', name: 'Marvin McKinney', image: 'teacher-avatar-img1.png', subject: 'Mathematics' },
  { id: 2, teacherId: 'AD52366', name: 'Cody Fisher', image: 'teacher-avatar-img2.png', subject: 'Physics' },
  { id: 3, teacherId: 'AD52367', name: 'Jenny Wilson', image: 'teacher-avatar-img3.png', subject: 'Biology' },
  { id: 4, teacherId: 'AD52368', name: 'Guy Hawkins', image: 'teacher-avatar-img4.png', subject: 'English' },
  { id: 5, teacherId: 'AD52369', name: 'Esther Howard', image: 'teacher-avatar-img5.png', subject: 'Math' },
  { id: 6, teacherId: 'AD52370', name: 'Jane Cooper', image: 'teacher-avatar-img6.png', subject: 'Chemistry' },
  { id: 7, teacherId: 'AD52371', name: 'Robert Fox', image: 'teacher-avatar-img7.png', subject: 'Biology' },
  { id: 8, teacherId: 'AD52372', name: 'Theresa Webb', image: 'teacher-avatar-img8.png', subject: 'Mathematics' },
  { id: 9, teacherId: 'AD52373', name: 'Courtney Henry', image: 'teacher-avatar-img9.png', subject: 'Physics' },
  { id: 10, teacherId: 'AD52374', name: 'Wade Warren', image: 'teacher-avatar-img6.png', subject: 'Biology' },
];

const TeacherAttendance = () => {
  // ---------- State ----------
  const [teachers, setTeachers] = useState(initialTeachers);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter state (not fully functional, just for UI)
  const [filters, setFilters] = useState({
    subject: 'English',
    date: '',
  });

  // Attendance state: map of teacherId -> attendance value (Present/Late/Absent/Halfday/Holiday)
  const [attendance, setAttendance] = useState({});

  // Note state: map of teacherId -> note text
  const [notes, setNotes] = useState({});

  // ---------- Filtered data ----------
  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) =>
      teacher.name.toLowerCase().includes(search.toLowerCase()) ||
      teacher.teacherId.toLowerCase().includes(search.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(search.toLowerCase())
    );
  }, [teachers, search]);

  const paginatedTeachers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredTeachers.slice(start, start + rowsPerPage);
  }, [filteredTeachers, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredTeachers.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedTeachers.map((t) => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAttendanceChange = (teacherId, value) => {
    setAttendance((prev) => ({ ...prev, [teacherId]: value }));
  };

  const handleNoteChange = (teacherId, value) => {
    setNotes((prev) => ({ ...prev, [teacherId]: value }));
  };

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  const resetFilters = () => {
    setFilters({ subject: 'English', date: '' });
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
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Teacher Attendance</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Teacher Attendance</span>
          </div>
        </div>
        <a href="/add-new-teacher" className="btn btn-primary-600 d-flex align-items-center gap-6 d-none">
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>Add Teacher
        </a>
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

                {/* Filter Dropdown */}
                <div className="dropdown">
                  <button
                    type="button"
                    className="px-12 py-5-px border border-neutral-300 radius-8 d-flex align-items-center gap-20"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="d-flex align-items-center gap-1 text-secondary-light text-sm">Filter</span>
                    <span><i className="ri-arrow-down-s-line"></i></span>
                  </button>
                  <div className="dropdown-menu border bg-base shadow dropdown-menu-lg p-0">
                    <div className="d-flex align-items-center justify-content-between border-bottom py-8 px-16">
                      <span className="fw-semibold text-lg text-primary-light">Filter</span>
                      <button type="button" onClick={() => document.activeElement?.blur()}>
                        <i className="ri-close-large-line"></i>
                      </button>
                    </div>

                    <form className="p-16" onSubmit={(e) => e.preventDefault()}>
                      <div className="row g-3">
                        <div className="col-12">
                          <label htmlFor="subject" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                            Subject
                          </label>
                          <select
                            id="subject"
                            className="form-control form-select"
                            value={filters.subject}
                            onChange={handleFilterChange}
                          >
                            <option value="English">English</option>
                            <option value="Bangla">Bangla</option>
                            <option value="Math">Math</option>
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                          </select>
                        </div>
                        <div className="col-12">
                          <label htmlFor="date" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                            Date
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="date"
                            value={filters.date}
                            onChange={handleFilterChange}
                          />
                        </div>
                        <div className="col-6">
                          <button type="reset" className="btn btn-danger-200 text-danger-600 w-100" onClick={resetFilters}>
                            Reset
                          </button>
                        </div>
                        <div className="col-6">
                          <button type="submit" className="btn btn-primary-600 w-100">Apply</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
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
                          checked={paginatedTeachers.length > 0 && selectedIds.length === paginatedTeachers.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Attendance</th>
                    <th scope="col">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTeachers.map((teacher, index) => {
                    const isSelected = selectedIds.includes(teacher.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    const radioName = `radio${teacher.id}`; // unique per row

                    return (
                      <tr key={teacher.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(teacher.id)}
                            />
                            <label className="form-check-label">{sl.toString().padStart(2, '0')}</label>
                          </div>
                        </td>
                        <td><span className="text-primary-600">{teacher.teacherId}</span></td>
                        <td>
                          <div className="d-flex align-items-center flex-grow-1">
                            <img
                              src={`/../src/assets/images/thumbs/${teacher.image}`}
                              alt={teacher.name}
                              className="flex-shrink-0 me-12 radius-8"
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            />
                            <div>
                              <h6 className="text-md mb-0 fw-medium">{teacher.name}</h6>
                            </div>
                          </div>
                        </td>
                        <td>{teacher.subject}</td>
                        <td>
                          <div className="d-flex align-items-center flex-wrap gap-28">
                            {['Present', 'Late', 'Absent', 'Halfday', 'Holiday'].map((status) => (
                              <div key={status} className="form-check checked-primary d-flex align-items-center gap-2">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name={radioName}
                                  id={`${radioName}-${status}`}
                                  value={status}
                                  checked={attendance[teacher.id] === status}
                                  onChange={(e) => handleAttendanceChange(teacher.id, e.target.value)}
                                />
                                <label className="form-check-label" htmlFor={`${radioName}-${status}`}>
                                  {status}
                                </label>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Write note..."
                            value={notes[teacher.id] || ''}
                            onChange={(e) => handleNoteChange(teacher.id, e.target.value)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                  {paginatedTeachers.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-20">
                        No teachers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredTeachers.length > 0 && (
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
    </div>
  );
};

export default TeacherAttendance;