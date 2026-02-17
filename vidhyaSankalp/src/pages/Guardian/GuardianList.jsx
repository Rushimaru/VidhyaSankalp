import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal';

// Sample guardian data (extracted from HTML)
const initialGuardians = [
  { id: 1, guardianId: 'AD52365', name: 'Marvin McKinney', image: 'teacher-avatar-img1.png', childName: 'Darlene Robertson', childImage: 'avatar-img1.png', childClass: '1 (A)', email: 'chinthaka@hotmail.com', phone: '209.555.0104', joinDate: '05 May 2012' },
  { id: 2, guardianId: 'AD65412', name: 'Esther Howard', image: 'teacher-avatar-img2.png', childName: 'Jane Cooper', childImage: 'avatar-img2.png', childClass: '2 (B)', email: 'esther@example.com', phone: '305.442.0899', joinDate: '10 Feb 2014' },
  { id: 3, guardianId: 'AD76548', name: 'Cody Fisher', image: 'teacher-avatar-img3.png', childName: 'Robert Fox', childImage: 'avatar-img3.png', childClass: '3 (A)', email: 'codyf@example.com', phone: '312.900.0981', joinDate: '08 Mar 2016' },
  { id: 4, guardianId: 'AD33221', name: 'Jenny Wilson', image: 'teacher-avatar-img4.png', childName: 'Albert Flores', childImage: 'avatar-img4.png', childClass: '4 (B)', email: 'jenny@example.com', phone: '404.788.1120', joinDate: '15 Aug 2017' },
  { id: 5, guardianId: 'AD77231', name: 'Theresa Webb', image: 'teacher-avatar-img5.png', childName: 'Leslie Alexander', childImage: 'avatar-img5.png', childClass: '5 (A)', email: 'theresa.webb@example.com', phone: '213.987.7770', joinDate: '22 Sep 2018' },
  { id: 6, guardianId: 'AD52366', name: 'John Smith', image: 'teacher-avatar-img2.png', childName: 'Kathryn Murphy', childImage: 'avatar-img2.png', childClass: '2 (B)', email: 'kathryn.murphy@example.com', phone: '208.555.1122', joinDate: '12 Jan 2013' },
  { id: 7, guardianId: 'AD52367', name: 'Theresa Webb', image: 'teacher-avatar-img3.png', childName: 'Guy Hawkins', childImage: 'avatar-img3.png', childClass: '3 (C)', email: 'guy.hawkins@example.com', phone: '203.555.2145', joinDate: '27 Mar 2014' },
  { id: 8, guardianId: 'AD52368', name: 'Courtney Henry', image: 'teacher-avatar-img4.png', childName: 'Eleanor Pena', childImage: 'avatar-img4.png', childClass: '4 (A)', email: 'eleanor.pena@example.com', phone: '210.555.1098', joinDate: '08 Sep 2014' },
  { id: 9, guardianId: 'AD52369', name: 'Albert Flores', image: 'teacher-avatar-img5.png', childName: 'Jenny Wilson', childImage: 'avatar-img5.png', childClass: '5 (B)', email: 'jenny.wilson@example.com', phone: '212.555.3223', joinDate: '11 Nov 2015' },
  { id: 10, guardianId: 'AD52370', name: 'Jerome Bell', image: 'teacher-avatar-img6.png', childName: 'Esther Howard', childImage: 'avatar-img6.png', childClass: '6 (A)', email: 'esther.howard@example.com', phone: '210.555.7766', joinDate: '22 Feb 2016' },
  { id: 11, guardianId: 'AD52371', name: 'Devon Lane', image: 'teacher-avatar-img7.png', childName: 'Robert Fox', childImage: 'avatar-img7.png', childClass: '7 (C)', email: 'robert.fox@example.com', phone: '202.555.8974', joinDate: '10 Jul 2017' },
  { id: 12, guardianId: 'AD52372', name: 'Floyd Miles', image: 'teacher-avatar-img8.png', childName: 'Leslie Alexander', childImage: 'avatar-img8.png', childClass: '8 (A)', email: 'leslie.alexander@example.com', phone: '205.555.6742', joinDate: '21 Oct 2018' },
];

