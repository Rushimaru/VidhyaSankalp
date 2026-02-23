import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import SlideDrawer from '../../components/Slidedrawer';

// Sample fees data (matching HTML)
const initialFees = [
  { id: 1, admissionNo: 'AD52365', name: 'Kathryn Murphy', image: 'avatar-img1.png', rollNo: '12', className: 'Class 1 (A)', amount: '$700.50', paid: '$700.50', due: '$0', date: '12 May 2025', status: 'Paid' },
  { id: 2, admissionNo: 'AD52365', name: 'Kathryn Murphy', image: 'avatar-img1.png', rollNo: '12', className: 'Class 1 (A)', amount: '$700.50', paid: '$700.50', due: '$0', date: '12 May 2025', status: 'Paid' },
  { id: 3, admissionNo: 'AD52366', name: 'Jerome Bell', image: 'avatar-img2.png', rollNo: '08', className: 'Class 2 (B)', amount: '$850.00', paid: '$450.00', due: '$400.00', date: '10 May 2025', status: 'Partial' },
  { id: 4, admissionNo: 'AD52367', name: 'Theresa Webb', image: 'avatar-img3.png', rollNo: '19', className: 'Class 3 (A)', amount: '$920.75', paid: '$0', due: '$920.75', date: '08 May 2025', status: 'Unpaid' },
  { id: 5, admissionNo: 'AD52368', name: 'Cody Fisher', image: 'avatar-img4.png', rollNo: '10', className: 'Class 4 (C)', amount: '$750.00', paid: '$750.00', due: '$0', date: '05 May 2025', status: 'Paid' },
  { id: 6, admissionNo: 'AD52369', name: 'Annette Black', image: 'avatar-img5.png', rollNo: '16', className: 'Class 5 (B)', amount: '$630.20', paid: '$500.00', due: '$130.20', date: '03 May 2025', status: 'Partial' },
  { id: 7, admissionNo: 'AD52370', name: 'Jenny Wilson', image: 'avatar-img6.png', rollNo: '09', className: 'Class 6 (A)', amount: '$800.00', paid: '$800.00', due: '$0', date: '01 May 2025', status: 'Paid' },
  { id: 8, admissionNo: 'AD52371', name: 'Darlene Robertson', image: 'avatar-img7.png', rollNo: '11', className: 'Class 7 (A)', amount: '$950.00', paid: '$400.00', due: '$550.00', date: '28 Apr 2025', status: 'Partial' },
  { id: 9, admissionNo: 'AD52372', name: 'Wade Warren', image: 'avatar-img8.png', rollNo: '18', className: 'Class 8 (B)', amount: '$880.00', paid: '$880.00', due: '$0', date: '25 Apr 2025', status: 'Paid' },
  { id: 10, admissionNo: 'AD52373', name: 'Esther Howard', image: 'avatar-img9.png', rollNo: '13', className: 'Class 9 (C)', amount: '$990.00', paid: '$0', due: '$990.00', date: '22 Apr 2025', status: 'Unpaid' },
  { id: 11, admissionNo: 'AD52374', name: 'Guy Hawkins', image: 'avatar-img10.png', rollNo: '15', className: 'Class 10 (A)', amount: '$1020.00', paid: '$1020.00', due: '$0', date: '20 Apr 2025', status: 'Paid' },
];

