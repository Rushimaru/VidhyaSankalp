import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SlideDrawer from '../../components/Slidedrawer';
import ConfirmModal from '../../components/ConfirmModal';

// Sample books data (matching HTML rows)
const initialBooks = [
  { id: 1, subject: 'Art', bookName: 'The Little Prince', publisher: 'Devon Lane', author: 'Darrell Steward', number: '101', rackNo: '1234', qty: 60, available: 20, price: '$250', examDate: '05 Jun 2015' },
  { id: 2, subject: 'Mathematics', bookName: 'Advanced Algebra', publisher: 'Penguin Books', author: 'Jane Cooper', number: '102', rackNo: '5678', qty: 40, available: 18, price: '$300', examDate: '10 Jul 2016' },
  { id: 3, subject: 'Science', bookName: 'Physics for Beginners', publisher: 'HarperCollins', author: 'Guy Hawkins', number: '103', rackNo: '8790', qty: 55, available: 30, price: '$280', examDate: '15 Mar 2017' },
  { id: 4, subject: 'History', bookName: 'World Wars', publisher: 'Oxford Press', author: 'Leslie Alexander', number: '104', rackNo: '3210', qty: 35, available: 12, price: '$200', examDate: '21 Sep 2018' },
  { id: 5, subject: 'Geography', bookName: 'Earth & Beyond', publisher: 'Macmillan', author: 'Robert Fox', number: '105', rackNo: '4311', qty: 45, available: 10, price: '$310', examDate: '08 Jan 2019' },
  { id: 6, subject: 'Biology', bookName: 'Human Anatomy', publisher: 'Cambridge House', author: 'Annette Black', number: '106', rackNo: '2915', qty: 70, available: 35, price: '$400', examDate: '11 Dec 2020' },
  { id: 7, subject: 'Economics', bookName: 'Money & Markets', publisher: 'Random House', author: 'Esther Howard', number: '107', rackNo: '3425', qty: 50, available: 28, price: '$270', examDate: '19 Mar 2021' },
  { id: 8, subject: 'Computer Science', bookName: 'JavaScript Essentials', publisher: 'TechWorld', author: 'Kathryn Murphy', number: '108', rackNo: '5320', qty: 80, available: 60, price: '$500', examDate: '05 Apr 2022' },
  { id: 9, subject: 'English', bookName: 'Shakespeare\'s Works', publisher: 'Vintage Books', author: 'Courtney Henry', number: '109', rackNo: '1567', qty: 65, available: 45, price: '$350', examDate: '12 May 2023' },
  { id: 10, subject: 'Chemistry', bookName: 'Organic Compounds', publisher: 'Scholastic', author: 'Wade Warren', number: '110', rackNo: '4879', qty: 75, available: 55, price: '$420', examDate: '10 Feb 2024' },
  // Additional books to match pagination
  { id: 11, subject: 'Physics', bookName: 'Quantum Mechanics', publisher: 'Springer', author: 'Albert Einstein', number: '111', rackNo: '1122', qty: 30, available: 15, price: '$600', examDate: '15 Mar 2025' },
  { id: 12, subject: 'Literature', bookName: 'Classic Poems', publisher: 'Poetry Press', author: 'Emily Dickinson', number: '112', rackNo: '3344', qty: 25, available: 10, price: '$180', examDate: '20 Apr 2025' },
];

