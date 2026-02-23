import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SlideDrawer from '../../components/Slidedrawer';
import ConfirmModal from '../../components/ConfirmModal';

// Sample role assignment data (matching HTML rows)
const initialAssignments = [
  { id: 1, date: '05 Jan 2018', roleName: 'Administrator', features: 'User Management, System Settings, Notifications' },
  { id: 2, date: '12 Mar 2019', roleName: 'Accountant', features: 'Payroll, Ledger Management, Expense Tracking' },
  { id: 3, date: '22 Jul 2020', roleName: 'Teacher', features: 'Class Management, Attendance, Student Reports' },
  { id: 4, date: '09 Sep 2017', roleName: 'Librarian', features: 'Book Records, Issue/Return, Fine Collection' },
  { id: 5, date: '15 Nov 2021', roleName: 'Receptionist', features: 'Visitor Entry, Call Handling, Appointment Scheduling' },
  { id: 6, date: '10 Dec 2016', roleName: 'HR Manager', features: 'Staff Management, Recruitment, Attendance Control' },
  { id: 7, date: '03 Apr 2022', roleName: 'IT Support', features: 'Technical Support, Software Maintenance, Network Issues' },
  { id: 8, date: '18 Jun 2020', roleName: 'Parent', features: 'Student Monitoring, Fee Checking, Communication' },
  { id: 9, date: '25 Aug 2019', roleName: 'Student', features: 'Online Classes, Exam Portal, Assignments' },
  { id: 10, date: '14 Oct 2018', roleName: 'Exam Coordinator', features: 'Exam Schedule, Question Papers, Result Publishing' },
  // extra for pagination demo
  { id: 11, date: '20 Feb 2023', roleName: 'Security Guard', features: 'Gate Entry, Visitor Logs' },
  { id: 12, date: '05 May 2023', roleName: 'Canteen Staff', features: 'Food Management, Billing' },
];

