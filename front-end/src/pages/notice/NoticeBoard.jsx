import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SlideDrawer from '../../components/Slidedrawer';
import ConfirmModal from '../../components/ConfirmModal';

// Sample notice data (matching HTML rows)
const initialNotices = [
  { id: 1, date: '01 Feb 2015', title: 'General Notice', description: 'School-wide updates, reminders, and holiday schedules.' },
  { id: 2, date: '12 Mar 2016', title: 'Annual Sports Day', description: 'Details regarding sports competitions and event schedule.' },
  { id: 3, date: '05 Jun 2017', title: 'Environment Day Celebration', description: 'Tree plantation and awareness program details.' },
  { id: 4, date: '18 Nov 2017', title: 'Parent-Teacher Meeting', description: 'Invitation for all parents to discuss student progress.' },
  { id: 5, date: '22 Jan 2018', title: 'Exam Schedule', description: 'Timetable for the upcoming mid-term examinations.' },
  { id: 6, date: '09 Jul 2019', title: 'Summer Camp', description: 'Information about summer camp activities and registration.' },
  { id: 7, date: '25 Oct 2019', title: 'Library Week', description: 'Encouraging students to participate in reading challenges.' },
  { id: 8, date: '14 Feb 2020', title: 'Science Fair', description: 'Details about the annual science exhibition projects.' },
  { id: 9, date: '10 Aug 2021', title: 'Covid-19 Guidelines', description: 'Health and safety measures for reopening the campus.' },
  { id: 10, date: '30 May 2022', title: 'Exam Result Announcement', description: 'Publication of the final examination results.' },
  // Extra for pagination demo
  { id: 11, date: '15 Dec 2022', title: 'Winter Break', description: 'School will remain closed for winter vacation.' },
  { id: 12, date: '05 Jan 2023', title: 'New Year Celebration', description: 'Cultural program to celebrate the new year.' },
];

const NoticeBoard = () => {
  // ---------- State ----------
  const [notices, setNotices] = useState(initialNotices);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer states
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null); // { id, title, date, description }

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, noticeId: null, noticeTitle: '' });

  // ---------- Filtered data ----------
  const filteredNotices = useMemo(() => {
    return notices.filter((notice) =>
      notice.title.toLowerCase().includes(search.toLowerCase()) ||
      notice.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [notices, search]);

  const paginatedNotices = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredNotices.slice(start, start + rowsPerPage);
  }, [filteredNotices, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredNotices.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedNotices.map((n) => n.id));
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
    setEditingNotice(null);
    setAddDrawerOpen(true);
  };

  const openEditDrawer = (notice) => {
    setEditingNotice(notice);
    setEditDrawerOpen(true);
  };

  const closeAddDrawer = () => setAddDrawerOpen(false);
  const closeEditDrawer = () => {
    setEditDrawerOpen(false);
    setEditingNotice(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const dateInput = formData.get('date');
    const description = formData.get('description');

    // Format date as "DD MMM YYYY" (example: 05 Jun 2015)
    const formattedDate = dateInput
      ? new Date(dateInput).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ')
      : dateInput;

    const newId = Math.max(...notices.map((n) => n.id), 0) + 1;
    setNotices([...notices, { id: newId, title, date: formattedDate, description }]);
    closeAddDrawer();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const dateInput = formData.get('date');
    const description = formData.get('description');

    const formattedDate = dateInput
      ? new Date(dateInput).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ')
      : dateInput;

    if (editingNotice) {
      setNotices((prev) =>
        prev.map((n) =>
          n.id === editingNotice.id ? { ...n, title, date: formattedDate, description } : n
        )
      );
    }
    closeEditDrawer();
  };

  const openDeleteModal = (notice) => {
    setDeleteModal({ open: true, noticeId: notice.id, noticeTitle: notice.title });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, noticeId: null, noticeTitle: '' });
  };

  const confirmDelete = () => {
    setNotices((prev) => prev.filter((n) => n.id !== deleteModal.noticeId));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteModal.noticeId));
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
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Notice Board</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <Link to="/hrm" className="text-secondary-light hover-text-primary hover-underline"> / HRM</Link>
            <span className="text-secondary-light"> / Notice Board</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={openAddDrawer}
        >
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>
          Add Notice
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
                          checked={paginatedNotices.length > 0 && selectedIds.length === paginatedNotices.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Date</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedNotices.map((notice, index) => {
                    const isSelected = selectedIds.includes(notice.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <tr key={notice.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(notice.id)}
                            />
                            <label className="form-check-label">{sl.toString().padStart(2, '0')}</label>
                          </div>
                        </td>
                        <td>{notice.date}</td>
                        <td>{notice.title}</td>
                        <td>{notice.description}</td>
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
                                  onClick={() => openEditDrawer(notice)}
                                >
                                  <i className="ri-edit-2-line"></i> Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openDeleteModal(notice)}
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
                  {paginatedNotices.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-20">
                        No notices found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredNotices.length > 0 && (
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

      {/* Add Notice Drawer */}
      <SlideDrawer
        isOpen={addDrawerOpen}
        onClose={closeAddDrawer}
        title="Add Notice"
      >
        <form onSubmit={handleAddSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="title" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Enter title"
                required
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="date" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
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
                required
              />
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

      {/* Edit Notice Drawer */}
      <SlideDrawer
        isOpen={editDrawerOpen}
        onClose={closeEditDrawer}
        title="Edit Notice"
      >
        <form onSubmit={handleEditSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="titleEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="titleEdit"
                name="title"
                defaultValue={editingNotice?.title || ''}
                placeholder="Enter title"
                required
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="dateEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="dateEdit"
                name="date"
                defaultValue={editingNotice?.date || ''}
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
                defaultValue={editingNotice?.description || ''}
                placeholder="Enter description"
                rows="3"
                required
              />
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
        title={`Delete Notice`}
        message={`Are you sure you want to delete "${deleteModal.noticeTitle}"?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />
    </div>
  );
};

export default NoticeBoard;