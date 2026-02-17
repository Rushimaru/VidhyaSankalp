import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal';

// Sample teacher data (extracted from HTML)
const initialTeachers = [
  { id: 1, teacherId: 'AD52365', name: 'Marvin McKinney', image: 'teacher-avatar-img1.png', subject: 'Mathematics', class: '1 (A), 2(A), 3(A)', email: 'chinthaka@hotmail.com', phone: '209.555.0104', joinDate: '05 May 2012', status: 'Active' },
  { id: 2, teacherId: 'AD52365', name: 'Ralph Edwards', image: 'teacher-avatar-img2.png', subject: 'Physics', class: '9 (A), 10 (B)', email: 'mobileip@mac.com', phone: '209.555.0104', joinDate: '05 May 2012', status: 'Inactive' },
  { id: 3, teacherId: 'AD52367', name: 'Courtney Henry', image: 'teacher-avatar-img3.png', subject: 'Biology', class: '6 (A), 7 (B)', email: 'courtney@edu.com', phone: '209.555.0134', joinDate: '18 Jan 2014', status: 'Active' },
  { id: 4, teacherId: 'AD52368', name: 'Eleanor Pena', image: 'teacher-avatar-img4.png', subject: 'Chemistry', class: '8 (B), 9 (A)', email: 'eleanor.pena@school.org', phone: '209.555.0189', joinDate: '22 Aug 2016', status: 'Inactive' },
  { id: 5, teacherId: 'AD52369', name: 'Cody Fisher', image: 'teacher-avatar-img5.png', subject: 'English', class: '5 (A), 6 (A)', email: 'cody.fisher@school.com', phone: '209.555.0192', joinDate: '14 Mar 2015', status: 'Active' },
  { id: 6, teacherId: 'AD52370', name: 'Devon Lane', image: 'teacher-avatar-img6.png', subject: 'Geography', class: '7 (C), 8 (A)', email: 'devon@edu.org', phone: '209.555.0119', joinDate: '09 Jul 2018', status: 'Active' },
  { id: 7, teacherId: 'AD52371', name: 'Bessie Cooper', image: 'teacher-avatar-img7.png', subject: 'History', class: '9 (B), 10 (A)', email: 'bessie.cooper@school.org', phone: '209.555.0156', joinDate: '23 Feb 2013', status: 'Inactive' },
  { id: 8, teacherId: 'AD52372', name: 'Arlene McCoy', image: 'teacher-avatar-img8.png', subject: 'Economics', class: '11 (B), 12 (A)', email: 'arlene.mccoy@edu.org', phone: '209.555.0172', joinDate: '16 Oct 2019', status: 'Active' },
  { id: 9, teacherId: 'AD52373', name: 'Annette Black', image: 'teacher-avatar-img9.png', subject: 'ICT', class: '8 (A), 9 (B)', email: 'annette@school.edu', phone: '209.555.0195', joinDate: '05 May 2020', status: 'Active' },
  { id: 10, teacherId: 'AD52374', name: 'Guy Hawkins', image: 'teacher-avatar-img2.png', subject: 'Accounting', class: '10 (A), 11 (A)', email: 'guy.hawkins@edu.com', phone: '209.555.0184', joinDate: '11 Dec 2017', status: 'Inactive' },
  { id: 11, teacherId: 'AD52375', name: 'Theresa Webb', image: 'teacher-avatar-img9.png', subject: 'Computer Science', class: '11 (B), 12 (A)', email: 'theresa.webb@school.edu', phone: '209.555.0217', joinDate: '29 Mar 2019', status: 'Active' },
  { id: 12, teacherId: 'AD52376', name: 'Kathryn Murphy', image: 'teacher-avatar-img6.png', subject: 'Environmental Science', class: '9 (A), 10 (B)', email: 'kathryn.murphy@college.edu', phone: '209.555.0259', joinDate: '03 Feb 2020', status: 'Inactive' },
];

