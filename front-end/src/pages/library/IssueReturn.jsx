import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SlideDrawer from '../../components/Slidedrawer';
import ConfirmModal from '../../components/ConfirmModal';

// Sample issue return data (matching HTML rows)
const initialIssues = [
  { id: 1, cardNo: '12563', issueTo: 'Jon Dev', className: 'Class 1 (A)', bookName: 'The Little Prince', number: '101', issueDate: '01 Jun 2015', returnDate: '01 Feb 2015' },
  { id: 2, cardNo: '12874', issueTo: 'Sarah Khan', className: 'Class 2 (B)', bookName: 'To Kill a Mockingbird', number: '102', issueDate: '10 Jul 2016', returnDate: '25 Jul 2016' },
  { id: 3, cardNo: '13345', issueTo: 'Michael Lee', className: 'Class 3 (C)', bookName: '1984', number: '103', issueDate: '12 Mar 2017', returnDate: '02 Apr 2017' },
  { id: 4, cardNo: '14122', issueTo: 'Emma Watson', className: 'Class 4 (A)', bookName: 'Pride and Prejudice', number: '104', issueDate: '05 Aug 2018', returnDate: '28 Aug 2018' },
  { id: 5, cardNo: '14567', issueTo: 'David Miller', className: 'Class 5 (C)', bookName: 'The Great Gatsby', number: '105', issueDate: '11 Nov 2018', returnDate: '05 Dec 2018' },
  { id: 6, cardNo: '15231', issueTo: 'Olivia Brown', className: 'Class 6 (B)', bookName: 'The Hobbit', number: '106', issueDate: '22 May 2019', returnDate: '10 Jun 2019' },
  { id: 7, cardNo: '15890', issueTo: 'Lucas Smith', className: 'Class 7 (A)', bookName: 'Jane Eyre', number: '107', issueDate: '03 Apr 2020', returnDate: '20 Apr 2020' },
  { id: 8, cardNo: '16324', issueTo: 'Ella Johnson', className: 'Class 8 (B)', bookName: 'The Alchemist', number: '108', issueDate: '09 Oct 2021', returnDate: '28 Oct 2021' },
  { id: 9, cardNo: '17215', issueTo: 'Noah Wilson', className: 'Class 9 (C)', bookName: 'Brave New World', number: '109', issueDate: '05 Jan 2022', returnDate: '28 Jan 2022' },
  { id: 10, cardNo: '18009', issueTo: 'Sophia Davis', className: 'Class 10 (A)', bookName: 'Harry Potter and the Sorcerer’s Stone', number: '110', issueDate: '15 Mar 2023', returnDate: '10 Apr 2023' },
  // extra for pagination
  { id: 11, cardNo: '19123', issueTo: 'Mason Taylor', className: 'Class 1 (B)', bookName: 'The Catcher in the Rye', number: '111', issueDate: '20 Jun 2024', returnDate: '05 Jul 2024' },
  { id: 12, cardNo: '20234', issueTo: 'Ella Garcia', className: 'Class 2 (A)', bookName: 'Moby Dick', number: '112', issueDate: '01 Aug 2024', returnDate: '15 Aug 2024' },
];

