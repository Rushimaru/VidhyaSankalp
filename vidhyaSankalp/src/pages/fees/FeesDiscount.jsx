import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SlideDrawer from '../../components/Slidedrawer';
import ConfirmModal from '../../components/ConfirmModal';

// Sample fees discount data (matching HTML)
const initialDiscounts = [
  { id: 1, groupName: 'Class 1 (A) Fees', feesType: 'May month fees, Admission fees, Exam fees', status: 'Active' },
  { id: 2, groupName: 'Class 2 (A) Fees', feesType: 'May month fees, Admission fees, Exam fees', status: 'Inactive' },
  { id: 3, groupName: 'Class 3 (A) Fees', feesType: 'May month fees, Admission fees, Exam fees', status: 'Active' },
  { id: 4, groupName: 'Class 4 (A) Fees', feesType: 'May month fees, Admission fees, Exam fees', status: 'Inactive' },
  { id: 5, groupName: 'Class 5 (A) Fees', feesType: 'May month fees, Admission fees, Exam fees', status: 'Active' },
  { id: 6, groupName: 'Class 6 (A) Fees', feesType: 'May month fees, Admission fees, Exam fees', status: 'Inactive' },
  { id: 7, groupName: 'Class 7 (A) Fees', feesType: 'May month fees, Admission fees, Exam fees', status: 'Active' },
  { id: 8, groupName: 'Class 8 (A) Fees', feesType: 'May month fees, Admission fees, Exam fees', status: 'Inactive' },
  { id: 9, groupName: 'Class 9 (A) Fees', feesType: 'May month fees, Admission fees, Exam fees', status: 'Active' },
  { id: 10, groupName: 'Class 10 (A) Fees', feesType: 'May month fees, Admission fees, Exam fees', status: 'Inactive' },
  { id: 11, groupName: 'Class 11 (A) Fees', feesType: 'May month fees, Admission fees, Exam fees', status: 'Active' },
  { id: 12, groupName: 'Class 12 (A) Fees', feesType: 'May month fees, Admission fees, Exam fees', status: 'Inactive' },
];

const FeesDiscount = () => {
  // ---------- State ----------
  const [discounts, setDiscounts] = useState(initialDiscounts);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer states
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null); // { id, groupName, feesType, status, discountType?, discountValue? }

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, discountId: null, discountName: '' });

  // ---------- Filtered data ----------
  const filteredDiscounts = useMemo(() => {
    return discounts.filter((item) =>
      item.groupName.toLowerCase().includes(search.toLowerCase()) ||
      item.feesType.toLowerCase().includes(search.toLowerCase())
    );
  }, [discounts, search]);

  const paginatedDiscounts = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredDiscounts.slice(start, start + rowsPerPage);
  }, [filteredDiscounts, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredDiscounts.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedDiscounts.map((item) => item.id));
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
    setEditingDiscount(null);
    setAddDrawerOpen(true);
  };

  const openEditDrawer = (item) => {
    setEditingDiscount(item);
    setEditDrawerOpen(true);
  };

  const closeAddDrawer = () => setAddDrawerOpen(false);
  const closeEditDrawer = () => {
    setEditDrawerOpen(false);
    setEditingDiscount(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const groupName = formData.get('groupName');
    const discountType = formData.get('discountType');
    const discountValue = formData.get('discountValue');
    const status = formData.get('status');

    // Note: feesType is not in the form, but the table shows it. For demo, we'll use a placeholder.
    // In a real app, you'd handle feesType selection properly.
    const feesType = 'May month fees, Admission fees, Exam fees'; // placeholder

    const newId = Math.max(...discounts.map((item) => item.id), 0) + 1;
    setDiscounts([...discounts, { id: newId, groupName, feesType, status }]);
    closeAddDrawer();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const groupName = formData.get('groupName');
    const discountType = formData.get('discountType');
    const discountValue = formData.get('discountValue');
    const status = formData.get('status');

    const feesType = 'May month fees, Admission fees, Exam fees'; // placeholder

    setDiscounts((prev) =>
      prev.map((item) =>
        item.id === editingDiscount.id ? { ...item, groupName, feesType, status } : item
      )
    );
    closeEditDrawer();
  };

  const openDeleteModal = (item) => {
    setDeleteModal({ open: true, discountId: item.id, discountName: item.groupName });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, discountId: null, discountName: '' });
  };

  const confirmDelete = () => {
    setDiscounts((prev) => prev.filter((item) => item.id !== deleteModal.discountId));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteModal.discountId));
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
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Fees Discount</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Fees Discount</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={openAddDrawer}
        >
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>
          Add Fees Discount
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
                          checked={paginatedDiscounts.length > 0 && selectedIds.length === paginatedDiscounts.length}
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
                  {paginatedDiscounts.map((item, index) => {
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
                        <td>{item.groupName}</td>
                        <td>{item.feesType}</td>
                        <td>
                          <span
                            className={`${
                              item.status === 'Active'
                                ? 'bg-success-100 text-success-600'
                                : 'bg-danger-100 text-danger-600'
                            } px-24 py-4 radius-4 fw-medium text-sm`}
                          >
                            {item.status}
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
                  {paginatedDiscounts.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-20">
                        No discounts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredDiscounts.length > 0 && (
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

      {/* Add Discount Drawer */}
      <SlideDrawer
        isOpen={addDrawerOpen}
        onClose={closeAddDrawer}
        title="Add New Discount"
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
                name="groupName"
                placeholder="Enter group name"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="discountType" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Discount Type
              </label>
              <select
                id="discountType"
                name="discountType"
                className="form-control form-select"
                required
              >
                <option value="" disabled>Select discount type</option>
                <option value="Percentage" selected>Percentage</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="discountValue" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Discount Value
              </label>
              <input
                type="text"
                className="form-control"
                id="discountValue"
                name="discountValue"
                placeholder="Ex: 10%"
                required
              />
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

      {/* Edit Discount Drawer */}
      <SlideDrawer
        isOpen={editDrawerOpen}
        onClose={closeEditDrawer}
        title="Edit Discount"
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
                name="groupName"
                defaultValue={editingDiscount?.groupName || ''}
                placeholder="Enter group name"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="discountTypeEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Discount Type
              </label>
              <select
                id="discountTypeEdit"
                name="discountType"
                className="form-control form-select"
                defaultValue={editingDiscount?.discountType || 'Percentage'}
                required
              >
                <option value="" disabled>Select discount type</option>
                <option value="Percentage">Percentage</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="discountValueEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Discount Value
              </label>
              <input
                type="text"
                className="form-control"
                id="discountValueEdit"
                name="discountValue"
                defaultValue={editingDiscount?.discountValue || ''}
                placeholder="Ex: 10%"
                required
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="statusEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Status
              </label>
              <select
                id="statusEdit"
                name="status"
                className="form-control form-select"
                defaultValue={editingDiscount?.status || ''}
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
        title={`Delete ${deleteModal.discountName}?`}
        message="Are you sure you want to delete this discount?"
        confirmText="Yes, Delete"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />
    </div>
  );
};

export default FeesDiscount;