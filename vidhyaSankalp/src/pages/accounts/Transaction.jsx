import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SlideDrawer from '../../components/Slidedrawer';
import ConfirmModal from '../../components/ConfirmModal';

// Sample transaction data (matching HTML rows)
const initialTransactions = [
  { id: 1, invoice: '1001', date: '05 Jan 2024', transactionType: 'Tuition Fees', paymentType: 'Cash', amount: '$1,200' },
  { id: 2, invoice: '1002', date: '12 Jan 2024', transactionType: 'Library Fees', paymentType: 'Online', amount: '$250' },
  { id: 3, invoice: '1003', date: '18 Jan 2024', transactionType: 'Exam Fees', paymentType: 'Bank Transfer', amount: '$600' },
  { id: 4, invoice: '1004', date: '25 Jan 2024', transactionType: 'Sports Fund', paymentType: 'Cash', amount: '$430' },
  { id: 5, invoice: '1005', date: '30 Jan 2024', transactionType: 'Hostel Rent', paymentType: 'Online', amount: '$1,000' },
  { id: 6, invoice: '1006', date: '05 Feb 2024', transactionType: 'Book Purchase', paymentType: 'Cheque', amount: '$540' },
  { id: 7, invoice: '1007', date: '12 Feb 2024', transactionType: 'Lab Equipment', paymentType: 'Cash', amount: '$850' },
  { id: 8, invoice: '1008', date: '20 Feb 2024', transactionType: 'Event Ticket Sale', paymentType: 'Online', amount: '$1,500' },
  { id: 9, invoice: '1009', date: '28 Feb 2024', transactionType: 'Donation', paymentType: 'Bank Transfer', amount: '$2,700' },
  { id: 10, invoice: '1010', date: '05 Mar 2024', transactionType: 'Miscellaneous', paymentType: 'Cash', amount: '$320' },
  // Additional for pagination demo
  { id: 11, invoice: '1011', date: '10 Mar 2024', transactionType: 'Scholarship', paymentType: 'Online', amount: '$1,800' },
  { id: 12, invoice: '1012', date: '15 Mar 2024', transactionType: 'Alumni Fund', paymentType: 'Bank Transfer', amount: '$3,200' },
];

const Transaction = () => {
  // ---------- State ----------
  const [transactions, setTransactions] = useState(initialTransactions);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer states
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, transactionId: null, transactionName: '' });

  // ---------- Filtered data ----------
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) =>
      t.transactionType.toLowerCase().includes(search.toLowerCase()) ||
      t.invoice.toLowerCase().includes(search.toLowerCase()) ||
      t.paymentType.toLowerCase().includes(search.toLowerCase())
    );
  }, [transactions, search]);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredTransactions.slice(start, start + rowsPerPage);
  }, [filteredTransactions, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedTransactions.map((t) => t.id));
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
    setEditingTransaction(null);
    setAddDrawerOpen(true);
  };

  const openEditDrawer = (transaction) => {
    setEditingTransaction(transaction);
    setEditDrawerOpen(true);
  };

  const closeAddDrawer = () => setAddDrawerOpen(false);
  const closeEditDrawer = () => {
    setEditDrawerOpen(false);
    setEditingTransaction(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const transactionType = formData.get('transactionType');
    const paymentType = formData.get('paymentType');
    const amount = formData.get('amount');
    const date = formData.get('date') || new Date().toISOString().split('T')[0];

    // Generate a new invoice number (simple increment)
    const lastInvoice = Math.max(...transactions.map((t) => parseInt(t.invoice) || 0), 1000);
    const newInvoice = (lastInvoice + 1).toString();

    const newTransaction = {
      id: transactions.length + 1,
      invoice: newInvoice,
      date: date ? new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ') : date,
      transactionType,
      paymentType,
      amount: `$${amount}`,
    };
    setTransactions([...transactions, newTransaction]);
    closeAddDrawer();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const transactionType = formData.get('transactionType');
    const paymentType = formData.get('paymentType');
    const amount = formData.get('amount');
    const date = formData.get('date');

    if (editingTransaction) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingTransaction.id
            ? {
                ...t,
                transactionType,
                paymentType,
                amount: `$${amount}`,
                date: date ? new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ') : date,
              }
            : t
        )
      );
    }
    closeEditDrawer();
  };

  const openDeleteModal = (transaction) => {
    setDeleteModal({ open: true, transactionId: transaction.id, transactionName: transaction.transactionType });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, transactionId: null, transactionName: '' });
  };

  const confirmDelete = () => {
    setTransactions((prev) => prev.filter((t) => t.id !== deleteModal.transactionId));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteModal.transactionId));
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
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Transaction</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Transaction</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={openAddDrawer}
        >
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>
          Add Transaction
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
                          checked={paginatedTransactions.length > 0 && selectedIds.length === paginatedTransactions.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Invoice</th>
                    <th scope="col">Date</th>
                    <th scope="col">Transaction Type</th>
                    <th scope="col">Payment Type</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTransactions.map((t, index) => {
                    const isSelected = selectedIds.includes(t.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <tr key={t.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(t.id)}
                            />
                            <label className="form-check-label">{sl.toString().padStart(2, '0')}</label>
                          </div>
                        </td>
                        <td>{t.invoice}</td>
                        <td>{t.date}</td>
                        <td>{t.transactionType}</td>
                        <td>{t.paymentType}</td>
                        <td>{t.amount}</td>
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
                                  onClick={() => openEditDrawer(t)}
                                >
                                  <i className="ri-edit-2-line"></i> Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openDeleteModal(t)}
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
                  {paginatedTransactions.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-20">
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredTransactions.length > 0 && (
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

      {/* Add Transaction Drawer */}
      <SlideDrawer
        isOpen={addDrawerOpen}
        onClose={closeAddDrawer}
        title="Add Transaction"
      >
        <form onSubmit={handleAddSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="transactionType" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Transaction Type
              </label>
              <input
                type="text"
                className="form-control"
                id="transactionType"
                name="transactionType"
                placeholder="Enter transaction type"
                required
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="paymentType" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Payment Type
              </label>
              <input
                type="text"
                className="form-control"
                id="paymentType"
                name="paymentType"
                placeholder="Enter payment type"
                required
              />
            </div>
            <div className="col-sm-12">
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

      {/* Edit Transaction Drawer */}
      <SlideDrawer
        isOpen={editDrawerOpen}
        onClose={closeEditDrawer}
        title="Edit Transaction"
      >
        <form onSubmit={handleEditSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-12">
              <label htmlFor="transactionTypeEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Transaction Type
              </label>
              <input
                type="text"
                className="form-control"
                id="transactionTypeEdit"
                name="transactionType"
                defaultValue={editingTransaction?.transactionType || ''}
                placeholder="Enter transaction type"
                required
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="paymentTypeEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Payment Type
              </label>
              <input
                type="text"
                className="form-control"
                id="paymentTypeEdit"
                name="paymentType"
                defaultValue={editingTransaction?.paymentType || ''}
                placeholder="Enter payment type"
                required
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="amountEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Amount
              </label>
              <input
                type="text"
                className="form-control"
                id="amountEdit"
                name="amount"
                defaultValue={editingTransaction?.amount?.replace('$', '') || ''}
                placeholder="Enter amount"
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
                defaultValue={editingTransaction?.date || ''}
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
        title={`Delete Transaction`}
        message={`Are you sure you want to delete "${deleteModal.transactionName}"?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />
    </div>
  );
};

export default Transaction;