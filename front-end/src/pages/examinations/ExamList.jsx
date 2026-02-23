import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SlideDrawer from '../../components/Slidedrawer';
import ConfirmModal from '../../components/ConfirmModal';

// Sample exam data (matching HTML)
const initialExams = [
  { id: 1, name: 'Monthly Test', date: '05 Jun 2015', startTime: '10:00 AM', endTime: '01:00 PM', status: 'Active' },
  { id: 2, name: 'Monthly Test', date: '05 Jun 2015', startTime: '10:00 AM', endTime: '01:00 PM', status: 'Active' },
  { id: 3, name: 'Weekly Assessment', date: '10 Jun 2015', startTime: '09:00 AM', endTime: '11:00 AM', status: 'Pending' },
  { id: 4, name: 'Mid Term Exam', date: '15 Jun 2015', startTime: '12:00 PM', endTime: '03:00 PM', status: 'Scheduled' },
  { id: 5, name: 'Final Term Exam', date: '22 Jun 2015', startTime: '10:00 AM', endTime: '01:30 PM', status: 'Closed' },
  { id: 6, name: 'Mock Test', date: '28 Jun 2015', startTime: '11:00 AM', endTime: '01:00 PM', status: 'Active' },
  { id: 7, name: 'Quiz Exam', date: '03 Jul 2015', startTime: '02:00 PM', endTime: '02:30 PM', status: 'Pending' },
  { id: 8, name: 'Group Discussion', date: '08 Jul 2015', startTime: '03:30 PM', endTime: '05:00 PM', status: 'Scheduled' },
  { id: 9, name: 'Presentation', date: '12 Jul 2015', startTime: '09:30 AM', endTime: '10:30 AM', status: 'Active' },
  { id: 10, name: 'Lab Performance', date: '15 Jul 2015', startTime: '01:00 PM', endTime: '03:00 PM', status: 'Closed' },
  { id: 11, name: 'Project Demo', date: '20 Jul 2015', startTime: '02:00 PM', endTime: '04:00 PM', status: 'Upcoming' },
  { id: 12, name: 'Viva Exam', date: '25 Jul 2015', startTime: '11:00 AM', endTime: '12:00 PM', status: 'Active' },
];

