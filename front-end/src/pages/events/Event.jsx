import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import SlideDrawer from '../../components/Slidedrawer';
import ConfirmModal from '../../components/ConfirmModal';

// Sample event data
const initialEvents = [
  { id: 1, title: 'Design Conference', startDate: '25 Jan 2024, 10:30 AM', endDate: '25 Jan 2024, 2:30 PM', label: 'Business', labelColor: 'bg-primary-600' },
  { id: 2, title: 'Parent-Teacher Meeting', startDate: '12 Feb 2024, 9:00 AM', endDate: '12 Feb 2024, 12:00 PM', label: 'Important', labelColor: 'bg-lilac-600' },
  { id: 3, title: 'Science Fair', startDate: '05 Mar 2024, 10:00 AM', endDate: '07 Mar 2024, 4:00 PM', label: 'Personal', labelColor: 'bg-success-600' },
  { id: 4, title: 'Annual Sports Day', startDate: '20 Apr 2024, 8:00 AM', endDate: '22 Apr 2024, 5:00 PM', label: 'Holiday', labelColor: 'bg-danger-600' },
  { id: 5, title: 'Cultural Program', startDate: '10 May 2024, 6:00 PM', endDate: '10 May 2024, 9:00 PM', label: 'Family', labelColor: 'bg-warning-600' },
  { id: 6, title: 'Exam Schedule', startDate: '01 Jun 2024, 9:00 AM', endDate: '15 Jun 2024, 1:00 PM', label: 'Important', labelColor: 'bg-lilac-600' },
  { id: 7, title: 'Library Week', startDate: '20 Jul 2024, 10:00 AM', endDate: '25 Jul 2024, 3:00 PM', label: 'Personal', labelColor: 'bg-success-600' },
  { id: 8, title: 'Environment Day', startDate: '05 Aug 2024, 9:30 AM', endDate: '05 Aug 2024, 2:00 PM', label: 'Business', labelColor: 'bg-primary-600' },
  { id: 9, title: 'Farewell Party', startDate: '15 Sep 2024, 5:00 PM', endDate: '15 Sep 2024, 8:00 PM', label: 'Family', labelColor: 'bg-warning-600' },
  { id: 10, title: 'New Year Celebration', startDate: '31 Dec 2024, 8:00 PM', endDate: '01 Jan 2025, 1:00 AM', label: 'Holiday', labelColor: 'bg-danger-600' },
  // extra for pagination
  { id: 11, title: 'Workshop on AI', startDate: '10 Jan 2025, 10:00 AM', endDate: '12 Jan 2025, 4:00 PM', label: 'Business', labelColor: 'bg-primary-600' },
  { id: 12, title: 'Health Camp', startDate: '20 Feb 2025, 9:00 AM', endDate: '22 Feb 2025, 1:00 PM', label: 'Important', labelColor: 'bg-lilac-600' },
];

