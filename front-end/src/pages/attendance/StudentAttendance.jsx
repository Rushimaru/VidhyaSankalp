import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Sample student attendance data (matching HTML rows)
const initialStudents = [
  { id: 1, admissionNo: 'AD52365', name: 'Marvin McKinney', image: 'avatar-img1.png', rollNo: '12', className: 'Class 1 (A)' },
  { id: 2, admissionNo: 'AD52366', name: 'Cody Fisher', image: 'avatar-img2.png', rollNo: '8', className: 'Class 2 (B)' },
  { id: 3, admissionNo: 'AD52367', name: 'Jenny Wilson', image: 'avatar-img3.png', rollNo: '9', className: 'Class 3 (C)' },
  { id: 4, admissionNo: 'AD52368', name: 'Guy Hawkins', image: 'avatar-img4.png', rollNo: '5', className: 'Class 2 (A)' },
  { id: 5, admissionNo: 'AD52369', name: 'Esther Howard', image: 'avatar-img5.png', rollNo: '15', className: 'Class 3 (B)' },
  { id: 6, admissionNo: 'AD52370', name: 'Jane Cooper', image: 'avatar-img6.png', rollNo: '18', className: 'Class 4 (A)' },
  { id: 7, admissionNo: 'AD52371', name: 'Robert Fox', image: 'avatar-img7.png', rollNo: '7', className: 'Class 4 (B)' },
  { id: 8, admissionNo: 'AD52372', name: 'Theresa Webb', image: 'avatar-img8.png', rollNo: '11', className: 'Class 5 (A)' },
  { id: 9, admissionNo: 'AD52373', name: 'Courtney Henry', image: 'avatar-img9.png', rollNo: '14', className: 'Class 5 (B)' },
  { id: 10, admissionNo: 'AD52374', name: 'Wade Warren', image: 'avatar-img6.png', rollNo: '10', className: 'Class 6 (A)' },
];

const StudentAttendance = () => {
  // ---------- State ----------
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter state (not fully functional, just for UI)
  const [filters, setFilters] = useState({
    class: 'One',
    section: 'A',
    date: '',
  });

  // Attendance state: map of studentId -> attendance value (Present/Late/Absent/Halfday/Holiday)
  const [attendance, setAttendance] = useState({});

  // Note state: map of studentId -> note text
  const [notes, setNotes] = useState({});

  // ---------- Filtered data ----------
  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.admissionNo.toLowerCase().includes(search.toLowerCase())
    );
  }, [students, search]);

  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredStudents.slice(start, start + rowsPerPage);
  }, [filteredStudents, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedStudents.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAttendanceChange = (studentId, value) => {
    setAttendance((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleNoteChange = (studentId, value) => {
    setNotes((prev) => ({ ...prev, [studentId]: value }));
  };

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  const resetFilters = () => {
    setFilters({ class: 'One', section: 'A', date: '' });
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
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Student Attendance</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Student Attendance</span>
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
                        <div className="col-6">
                          <label htmlFor="class" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                            Class
                          </label>
                          <select
                            id="class"
                            className="form-control form-select"
                            value={filters.class}
                            onChange={handleFilterChange}
                          >
                            <option value="One">One</option>
                            <option value="Two">Two</option>
                            <option value="Three">Three</option>
                            <option value="Four">Four</option>
                            <option value="Five">Five</option>
                          </select>
                        </div>
                        <div className="col-6">
                          <label htmlFor="section" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                            Section
                          </label>
                          <select
                            id="section"
                            className="form-control form-select"
                            value={filters.section}
                            onChange={handleFilterChange}
                          >
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
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
                          checked={paginatedStudents.length > 0 && selectedIds.length === paginatedStudents.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Admission No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Class</th>
                    <th scope="col">Attendance</th>
                    <th scope="col">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.map((student, index) => {
                    const isSelected = selectedIds.includes(student.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    const radioName = `radio${student.id}`; // unique per row

                    return (
                      <tr key={student.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(student.id)}
                            />
                            <label className="form-check-label">{sl.toString().padStart(2, '0')}</label>
                          </div>
                        </td>
                        <td><span className="text-primary-600">{student.admissionNo}</span></td>
                        <td>
                          <div className="d-flex align-items-center flex-grow-1">
                            <img
                              src={`/../src/assets/images/thumbs/${student.image}`}
                              alt={student.name}
                              className="flex-shrink-0 me-12 radius-8"
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            />
                            <div>
                              <h6 className="text-md mb-0 fw-medium">{student.name}</h6>
                              <span>Roll No: <span className="fw-semibold">{student.rollNo}</span></span>
                            </div>
                          </div>
                        </td>
                        <td>{student.className}</td>
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
                                  checked={attendance[student.id] === status}
                                  onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
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
                            value={notes[student.id] || ''}
                            onChange={(e) => handleNoteChange(student.id, e.target.value)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                  {paginatedStudents.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-20">
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredStudents.length > 0 && (
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

export default StudentAttendance;