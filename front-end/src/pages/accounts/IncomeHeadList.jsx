import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SlideDrawer from '../../components/Slidedrawer';
import ConfirmModal from '../../components/ConfirmModal';

// Sample income head data (matching HTML rows)
const initialIncomeHeads = [
  { id: 1, name: 'Book Sale', feesType: 'May month fees, Admission fees, Exam fees', status: 'Active' },
  { id: 2, name: 'Uniform Sale', feesType: 'May month fees, Admission fees, Exam fees', status: 'Inactive' },
  { id: 3, name: 'Donation', feesType: 'May month fees, Admission fees, Exam fees', status: 'Active' },
  { id: 4, name: 'Fundraising Gala', feesType: 'May month fees, Admission fees, Exam fees', status: 'Inactive' },
  { id: 5, name: 'Raffle Tickets', feesType: 'May month fees, Admission fees, Exam fees', status: 'Active' },
  { id: 6, name: 'Membership Drive', feesType: 'May month fees, Admission fees, Exam fees', status: 'Inactive' },
  { id: 7, name: 'Bake Sale', feesType: 'May month fees, Admission fees, Exam fees', status: 'Active' },
  { id: 8, name: 'Car Wash', feesType: 'May month fees, Admission fees, Exam fees', status: 'Inactive' },
  { id: 9, name: 'Silent Auction', feesType: 'May month fees, Admission fees, Exam fees', status: 'Active' },
  { id: 10, name: 'Craft Fair', feesType: 'May month fees, Admission fees, Exam fees', status: 'Inactive' },
  { id: 11, name: 'Donation', feesType: 'May month fees, Admission fees, Exam fees', status: 'Active' },
  { id: 12, name: 'Membership Drive', feesType: 'May month fees, Admission fees, Exam fees', status: 'Inactive' },
];

const IncomeHeadList = () => {
  // ---------- State ----------
  const [incomeHeads, setIncomeHeads] = useState(initialIncomeHeads);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer states
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [editingHead, setEditingHead] = useState(null); // { id, name, feesType, status, description? }

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, headId: null, headName: '' });

  // ---------- Filtered data ----------
  const filteredHeads = useMemo(() => {
    return incomeHeads.filter((head) =>
      head.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [incomeHeads, search]);

  const paginatedHeads = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredHeads.slice(start, start + rowsPerPage);
  }, [filteredHeads, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredHeads.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedHeads.map((h) => h.id));
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
    setEditingHead(null);
    setAddDrawerOpen(true);
  };

  const openEditDrawer = (head) => {
    setEditingHead(head);
    setEditDrawerOpen(true);
  };

  const closeAddDrawer = () => setAddDrawerOpen(false);
  const closeEditDrawer = () => {
    setEditDrawerOpen(false);
    setEditingHead(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const description = formData.get('description'); // not used in table, but stored
    const status = formData.get('status');

    const newId = Math.max(...incomeHeads.map((h) => h.id), 0) + 1;
    const newHead = {
      id: newId,
      name,
      feesType: 'May month fees, Admission fees, Exam fees', // placeholder; could be built from selection
      status,
      description,
    };
    setIncomeHeads([...incomeHeads, newHead]);
    closeAddDrawer();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const description = formData.get('description');
    const status = formData.get('status');

    if (editingHead) {
      setIncomeHeads((prev) =>
        prev.map((h) =>
          h.id === editingHead.id ? { ...h, name, status, description } : h
        )
      );
    }
    closeEditDrawer();
  };

  const openDeleteModal = (head) => {
    setDeleteModal({ open: true, headId: head.id, headName: head.name });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, headId: null, headName: '' });
  };

  const confirmDelete = () => {
    setIncomeHeads((prev) => prev.filter((h) => h.id !== deleteModal.headId));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteModal.headId));
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
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Income Head List</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Income Head List</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={openAddDrawer}
        >
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>
          Add Income Head
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
                          checked={paginatedHeads.length > 0 && selectedIds.length === paginatedHeads.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col">Fees Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedHeads.map((head, index) => {
                    const isSelected = selectedIds.includes(head.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <tr key={head.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(head.id)}
                            />
                            <label className="form-check-label">{sl.toString().padStart(2, '0')}</label>
                          </div>
                        </td>
                        <td>{head.name}</td>
                        <td>{head.feesType}</td>
                        <td>
                          <span
                            className={`${
                              head.status === 'Active'
                                ? 'bg-success-100 text-success-600'
                                : 'bg-danger-100 text-danger-600'
                            } px-24 py-4 radius-4 fw-medium text-sm`}
                          >
                            {head.status}
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
                                  onClick={() => openEditDrawer(head)}
                                >
                                  <i className="ri-edit-2-line"></i> Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openDeleteModal(head)}
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
                  {paginatedHeads.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-20">
                        No income heads found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredHeads.length > 0 && (
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

      {/* Add Income Head Drawer */}
      <SlideDrawer
        isOpen={addDrawerOpen}
        onClose={closeAddDrawer}
        title="Add Income Head"
      >
        <form onSubmit={handleAddSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="headName" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Head Name
              </label>
              <input
                type="text"
                className="form-control"
                id="headName"
                name="name"
                placeholder="Enter head name"
                required
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="description" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                placeholder="Enter description"
                rows="3"
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

      {/* Edit Income Head Drawer */}
      <SlideDrawer
        isOpen={editDrawerOpen}
        onClose={closeEditDrawer}
        title="Edit Income Head"
      >
        <form onSubmit={handleEditSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="headNameEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Head Name
              </label>
              <input
                type="text"
                className="form-control"
                id="headNameEdit"
                name="name"
                defaultValue={editingHead?.name || ''}
                placeholder="Enter head name"
                required
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="descriptionEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Description
              </label>
              <textarea
                className="form-control"
                id="descriptionEdit"
                name="description"
                defaultValue={editingHead?.description || ''}
                placeholder="Enter description"
                rows="3"
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
                defaultValue={editingHead?.status || ''}
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
        title={`Delete Income Head`}
        message={`Are you sure you want to delete "${deleteModal.headName}"?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />
    </div>
  );
};

export default IncomeHeadList;