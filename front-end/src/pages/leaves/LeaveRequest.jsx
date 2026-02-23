 import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SlideDrawer from '../../components/Slidedrawer';
import ConfirmModal from '../../components/ConfirmModal';

// Sample leave request data (matching HTML rows)
const initialRequests = [
  { id: 1, applyDate: '07 May 2025', name: 'Jerome Bell', userType: 'Teacher', leaveType: 'Medical Leave', icon: 'ri-hospital-line', dateRange: '07 May 2025 - 08 May 2025', duration: 1, status: 'Approved', reason: 'Doctor or hospital visits' },
  { id: 2, applyDate: '10 May 2025', name: 'Jane Cooper', userType: 'Student', leaveType: 'Casual Leave', icon: 'ri-sun-line', dateRange: '10 May 2025 - 12 May 2025', duration: 2, status: 'Pending', reason: 'Family function' },
  { id: 3, applyDate: '12 May 2025', name: 'Devon Lane', userType: 'Teacher', leaveType: 'Half Day Leave', icon: 'ri-time-line', dateRange: '12 May 2025', duration: 0.5, status: 'Rejected', reason: 'Personal work' },
  { id: 4, applyDate: '13 May 2025', name: 'Cody Fisher', userType: 'Admin', leaveType: 'Vacation Leave', icon: 'ri-flight-takeoff-line', dateRange: '13 May 2025 - 20 May 2025', duration: 7, status: 'Approved', reason: 'Annual vacation' },
  { id: 5, applyDate: '14 May 2025', name: 'Theresa Webb', userType: 'Teacher', leaveType: 'Study Leave', icon: 'ri-book-open-line', dateRange: '14 May 2025 - 16 May 2025', duration: 2, status: 'Pending', reason: 'Exam preparation' },
  { id: 6, applyDate: '15 May 2025', name: 'Darrell Steward', userType: 'Student', leaveType: 'Paid Leave', icon: 'ri-money-dollar-circle-line', dateRange: '15 May 2025 - 17 May 2025', duration: 2, status: 'Approved', reason: 'Medical treatment' },
  { id: 7, applyDate: '17 May 2025', name: 'Leslie Alexander', userType: 'Teacher', leaveType: 'Emergency Leave', icon: 'ri-alarm-warning-line', dateRange: '17 May 2025 - 18 May 2025', duration: 1, status: 'Rejected', reason: 'Not approved' },
  { id: 8, applyDate: '18 May 2025', name: 'Guy Hawkins', userType: 'Admin', leaveType: 'Maternity Leave', icon: 'ri-parent-line', dateRange: '18 May 2025 - 28 May 2025', duration: 10, status: 'Approved', reason: 'Maternity' },
  { id: 9, applyDate: '19 May 2025', name: 'Brooklyn Simmons', userType: 'Teacher', leaveType: 'Paternity Leave', icon: 'ri-user-heart-line', dateRange: '19 May 2025 - 24 May 2025', duration: 5, status: 'Pending', reason: 'New baby' },
  { id: 10, applyDate: '20 May 2025', name: 'Kristin Watson', userType: 'Student', leaveType: 'Unpaid Leave', icon: 'ri-close-circle-line', dateRange: '20 May 2025 - 21 May 2025', duration: 1, status: 'Rejected', reason: 'No reason' },
];

