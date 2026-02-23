import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SlideDrawer from '../../components/Slidedrawer';
import ConfirmModal from '../../components/ConfirmModal';

// Sample issued books data (matching HTML rows)
const sampleIssuedBooks = [
  { id: 1, bookName: 'The Little Prince', number: '101', issueDate: '01 Jun 2015', returnDate: '01 Feb 2015' },
  { id: 2, bookName: 'To Kill a Mockingbird', number: '102', issueDate: '10 Jul 2016', returnDate: '25 Jul 2016' },
  { id: 3, bookName: '1984', number: '103', issueDate: '12 Mar 2017', returnDate: '02 Apr 2017' },
  { id: 4, bookName: 'Pride and Prejudice', number: '104', issueDate: '05 Aug 2018', returnDate: '28 Aug 2018' },
  { id: 5, bookName: 'The Great Gatsby', number: '105', issueDate: '11 Nov 2018', returnDate: '05 Dec 2018' },
  { id: 6, bookName: 'The Catcher in the Rye', number: '106', issueDate: '14 Jan 2019', returnDate: '02 Feb 2019' },
  { id: 7, bookName: 'Jane Eyre', number: '107', issueDate: '03 Apr 2020', returnDate: '20 Apr 2020' },
  { id: 8, bookName: 'The Hobbit', number: '108', issueDate: '22 May 2021', returnDate: '10 Jun 2021' },
  { id: 9, bookName: 'The Alchemist', number: '109', issueDate: '09 Oct 2022', returnDate: '28 Oct 2022' },
  { id: 10, bookName: 'Harry Potter and the Sorcerer’s Stone', number: '110', issueDate: '15 Jan 2023', returnDate: '10 Feb 2023' },
];

// Sample member data (if not passed via state)
const sampleMember = {
  id: 1,
  name: 'Seth Hallam',
  admissionNo: 'AD1256589',
  image: 'student-details-img.png',
  class: 'Class 6 (2025-26)',
  section: 'A',
  joinDate: '10',
  gender: '10 Nov 2006',
  phone: '789678456',
  email: 'Set@example.com',
};

