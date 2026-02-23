import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal';

// Same student data as in StudentList (could be imported from a shared file)
const initialStudents = [
  { id: 1, admissionNo: 'AD52365', name: 'Kathryn Murphy', rollNo: 12, image: 'avatar-img1.png', class: '1', section: 'A', dob: '05 May 2012', gender: 'Male', mobile: '209.555.0104', category: 'General', status: 'Active' },
  { id: 2, admissionNo: 'AD52365', name: 'Floyd Miles', rollNo: 1, image: 'avatar-img2.png', class: '2', section: 'B', dob: '05 May 2012', gender: 'Female', mobile: '209.555.0104', category: 'Special', status: 'Inactive' },
  { id: 3, admissionNo: 'AD52367', name: 'Cody Fisher', rollNo: 7, image: 'avatar-img3.png', class: '3', section: 'A', dob: '12 Feb 2013', gender: 'Male', mobile: '207.445.9821', category: 'OBC', status: 'Active' },
  { id: 4, admissionNo: 'AD52368', name: 'Jane Cooper', rollNo: 8, image: 'avatar-img4.png', class: '4', section: 'C', dob: '17 Mar 2014', gender: 'Female', mobile: '204.658.4421', category: 'Special', status: 'Inactive' },
  { id: 5, admissionNo: 'AD52369', name: 'Esther Howard', rollNo: 15, image: 'avatar-img5.png', class: '5', section: 'B', dob: '25 Jul 2013', gender: 'Female', mobile: '209.875.9987', category: 'General', status: 'Active' },
  { id: 6, admissionNo: 'AD52370', name: 'Albert Flores', rollNo: 3, image: 'avatar-img6.png', class: '6', section: 'A', dob: '08 Dec 2011', gender: 'Male', mobile: '208.324.1110', category: 'OBC', status: 'Inactive' },
  { id: 7, admissionNo: 'AD52371', name: 'Jenny Wilson', rollNo: 9, image: 'avatar-img7.png', class: '7', section: 'C', dob: '19 Sep 2010', gender: 'Female', mobile: '206.211.4567', category: 'General', status: 'Active' },
  { id: 8, admissionNo: 'AD52367', name: 'Jane Cooper', rollNo: 5, image: 'avatar-img3.png', class: '3', section: 'A', dob: '12 Jan 2013', gender: 'Female', mobile: '202.444.0089', category: 'OBC', status: 'Active' },
  { id: 9, admissionNo: 'AD52368', name: 'Cameron Williamson', rollNo: 23, image: 'avatar-img4.png', class: '4', section: 'C', dob: '08 Jul 2011', gender: 'Male', mobile: '203.111.0456', category: 'SC', status: 'Inactive' },
  { id: 10, admissionNo: 'AD52369', name: 'Theresa Webb', rollNo: 10, image: 'avatar-img5.png', class: '5', section: 'A', dob: '18 Nov 2010', gender: 'Female', mobile: '205.777.0190', category: 'General', status: 'Active' },
  { id: 11, admissionNo: 'AD52370', name: 'Marvin McKinney', rollNo: 7, image: 'avatar-img6.png', class: '6', section: 'B', dob: '21 Mar 2011', gender: 'Male', mobile: '209.660.0912', category: 'General', status: 'Active' },
  { id: 12, admissionNo: 'AD52371', name: 'Courtney Henry', rollNo: 15, image: 'avatar-img7.png', class: '7', section: 'A', dob: '10 Feb 2009', gender: 'Female', mobile: '204.120.0023', category: 'OBC', status: 'Inactive' },
];

// Filter only suspended (Inactive) students
const suspendedStudents = initialStudents.filter(s => s.status === 'Inactive');

