import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import SlideDrawer from '../../components/Slidedrawer';

// Sample payroll data (matching HTML rows)
const initialPayroll = [
  { id: 1, employeeId: 'AD52365', name: 'Marvin McKinney', image: 'teacher-avatar-img1.png', department: 'English Department', designation: 'Principal', paymentMethod: 'Bank', netSalary: '$5,000', status: 'Paid' },
  { id: 2, employeeId: 'AD52366', name: 'Courtney Henry', image: 'teacher-avatar-img2.png', department: 'Mathematics Department', designation: 'Vice Principal', paymentMethod: 'Cash', netSalary: '$4,200', status: 'Pending' },
  { id: 3, employeeId: 'AD52367', name: 'Ralph Edwards', image: 'teacher-avatar-img3.png', department: 'Science Department', designation: 'Lecturer', paymentMethod: 'Bank', netSalary: '$3,500', status: 'Paid' },
  { id: 4, employeeId: 'AD52368', name: 'Annette Black', image: 'teacher-avatar-img4.png', department: 'IT Department', designation: 'Software Engineer', paymentMethod: 'Bank', netSalary: '$4,800', status: 'Paid' },
  { id: 5, employeeId: 'AD52369', name: 'Theresa Webb', image: 'teacher-avatar-img5.png', department: 'Administration', designation: 'Office Manager', paymentMethod: 'Cheque', netSalary: '$3,200', status: 'Unpaid' },
  { id: 6, employeeId: 'AD52370', name: 'Jacob Jones', image: 'teacher-avatar-img6.png', department: 'Finance Department', designation: 'Accountant', paymentMethod: 'Bank', netSalary: '$4,000', status: 'Paid' },
  { id: 7, employeeId: 'AD52371', name: 'Kathryn Murphy', image: 'teacher-avatar-img7.png', department: 'Human Resources', designation: 'HR Manager', paymentMethod: 'Bank', netSalary: '$4,600', status: 'Paid' },
  { id: 8, employeeId: 'AD52372', name: 'Esther Howard', image: 'teacher-avatar-img8.png', department: 'Marketing Department', designation: 'Marketing Executive', paymentMethod: 'Cash', netSalary: '$3,700', status: 'Pending' },
  { id: 9, employeeId: 'AD52373', name: 'Floyd Miles', image: 'teacher-avatar-img9.png', department: 'Library Department', designation: 'Librarian', paymentMethod: 'Cheque', netSalary: '$3,000', status: 'Unpaid' },
  { id: 10, employeeId: 'AD52374', name: 'Jane Cooper', image: 'teacher-avatar-img4.png', department: 'Support Department', designation: 'Office Assistant', paymentMethod: 'Cash', netSalary: '$2,500', status: 'Pending' },
  // extra for pagination demo
  { id: 11, employeeId: 'AD52375', name: 'Devon Lane', image: 'teacher-avatar-img6.png', department: 'IT Department', designation: 'Developer', paymentMethod: 'Bank', netSalary: '$4,200', status: 'Paid' },
  { id: 12, employeeId: 'AD52376', name: 'Leslie Alexander', image: 'teacher-avatar-img8.png', department: 'Marketing', designation: 'Manager', paymentMethod: 'Bank', netSalary: '$4,900', status: 'Pending' },
];