const LeaveRequest = () => {
  // ---------- State ----------
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Inside drawer: status update and note
  const [statusUpdate, setStatusUpdate] = useState('');
  const [note, setNote] = useState('');

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, requestId: null, requestName: '' });

  // ---------- Filtered data ----------
  const filteredRequests = useMemo(() => {
    return requests.filter((req) =>
      req.name.toLowerCase().includes(search.toLowerCase()) ||
      req.leaveType.toLowerCase().includes(search.toLowerCase()) ||
      req.userType.toLowerCase().includes(search.toLowerCase())
    );
  }, [requests, search]);

  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredRequests.slice(start, start + rowsPerPage);
  }, [filteredRequests, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredRequests.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedRequests.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const openDrawer = (request) => {
    setSelectedRequest(request);
    setStatusUpdate(request.status); // pre-select current status
    setNote(''); // clear note field
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedRequest(null);
    setStatusUpdate('');
    setNote('');
  };

  const handleStatusChange = (e) => {
    setStatusUpdate(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleStatusSubmit = (e) => {
    e.preventDefault();
    if (selectedRequest) {
      // Update status in the list
      setRequests((prev) =>
        prev.map((r) =>
          r.id === selectedRequest.id ? { ...r, status: statusUpdate } : r
        )
      );
      // Optionally handle note (could be stored or sent to API)
      alert(`Status updated to ${statusUpdate} with note: ${note || 'no note'}`);
      closeDrawer();
    }
  };

  const openDeleteModal = (request) => {
    setDeleteModal({ open: true, requestId: request.id, requestName: request.name });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, requestId: null, requestName: '' });
  };

  const confirmDelete = () => {
    setRequests((prev) => prev.filter((r) => r.id !== deleteModal.requestId));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteModal.requestId));
    closeDeleteModal();
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const exportPDF = () => alert('Export as PDF');
  const exportExcel = () => alert('Export as Excel');

  // Helper for status badge class
  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-success-100 text-success-600';
      case 'Pending':
        return 'bg-warning-100 text-warning-600';
      case 'Rejected':
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
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Leave Request</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Leave Request</span>
          </div>
        </div>
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
                          checked={paginatedRequests.length > 0 && selectedIds.length === paginatedRequests.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Apply Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">User type</th>
                    <th scope="col">Leave Type</th>
                    <th scope="col">Date</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRequests.map((req, index) => {
                    const isSelected = selectedIds.includes(req.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <tr key={req.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(req.id)}
                            />
                            <label className="form-check-label">{sl.toString().padStart(2, '0')}</label>
                          </div>
                        </td>
                        <td>{req.applyDate}</td>
                        <td>{req.name}</td>
                        <td>{req.userType}</td>
                        <td>
                          <i className={`${req.icon} me-1`}></i> {req.leaveType}
                        </td>
                        <td>{req.dateRange}</td>
                        <td>{req.duration}</td>
                        <td>
                          <span className={`${getStatusClass(req.status)} px-24 py-4 radius-4 fw-medium text-sm`}>
                            {req.status}
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
                                  onClick={() => openDrawer(req)}
                                >
                                  <i className="ri-eye-line"></i> View Request
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openDeleteModal(req)}
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
                  {paginatedRequests.length === 0 && (
                    <tr>
                      <td colSpan="9" className="text-center py-20">
                        No leave requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredRequests.length > 0 && (
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

      {/* View Request Drawer */}
      <SlideDrawer
        isOpen={drawerOpen}
        onClose={closeDrawer}
        title="View Leave Request"
      >
        {selectedRequest && (
          <div className="p-20">
            <div className="d-flex flex-column gap-28">
              <div className="d-flex flex-column gap-8">
                <div className="d-flex gap-4">
                  <span className="fw-semibold text-sm text-secondary-light w-110-px">Apply Date</span>
                  <span className="fw-normal text-sm text-primary-light">: {selectedRequest.applyDate}</span>
                </div>
                <div className="d-flex gap-4">
                  <span className="fw-semibold text-sm text-secondary-light w-110-px">Name</span>
                  <span className="fw-normal text-sm text-primary-light">: {selectedRequest.name}</span>
                </div>
                <div className="d-flex gap-4">
                  <span className="fw-semibold text-sm text-secondary-light w-110-px">User type</span>
                  <span className="fw-normal text-sm text-primary-light">: {selectedRequest.userType}</span>
                </div>
                <div className="d-flex gap-4">
                  <span className="fw-semibold text-sm text-secondary-light w-110-px">Leave Type</span>
                  <span className="fw-normal text-sm text-primary-light">: {selectedRequest.leaveType}</span>
                </div>
                <div className="d-flex gap-4">
                  <span className="fw-semibold text-sm text-secondary-light w-110-px">Date</span>
                  <span className="fw-normal text-sm text-primary-light">: {selectedRequest.dateRange}</span>
                </div>
                <div className="d-flex gap-4">
                  <span className="fw-semibold text-sm text-secondary-light w-110-px">Duration</span>
                  <span className="fw-normal text-sm text-primary-light">: {selectedRequest.duration}</span>
                </div>
                <div className="d-flex gap-4">
                  <span className="fw-semibold text-sm text-secondary-light w-110-px">Reasons</span>
                  <span className="fw-normal text-sm text-primary-light">: {selectedRequest.reason}</span>
                </div>
              </div>

              <div>
                <h5 className="text-md mb-0">Update Status</h5>
                <div className="d-flex align-items-center flex-wrap gap-28 mt-16">
                  {['Pending', 'Approved', 'Rejected'].map((status) => (
                    <div key={status} className="form-check checked-primary d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="statusUpdate"
                        id={`status-${status}`}
                        value={status}
                        checked={statusUpdate === status}
                        onChange={handleStatusChange}
                      />
                      <label className="form-check-label" htmlFor={`status-${status}`}>
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleStatusSubmit}>
                <div>
                  <label htmlFor="notee" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                    Leave Note
                  </label>
                  <textarea
                    className="form-control"
                    id="notee"
                    placeholder="Enter note..."
                    rows="3"
                    value={note}
                    onChange={handleNoteChange}
                  ></textarea>
                </div>
                <div className="d-flex align-items-center justify-content-center gap-3 mt-24">
                  <button
                    type="button"
                    className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-50 py-11 radius-8"
                    onClick={closeDrawer}
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
              </form>
            </div>
          </div>
        )}
      </SlideDrawer>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title={`Delete Request`}
        message={`Are you sure you want to delete the leave request for ${deleteModal.requestName}?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />
    </div>
  );
};

export default LeaveRequest;