const GuardianList = () => {
  // ---------- Filter state ----------
  const [filters, setFilters] = useState({
    subject: '',   // placeholder, not used in actual data
    status: '',    // placeholder
  });
  const [search, setSearch] = useState('');

  // ---------- Selection & delete modal ----------
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ open: false, guardianId: null, guardianName: '' });

  // ---------- Pagination ----------
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // ---------- Filtered data ----------
  const filteredGuardians = useMemo(() => {
    return initialGuardians.filter((guardian) => {
      const matchesSearch =
        search === '' ||
        guardian.name.toLowerCase().includes(search.toLowerCase()) ||
        guardian.guardianId.toLowerCase().includes(search.toLowerCase()) ||
        guardian.email.toLowerCase().includes(search.toLowerCase()) ||
        guardian.phone.includes(search);

      // Filters (subject/status not in data, so ignore for now)
      return matchesSearch;
    });
  }, [filters, search]);

  const paginatedGuardians = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredGuardians.slice(start, start + rowsPerPage);
  }, [filteredGuardians, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredGuardians.length / rowsPerPage);

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
      setSelectedIds(paginatedGuardians.map((g) => g.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const openDeleteModal = (guardian) => {
    setDeleteModal({ open: true, guardianId: guardian.id, guardianName: guardian.name });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, guardianId: null, guardianName: '' });
  };

  const confirmDelete = () => {
    // Here you would call an API to delete
    alert(`Delete guardian ${deleteModal.guardianName} (ID: ${deleteModal.guardianId})`);
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
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Guardian List</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">
              Dashboard
            </Link>
            <span className="text-secondary-light"> / Guardian List</span>
          </div>
        </div>
        <Link to="/guardians/add" className="btn btn-primary-600 d-flex align-items-center gap-6">
          <span className="d-flex text-md">
            <i className="ri-add-large-line"></i>
          </span>
          Add Guardian
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
                            Subject (placeholder)
                          </label>
                          <select
                            id="subject"
                            className="form-control form-select"
                            value={filters.subject}
                            onChange={handleFilterChange}
                          >
                            <option value="">Select Subject</option>
                            <option value="Math">Math</option>
                            <option value="English">English</option>
                            <option value="Science">Science</option>
                          </select>
                        </div>
                        <div className="col-12">
                          <label htmlFor="status" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                            Status (placeholder)
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
                          checked={paginatedGuardians.length > 0 && selectedIds.length === paginatedGuardians.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Child</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Join Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedGuardians.map((guardian, index) => {
                    const isSelected = selectedIds.includes(guardian.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <tr key={guardian.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(guardian.id)}
                            />
                            <label className="form-check-label">{sl.toString().padStart(2, '0')}</label>
                          </div>
                        </td>
                        <td>
                          <span className="text-primary-600">{guardian.guardianId}</span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={`/assets/images/thumbs/${guardian.image}`}
                              alt={guardian.name}
                              className="flex-shrink-0 me-12 radius-8"
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            />
                            <div>
                              <h6 className="text-md mb-0 fw-medium text-secondary-light">{guardian.name}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={`/assets/images/thumbs/${guardian.childImage}`}
                              alt={guardian.childName}
                              className="flex-shrink-0 me-12 radius-8"
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            />
                            <div>
                              <h6 className="text-md mb-0 fw-medium text-secondary-light">{guardian.childName}</h6>
                              <span className="text-secondary-light text-sm">Class: {guardian.childClass}</span>
                            </div>
                          </div>
                        </td>
                        <td>{guardian.email}</td>
                        <td>{guardian.phone}</td>
                        <td>{guardian.joinDate}</td>
                        <td>
                          <div className="btn-group">
                            <button
                              type="button"
                              className="text-primary-light text-xl"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <iconify-icon icon="tabler:dots-vertical"></iconify-icon>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-lg-end border p-12">
                              <li>
                                <Link
                                  to="/guardians"
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                >
                                  <i className="ri-user-3-line"></i> View Guardian
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/guardians/edit"
                                  state={{ guardian }}
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                >
                                  <i className="ri-edit-2-line"></i> Edit
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/login"
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                >
                                  <i className="ri-login-box-line"></i> Login
                                </Link>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openDeleteModal(guardian)}
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
                  {paginatedGuardians.length === 0 && (
                    <tr>
                      <td colSpan="8" className="text-center py-20">
                        No guardians found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Simple Pagination */}
            {filteredGuardians.length > 0 && (
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

      {/* Delete Confirmation Modal (using reusable ConfirmModal) */}
      <ConfirmModal
        show={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title={`Delete ${deleteModal.guardianName}?`}
        message="Are you sure you want to delete this guardian?"
        confirmText="Yes, Delete"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />
    </div>
  );
};

export default GuardianList;