const Event = () => {
  // ---------- State ----------
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer states
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null); // { id, title, startDate, endDate, label, description? }

  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, eventId: null, eventTitle: '' });

  // ---------- Filtered data ----------
  const filteredEvents = useMemo(() => {
    return events.filter((e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [events, search]);

  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredEvents.slice(start, start + rowsPerPage);
  }, [filteredEvents, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredEvents.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedEvents.map((ev) => ev.id));
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
    setEditingEvent(null);
    setAddDrawerOpen(true);
  };

  const openEditDrawer = (event) => {
    setEditingEvent(event);
    setEditDrawerOpen(true);
  };

  const closeAddDrawer = () => setAddDrawerOpen(false);
  const closeEditDrawer = () => {
    setEditDrawerOpen(false);
    setEditingEvent(null);
  };

  const openViewModal = (event) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedEvent(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const startDate = formData.get('startDate'); // format: "YYYY-MM-DDTHH:MM" from datetime-local
    const endDate = formData.get('endDate');
    const label = formData.get('label');
    const description = formData.get('description');

    // Format dates (simplified – you can use a library)
    const formatDate = (datetime) => {
      if (!datetime) return '';
      const d = new Date(datetime);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
        ', ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const newId = Math.max(...events.map((ev) => ev.id), 0) + 1;
    const labelColor = label === 'Personal' ? 'bg-success-600' :
                        label === 'Business' ? 'bg-primary-600' :
                        label === 'Family' ? 'bg-warning-600' :
                        label === 'Important' ? 'bg-lilac-600' :
                        'bg-danger-600'; // Holiday
    const newEvent = {
      id: newId,
      title,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      label,
      labelColor,
      description,
    };
    setEvents([...events, newEvent]);
    closeAddDrawer();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    const label = formData.get('label');
    const description = formData.get('description');

    const formatDate = (datetime) => {
      if (!datetime) return '';
      const d = new Date(datetime);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) +
        ', ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const labelColor = label === 'Personal' ? 'bg-success-600' :
                        label === 'Business' ? 'bg-primary-600' :
                        label === 'Family' ? 'bg-warning-600' :
                        label === 'Important' ? 'bg-lilac-600' :
                        'bg-danger-600';

    if (editingEvent) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingEvent.id
            ? { ...ev, title, startDate: formatDate(startDate), endDate: formatDate(endDate), label, labelColor, description }
            : ev
        )
      );
    }
    closeEditDrawer();
  };

  const openDeleteModal = (event) => {
    setDeleteModal({ open: true, eventId: event.id, eventTitle: event.title });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, eventId: null, eventTitle: '' });
  };

  const confirmDelete = () => {
    setEvents((prev) => prev.filter((ev) => ev.id !== deleteModal.eventId));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteModal.eventId));
    closeDeleteModal();
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const exportPDF = () => alert('Export as PDF');
  const exportExcel = () => alert('Export as Excel');

  // Helper to get label color class (though we store it, but for form we need mapping)
  const labelColorMap = {
    Personal: 'bg-success-600',
    Business: 'bg-primary-600',
    Family: 'bg-warning-600',
    Important: 'bg-lilac-600',
    Holiday: 'bg-danger-600',
  };

  return (
    <div className="dashboard-main-body">
      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Events</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Events</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={openAddDrawer}
        >
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>
          Add Event
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
                          checked={paginatedEvents.length > 0 && selectedIds.length === paginatedEvents.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Title</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Label</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedEvents.map((ev, index) => {
                    const isSelected = selectedIds.includes(ev.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <tr key={ev.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(ev.id)}
                            />
                            <label className="form-check-label">{sl.toString().padStart(2, '0')}</label>
                          </div>
                        </td>
                        <td>{ev.title}</td>
                        <td>{ev.startDate}</td>
                        <td>{ev.endDate}</td>
                        <td>
                          <span className={`${ev.labelColor} px-3 py-1 rounded-pill text-white text-sm`}>
                            {ev.label}
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
                                  onClick={() => openViewModal(ev)}
                                >
                                  <i className="ri-eye-line"></i> View
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openEditDrawer(ev)}
                                >
                                  <i className="ri-edit-2-line"></i> Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openDeleteModal(ev)}
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
                  {paginatedEvents.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-20">
                        No events found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredEvents.length > 0 && (
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

      {/* Add Event Drawer */}
      <SlideDrawer
        isOpen={addDrawerOpen}
        onClose={closeAddDrawer}
        title="Add New Event"
      >
        <form onSubmit={handleAddSubmit} className="p-20">
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="eventTitle" className="form-label fw-semibold text-primary-light text-sm mb-8">
                Event Title
              </label>
              <input
                type="text"
                className="form-control radius-8"
                id="eventTitle"
                name="title"
                placeholder="Enter Event Title"
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="startDate" className="form-label fw-semibold text-primary-light text-sm mb-8">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                className="form-control radius-8"
                id="startDate"
                name="startDate"
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="endDate" className="form-label fw-semibold text-primary-light text-sm mb-8">
                End Date & Time
              </label>
              <input
                type="datetime-local"
                className="form-control radius-8"
                id="endDate"
                name="endDate"
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold text-primary-light text-sm mb-8">Label</label>
              <div className="d-flex align-items-center flex-wrap gap-28">
                {['Personal', 'Business', 'Family', 'Important', 'Holiday'].map((label) => (
                  <div key={label} className="form-check d-flex align-items-center gap-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="label"
                      id={`label-${label}`}
                      value={label}
                      required
                    />
                    <label
                      className="form-check-label line-height-1 fw-medium text-secondary-light text-sm d-flex align-items-center gap-1"
                      htmlFor={`label-${label}`}
                    >
                      <span className={`w-8-px h-8-px ${labelColorMap[label]} rounded-circle`}></span>
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="description" className="form-label fw-semibold text-primary-light text-sm mb-8">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="4"
                placeholder="Write some text"
              ></textarea>
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

      {/* Edit Event Drawer */}
      <SlideDrawer
        isOpen={editDrawerOpen}
        onClose={closeEditDrawer}
        title="Edit Event"
      >
        <form onSubmit={handleEditSubmit} className="p-20">
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="eventTitleEdit" className="form-label fw-semibold text-primary-light text-sm mb-8">
                Event Title
              </label>
              <input
                type="text"
                className="form-control radius-8"
                id="eventTitleEdit"
                name="title"
                defaultValue={editingEvent?.title || ''}
                placeholder="Enter Event Title"
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="startDateEdit" className="form-label fw-semibold text-primary-light text-sm mb-8">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                className="form-control radius-8"
                id="startDateEdit"
                name="startDate"
                defaultValue={editingEvent?.startDate ? new Date(editingEvent.startDate).toISOString().slice(0, 16) : ''}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="endDateEdit" className="form-label fw-semibold text-primary-light text-sm mb-8">
                End Date & Time
              </label>
              <input
                type="datetime-local"
                className="form-control radius-8"
                id="endDateEdit"
                name="endDate"
                defaultValue={editingEvent?.endDate ? new Date(editingEvent.endDate).toISOString().slice(0, 16) : ''}
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label fw-semibold text-primary-light text-sm mb-8">Label</label>
              <div className="d-flex align-items-center flex-wrap gap-28">
                {['Personal', 'Business', 'Family', 'Important', 'Holiday'].map((label) => (
                  <div key={label} className="form-check d-flex align-items-center gap-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="label"
                      id={`labelEdit-${label}`}
                      value={label}
                      defaultChecked={editingEvent?.label === label}
                      required
                    />
                    <label
                      className="form-check-label line-height-1 fw-medium text-secondary-light text-sm d-flex align-items-center gap-1"
                      htmlFor={`labelEdit-${label}`}
                    >
                      <span className={`w-8-px h-8-px ${labelColorMap[label]} rounded-circle`}></span>
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="descriptionEdit" className="form-label fw-semibold text-primary-light text-sm mb-8">
                Description
              </label>
              <textarea
                className="form-control"
                id="descriptionEdit"
                name="description"
                rows="4"
                defaultValue={editingEvent?.description || ''}
                placeholder="Write some text"
              ></textarea>
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

      {/* View Modal */}
      <Modal show={viewModalOpen} onHide={closeViewModal} centered size="lg">
        <Modal.Header closeButton className="py-16 px-24 border-bottom">
          <Modal.Title className="fs-5">View Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-24">
          {selectedEvent && (
            <>
              <div className="mb-12">
                <span className="text-secondary-light txt-sm fw-medium">Title</span>
                <h6 className="text-primary-light fw-semibold text-md mb-0 mt-4">{selectedEvent.title}</h6>
              </div>
              <div className="mb-12">
                <span className="text-secondary-light txt-sm fw-medium">Start Date</span>
                <h6 className="text-primary-light fw-semibold text-md mb-0 mt-4">{selectedEvent.startDate}</h6>
              </div>
              <div className="mb-12">
                <span className="text-secondary-light txt-sm fw-medium">End Date</span>
                <h6 className="text-primary-light fw-semibold text-md mb-0 mt-4">{selectedEvent.endDate}</h6>
              </div>
              <div className="mb-12">
                <span className="text-secondary-light txt-sm fw-medium">Description</span>
                <h6 className="text-primary-light fw-semibold text-md mb-0 mt-4">{selectedEvent.description || 'N/A'}</h6>
              </div>
              <div className="mb-12">
                <span className="text-secondary-light txt-sm fw-medium">Label</span>
                <h6 className="text-primary-light fw-semibold text-md mb-0 mt-4 d-flex align-items-center gap-2">
                  <span className={`w-8-px h-8-px ${selectedEvent.labelColor} rounded-circle`}></span>
                  {selectedEvent.label}
                </h6>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title={`Delete Event`}
        message={`Are you sure you want to delete "${deleteModal.eventTitle}"?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />
    </div>
  );
};

export default Event;