const SuspendedStudent = () => {
  // ---------- Filter state ----------
  const [filters, setFilters] = useState({
    class: '',
    section: '',
    gender: '',
    status: '', // but we're only showing suspended, so this filter might be redundant, but keep for consistency
  });
  const [search, setSearch] = useState('');

  // ---------- Selection & delete modal ----------
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ open: false, studentId: null, studentName: '' });

  // ---------- Pagination ----------
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // ---------- Filtered data (from suspended list) ----------
  const filteredStudents = useMemo(() => {
    return suspendedStudents.filter((student) => {
      // Search
      const matchesSearch =
        search === '' ||
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.admissionNo.toLowerCase().includes(search.toLowerCase()) ||
        student.mobile.includes(search);

      // Filters (status filter is applied on top of suspended list, but we can keep it)
      const matchesClass = filters.class === '' || student.class === filters.class;
      const matchesSection = filters.section === '' || student.section === filters.section;
      const matchesGender = filters.gender === '' || student.gender === filters.gender;
      const matchesStatus = filters.status === '' || student.status === filters.status;

      return matchesSearch && matchesClass && matchesSection && matchesGender && matchesStatus;
    });
  }, [filters, search]);

  // Paginated data
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredStudents.slice(start, start + rowsPerPage);
  }, [filteredStudents, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ class: '', section: '', gender: '', status: '' });
    setSearch('');
    setCurrentPage(1);
  };

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

  const openDeleteModal = (student) => {
    setDeleteModal({ open: true, studentId: student.id, studentName: student.name });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, studentId: null, studentName: '' });
  };

  const confirmDelete = () => {
    // API call to delete
    alert(`Delete suspended student ${deleteModal.studentName} (ID: ${deleteModal.studentId})`);
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
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Suspend Student</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">
              Dashboard
            </Link>
            <span className="text-secondary-light"> / Suspend Student</span>
          </div>
        </div>
        <Link to="/students/add" className="btn btn-primary-600 d-flex align-items-center gap-6">
          <span className="d-flex text-md">
            <i className="ri-add-large-line"></i>
          </span>
          Add Student
        </Link>
      </div>

      {/* Main Card */}
      <div className="mt-24">
        <div className="card h-100">
          <div className="card-body p-0 dataTable-wrapper">
            {/* Toolbar (same as StudentList) */}
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

                    <form
                      className="p-16 d-grid grid-cols-2 gap-16"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div>
                        <label htmlFor="class" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                          Class
                        </label>
                        <select
                          id="class"
                          className="form-control form-select"
                          value={filters.class}
                          onChange={handleFilterChange}
                        >
                          <option value="">Select Class</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="section" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                          Section
                        </label>
                        <select
                          id="section"
                          className="form-control form-select"
                          value={filters.section}
                          onChange={handleFilterChange}
                        >
                          <option value="">Select Section</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="gender" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                          Gender
                        </label>
                        <select
                          id="gender"
                          className="form-control form-select"
                          value={filters.gender}
                          onChange={handleFilterChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div>
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
                      <div>
                        <button type="reset" className="btn btn-danger-200 text-danger-600 w-100" onClick={resetFilters}>
                          Reset
                        </button>
                      </div>
                      <div>
                        <button type="submit" className="btn btn-primary-600 w-100">
                          Apply
                        </button>
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
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Mobile Number</th>
                    <th scope="col">Category</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.map((student, index) => {
                    const isSelected = selectedIds.includes(student.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
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
                        <td>
                          <span className="text-primary-600">{student.admissionNo}</span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={`/../src/assets/images/thumbs/${student.image}`}
                              alt={student.name}
                              className="flex-shrink-0 me-12 radius-8"
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            />
                            <div>
                              <h6 className="text-md mb-0 fw-medium flex-grow-1">{student.name}</h6>
                              <span>
                                Roll No: <span className="fw-semibold">{student.rollNo}</span>
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{`Class ${student.class} (${student.section})`}</td>
                        <td>{student.dob}</td>
                        <td>{student.gender}</td>
                        <td>{student.mobile}</td>
                        <td>{student.category}</td>
                        <td>
                          <span className="bg-danger-100 text-danger-600 px-24 py-4 radius-4 fw-medium text-sm">
                            Suspend
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
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => alert('View Teacher')}
                                >
                                  <i className="ri-user-3-line"></i> View Teacher
                                </button>
                              </li>
                              <li>
                                <Link
                                  to="/students/edit"
                                  state={{ student }}
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                >
                                  <i className="ri-edit-2-line"></i> Edit
                                </Link>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => alert('Collect Fees')}
                                >
                                  <i className="ri-money-dollar-box-line"></i> Collect Fees
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => alert('Make Active')} // opposite of suspend
                                >
                                  <i className="ri-error-warning-line"></i> Activate
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openDeleteModal(student)}
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
                  {paginatedStudents.length === 0 && (
                    <tr>
                      <td colSpan="10" className="text-center py-20">
                        No suspended students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Simple Pagination */}
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

      {/* Reusable Confirm Modal for Delete */}
      <ConfirmModal
        show={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title={`Delete ${deleteModal.studentName}?`}
        message="This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />
    </div>
  );
};

export default SuspendedStudent;