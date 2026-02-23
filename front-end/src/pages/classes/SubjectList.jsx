import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SlideDrawer from '../../components/Slidedrawer';
import ConfirmModal from '../../components/ConfirmModal';

// Sample subject data (matching HTML)
const initialSubjects = [
  { id: 1, name: 'Computer', code: '101', status: 'Active' },
  { id: 2, name: 'Biology', code: '102', status: 'Inactive' },
  { id: 3, name: 'Chemistry', code: '103', status: 'Active' },
  { id: 4, name: 'French', code: '104', status: 'Inactive' },
  { id: 5, name: 'English', code: '105', status: 'Active' },
  { id: 6, name: 'Mathematics', code: '106', status: 'Inactive' },
  { id: 7, name: 'Science', code: '107', status: 'Active' },
  { id: 8, name: 'Physics', code: '108', status: 'Inactive' },
  { id: 9, name: 'Moral Education', code: '109', status: 'Active' },
  { id: 10, name: 'Bangla', code: '110', status: 'Inactive' },
  { id: 11, name: 'Bangla', code: '110', status: 'Active' },
  { id: 12, name: 'Physics', code: '150', status: 'Inactive' },
];

const SubjectList = () => {
  // ---------- State ----------
  const [subjects, setSubjects] = useState(initialSubjects);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer states
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null); // { id, name, code, status }

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, subjectId: null, subjectName: '' });

  // ---------- Filtered data ----------
  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) =>
      subject.name.toLowerCase().includes(search.toLowerCase()) ||
      subject.code.toLowerCase().includes(search.toLowerCase())
    );
  }, [subjects, search]);

  const paginatedSubjects = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredSubjects.slice(start, start + rowsPerPage);
  }, [filteredSubjects, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredSubjects.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedSubjects.map((s) => s.id));
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
    setEditingSubject(null);
    setAddDrawerOpen(true);
  };

  const openEditDrawer = (subject) => {
    setEditingSubject(subject);
    setEditDrawerOpen(true);
  };

  const closeAddDrawer = () => setAddDrawerOpen(false);
  const closeEditDrawer = () => {
    setEditDrawerOpen(false);
    setEditingSubject(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const code = formData.get('code');
    const status = formData.get('status');

    const newId = Math.max(...subjects.map((s) => s.id), 0) + 1;
    setSubjects([...subjects, { id: newId, name, code, status }]);
    closeAddDrawer();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const code = formData.get('code');
    const status = formData.get('status');

    setSubjects((prev) =>
      prev.map((s) =>
        s.id === editingSubject.id ? { ...s, name, code, status } : s
      )
    );
    closeEditDrawer();
  };

  const openDeleteModal = (subject) => {
    setDeleteModal({ open: true, subjectId: subject.id, subjectName: subject.name });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, subjectId: null, subjectName: '' });
  };

  const confirmDelete = () => {
    setSubjects((prev) => prev.filter((s) => s.id !== deleteModal.subjectId));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteModal.subjectId));
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
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Subjects List</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Subjects List</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={openAddDrawer}
        >
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>
          Add Subject
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
                          checked={paginatedSubjects.length > 0 && selectedIds.length === paginatedSubjects.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Subject</th>
                    <th scope="col">Code</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSubjects.map((subject, index) => {
                    const isSelected = selectedIds.includes(subject.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <tr key={subject.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(subject.id)}
                            />
                            <label className="form-check-label">{sl.toString().padStart(2, '0')}</label>
                          </div>
                        </td>
                        <td>{subject.name}</td>
                        <td>{subject.code}</td>
                        <td>
                          <span
                            className={`${
                              subject.status === 'Active'
                                ? 'bg-success-100 text-success-600'
                                : 'bg-danger-100 text-danger-600'
                            } px-24 py-4 radius-4 fw-medium text-sm`}
                          >
                            {subject.status}
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
                                  type="button"
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openEditDrawer(subject)}
                                >
                                  <i className="ri-edit-2-line"></i> Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openDeleteModal(subject)}
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
                  {paginatedSubjects.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-20">
                        No subjects found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredSubjects.length > 0 && (
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

      {/* Add Subject Drawer */}
      <SlideDrawer
        isOpen={addDrawerOpen}
        onClose={closeAddDrawer}
        title="Add New Subject"
      >
        <form onSubmit={handleAddSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="subjectName" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Subject Name
              </label>
              <input
                type="text"
                className="form-control"
                id="subjectName"
                name="name"
                placeholder="Enter subject name"
                required
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="subjectCode" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Subject Code
              </label>
              <input
                type="text"
                className="form-control"
                id="subjectCode"
                name="code"
                placeholder="Enter subject code"
                required
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="subjectStatus" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Status
              </label>
              <select
                id="subjectStatus"
                name="status"
                className="form-control form-select"
                required
              >
                <option value="" disabled selected>Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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

      {/* Edit Subject Drawer */}
      <SlideDrawer
        isOpen={editDrawerOpen}
        onClose={closeEditDrawer}
        title="Edit Subject"
      >
        <form onSubmit={handleEditSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="subjectNameEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Subject Name
              </label>
              <input
                type="text"
                className="form-control"
                id="subjectNameEdit"
                name="name"
                defaultValue={editingSubject?.name || ''}
                placeholder="Enter subject name"
                required
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="subjectCodeEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Subject Code
              </label>
              <input
                type="text"
                className="form-control"
                id="subjectCodeEdit"
                name="code"
                defaultValue={editingSubject?.code || ''}
                placeholder="Enter subject code"
                required
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="subjectStatusEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Status
              </label>
              <select
                id="subjectStatusEdit"
                name="status"
                className="form-control form-select"
                defaultValue={editingSubject?.status || ''}
                required
              >
                <option value="" disabled>Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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
        title={`Delete ${deleteModal.subjectName}?`}
        message="Are you sure you want to delete this subject?"
        confirmText="Yes, Delete"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />
    </div>
  );
};

export default SubjectList;