const Payroll = () => {
  // ---------- State ----------
  const [payroll, setPayroll] = useState(initialPayroll);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer state for adding new payroll
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);

  // Payslip modal state
  const [showPayslip, setShowPayslip] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  // Filter dropdown state (UI only)
  const [filters, setFilters] = useState({
    subject: '',
    status: '',
  });

  // ---------- Filtered data ----------
  const filteredPayroll = useMemo(() => {
    return payroll.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      item.department.toLowerCase().includes(search.toLowerCase())
    );
  }, [payroll, search]);

  const paginatedPayroll = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredPayroll.slice(start, start + rowsPerPage);
  }, [filteredPayroll, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredPayroll.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedPayroll.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  const resetFilters = () => {
    setFilters({ subject: '', status: '' });
  };

  const openAddDrawer = () => setAddDrawerOpen(true);
  const closeAddDrawer = () => setAddDrawerOpen(false);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const employeeName = formData.get('employeeName');
    const amount = formData.get('amount');
    const month = formData.get('month');
    const paymentType = formData.get('paymentType');
    const date = formData.get('date');
    const description = formData.get('description');

    // In a real app, you'd send to API and get a new record
    const newId = Math.max(...payroll.map((p) => p.id), 0) + 1;
    const newPayroll = {
      id: newId,
      employeeId: `EMP${newId}`,
      name: employeeName,
      image: 'teacher-avatar-img1.png', // placeholder
      department: 'New Department',
      designation: 'New Designation',
      paymentMethod: paymentType,
      netSalary: `$${amount}`,
      status: 'Pending',
    };
    setPayroll([...payroll, newPayroll]);
    closeAddDrawer();
  };

  const openPayslip = (item) => {
    setSelectedPayroll(item);
    setShowPayslip(true);
  };

  const closePayslip = () => {
    setShowPayslip(false);
    setSelectedPayroll(null);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const exportPDF = () => alert('Export as PDF');
  const exportExcel = () => alert('Export as Excel');

  // Helper for status badge
  const getStatusClass = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-success-100 text-success-600';
      case 'Pending':
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
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Payroll</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Payroll</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={openAddDrawer}
        >
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>
          Proceed to pay
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

                {/* Filter Dropdown (UI only) */}
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

                    <form className="p-16" onSubmit={(e) => e.preventDefault()}>
                      <div className="row g-3">
                        <div className="col-12">
                          <label htmlFor="subject" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                            Subject (placeholder)
                          </label>
                          <select
                            id="subject"
                            className="form-control form-select"
                            value={filters.subject}
                            onChange={handleFilterChange}
                          >
                            <option value="">Select Subject</option>
                            <option value="Match">Match</option>
                            <option value="English">English</option>
                            <option value="Bangla">Bangla</option>
                            <option value="Economics">Economics</option>
                            <option value="Physics">Physics</option>
                          </select>
                        </div>
                        <div className="col-12">
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
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                        <div className="col-6">
                          <button type="reset" className="btn btn-danger-200 text-danger-600 w-100" onClick={resetFilters}>
                            Reset
                          </button>
                        </div>
                        <div className="col-6">
                          <button type="submit" className="btn btn-primary-600 w-100">Apply</button>
                        </div>
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
                          checked={paginatedPayroll.length > 0 && selectedIds.length === paginatedPayroll.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Department</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Payment Method</th>
                    <th scope="col">Net Salary</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPayroll.map((item, index) => {
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
                        <td>
                          <span className="text-primary-600">{item.employeeId}</span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={`/../src/assets/images/thumbs/${item.image}`}
                              alt={item.name}
                              className="flex-shrink-0 me-12 radius-8"
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            />
                            <div>
                              <h6 className="text-md mb-0 fw-medium">{item.name}</h6>
                            </div>
                          </div>
                        </td>
                        <td>{item.department}</td>
                        <td>{item.designation}</td>
                        <td>{item.paymentMethod}</td>
                        <td>{item.netSalary}</td>
                        <td>
                          <span className={`${getStatusClass(item.status)} px-20 py-4 radius-4 fw-medium text-sm`}>
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="bg-neutral-200 bg-hover-neutral-300 text-neutral-600 px-20 py-4 radius-4 fw-medium text-sm"
                            onClick={() => openPayslip(item)}
                          >
                            View Payslip
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {paginatedPayroll.length === 0 && (
                    <tr>
                      <td colSpan="9" className="text-center py-20">
                        No payroll records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredPayroll.length > 0 && (
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

      {/* Add Payroll Drawer */}
      <SlideDrawer
        isOpen={addDrawerOpen}
        onClose={closeAddDrawer}
        title="Add Payroll"
      >
        <form onSubmit={handleAddSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="employeeName" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Employee Name
              </label>
              <input
                type="text"
                className="form-control"
                id="employeeName"
                name="employeeName"
                placeholder="Enter employee name"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="amount" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Payment Amount ($)
              </label>
              <input
                type="text"
                className="form-control"
                id="amount"
                name="amount"
                placeholder="Enter amount"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="month" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Month
              </label>
              <select
                id="month"
                name="month"
                className="form-control form-select"
                required
              >
                <option value="" disabled selected>Select Month</option>
                <option value="January 2026">January 2026</option>
                <option value="February 2026">February 2026</option>
                <option value="March 2026">March 2026</option>
                <option value="April 2026">April 2026</option>
                <option value="May 2026">May 2026</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="paymentType" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Payment Type
              </label>
              <select
                id="paymentType"
                name="paymentType"
                className="form-control form-select"
                required
              >
                <option value="" disabled selected>Select Payment Type</option>
                <option value="Cash">Cash</option>
                <option value="Bank">Bank</option>
                <option value="Card">Card</option>
              </select>
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

      {/* Payslip Modal */}
      <Modal show={showPayslip} onHide={closePayslip} centered size="lg">
        <Modal.Body className="p-24">
          <div className="text-center">
            <h6 className="mb-0">School Name</h6>
            <p className="text-secondary-light">Smithbroand, Unit 4, Holler Tower, San Diego</p>
          </div>
          <div className="d-flex align-items-center justify-content-between gap-20 flex-wrap mt-24">
            <div className="d-flex flex-column">
              <div className="text-sm fw-medium d-flex">
                <span className="text-primary-light w-110-px text-start">Invoice No</span>
                <span className="text-primary-light">: #{selectedPayroll?.employeeId || '5695'}</span>
              </div>
              <div className="text-sm fw-medium d-flex">
                <span className="text-primary-light w-110-px text-start">Employee Name</span>
                <span className="text-primary-light">: {selectedPayroll?.name || 'Jon Dan'}</span>
              </div>
              <div className="text-sm fw-medium d-flex">
                <span className="text-primary-light w-110-px text-start">Phone</span>
                <span className="text-primary-light">: +112515474</span>
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="text-sm fw-medium d-flex">
                <span className="text-primary-light text-start">Payslip</span>
              </div>
              <div className="text-sm fw-medium d-flex">
                <span className="text-secondary-light text-start">Month: January 2025</span>
              </div>
              <div className="text-sm fw-medium d-flex">
                <span className="text-secondary-light text-start">Payment: 15 Jan 2025</span>
              </div>
            </div>
          </div>
          <ul className="border mt-24 radius-8 overflow-hidden">
            <li className="py-10 px-20 d-flex align-items-center justify-content-between gap-20 bg-neutral-50 border-bottom">
              <span className="text-primary-light fw-semibold">Name</span>
              <span className="text-primary-light fw-semibold">Amount</span>
            </li>
            <li className="py-10 px-20 d-flex align-items-center justify-content-between gap-20 border-bottom">
              <span className="text-primary-light">Base Salary</span>
              <span className="text-primary-light">$2000</span>
            </li>
            <li className="py-10 px-20 d-flex align-items-center justify-content-between gap-20 border-bottom">
              <span className="text-primary-light">Overtime Pay</span>
              <span className="text-primary-light">$1000</span>
            </li>
            <li className="py-10 px-20 d-flex align-items-center justify-content-between gap-20 border-bottom">
              <span className="text-primary-light">Bonuses</span>
              <span className="text-primary-light">$2000</span>
            </li>
            <li className="py-10 px-20 d-flex align-items-center justify-content-between gap-20 border-bottom">
              <span className="text-primary-light">Gross Salary</span>
              <span className="text-primary-light">$5000</span>
            </li>
            <li className="py-10 px-20 d-flex align-items-center justify-content-between gap-20 bg-neutral-50">
              <span className="text-primary-light fw-semibold text-lg">Total</span>
              <span className="text-primary-light fw-semibold text-lg">{selectedPayroll?.netSalary || '$5000'}</span>
            </li>
          </ul>
          <div className="pt-28 ms-16 text-start">
            <p className="text-primary-light fw-medium mb-0">Payment type : {selectedPayroll?.paymentMethod || 'Bank'}</p>
          </div>
          <div className="text-center mt-100-px">
            <h6 className="text-xl mb-4">Thanks</h6>
            <p className="text-secondary-light text-sm mb-0">If you need further assistance, please feel free to contact HR at <span className="fw-semibold text-primary-light">Example school</span></p>
          </div>
          <div className="text-center mt-100-px">
            <p className="text-secondary-light text-sm mb-0">Made by <span className="fw-semibold">Wowtheme7.</span></p>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-secondary" onClick={closePayslip}>Close</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Payroll;