const BooksList = () => {
  // ---------- State ----------
  const [books, setBooks] = useState(initialBooks);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer states
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, bookId: null, bookName: '' });

  // ---------- Filtered data ----------
  const filteredBooks = useMemo(() => {
    return books.filter((book) =>
      book.bookName.toLowerCase().includes(search.toLowerCase()) ||
      book.subject.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.publisher.toLowerCase().includes(search.toLowerCase())
    );
  }, [books, search]);

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

  const openAddDrawer = () => {
    setEditingBook(null);
    setAddDrawerOpen(true);
  };

  const openEditDrawer = (book) => {
    setEditingBook(book);
    setEditDrawerOpen(true);
  };

  const closeAddDrawer = () => setAddDrawerOpen(false);
  const closeEditDrawer = () => {
    setEditDrawerOpen(false);
    setEditingBook(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bookName = formData.get('bookName');
    const publisher = formData.get('publisher');
    const author = formData.get('author');
    const number = formData.get('number');
    const subject = formData.get('subject');
    const rackNo = formData.get('rackNo');
    const qty = formData.get('qty');
    const available = formData.get('available');
    const price = formData.get('price');
    const postDate = formData.get('postDate');
    const status = formData.get('status'); // not used in table but could be stored

    const newId = Math.max(...books.map((b) => b.id), 0) + 1;
    const newBook = {
      id: newId,
      subject,
      bookName,
      publisher,
      author,
      number,
      rackNo,
      qty: parseInt(qty) || 0,
      available: parseInt(available) || 0,
      price: `$${price}`,
      examDate: postDate, // using postDate as examDate for simplicity
      status,
    };
    setBooks([...books, newBook]);
    closeAddDrawer();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bookName = formData.get('bookName');
    const publisher = formData.get('publisher');
    const author = formData.get('author');
    const number = formData.get('number');
    const subject = formData.get('subject');
    const rackNo = formData.get('rackNo');
    const qty = formData.get('qty');
    const available = formData.get('available');
    const price = formData.get('price');
    const postDate = formData.get('postDate');
    const status = formData.get('status');

    if (editingBook) {
      setBooks((prev) =>
        prev.map((b) =>
          b.id === editingBook.id
            ? {
                ...b,
                subject,
                bookName,
                publisher,
                author,
                number,
                rackNo,
                qty: parseInt(qty) || 0,
                available: parseInt(available) || 0,
                price: `$${price}`,
                examDate: postDate,
                status,
              }
            : b
        )
      );
    }
    closeEditDrawer();
  };

  const openDeleteModal = (book) => {
    setDeleteModal({ open: true, bookId: book.id, bookName: book.bookName });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, bookId: null, bookName: '' });
  };

  const confirmDelete = () => {
    setBooks((prev) => prev.filter((b) => b.id !== deleteModal.bookId));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteModal.bookId));
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
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Books List</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Books List</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={openAddDrawer}
        >
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>
          Add Book
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
                          checked={paginatedBooks.length > 0 && selectedIds.length === paginatedBooks.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Subject</th>
                    <th scope="col">Book Name</th>
                    <th scope="col">Publisher</th>
                    <th scope="col">Author</th>
                    <th scope="col">Number</th>
                    <th scope="col">Rack No</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Available</th>
                    <th scope="col">Price</th>
                    <th scope="col">Exam Date</th>
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
                        <td>{book.subject}</td>
                        <td>{book.bookName}</td>
                        <td>{book.publisher}</td>
                        <td>{book.author}</td>
                        <td>{book.number}</td>
                        <td>{book.rackNo}</td>
                        <td>{book.qty}</td>
                        <td>{book.available}</td>
                        <td>{book.price}</td>
                        <td>{book.examDate}</td>
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
                                  onClick={() => openEditDrawer(book)}
                                >
                                  <i className="ri-edit-2-line"></i> Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openDeleteModal(book)}
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
                  {paginatedBooks.length === 0 && (
                    <tr>
                      <td colSpan="12" className="text-center py-20">
                        No books found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

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

      {/* Add Book Drawer */}
      <SlideDrawer
        isOpen={addDrawerOpen}
        onClose={closeAddDrawer}
        title="Add Book"
      >
        <form onSubmit={handleAddSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="bookName" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Book Name
              </label>
              <input
                type="text"
                className="form-control"
                id="bookName"
                name="bookName"
                placeholder="Enter book name"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="publisher" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Publisher
              </label>
              <input
                type="text"
                className="form-control"
                id="publisher"
                name="publisher"
                placeholder="Enter publisher"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="author" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Author
              </label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                placeholder="Enter author"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="number" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Number
              </label>
              <input
                type="number"
                className="form-control"
                id="number"
                name="number"
                placeholder="Enter number"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="subject" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Subject
              </label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                placeholder="Enter subject"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="rackNo" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Rack No
              </label>
              <input
                type="text"
                className="form-control"
                id="rackNo"
                name="rackNo"
                placeholder="Enter rack no"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="qty" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Qty
              </label>
              <input
                type="number"
                className="form-control"
                id="qty"
                name="qty"
                placeholder="Enter quantity"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="available" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Available
              </label>
              <input
                type="number"
                className="form-control"
                id="available"
                name="available"
                placeholder="Enter available"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="price" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                placeholder="Enter price"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="postDate" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Post Date
              </label>
              <input
                type="date"
                className="form-control"
                id="postDate"
                name="postDate"
                required
              />
            </div>
            <div className="col-sm-6">
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

      {/* Edit Book Drawer */}
      <SlideDrawer
        isOpen={editDrawerOpen}
        onClose={closeEditDrawer}
        title="Edit Book"
      >
        <form onSubmit={handleEditSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="bookNameEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Book Name
              </label>
              <input
                type="text"
                className="form-control"
                id="bookNameEdit"
                name="bookName"
                defaultValue={editingBook?.bookName || ''}
                placeholder="Enter book name"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="publisherEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Publisher
              </label>
              <input
                type="text"
                className="form-control"
                id="publisherEdit"
                name="publisher"
                defaultValue={editingBook?.publisher || ''}
                placeholder="Enter publisher"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="authorEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Author
              </label>
              <input
                type="text"
                className="form-control"
                id="authorEdit"
                name="author"
                defaultValue={editingBook?.author || ''}
                placeholder="Enter author"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="numberEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Number
              </label>
              <input
                type="number"
                className="form-control"
                id="numberEdit"
                name="number"
                defaultValue={editingBook?.number || ''}
                placeholder="Enter number"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="subjectEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Subject
              </label>
              <input
                type="text"
                className="form-control"
                id="subjectEdit"
                name="subject"
                defaultValue={editingBook?.subject || ''}
                placeholder="Enter subject"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="rackNoEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Rack No
              </label>
              <input
                type="text"
                className="form-control"
                id="rackNoEdit"
                name="rackNo"
                defaultValue={editingBook?.rackNo || ''}
                placeholder="Enter rack no"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="qtyEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Qty
              </label>
              <input
                type="number"
                className="form-control"
                id="qtyEdit"
                name="qty"
                defaultValue={editingBook?.qty || ''}
                placeholder="Enter quantity"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="availableEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Available
              </label>
              <input
                type="number"
                className="form-control"
                id="availableEdit"
                name="available"
                defaultValue={editingBook?.available || ''}
                placeholder="Enter available"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="priceEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="priceEdit"
                name="price"
                defaultValue={editingBook?.price?.replace('$', '') || ''}
                placeholder="Enter price"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="postDateEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Post Date
              </label>
              <input
                type="date"
                className="form-control"
                id="postDateEdit"
                name="postDate"
                defaultValue={editingBook?.examDate || ''}
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="statusEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Status
              </label>
              <select
                id="statusEdit"
                name="status"
                className="form-control form-select"
                defaultValue={editingBook?.status || ''}
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
        title={`Delete Book`}
        message={`Are you sure you want to delete "${deleteModal.bookName}"?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />
    </div>
  );
};

export default BooksList;