const IssueReturn = () => {
  // ---------- State ----------
  const [issues, setIssues] = useState(initialIssues);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer state for Add Issue Return
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);

  // Return modal state
  const [returnModal, setReturnModal] = useState({ open: false, issueId: null, bookName: '' });

  // ---------- Filtered data ----------
  const filteredIssues = useMemo(() => {
    return issues.filter((item) =>
      item.cardNo.toLowerCase().includes(search.toLowerCase()) ||
      item.issueTo.toLowerCase().includes(search.toLowerCase()) ||
      item.bookName.toLowerCase().includes(search.toLowerCase())
    );
  }, [issues, search]);

  const paginatedIssues = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredIssues.slice(start, start + rowsPerPage);
  }, [filteredIssues, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredIssues.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedIssues.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const openAddDrawer = () => setAddDrawerOpen(true);
  const closeAddDrawer = () => setAddDrawerOpen(false);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const libraryCardNo = formData.get('libraryCardNo');
    const memberClass = formData.get('memberClass');
    const section = formData.get('section');
    const student = formData.get('student');
    const subject = formData.get('subject');
    const book = formData.get('book');
    const issueDate = formData.get('issueDate');
    const returnDate = formData.get('returnDate');

    // In a real app, you'd fetch the actual book number etc.
    const newId = Math.max(...issues.map((i) => i.id), 0) + 1;
    const newIssue = {
      id: newId,
      cardNo: libraryCardNo,
      issueTo: student,
      className: `${memberClass} (${section})`,
      bookName: book,
      number: '999', // placeholder
      issueDate: issueDate ? new Date(issueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ') : issueDate,
      returnDate: returnDate ? new Date(returnDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ') : returnDate,
    };
    setIssues([...issues, newIssue]);
    closeAddDrawer();
  };

  const openReturnModal = (issue) => {
    setReturnModal({ open: true, issueId: issue.id, bookName: issue.bookName });
  };

  const closeReturnModal = () => {
    setReturnModal({ open: false, issueId: null, bookName: '' });
  };

  const confirmReturn = () => {
    // Remove the issue from list (or mark as returned)
    setIssues((prev) => prev.filter((i) => i.id !== returnModal.issueId));
    setSelectedIds((prev) => prev.filter((id) => id !== returnModal.issueId));
    closeReturnModal();
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
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Issue Return</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Issue Return</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={openAddDrawer}
        >
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>
          Add Issue Return
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
                          checked={paginatedIssues.length > 0 && selectedIds.length === paginatedIssues.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Card No</th>
                    <th scope="col">Issue To</th>
                    <th scope="col">Class</th>
                    <th scope="col">Book Name</th>
                    <th scope="col">Number</th>
                    <th scope="col">Issue Date</th>
                    <th scope="col">Return Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedIssues.map((item, index) => {
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
                        <td>{item.cardNo}</td>
                        <td>{item.issueTo}</td>
                        <td>{item.className}</td>
                        <td>{item.bookName}</td>
                        <td>{item.number}</td>
                        <td>{item.issueDate}</td>
                        <td>{item.returnDate}</td>
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
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openReturnModal(item)}
                                >
                                  <i className="ri-arrow-go-back-line"></i> Book Return
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {paginatedIssues.length === 0 && (
                    <tr>
                      <td colSpan="9" className="text-center py-20">
                        No issue records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredIssues.length > 0 && (
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

      {/* Add Issue Return Drawer */}
      <SlideDrawer
        isOpen={addDrawerOpen}
        onClose={closeAddDrawer}
        title="Add Book Issue"
      >
        <form onSubmit={handleAddSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="libraryCardNo" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Library Card No
              </label>
              <input
                type="text"
                className="form-control"
                id="libraryCardNo"
                name="libraryCardNo"
                placeholder="Enter Library Card No"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="memberClass" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Class
              </label>
              <input
                type="text"
                className="form-control"
                id="memberClass"
                name="memberClass"
                placeholder="Enter Class"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="section" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Section
              </label>
              <input
                type="text"
                className="form-control"
                id="section"
                name="section"
                placeholder="Enter Section"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="student" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Student
              </label>
              <select
                id="student"
                name="student"
                className="form-control form-select"
                required
              >
                <option value="" disabled selected>Select Student</option>
                <option value="Jon Dev">Jon Dev</option>
                <option value="Sarah Khan">Sarah Khan</option>
                <option value="Michael Lee">Michael Lee</option>
                <option value="Emma Watson">Emma Watson</option>
                <option value="David Miller">David Miller</option>
                <option value="Olivia Brown">Olivia Brown</option>
                <option value="Lucas Smith">Lucas Smith</option>
                <option value="Ella Johnson">Ella Johnson</option>
                <option value="Noah Wilson">Noah Wilson</option>
                <option value="Sophia Davis">Sophia Davis</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="subject" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Select Subject
              </label>
              <select
                id="subject"
                name="subject"
                className="form-control form-select"
                required
              >
                <option value="" disabled selected>Select a Subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="History">History</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="book" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Book
              </label>
              <select
                id="book"
                name="book"
                className="form-control form-select"
                required
              >
                <option value="" disabled selected>Select a book</option>
                <option value="The Little Prince">The Little Prince</option>
                <option value="To Kill a Mockingbird">To Kill a Mockingbird</option>
                <option value="1984">1984</option>
                <option value="Pride and Prejudice">Pride and Prejudice</option>
                <option value="The Great Gatsby">The Great Gatsby</option>
                <option value="The Hobbit">The Hobbit</option>
                <option value="Jane Eyre">Jane Eyre</option>
                <option value="The Alchemist">The Alchemist</option>
                <option value="Harry Potter">Harry Potter</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="issueDate" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Issue Date
              </label>
              <input type="date" className="form-control" id="issueDate" name="issueDate" required />
            </div>
            <div className="col-sm-6">
              <label htmlFor="returnDate" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Return Date
              </label>
              <input type="date" className="form-control" id="returnDate" name="returnDate" required />
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

      {/* Return Book Modal */}
      <ConfirmModal
        show={returnModal.open}
        onClose={closeReturnModal}
        onConfirm={confirmReturn}
        title="Return this Book?"
        message={`Are you sure you want to return "${returnModal.bookName}"?`}
        confirmText="Yes Return"
        cancelText="No"
        icon="ri-book-open-line"
        variant="primary"
      />
    </div>
  );
};

export default IssueReturn;