const ExamList = () => {
  // ---------- State ----------
  const [exams, setExams] = useState(initialExams);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer states
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null); // { id, name, date, startTime, endTime, status }

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, examId: null, examName: '' });

  // ---------- Filtered data ----------
  const filteredExams = useMemo(() => {
    return exams.filter((exam) =>
      exam.name.toLowerCase().includes(search.toLowerCase()) ||
      exam.date.toLowerCase().includes(search.toLowerCase()) ||
      exam.startTime.toLowerCase().includes(search.toLowerCase()) ||
      exam.endTime.toLowerCase().includes(search.toLowerCase())
    );
  }, [exams, search]);

  const paginatedExams = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredExams.slice(start, start + rowsPerPage);
  }, [filteredExams, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredExams.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedExams.map((e) => e.id));
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
    setEditingExam(null);
    setAddDrawerOpen(true);
  };

  const openEditDrawer = (exam) => {
    setEditingExam(exam);
    setEditDrawerOpen(true);
  };

  const closeAddDrawer = () => setAddDrawerOpen(false);
  const closeEditDrawer = () => {
    setEditDrawerOpen(false);
    setEditingExam(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const date = formData.get('date');
    const startTime = formData.get('startTime');
    const endTime = formData.get('endTime');
    const status = formData.get('status');

    const newId = Math.max(...exams.map((e) => e.id), 0) + 1;
    setExams([...exams, { id: newId, name, date, startTime, endTime, status }]);
    closeAddDrawer();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const date = formData.get('date');
    const startTime = formData.get('startTime');
    const endTime = formData.get('endTime');
    const status = formData.get('status');

    setExams((prev) =>
      prev.map((e) =>
        e.id === editingExam.id ? { ...e, name, date, startTime, endTime, status } : e
      )
    );
    closeEditDrawer();
  };

  const openDeleteModal = (exam) => {
    setDeleteModal({ open: true, examId: exam.id, examName: exam.name });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, examId: null, examName: '' });
  };

  const confirmDelete = () => {
    setExams((prev) => prev.filter((e) => e.id !== deleteModal.examId));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteModal.examId));
    closeDeleteModal();
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const exportPDF = () => alert('Export as PDF');
  const exportExcel = () => alert('Export as Excel');

  // Helper to get status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-success-100 text-success-600';
      case 'Pending':
        return 'bg-warning-100 text-warning-600';
      case 'Scheduled':
      case 'Upcoming':
        return 'bg-info-100 text-info-600';
      case 'Closed':
        return 'bg-danger-100 text-danger-600';
      default:
        return 'bg-secondary-100 text-secondary-600';
    }
  };

  return (
    <div className="dashboard-main-body">
      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Exam List</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Exam List</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={openAddDrawer}
        >
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>
          Add Exam
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
                          checked={paginatedExams.length > 0 && selectedIds.length === paginatedExams.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Exam Name</th>
                    <th scope="col">Exam Date</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">End Time</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedExams.map((exam, index) => {
                    const isSelected = selectedIds.includes(exam.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <tr key={exam.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(exam.id)}
                            />
                            <label className="form-check-label">{sl.toString().padStart(2, '0')}</label>
                          </div>
                        </td>
                        <td>{exam.name}</td>
                        <td>{exam.date}</td>
                        <td>{exam.startTime}</td>
                        <td>{exam.endTime}</td>
                        <td>
                          <span className={`${getStatusClass(exam.status)} px-24 py-4 radius-4 fw-medium text-sm`}>
                            {exam.status}
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
                                  onClick={() => openEditDrawer(exam)}
                                >
                                  <i className="ri-edit-2-line"></i> Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openDeleteModal(exam)}
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
                  {paginatedExams.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-20">
                        No exams found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredExams.length > 0 && (
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

      {/* Add Exam Drawer */}
      <SlideDrawer
        isOpen={addDrawerOpen}
        onClose={closeAddDrawer}
        title="Add New Exam"
      >
        <form onSubmit={handleAddSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="examName" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Exam Name
              </label>
              <input
                type="text"
                className="form-control"
                id="examName"
                name="name"
                placeholder="Enter exam name"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="examDate" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Exam Date
              </label>
              <input
                type="date"
                className="form-control"
                id="examDate"
                name="date"
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
              <label htmlFor="status" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="form-control form-select"
                required
              >
                <option value="" disabled selected>Select Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Closed">Closed</option>
                <option value="Upcoming">Upcoming</option>
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

      {/* Edit Exam Drawer */}
      <SlideDrawer
        isOpen={editDrawerOpen}
        onClose={closeEditDrawer}
        title="Edit Exam"
      >
        <form onSubmit={handleEditSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="examNameEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Exam Name
              </label>
              <input
                type="text"
                className="form-control"
                id="examNameEdit"
                name="name"
                defaultValue={editingExam?.name || ''}
                placeholder="Enter exam name"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="examDateEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Exam Date
              </label>
              <input
                type="date"
                className="form-control"
                id="examDateEdit"
                name="date"
                defaultValue={editingExam?.date || ''}
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
                defaultValue={editingExam?.startTime || ''}
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
                defaultValue={editingExam?.endTime || ''}
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="statusEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Status
              </label>
              <select
                id="statusEdit"
                name="status"
                className="form-control form-select"
                defaultValue={editingExam?.status || ''}
                required
              >
                <option value="" disabled>Select Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Closed">Closed</option>
                <option value="Upcoming">Upcoming</option>
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
        title={`Delete ${deleteModal.examName}?`}
        message="Are you sure you want to delete this exam?"
        confirmText="Yes, Delete"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />
    </div>
  );
};

export default ExamList;