const FeesCollect = () => {
  // ---------- State ----------
  const [fees, setFees] = useState(initialFees);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    class: '',
    section: '',
    gender: '',
    status: '',
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Payslip modal state
  const [showPayslip, setShowPayslip] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  // ---------- Filtered data ----------
  const filteredFees = useMemo(() => {
    return fees.filter((item) => {
      // Search
      const matchesSearch =
        search === '' ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.admissionNo.toLowerCase().includes(search.toLowerCase()) ||
        item.className.toLowerCase().includes(search.toLowerCase());

      // Filters (simplified – you can expand based on actual data)
      const matchesClass = filters.class === '' || item.className.includes(filters.class);
      const matchesStatus = filters.status === '' || item.status === filters.status;

      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [fees, search, filters]);

  const paginatedFees = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredFees.slice(start, start + rowsPerPage);
  }, [filteredFees, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredFees.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ class: '', section: '', gender: '', status: '' });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedFees.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const exportPDF = () => alert('Export as PDF');
  const exportExcel = () => alert('Export as Excel');

  const handleViewDetails = (fee) => {
    setSelectedFee(fee);
    setShowPayslip(true);
  };

  const handleCollectFeesSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (API call)
    alert('Fees collected (demo)');
    setDrawerOpen(false);
  };

  // Helper for status badge
  const getStatusClass = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-success-100 text-success-600';
      case 'Partial':
        return 'bg-warning-100 text-warning-600';
      case 'Unpaid':
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
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Fees Collect</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Fees Collect</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={() => setDrawerOpen(true)}
        >
          <span className="d-flex text-md"><i className="ri-wallet-3-line"></i></span>
          Collect Fees
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

                {/* Filter Dropdown */}
                <div className="dropdown">
                  <button
                    type="button"
                    className="px-12 py-5-px border border-neutral-300 radius-8 d-flex align-items-center gap-20"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="d-flex align-items-center gap-1 text-secondary-light text-sm">Filter</span>
                    <span><i className="ri-arrow-down-s-line"></i></span>
                  </button>
                  <div className="dropdown-menu border bg-base shadow dropdown-menu-lg p-0">
                    <div className="d-flex align-items-center justify-content-between border-bottom py-8 px-16">
                      <span className="fw-semibold text-lg text-primary-light">Filter</span>
                      <button type="button" onClick={() => document.activeElement?.blur()}>
                        <i className="ri-close-large-line"></i>
                      </button>
                    </div>

                    <form className="p-16 d-grid grid-cols-2 gap-16" onSubmit={(e) => e.preventDefault()}>
                      <div>
                        <label htmlFor="class" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                          Class
                        </label>
                        <select
                          id="class"
                          className="form-control form-select"
                          value={filters.class}
                          onChange={handleFilterChange}
                        >
                          <option value="">Select Class</option>
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
                      <div>
                        <label htmlFor="section" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                          Section
                        </label>
                        <select
                          id="section"
                          className="form-control form-select"
                          value={filters.section}
                          onChange={handleFilterChange}
                        >
                          <option value="">Select Section</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="gender" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                          Gender
                        </label>
                        <select
                          id="gender"
                          className="form-control form-select"
                          value={filters.gender}
                          onChange={handleFilterChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="status" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                          Status
                        </label>
                        <select
                          id="status"
                          className="form-control form-select"
                          value={filters.status}
                          onChange={handleFilterChange}
                        >
                          <option value="">Select Status</option>
                          <option value="Paid">Paid</option>
                          <option value="Partial">Partial</option>
                          <option value="Unpaid">Unpaid</option>
                        </select>
                      </div>
                      <div>
                        <button type="reset" className="btn btn-danger-200 text-danger-600 w-100" onClick={resetFilters}>
                          Reset
                        </button>
                      </div>
                      <div>
                        <button type="submit" className="btn btn-primary-600 w-100">
                          Apply
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
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
                          checked={paginatedFees.length > 0 && selectedIds.length === paginatedFees.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Admission No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Roll No</th>
                    <th scope="col">Class</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Paid</th>
                    <th scope="col">Due</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedFees.map((fee, index) => {
                    const isSelected = selectedIds.includes(fee.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <tr key={fee.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(fee.id)}
                            />
                            <label className="form-check-label">{sl.toString().padStart(2, '0')}</label>
                          </div>
                        </td>
                        <td>
                          <span className="text-primary-600">{fee.admissionNo}</span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={`/../src/assets/images/thumbs/${fee.image}`}
                              alt={fee.name}
                              className="flex-shrink-0 me-12 radius-8"
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            />
                            <div>
                              <h6 className="text-md mb-0 fw-medium">{fee.name}</h6>
                            </div>
                          </div>
                        </td>
                        <td>{fee.rollNo}</td>
                        <td>{fee.className}</td>
                        <td>{fee.amount}</td>
                        <td>{fee.paid}</td>
                        <td>{fee.due}</td>
                        <td>{fee.date}</td>
                        <td>
                          <span className={`${getStatusClass(fee.status)} px-16 py-2 radius-4 fw-medium text-sm`}>
                            {fee.status}
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
                                  onClick={() => handleViewDetails(fee)}
                                >
                                  <i className="ri-eye-line"></i> View Details
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {paginatedFees.length === 0 && (
                    <tr>
                      <td colSpan="11" className="text-center py-20">
                        No fees records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredFees.length > 0 && (
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

      {/* Collect Fees Drawer */}
      <SlideDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Collect Fees"
      >
        <form onSubmit={handleCollectFeesSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="className" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Class
              </label>
              <select id="className" name="className" className="form-control form-select" required>
                <option value="" disabled selected>Select a class</option>
                <option value="One">One</option>
                <option value="Two">Two</option>
                <option value="Three">Three</option>
                <option value="Four">Four</option>
                <option value="Five">Five</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="section" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Section
              </label>
              <select id="section" name="section" className="form-control form-select" required>
                <option value="" disabled selected>Select a Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="rollNo" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Roll No
              </label>
              <input type="text" className="form-control" id="rollNo" name="rollNo" placeholder="Enter roll no." required />
            </div>
            <div className="col-sm-6">
              <label htmlFor="collectDate" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Date
              </label>
              <input type="date" className="form-control" id="collectDate" name="collectDate" required />
            </div>
            <div className="col-sm-6">
              <div className="d-flex align-items-center justify-content-between gap-4">
                <label htmlFor="collectAmount" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                  Amount
                </label>
                <span className="text-sm fw-semibold text-warning-600">Due: 2000</span>
              </div>
              <input type="text" className="form-control" id="collectAmount" name="collectAmount" placeholder="$1500" required />
            </div>
            <div className="col-sm-6">
              <label htmlFor="colDiscount" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Discount
              </label>
              <select id="colDiscount" name="colDiscount" className="form-control form-select">
                <option value="" disabled selected>Select a Discount</option>
                <option value="10%">10%</option>
                <option value="20%">20%</option>
                <option value="30%">30%</option>
                <option value="50%">50%</option>
              </select>
            </div>
            <div className="col-sm-12">
              <label htmlFor="paymentType" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Payment Type
              </label>
              <select id="paymentType" name="paymentType" className="form-control form-select" required>
                <option value="Cash">Cash</option>
                <option value="bKash">bKash</option>
                <option value="Bank">Bank</option>
              </select>
            </div>
            <div className="col-sm-12">
              <label htmlFor="noteType" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Note
              </label>
              <textarea className="form-control" id="noteType" name="note" placeholder="Enter note..." rows="3"></textarea>
            </div>
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-center gap-3 mt-8">
                <button type="button" className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-50 py-11 radius-8" onClick={() => setDrawerOpen(false)}>
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

      {/* Payslip Modal */}
      <Modal show={showPayslip} onHide={() => setShowPaislip(false)} centered dialogClassName="max-w-600-px">
        <Modal.Body className="p-24">
          <div className="text-center">
            <h6 className="mb-0">School Name</h6>
            <p className="text-secondary-light">Smithbroand, Unit 4, Holler Tower, San Diego</p>
          </div>
          <div className="d-flex align-items-center justify-content-between gap-20 flex-wrap mt-24">
            <div className="d-flex flex-column">
              <div className="text-sm fw-medium d-flex">
                <span className="text-primary-light w-110-px text-start">Student Name</span>
                <span className="text-primary-light">: {selectedFee?.name || 'Jon Deve'}</span>
              </div>
              <div className="text-sm fw-medium d-flex">
                <span className="text-primary-light w-110-px text-start">Class</span>
                <span className="text-primary-light">: {selectedFee?.className || '5 (A)'}</span>
              </div>
              <div className="text-sm fw-medium d-flex">
                <span className="text-primary-light w-110-px text-start">Roll No.</span>
                <span className="text-primary-light">: {selectedFee?.rollNo || '10'}</span>
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="text-sm fw-medium d-flex">
                <span className="text-primary-light text-start">Date: {selectedFee?.date || '15 Jan 2025'}</span>
              </div>
              <div className="text-sm fw-medium d-flex">
                <span className="text-primary-light text-start">Collected By: Admin</span>
              </div>
              <div className="text-sm fw-medium d-flex">
                <span className="text-primary-light text-start">Payment By: Bank</span>
              </div>
            </div>
          </div>
          <ul className="border mt-24 radius-8 overflow-hidden">
            <li className="py-10 px-20 d-flex align-items-center justify-content-between gap-20 bg-neutral-50 border-bottom">
              <span className="text-primary-light fw-semibold">Amount</span>
              <span className="text-primary-light fw-semibold">Paid</span>
              <span className="text-primary-light fw-semibold">Balance</span>
            </li>
            <li className="py-10 px-20 d-flex align-items-center justify-content-between gap-20">
              <span className="text-primary-light">{selectedFee?.amount?.replace('$', '') || '2500'}</span>
              <span className="text-primary-light">{selectedFee?.paid || '$1500'}</span>
              <span className="text-primary-light">{selectedFee?.due || '$500'}</span>
            </li>
          </ul>
          <div className="text-center mt-100-px">
            <h6 className="text-xl mb-4">Thanks</h6>
            <p className="text-secondary-light text-sm mb-0">This receipt is computer generated hence on signature is required</p>
          </div>
          <div className="text-center mt-100-px">
            <p className="text-secondary-light text-sm mb-0">Made by <span className="fw-semibold">Wowtheme7.</span></p>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-secondary" onClick={() => setShowPayslip(false)}>Close</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FeesCollect;