const TeacherList = () => {
  // ---------- Filter state ----------
  const [filters, setFilters] = useState({
    subject: '',
    status: '',
  });
  const [search, setSearch] = useState('');

  // ---------- Selection & delete modal ----------
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ open: false, teacherId: null, teacherName: '' });

  // ---------- Pagination ----------
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // ---------- Filtered data ----------
  const filteredTeachers = useMemo(() => {
    return initialTeachers.filter((teacher) => {
      // Search (name, teacherId, email, phone)
      const matchesSearch =
        search === '' ||
        teacher.name.toLowerCase().includes(search.toLowerCase()) ||
        teacher.teacherId.toLowerCase().includes(search.toLowerCase()) ||
        teacher.email.toLowerCase().includes(search.toLowerCase()) ||
        teacher.phone.includes(search);

      // Filters
      const matchesSubject = filters.subject === '' || teacher.subject === filters.subject;
      const matchesStatus = filters.status === '' || teacher.status === filters.status;

      return matchesSearch && matchesSubject && matchesStatus;
    });
  }, [filters, search]);

  // Paginated data
  const paginatedTeachers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredTeachers.slice(start, start + rowsPerPage);
  }, [filteredTeachers, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredTeachers.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ subject: '', status: '' });
    setSearch('');
    setCurrentPage(1);
  };

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

  const openDeleteModal = (teacher) => {
    setDeleteModal({ open: true, teacherId: teacher.id, teacherName: teacher.name });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, teacherId: null, teacherName: '' });
  };

  const confirmDelete = () => {
    // Here you would call an API to delete/suspend
    alert(`Suspend teacher ${deleteModal.teacherName} (ID: ${deleteModal.teacherId})`);
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
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Teacher List</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">
              Dashboard
            </Link>
            <span className="text-secondary-light"> / Teacher List</span>
          </div>
        </div>
        <Link to="/teachers/add" className="btn btn-primary-600 d-flex align-items-center gap-6">
          <span className="d-flex text-md">
            <i className="ri-add-large-line"></i>
          </span>
          Add Teacher
        </Link>
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
                      <i className="ri-file-upload-line text-md line-height-1"></i>
                      Export
                    </span>
                    <span>
                      <i className="ri-arrow-down-s-line"></i>
                    </span>
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
                    <span>
                      <i className="ri-arrow-down-s-line"></i>
                    </span>
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
                            <option value="">Select Subject</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Physics">Physics</option>
                            <option value="Biology">Biology</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="English">English</option>
                            <option value="Geography">Geography</option>
                            <option value="History">History</option>
                            <option value="Economics">Economics</option>
                            <option value="ICT">ICT</option>
                            <option value="Accounting">Accounting</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Environmental Science">Environmental Science</option>
                          </select>
                        </div>
                        <div className="col-12">
                          <label htmlFor="status" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                            Status
                          </label>
                          <select
                            id="status"
                            className="form-control form-select"
                            value={filters.status}
                            onChange={handleFilterChange}
                          >
                            <option value="">Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                        <div className="col-6">
                          <button type="reset" className="btn btn-danger-200 text-danger-600 w-100" onClick={resetFilters}>
                            Reset
                          </button>
                        </div>
                        <div className="col-6">
                          <button type="submit" className="btn btn-primary-600 w-100">
                            Apply
                          </button>
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
                    <th scope="col">Class</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Join Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTeachers.map((teacher, index) => {
                    const isSelected = selectedIds.includes(teacher.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
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
                        <td>
                          <span className="text-primary-600">{teacher.teacherId}</span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
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
                        <td>{teacher.class}</td>
                        <td>{teacher.email}</td>
                        <td>{teacher.phone}</td>
                        <td>{teacher.joinDate}</td>
                        <td>
                          <span
                            className={`${
                              teacher.status === 'Active'
                                ? 'bg-success-100 text-success-600'
                                : 'bg-danger-100 text-danger-600'
                            } px-24 py-4 radius-4 fw-medium text-sm`}
                          >
                            {teacher.status}
                          </span>
                        </td>
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
                                <Link
                                  to="/students"
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                >
                                  <i className="ri-user-3-line"></i> View Student
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/teachers/edit"
                                  state={{ teacher }}
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                >
                                  <i className="ri-edit-2-line"></i> Edit
                                </Link>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => alert('Inactive')}
                                >
                                  <i className="ri-error-warning-line"></i> Inactive
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openDeleteModal(teacher)}
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
                  {paginatedTeachers.length === 0 && (
                    <tr>
                      <td colSpan="10" className="text-center py-20">
                        No teachers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Simple Pagination */}
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

      {/* Delete/Suspend Confirmation Modal */}
      <ConfirmModal
        show={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title={`Suspend ${deleteModal.teacherName}?`}
        message="Are you sure you want to suspend this teacher?"
        confirmText="Yes, Suspend"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />
    </div>
  );
};

export default TeacherList;