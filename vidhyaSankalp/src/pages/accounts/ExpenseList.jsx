import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SlideDrawer from '../../components/Slidedrawer';
import ConfirmModal from '../../components/ConfirmModal';

// Sample expense data (matching HTML rows)
const initialExpenses = [
  { id: 1, invoice: '1002', name: 'Sports Fund', description: 'Football tournament registration fees', expenseHead: 'Sports', paymentType: 'Online', amount: '$420', date: '12 Jan 2024' },
  { id: 2, invoice: '1003', name: 'Exam Fees', description: 'Mid-term exam fee collection', expenseHead: 'Examination', paymentType: 'Bank Transfer', amount: '$1,200', date: '20 Jan 2024' },
  { id: 3, invoice: '1004', name: 'Admission', description: 'New student admission fees', expenseHead: 'Admission', paymentType: 'Cheque', amount: '$2,500', date: '03 Feb 2024' },
  { id: 4, invoice: '1005', name: 'Science Lab', description: 'Lab maintenance fund collection', expenseHead: 'Laboratory', paymentType: 'Cash', amount: '$780', date: '14 Feb 2024' },
  { id: 5, invoice: '1006', name: 'Donation', description: 'Alumni donation for scholarship', expenseHead: 'Donation', paymentType: 'Online', amount: '$5,000', date: '28 Feb 2024' },
  { id: 6, invoice: '1007', name: 'Library Sale', description: 'Sale of old library books', expenseHead: 'Library', paymentType: 'Cash', amount: '$350', date: '03 Mar 2024' },
  { id: 7, invoice: '1008', name: 'Transport Fees', description: 'Monthly bus service collection', expenseHead: 'Transport', paymentType: 'Cash', amount: '$980', date: '12 Mar 2024' },
  { id: 8, invoice: '1009', name: 'Event Income', description: 'Annual cultural program tickets', expenseHead: 'Event', paymentType: 'Online', amount: '$2,300', date: '22 Mar 2024' },
  { id: 9, invoice: '1010', name: 'Miscellaneous', description: 'Other small income sources', expenseHead: 'General', paymentType: 'Cash', amount: '$250', date: '30 Mar 2024' },
  // Adding a few more for pagination demo
  { id: 10, invoice: '1011', name: 'Canteen Expense', description: 'Monthly canteen supplies', expenseHead: 'Canteen', paymentType: 'Cash', amount: '$1,500', date: '05 Apr 2024' },
  { id: 11, invoice: '1012', name: 'Rent Expense', description: 'School hall rent', expenseHead: 'Rent', paymentType: 'Bank Transfer', amount: '$3,200', date: '10 Apr 2024' },
  { id: 12, invoice: '1013', name: 'Interest', description: 'Bank interest paid', expenseHead: 'Interest', paymentType: 'Bank Transfer', amount: '$120', date: '15 Apr 2024' },
];