const AssignRole = () => {
  // ---------- State ----------
  const [assignments, setAssignments] = useState(initialAssignments);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer states
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null); // { id, date, roleName, features }

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, assignmentId: null, roleName: '' });

  // ---------- Filtered data ----------
  const filteredAssignments = useMemo(() => {
    return assignments.filter((item) =>
      item.roleName.toLowerCase().includes(search.toLowerCase()) ||
      item.features.toLowerCase().includes(search.toLowerCase())
    );
  }, [assignments, search]);

  const paginatedAssignments = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredAssignments.slice(start, start + rowsPerPage);
  }, [filteredAssignments, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredAssignments.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedAssignments.map((a) => a.id));
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
    setEditingAssignment(null);
    setAddDrawerOpen(true);
  };

  const openEditDrawer = (assignment) => {
    setEditingAssignment(assignment);
    setEditDrawerOpen(true);
  };

  const closeAddDrawer = () => setAddDrawerOpen(false);
  const closeEditDrawer = () => {
    setEditDrawerOpen(false);
    setEditingAssignment(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const roleName = formData.get('roleName');
    const features = formData.get('features');
    const dateInput = formData.get('date'); // not in form but we can add; HTML has date? We'll use current date.

    // In a real app, you'd get date from form; here we use today
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ');

    const newId = Math.max(...assignments.map((a) => a.id), 0) + 1;
    setAssignments([...assignments, { id: newId, date: formattedDate, roleName, features }]);
    closeAddDrawer();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const roleName = formData.get('roleName');
    const features = formData.get('features');
    const dateInput = formData.get('date'); // not in HTML edit form

    if (editingAssignment) {
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === editingAssignment.id ? { ...a, roleName, features } : a
        )
      );
    }
    closeEditDrawer();
  };

  const openDeleteModal = (assignment) => {
    setDeleteModal({ open: true, assignmentId: assignment.id, roleName: assignment.roleName });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, assignmentId: null, roleName: '' });
  };

  const confirmDelete = () => {
    setAssignments((prev) => prev.filter((a) => a.id !== deleteModal.assignmentId));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteModal.assignmentId));
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
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Assign Role</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <Link to="/hrm" className="text-secondary-light hover-text-primary hover-underline"> / HRM</Link>
            <span className="text-secondary-light"> / Assign Role</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={openAddDrawer}
        >
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>
          Add Assign Role
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
                          checked={paginatedAssignments.length > 0 && selectedIds.length === paginatedAssignments.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Date</th>
                    <th scope="col">Role Name</th>
                    <th scope="col">Features</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAssignments.map((item, index) => {
                    const isSelected = selectedIds.includes(item.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(item.id)}
                            />
                            <label className="form-check-label">{sl.toString().padStart(2, '0')}</label>
                          </div>
                        </td>
                        <td>{item.date}</td>
                        <td>{item.roleName}</td>
                        <td>{item.features}</td>
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
                                  onClick={() => openEditDrawer(item)}
                                >
                                  <i className="ri-edit-2-line"></i> Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openDeleteModal(item)}
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
                  {paginatedAssignments.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-20">
                        No role assignments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredAssignments.length > 0 && (
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

      {/* Add Assign Role Drawer */}
      <SlideDrawer
        isOpen={addDrawerOpen}
        onClose={closeAddDrawer}
        title="Assign Role"
      >
        <form onSubmit={handleAddSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="roleName" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Role Name
              </label>
              <input
                type="text"
                className="form-control"
                id="roleName"
                name="roleName"
                placeholder="Enter role name"
                required
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="features" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Features
              </label>
              <select
                id="features"
                name="features"
                className="form-control form-select"
                required
              >
                <option value="" disabled selected>Select a feature</option>
                <option value="User Management">User Management</option>
                <option value="System Settings">System Settings</option>
                <option value="Notifications">Notifications</option>
                <option value="Payroll">Payroll</option>
                <option value="Ledger Management">Ledger Management</option>
                <option value="Expense Tracking">Expense Tracking</option>
                <option value="Class Management">Class Management</option>
                <option value="Attendance">Attendance</option>
                <option value="Student Reports">Student Reports</option>
                <option value="Book Records">Book Records</option>
                <option value="Issue/Return">Issue/Return</option>
                <option value="Fine Collection">Fine Collection</option>
                <option value="Visitor Entry">Visitor Entry</option>
                <option value="Call Handling">Call Handling</option>
                <option value="Appointment Scheduling">Appointment Scheduling</option>
                <option value="Staff Management">Staff Management</option>
                <option value="Recruitment">Recruitment</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Software Maintenance">Software Maintenance</option>
                <option value="Network Issues">Network Issues</option>
                <option value="Student Monitoring">Student Monitoring</option>
                <option value="Fee Checking">Fee Checking</option>
                <option value="Communication">Communication</option>
                <option value="Online Classes">Online Classes</option>
                <option value="Exam Portal">Exam Portal</option>
                <option value="Assignments">Assignments</option>
                <option value="Exam Schedule">Exam Schedule</option>
                <option value="Question Papers">Question Papers</option>
                <option value="Result Publishing">Result Publishing</option>
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

      {/* Edit Assign Role Drawer */}
      <SlideDrawer
        isOpen={editDrawerOpen}
        onClose={closeEditDrawer}
        title="Edit Assign Role"
      >
        <form onSubmit={handleEditSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="roleNameEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Role Name
              </label>
              <input
                type="text"
                className="form-control"
                id="roleNameEdit"
                name="roleName"
                defaultValue={editingAssignment?.roleName || ''}
                placeholder="Enter role name"
                required
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="featuresEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Features
              </label>
              <select
                id="featuresEdit"
                name="features"
                className="form-control form-select"
                defaultValue={editingAssignment?.features || ''}
                required
              >
                <option value="" disabled>Select a feature</option>
                <option value="User Management">User Management</option>
                <option value="System Settings">System Settings</option>
                <option value="Notifications">Notifications</option>
                <option value="Payroll">Payroll</option>
                <option value="Ledger Management">Ledger Management</option>
                <option value="Expense Tracking">Expense Tracking</option>
                <option value="Class Management">Class Management</option>
                <option value="Attendance">Attendance</option>
                <option value="Student Reports">Student Reports</option>
                <option value="Book Records">Book Records</option>
                <option value="Issue/Return">Issue/Return</option>
                <option value="Fine Collection">Fine Collection</option>
                <option value="Visitor Entry">Visitor Entry</option>
                <option value="Call Handling">Call Handling</option>
                <option value="Appointment Scheduling">Appointment Scheduling</option>
                <option value="Staff Management">Staff Management</option>
                <option value="Recruitment">Recruitment</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Software Maintenance">Software Maintenance</option>
                <option value="Network Issues">Network Issues</option>
                <option value="Student Monitoring">Student Monitoring</option>
                <option value="Fee Checking">Fee Checking</option>
                <option value="Communication">Communication</option>
                <option value="Online Classes">Online Classes</option>
                <option value="Exam Portal">Exam Portal</option>
                <option value="Assignments">Assignments</option>
                <option value="Exam Schedule">Exam Schedule</option>
                <option value="Question Papers">Question Papers</option>
                <option value="Result Publishing">Result Publishing</option>
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
        title={`Delete Role`}
        message={`Are you sure you want to delete "${deleteModal.roleName}"?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />
    </div>
  );
};

export default AssignRole;