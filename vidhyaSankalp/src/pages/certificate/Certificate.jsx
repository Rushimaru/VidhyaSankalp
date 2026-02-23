import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import SlideDrawer from '../../components/Slidedrawer';
import ConfirmModal from '../../components/ConfirmModal';

// Sample certificate data (matching HTML rows)
const initialCertificates = [
  { id: 1, name: 'Marvin McKinney', image: 'avatar-img1.png', rollNo: '12', className: 'Class 1 (A)', certificateName: 'Transfer Certificate', backgroundImage: 'background-img.png' },
  { id: 2, name: 'Kathryn Murphy', image: 'avatar-img2.png', rollNo: '18', className: 'Class 2 (B)', certificateName: 'Character Certificate', backgroundImage: 'background-img.png' },
  { id: 3, name: 'Devon Lane', image: 'avatar-img3.png', rollNo: '21', className: 'Class 3 (A)', certificateName: 'Sports Achievement Certificate', backgroundImage: 'background-img.png' },
  { id: 4, name: 'Cody Fisher', image: 'avatar-img4.png', rollNo: '9', className: 'Class 4 (C)', certificateName: 'Merit Certificate', backgroundImage: 'background-img.png' },
  { id: 5, name: 'Theresa Webb', image: 'avatar-img5.png', rollNo: '15', className: 'Class 5 (B)', certificateName: 'Attendance Certificate', backgroundImage: 'background-img.png' },
  { id: 6, name: 'Darrell Steward', image: 'avatar-img6.png', rollNo: '5', className: 'Class 6 (A)', certificateName: 'Scholarship Certificate', backgroundImage: 'background-img.png' },
  { id: 7, name: 'Leslie Alexander', image: 'avatar-img7.png', rollNo: '11', className: 'Class 7 (B)', certificateName: 'Excellence Certificate', backgroundImage: 'background-img.png' },
  { id: 8, name: 'Guy Hawkins', image: 'avatar-img8.png', rollNo: '17', className: 'Class 8 (A)', certificateName: 'Science Fair Certificate', backgroundImage: 'background-img.png' },
  { id: 9, name: 'Brooklyn Simmons', image: 'avatar-img9.png', rollNo: '22', className: 'Class 9 (C)', certificateName: 'Best Student Award', backgroundImage: 'background-img.png' },
  { id: 10, name: 'Kristin Watson', image: 'avatar-img10.png', rollNo: '19', className: 'Class 10 (A)', certificateName: 'Completion Certificate', backgroundImage: 'background-img.png' },
];