const ExpenseList = () => {
  // ---------- State ----------
  const [expenses, setExpenses] = useState(initialExpenses);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer states
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, expenseId: null, expenseName: '' });

  // ---------- Filtered data ----------
  const filteredExpenses = useMemo(() => {
    return expenses.filter((exp) =>
      exp.name.toLowerCase().includes(search.toLowerCase()) ||
      exp.invoice.toLowerCase().includes(search.toLowerCase()) ||
      exp.expenseHead.toLowerCase().includes(search.toLowerCase())
    );
  }, [expenses, search]);

  const paginatedExpenses = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredExpenses.slice(start, start + rowsPerPage);
  }, [filteredExpenses, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredExpenses.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedExpenses.map((exp) => exp.id));
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
    setEditingExpense(null);
    setAddDrawerOpen(true);
  };

  const openEditDrawer = (expense) => {
    setEditingExpense(expense);
    setEditDrawerOpen(true);
  };

  const closeAddDrawer = () => setAddDrawerOpen(false);
  const closeEditDrawer = () => {
    setEditDrawerOpen(false);
    setEditingExpense(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const expenseHead = formData.get('expenseHead');
    const amount = formData.get('amount');
    const date = formData.get('date');
    const paymentType = formData.get('paymentType');
    const description = formData.get('description');

    // Generate a new invoice number (simple increment)
    const lastInvoice = Math.max(...expenses.map((e) => parseInt(e.invoice) || 0), 1000);
    const newInvoice = (lastInvoice + 1).toString();

    const newExpense = {
      id: expenses.length + 1,
      invoice: newInvoice,
      name,
      description,
      expenseHead,
      paymentType,
      amount: `$${amount}`,
      date: date ? new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ') : date,
    };
    setExpenses([...expenses, newExpense]);
    closeAddDrawer();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const expenseHead = formData.get('expenseHead');
    const amount = formData.get('amount');
    const date = formData.get('date');
    const paymentType = formData.get('paymentType');
    const description = formData.get('description');

    if (editingExpense) {
      setExpenses((prev) =>
        prev.map((exp) =>
          exp.id === editingExpense.id
            ? {
                ...exp,
                name,
                description,
                expenseHead,
                paymentType,
                amount: `$${amount}`,
                date: date ? new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ') : date,
              }
            : exp
        )
      );
    }
    closeEditDrawer();
  };

  const openDeleteModal = (expense) => {
    setDeleteModal({ open: true, expenseId: expense.id, expenseName: expense.name });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, expenseId: null, expenseName: '' });
  };

  const confirmDelete = () => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== deleteModal.expenseId));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteModal.expenseId));
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
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Expense List</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Expense List</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={openAddDrawer}
        >
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>
          Add Expense
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
                          checked={paginatedExpenses.length > 0 && selectedIds.length === paginatedExpenses.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Invoice</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Expense Head</th>
                    <th scope="col">Payment Type</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedExpenses.map((exp, index) => {
                    const isSelected = selectedIds.includes(exp.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <tr key={exp.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(exp.id)}
                            />
                            <label className="form-check-label">{sl.toString().padStart(2, '0')}</label>
                          </div>
                        </td>
                        <td>{exp.invoice}</td>
                        <td>{exp.name}</td>
                        <td>{exp.description}</td>
                        <td>{exp.expenseHead}</td>
                        <td>{exp.paymentType}</td>
                        <td>{exp.amount}</td>
                        <td>{exp.date}</td>
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
                                  onClick={() => openEditDrawer(exp)}
                                >
                                  <i className="ri-edit-2-line"></i> Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openDeleteModal(exp)}
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
                  {paginatedExpenses.length === 0 && (
                    <tr>
                      <td colSpan="9" className="text-center py-20">
                        No expenses found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredExpenses.length > 0 && (
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

      {/* Add Expense Drawer */}
      <SlideDrawer
        isOpen={addDrawerOpen}
        onClose={closeAddDrawer}
        title="Add Expense"
      >
        <form onSubmit={handleAddSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="expenseName" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Expense Name
              </label>
              <input
                type="text"
                className="form-control"
                id="expenseName"
                name="name"
                placeholder="Enter expense name"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="expenseHead" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Expense Head
              </label>
              <select
                id="expenseHead"
                name="expenseHead"
                className="form-control form-select"
                required
              >
                <option value="" disabled selected>Select an expense head</option>
                <option value="Sports">Sports</option>
                <option value="Examination">Examination</option>
                <option value="Admission">Admission</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Donation">Donation</option>
                <option value="Library">Library</option>
                <option value="Transport">Transport</option>
                <option value="Event">Event</option>
                <option value="General">General</option>
                <option value="Canteen">Canteen</option>
                <option value="Rent">Rent</option>
                <option value="Interest">Interest</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="amount" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Amount
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
                <option value="" disabled selected>Select payment type</option>
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cheque">Cheque</option>
              </select>
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

      {/* Edit Expense Drawer */}
      <SlideDrawer
        isOpen={editDrawerOpen}
        onClose={closeEditDrawer}
        title="Edit Expense"
      >
        <form onSubmit={handleEditSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="expenseNameEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Expense Name
              </label>
              <input
                type="text"
                className="form-control"
                id="expenseNameEdit"
                name="name"
                defaultValue={editingExpense?.name || ''}
                placeholder="Enter expense name"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="expenseHeadEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Expense Head
              </label>
              <select
                id="expenseHeadEdit"
                name="expenseHead"
                className="form-control form-select"
                defaultValue={editingExpense?.expenseHead || ''}
                required
              >
                <option value="" disabled>Select an expense head</option>
                <option value="Sports">Sports</option>
                <option value="Examination">Examination</option>
                <option value="Admission">Admission</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Donation">Donation</option>
                <option value="Library">Library</option>
                <option value="Transport">Transport</option>
                <option value="Event">Event</option>
                <option value="General">General</option>
                <option value="Canteen">Canteen</option>
                <option value="Rent">Rent</option>
                <option value="Interest">Interest</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="amountEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Amount
              </label>
              <input
                type="text"
                className="form-control"
                id="amountEdit"
                name="amount"
                defaultValue={editingExpense?.amount?.replace('$', '') || ''}
                placeholder="Enter amount"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="dateEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="dateEdit"
                name="date"
                defaultValue={editingExpense?.date || ''}
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="paymentTypeEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Payment Type
              </label>
              <select
                id="paymentTypeEdit"
                name="paymentType"
                className="form-control form-select"
                defaultValue={editingExpense?.paymentType || ''}
                required
              >
                <option value="" disabled>Select payment type</option>
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>
            <div className="col-sm-12">
              <label htmlFor="descriptionEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Description
              </label>
              <textarea
                className="form-control"
                id="descriptionEdit"
                name="description"
                defaultValue={editingExpense?.description || ''}
                placeholder="Enter description"
                rows="3"
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
        title={`Delete Expense`}
        message={`Are you sure you want to delete "${deleteModal.expenseName}"?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />
    </div>
  );
};

export default ExpenseList;