import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SlideDrawer from '../../components/Slidedrawer';
import ConfirmModal from '../../components/ConfirmModal';

// Sample fees group data (matching HTML)
const initialFeesGroups = [
  { id: 1, name: 'Class 1 (A) Fees', feesTypes: 'May month fees, Admission fees, Exam fees', status: 'Active' },
  { id: 2, name: 'Class 2 (A) Fees', feesTypes: 'May month fees, Admission fees, Exam fees', status: 'Inactive' },
  { id: 3, name: 'Class 3 (A) Fees', feesTypes: 'May month fees, Admission fees, Exam fees', status: 'Active' },
  { id: 4, name: 'Class 4 (A) Fees', feesTypes: 'May month fees, Admission fees, Exam fees', status: 'Inactive' },
  { id: 5, name: 'Class 5 (A) Fees', feesTypes: 'May month fees, Admission fees, Exam fees', status: 'Active' },
  { id: 6, name: 'Class 6 (A) Fees', feesTypes: 'May month fees, Admission fees, Exam fees', status: 'Inactive' },
  { id: 7, name: 'Class 7 (A) Fees', feesTypes: 'May month fees, Admission fees, Exam fees', status: 'Active' },
  { id: 8, name: 'Class 8 (A) Fees', feesTypes: 'May month fees, Admission fees, Exam fees', status: 'Inactive' },
  { id: 9, name: 'Class 9 (A) Fees', feesTypes: 'May month fees, Admission fees, Exam fees', status: 'Active' },
  { id: 10, name: 'Class 10 (A) Fees', feesTypes: 'May month fees, Admission fees, Exam fees', status: 'Inactive' },
  { id: 11, name: 'Class 11 (A) Fees', feesTypes: 'May month fees, Admission fees, Exam fees', status: 'Active' },
  { id: 12, name: 'Class 12 (A) Fees', feesTypes: 'May month fees, Admission fees, Exam fees', status: 'Inactive' },
];

const FeesGroup = () => {
  // ---------- State ----------
  const [feesGroups, setFeesGroups] = useState(initialFeesGroups);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer states
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null); // { id, name, feesTypes, status }

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, groupId: null, groupName: '' });

  // ---------- Filtered data ----------
  const filteredGroups = useMemo(() => {
    return feesGroups.filter((group) =>
      group.name.toLowerCase().includes(search.toLowerCase()) ||
      group.feesTypes.toLowerCase().includes(search.toLowerCase())
    );
  }, [feesGroups, search]);

  const paginatedGroups = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredGroups.slice(start, start + rowsPerPage);
  }, [filteredGroups, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredGroups.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedGroups.map((g) => g.id));
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
    setEditingGroup(null);
    setAddDrawerOpen(true);
  };

  const openEditDrawer = (group) => {
    setEditingGroup(group);
    setEditDrawerOpen(true);
  };

  const closeAddDrawer = () => setAddDrawerOpen(false);
  const closeEditDrawer = () => {
    setEditDrawerOpen(false);
    setEditingGroup(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const feesTypes = formData.get('feesTypes'); // Note: in real app, you'd handle multiple selections
    const status = formData.get('status');

    const newId = Math.max(...feesGroups.map((g) => g.id), 0) + 1;
    setFeesGroups([...feesGroups, { id: newId, name, feesTypes, status }]);
    closeAddDrawer();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const feesTypes = formData.get('feesTypes');
    const status = formData.get('status');

    setFeesGroups((prev) =>
      prev.map((g) =>
        g.id === editingGroup.id ? { ...g, name, feesTypes, status } : g
      )
    );
    closeEditDrawer();
  };

  const openDeleteModal = (group) => {
    setDeleteModal({ open: true, groupId: group.id, groupName: group.name });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, groupId: null, groupName: '' });
  };

  const confirmDelete = () => {
    setFeesGroups((prev) => prev.filter((g) => g.id !== deleteModal.groupId));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteModal.groupId));
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
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Fees Group</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Fees Group</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={openAddDrawer}
        >
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>
          Add Fees Group
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
                          checked={paginatedGroups.length > 0 && selectedIds.length === paginatedGroups.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Group Name</th>
                    <th scope="col">Fees Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedGroups.map((group, index) => {
                    const isSelected = selectedIds.includes(group.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <tr key={group.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(group.id)}
                            />
                            <label className="form-check-label">{sl.toString().padStart(2, '0')}</label>
                          </div>
                        </td>
                        <td>{group.name}</td>
                        <td>{group.feesTypes}</td>
                        <td>
                          <span
                            className={`${
                              group.status === 'Active'
                                ? 'bg-success-100 text-success-600'
                                : 'bg-danger-100 text-danger-600'
                            } px-24 py-4 radius-4 fw-medium text-sm`}
                          >
                            {group.status}
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
                                  onClick={() => openEditDrawer(group)}
                                >
                                  <i className="ri-edit-2-line"></i> Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openDeleteModal(group)}
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
                  {paginatedGroups.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-20">
                        No fees groups found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredGroups.length > 0 && (
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

      {/* Add Fees Group Drawer */}
      <SlideDrawer
        isOpen={addDrawerOpen}
        onClose={closeAddDrawer}
        title="Add New Fees Group"
      >
        <form onSubmit={handleAddSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="groupName" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Group Name
              </label>
              <input
                type="text"
                className="form-control"
                id="groupName"
                name="name"
                placeholder="Enter group name"
                required
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="feesTypes" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Fees Type
              </label>
              <select
                id="feesTypes"
                name="feesTypes"
                className="form-control form-select"
                required
              >
                <option value="" disabled selected>Select fees type</option>
                <option value="May month fees, Admission fees, Exam fees">May month fees, Admission fees, Exam fees</option>
                {/* In a real app, you'd allow multiple selections; this is simplified */}
              </select>
            </div>
            <div className="col-sm-12">
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

      {/* Edit Fees Group Drawer */}
      <SlideDrawer
        isOpen={editDrawerOpen}
        onClose={closeEditDrawer}
        title="Edit Fees Group"
      >
        <form onSubmit={handleEditSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="groupNameEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Group Name
              </label>
              <input
                type="text"
                className="form-control"
                id="groupNameEdit"
                name="name"
                defaultValue={editingGroup?.name || ''}
                placeholder="Enter group name"
                required
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="feesTypesEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Fees Type
              </label>
              <select
                id="feesTypesEdit"
                name="feesTypes"
                className="form-control form-select"
                defaultValue={editingGroup?.feesTypes || ''}
                required
              >
                <option value="" disabled>Select fees type</option>
                <option value="May month fees, Admission fees, Exam fees">May month fees, Admission fees, Exam fees</option>
              </select>
            </div>
            <div className="col-sm-12">
              <label htmlFor="statusEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Status
              </label>
              <select
                id="statusEdit"
                name="status"
                className="form-control form-select"
                defaultValue={editingGroup?.status || ''}
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
        title={`Delete ${deleteModal.groupName}?`}
        message="Are you sure you want to delete this fees group?"
        confirmText="Yes, Delete"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />
    </div>
  );
};

export default FeesGroup;