const Certificate = () => {
  // ---------- State ----------
  const [certificates, setCertificates] = useState(initialCertificates);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer states
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);

  // View modal state
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewCertificate, setViewCertificate] = useState(null);

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, certId: null, certName: '' });

  // ---------- Filtered data ----------
  const filteredCertificates = useMemo(() => {
    return certificates.filter((cert) =>
      cert.name.toLowerCase().includes(search.toLowerCase()) ||
      cert.certificateName.toLowerCase().includes(search.toLowerCase())
    );
  }, [certificates, search]);

  const paginatedCertificates = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredCertificates.slice(start, start + rowsPerPage);
  }, [filteredCertificates, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredCertificates.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedCertificates.map((c) => c.id));
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
    setEditingCertificate(null);
    setAddDrawerOpen(true);
  };

  const openEditDrawer = (cert) => {
    setEditingCertificate(cert);
    setEditDrawerOpen(true);
  };

  const closeAddDrawer = () => setAddDrawerOpen(false);
  const closeEditDrawer = () => {
    setEditDrawerOpen(false);
    setEditingCertificate(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const certificateName = formData.get('certificateName');
    const className = formData.get('class');
    const section = formData.get('section');
    const student = formData.get('student');
    const date = formData.get('date');
    const footerLeft = formData.get('footerLeft');
    const footerRight = formData.get('footerRight');
    const studentPhoto = formData.get('studentPhoto'); // file

    // In a real app, you'd send this to an API
    // For demo, create a new certificate entry
    const newId = Math.max(...certificates.map((c) => c.id), 0) + 1;
    const newCert = {
      id: newId,
      name: student, // placeholder – you'd fetch student name from selection
      image: 'avatar-img1.png', // placeholder
      rollNo: '?',
      className: `${className} (${section})`,
      certificateName,
      backgroundImage: 'background-img.png',
    };
    setCertificates([...certificates, newCert]);
    closeAddDrawer();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const certificateName = formData.get('certificateName');
    const className = formData.get('class');
    const section = formData.get('section');
    const student = formData.get('student');
    const date = formData.get('date');
    const footerLeft = formData.get('footerLeft');
    const footerRight = formData.get('footerRight');
    const studentPhoto = formData.get('studentPhoto');

    if (editingCertificate) {
      setCertificates((prev) =>
        prev.map((c) =>
          c.id === editingCertificate.id
            ? {
                ...c,
                certificateName,
                className: `${className} (${section})`,
                // other fields would be updated in a real app
              }
            : c
        )
      );
    }
    closeEditDrawer();
  };

  const openViewModal = (cert) => {
    setViewCertificate(cert);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setViewCertificate(null);
  };

  const openDeleteModal = (cert) => {
    setDeleteModal({ open: true, certId: cert.id, certName: cert.name });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, certId: null, certName: '' });
  };

  const confirmDelete = () => {
    setCertificates((prev) => prev.filter((c) => c.id !== deleteModal.certId));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteModal.certId));
    closeDeleteModal();
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const exportPDF = () => alert('Export as PDF');
  const exportExcel = () => alert('Export as Excel');
  const handlePrint = (cert) => alert(`Print certificate for ${cert.name}`);

  return (
    <div className="dashboard-main-body">
      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Certificate</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Certificate</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={openAddDrawer}
        >
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>
          Add Certificate
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
                          checked={paginatedCertificates.length > 0 && selectedIds.length === paginatedCertificates.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col">Class</th>
                    <th scope="col">Certificate Name</th>
                    <th scope="col">Background Image</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCertificates.map((cert, index) => {
                    const isSelected = selectedIds.includes(cert.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <tr key={cert.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(cert.id)}
                            />
                            <label className="form-check-label">{sl.toString().padStart(2, '0')}</label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center flex-grow-1">
                            <img
                              src={`/../src/assets/images/thumbs/${cert.image}`}
                              alt={cert.name}
                              className="flex-shrink-0 me-12 radius-8"
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            />
                            <div>
                              <h6 className="text-md mb-0 fw-medium">{cert.name}</h6>
                              <span>Roll No: <span className="fw-semibold">{cert.rollNo}</span></span>
                            </div>
                          </div>
                        </td>
                        <td>{cert.className}</td>
                        <td>{cert.certificateName}</td>
                        <td>
                          <img
                            src={`/../src/assets/images/thumbs/${cert.backgroundImage}`}
                            alt="bg"
                            style={{ width: '50px', height: '30px', objectFit: 'cover' }}
                          />
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
                                  onClick={() => openViewModal(cert)}
                                >
                                  <i className="ri-eye-line"></i> View
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => handlePrint(cert)}
                                >
                                  <i className="ri-printer-line"></i> Print
                                </button>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openEditDrawer(cert)}
                                >
                                  <i className="ri-edit-2-line"></i> Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openDeleteModal(cert)}
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
                  {paginatedCertificates.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-20">
                        No certificates found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredCertificates.length > 0 && (
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

      {/* Add Certificate Drawer */}
      <SlideDrawer
        isOpen={addDrawerOpen}
        onClose={closeAddDrawer}
        title="Add New Certificate"
      >
        <form onSubmit={handleAddSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="certificateName" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Certificate Name
              </label>
              <input
                type="text"
                className="form-control"
                id="certificateName"
                name="certificateName"
                placeholder="Enter certificate name"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="class" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Class
              </label>
              <select id="class" name="class" className="form-control form-select" required>
                <option value="" disabled selected>Select Class</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="section" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Section
              </label>
              <select id="section" name="section" className="form-control form-select" required>
                <option value="" disabled selected>Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="student" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Student
              </label>
              <select id="student" name="student" className="form-control form-select" required>
                <option value="" disabled selected>Select Student</option>
                <option value="Marvin McKinney">Marvin McKinney</option>
                <option value="Kathryn Murphy">Kathryn Murphy</option>
                <option value="Devon Lane">Devon Lane</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="date" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Date
              </label>
              <input type="date" className="form-control" id="date" name="date" required />
            </div>
            <div className="col-sm-6">
              <label htmlFor="footerLeft" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Footer Left Text
              </label>
              <input type="text" className="form-control" id="footerLeft" name="footerLeft" placeholder="Enter footer left text" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="footerRight" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Footer Right Text
              </label>
              <input type="text" className="form-control" id="footerRight" name="footerRight" placeholder="Enter footer right text" />
            </div>
            <div className="col-sm-6">
              <label className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Student Photo <span className="text-danger-600">*</span>
              </label>
              <div className="drop-zone height-44-px p-4 d-flex justify-content-center align-items-center text-center fw-medium text-md cursor-pointer border border-neutral-400 radius-8 border-dashed bg-hover-neutral-200">
                <span className="drop-zone__prompt">Drag & drop a file here or click</span>
                <input type="file" name="studentPhoto" className="drop-zone__input" onChange={(e) => {}} />
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-center gap-3 mt-8">
                <button type="button" className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-50 py-11 radius-8" onClick={closeAddDrawer}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary-600 border border-primary-600 text-md px-28 py-12 radius-8">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </SlideDrawer>

      {/* Edit Certificate Drawer */}
      <SlideDrawer
        isOpen={editDrawerOpen}
        onClose={closeEditDrawer}
        title="Edit Certificate"
      >
        <form onSubmit={handleEditSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="certificateNameEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Certificate Name
              </label>
              <input
                type="text"
                className="form-control"
                id="certificateNameEdit"
                name="certificateName"
                defaultValue={editingCertificate?.certificateName || ''}
                placeholder="Enter certificate name"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="classEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Class
              </label>
              <select id="classEdit" name="class" className="form-control form-select" defaultValue={editingCertificate?.className?.split(' ')[1] || ''} required>
                <option value="" disabled>Select Class</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
                <option value="Class 4">Class 4</option>
                <option value="Class 5">Class 5</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="sectionEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Section
              </label>
              <select id="sectionEdit" name="section" className="form-control form-select" defaultValue={editingCertificate?.className?.match(/\(([^)]+)\)/)?.[1] || ''} required>
                <option value="" disabled>Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="studentEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Student
              </label>
              <select id="studentEdit" name="student" className="form-control form-select" defaultValue={editingCertificate?.name || ''} required>
                <option value="" disabled>Select Student</option>
                <option value="Marvin McKinney">Marvin McKinney</option>
                <option value="Kathryn Murphy">Kathryn Murphy</option>
                <option value="Devon Lane">Devon Lane</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="dateEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Date
              </label>
              <input type="date" className="form-control" id="dateEdit" name="date" defaultValue="" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="footerLeftEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Footer Left Text
              </label>
              <input type="text" className="form-control" id="footerLeftEdit" name="footerLeft" defaultValue="" placeholder="Enter footer left text" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="footerRightEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Footer Right Text
              </label>
              <input type="text" className="form-control" id="footerRightEdit" name="footerRight" defaultValue="" placeholder="Enter footer right text" />
            </div>
            <div className="col-sm-6">
              <label className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Student Photo <span className="text-danger-600">*</span>
              </label>
              <div className="drop-zone height-44-px p-4 d-flex justify-content-center align-items-center text-center fw-medium text-md cursor-pointer border border-neutral-400 radius-8 border-dashed bg-hover-neutral-200">
                <span className="drop-zone__prompt">Drag & drop a file here or click</span>
                <input type="file" name="studentPhoto" className="drop-zone__input" />
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-center gap-3 mt-8">
                <button type="button" className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-50 py-11 radius-8" onClick={closeEditDrawer}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary-600 border border-primary-600 text-md px-28 py-12 radius-8">
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      </SlideDrawer>

      {/* View Certificate Modal */}
      <Modal show={viewModalOpen} onHide={closeViewModal} centered size="lg">
        <Modal.Body className="p-0">
          <div className="text-end mb-16">
            <button type="button" className="btn-close" onClick={closeViewModal} aria-label="Close"></button>
          </div>
          <img
            src="/../src/assets/images/thumbs/certificate-img.png"
            alt="Certificate"
            className="w-100"
          />
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title={`Delete Certificate`}
        message={`Are you sure you want to delete the certificate for ${deleteModal.certName}?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />
    </div>
  );
};

export default Certificate;