const MemberDetails = () => {
  const location = useLocation();
  // If member data was passed via state (from MembersList), use it; otherwise use sample
  const member = location.state?.member || sampleMember;

  // ---------- State for issued books ----------
  const [issuedBooks, setIssuedBooks] = useState(sampleIssuedBooks);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Sidebar state for Add Issue Book
  const [addIssueDrawerOpen, setAddIssueDrawerOpen] = useState(false);

  // Modal states
  const [deleteModal, setDeleteModal] = useState({ open: false });
  const [returnModal, setReturnModal] = useState({ open: false, bookId: null, bookName: '' });

  // ---------- Filtered issued books ----------
  const filteredBooks = useMemo(() => {
    return issuedBooks.filter((book) =>
      book.bookName.toLowerCase().includes(search.toLowerCase()) ||
      book.number.toLowerCase().includes(search.toLowerCase())
    );
  }, [issuedBooks, search]);

  const paginatedBooks = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredBooks.slice(start, start + rowsPerPage);
  }, [filteredBooks, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredBooks.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedBooks.map((b) => b.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddIssueSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const subject = formData.get('subject');
    const book = formData.get('book');
    const issueDate = formData.get('issueDate');
    const returnDate = formData.get('returnDate');

    // In a real app, you'd send this to API and get a new book issue record
    const newId = Math.max(...issuedBooks.map((b) => b.id), 0) + 1;
    const newBook = {
      id: newId,
      bookName: book, // placeholder – you'd get actual book name from selection
      number: '111', // placeholder
      issueDate: issueDate ? new Date(issueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ') : issueDate,
      returnDate: returnDate ? new Date(returnDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ') : returnDate,
    };
    setIssuedBooks([...issuedBooks, newBook]);
    setAddIssueDrawerOpen(false);
  };

  const openReturnModal = (book) => {
    setReturnModal({ open: true, bookId: book.id, bookName: book.bookName });
  };

  const closeReturnModal = () => {
    setReturnModal({ open: false, bookId: null, bookName: '' });
  };

  const confirmReturn = () => {
    // Remove the book from issued list or mark as returned
    setIssuedBooks((prev) => prev.filter((b) => b.id !== returnModal.bookId));
    setSelectedIds((prev) => prev.filter((id) => id !== returnModal.bookId));
    closeReturnModal();
  };

  const openDeleteModal = () => {
    setDeleteModal({ open: true });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false });
  };

  const confirmDelete = () => {
    // Handle suspend/delete member
    alert(`Suspend member ${member.name}`);
    closeDeleteModal();
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="dashboard-main-body">
      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Member Details</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <Link to="/library/books" className="text-secondary-light hover-text-primary hover-underline"> / Library</Link>
            <span className="text-secondary-light"> / Member Details</span>
          </div>
        </div>
        <a href="/add-new-teacher" className="btn btn-primary-600 d-flex align-items-center gap-6 d-none">
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>Add Teacher
        </a>
      </div>

      {/* Profile Card */}
      <div className="mt-24">
        <div className="card h-100">
          <div className="card-body p-24">
            <div className="d-flex gap-32 flex-md-row flex-column">
              {/* Left column - avatar */}
              <div className="max-w-300-px w-100 text-center">
                <figure className="mb-20 w-120-px h-120-px mx-auto rounded-circle overflow-hidden">
                  <img
                    src={`/../src/assets/images/thumbs/${member.image}`}
                    alt={member.name}
                    className="w-100 h-100 object-fit-cover"
                  />
                </figure>
                <h2 className="h6 text-primary-light mb-4 fw-semibold">{member.name}</h2>
                <p className="mb-0">
                  Admission No: <span className="text-primary-600 fw-semibold">{member.admissionNo}</span>
                </p>
                <div className="mt-32 d-flex gap-16 w-100">
                  <button
                    type="button"
                    className="btn border fw-medium border-danger-600 bg-hover-danger-200 text-danger-600 text-md d-flex justify-content-center align-items-center gap-8 flex-grow-1 px-12 py-8 radius-8"
                    onClick={openDeleteModal}
                  >
                    <span className="d-flex text-lg"><i className="ri-delete-bin-2-line"></i></span>
                    Suspend
                  </button>
                  <Link
                    to="/library/members/edit"
                    state={{ member }}
                    className="btn btn-primary-600 border fw-medium border-primary-600 text-md d-flex justify-content-center align-items-center gap-8 flex-grow-1 px-12 py-8 radius-8"
                  >
                    <span className="d-flex text-lg"><i className="ri-edit-line"></i></span>
                    Edit
                  </Link>
                </div>
              </div>

              {/* Vertical divider */}
              <div><span className="h-100 w-1-px bg-neutral-200"></span></div>

              {/* Right column - personal info */}
              <div className="flex-grow-1">
                <div className="pb-16 border-bottom d-flex align-items-center justify-content-between gap-20">
                  <h3 className="h6 text-primary-light text-lg mb-0 fw-semibold">Personal Info</h3>
                </div>
                <div className="mt-16 d-flex flex-column gap-8">
                  <div className="d-flex gap-4">
                    <span className="fw-semibold text-sm text-primary-light w-110-px">Class</span>
                    <span className="fw-normal text-sm text-secondary-light">: {member.class}</span>
                  </div>
                  <div className="d-flex gap-4">
                    <span className="fw-semibold text-sm text-primary-light w-110-px">Section</span>
                    <span className="fw-normal text-sm text-secondary-light">: {member.section}</span>
                  </div>
                  <div className="d-flex gap-4">
                    <span className="fw-semibold text-sm text-primary-light w-110-px">Join Date</span>
                    <span className="fw-normal text-sm text-secondary-light">: {member.joinDate}</span>
                  </div>
                  <div className="d-flex gap-4">
                    <span className="fw-semibold text-sm text-primary-light w-110-px">Gender</span>
                    <span className="fw-normal text-sm text-secondary-light">: {member.gender}</span>
                  </div>
                  <div className="d-flex gap-4">
                    <span className="fw-semibold text-sm text-primary-light w-110-px">Phone Number</span>
                    <span className="fw-normal text-sm text-primary-600">: {member.phone}</span>
                  </div>
                  <div className="d-flex gap-4">
                    <span className="fw-semibold text-sm text-primary-light w-110-px">Email</span>
                    <span className="fw-normal text-sm text-primary-600">: {member.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Issued Books Section */}
        <div className="my-16">
          <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
            <div className="card-header bg-base py-10 px-20 d-flex align-items-center justify-content-between">
              <h6 className="text-lg fw-semibold mb-0">Book Issued</h6>
              <button
                type="button"
                className="btn btn-primary-600 d-flex align-items-center gap-6 py-8 text-sm"
                onClick={() => setAddIssueDrawerOpen(true)}
              >
                <span className="d-flex text-sm"><i className="ri-add-large-line"></i></span>
                Add Issue Book
              </button>
            </div>
            <div className="card-body p-0 dataTable-wrapper">
              {/* Toolbar */}
              <div className="d-flex flex-wrap align-items-center gap-24 justify-content-between px-20 py-12">
                <div className="d-flex flex-wrap align-items-center gap-16">
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
              <table className="table bordered-table mb-0 table-heading-dark-mode w-100">
                <thead>
                  <tr>
                    <th scope="col">
                      <div className="form-check style-check d-flex align-items-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={paginatedBooks.length > 0 && selectedIds.length === paginatedBooks.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Book Name</th>
                    <th scope="col">Number</th>
                    <th scope="col">Issue Date</th>
                    <th scope="col">Return Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedBooks.map((book, index) => {
                    const isSelected = selectedIds.includes(book.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <tr key={book.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(book.id)}
                            />
                            <label className="form-check-label">{sl.toString().padStart(2, '0')}</label>
                          </div>
                        </td>
                        <td>{book.bookName}</td>
                        <td>{book.number}</td>
                        <td>{book.issueDate}</td>
                        <td>{book.returnDate}</td>
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
                                  onClick={() => openReturnModal(book)}
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
                  {paginatedBooks.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-20">
                        No books issued.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              {filteredBooks.length > 0 && (
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
      </div>

      {/* Add Book Issue Drawer */}
      <SlideDrawer
        isOpen={addIssueDrawerOpen}
        onClose={() => setAddIssueDrawerOpen(false)}
        title="Add Book Issue"
      >
        <form onSubmit={handleAddIssueSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="subject" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Select Subject
              </label>
              <select id="subject" name="subject" className="form-control form-select" required>
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
              <select id="book" name="book" className="form-control form-select" required>
                <option value="" disabled selected>Select a book</option>
                <option value="The Little Prince">The Little Prince</option>
                <option value="To Kill a Mockingbird">To Kill a Mockingbird</option>
                <option value="1984">1984</option>
                <option value="Pride and Prejudice">Pride and Prejudice</option>
                <option value="The Great Gatsby">The Great Gatsby</option>
                <option value="The Catcher in the Rye">The Catcher in the Rye</option>
                <option value="Jane Eyre">Jane Eyre</option>
                <option value="The Hobbit">The Hobbit</option>
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
                  onClick={() => setAddIssueDrawerOpen(false)}
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

      {/* Suspend Member Modal */}
      <ConfirmModal
        show={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Suspend this Member?"
        message={`Are you sure you want to suspend ${member.name}?`}
        confirmText="Yes, Suspend"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />

      {/* Book Return Modal */}
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

export default MemberDetails;