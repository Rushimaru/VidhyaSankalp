import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SlideDrawer from '../../components/Slidedrawer';
import ConfirmModal from '../../components/ConfirmModal';

// Sample members data (matching HTML rows)
const initialMembers = [
  { id: 1, joinDate: '05 Jun 2015', cardNo: '12563', name: 'Jon Dev', className: 'Class 1 (A)', phone: '(+33)6 55 56 56 33', bookIssue: 2, issueDate: '01 Jun 2015', returnDate: '01 Feb 2015' },
  { id: 2, joinDate: '15 Jan 2016', cardNo: '12890', name: 'Emily Johnson', className: 'Class 2 (B)', phone: '(+1) 205 555 7821', bookIssue: 3, issueDate: '12 Jan 2016', returnDate: '20 Jan 2016' },
  { id: 3, joinDate: '10 Feb 2017', cardNo: '14250', name: 'Michael Brown', className: 'Class 3 (C)', phone: '(+44) 745 987 3210', bookIssue: 1, issueDate: '05 Feb 2017', returnDate: '15 Feb 2017' },
  { id: 4, joinDate: '22 Mar 2018', cardNo: '15642', name: 'Sarah Lee', className: 'Class 4 (A)', phone: '(+49) 178 556 9876', bookIssue: 4, issueDate: '15 Mar 2018', returnDate: '25 Mar 2018' },
  { id: 5, joinDate: '09 Apr 2019', cardNo: '16580', name: 'William Smith', className: 'Class 5 (B)', phone: '(+91) 98765 43210', bookIssue: 2, issueDate: '05 Apr 2019', returnDate: '10 Apr 2019' },
  { id: 6, joinDate: '20 May 2020', cardNo: '17690', name: 'Olivia White', className: 'Class 6 (C)', phone: '(+971) 55 432 7890', bookIssue: 3, issueDate: '18 May 2020', returnDate: '28 May 2020' },
  { id: 7, joinDate: '01 Jun 2021', cardNo: '18950', name: 'James Wilson', className: 'Class 7 (A)', phone: '(+92) 333 456 7890', bookIssue: 5, issueDate: '25 May 2021', returnDate: '05 Jun 2021' },
  { id: 8, joinDate: '17 Jul 2022', cardNo: '19560', name: 'Emma Garcia', className: 'Class 8 (B)', phone: '(+880) 1712 567 890', bookIssue: 1, issueDate: '10 Jul 2022', returnDate: '20 Jul 2022' },
  { id: 9, joinDate: '08 Aug 2023', cardNo: '20540', name: 'Liam Martinez', className: 'Class 9 (A)', phone: '(+880) 1785 112 223', bookIssue: 2, issueDate: '01 Aug 2023', returnDate: '12 Aug 2023' },
  { id: 10, joinDate: '02 Sep 2024', cardNo: '21500', name: 'Noah Anderson', className: 'Class 10 (C)', phone: '(+880) 1990 998 877', bookIssue: 6, issueDate: '28 Aug 2024', returnDate: '10 Sep 2024' },
  // Extra rows for pagination demo
  { id: 11, joinDate: '10 Oct 2025', cardNo: '22001', name: 'Sophia Brown', className: 'Class 1 (B)', phone: '(+1) 555 123 4567', bookIssue: 2, issueDate: '05 Oct 2025', returnDate: '20 Oct 2025' },
  { id: 12, joinDate: '15 Nov 2025', cardNo: '22502', name: 'Mason Davis', className: 'Class 2 (A)', phone: '(+44) 789 456 1230', bookIssue: 3, issueDate: '10 Nov 2025', returnDate: '25 Nov 2025' },
];

const MembersList = () => {
  // ---------- State ----------
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Drawer states
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({ open: false, memberId: null, memberName: '' });

  // ---------- Filtered data ----------
  const filteredMembers = useMemo(() => {
    return members.filter((member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.cardNo.toLowerCase().includes(search.toLowerCase()) ||
      member.className.toLowerCase().includes(search.toLowerCase())
    );
  }, [members, search]);

  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredMembers.slice(start, start + rowsPerPage);
  }, [filteredMembers, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredMembers.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedMembers.map((m) => m.id));
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
    setEditingMember(null);
    setAddDrawerOpen(true);
  };

  const openEditDrawer = (member) => {
    setEditingMember(member);
    setEditDrawerOpen(true);
  };

  const closeAddDrawer = () => setAddDrawerOpen(false);
  const closeEditDrawer = () => {
    setEditDrawerOpen(false);
    setEditingMember(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const libraryCardNo = formData.get('libraryCardNo');
    const memberClass = formData.get('memberClass');
    const section = formData.get('section');
    const student = formData.get('student');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const joinDate = formData.get('joinDate');
    const subject = formData.get('subject');
    const book = formData.get('book');
    const issueDate = formData.get('issueDate');
    const returnDate = formData.get('returnDate');

    // For demo, create a new member entry
    const newId = Math.max(...members.map((m) => m.id), 0) + 1;
    const newMember = {
      id: newId,
      joinDate: joinDate ? new Date(joinDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ') : joinDate,
      cardNo: libraryCardNo,
      name: student, // placeholder – you'd fetch student name from selection
      className: `${memberClass} (${section})`,
      phone,
      bookIssue: 1, // placeholder
      issueDate: issueDate ? new Date(issueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ') : issueDate,
      returnDate: returnDate ? new Date(returnDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ') : returnDate,
    };
    setMembers([...members, newMember]);
    closeAddDrawer();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const libraryCardNo = formData.get('libraryCardNo');
    const memberClass = formData.get('memberClass');
    const section = formData.get('section');
    const student = formData.get('student');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const joinDate = formData.get('joinDate');

    if (editingMember) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === editingMember.id
            ? {
                ...m,
                cardNo: libraryCardNo,
                name: student,
                className: `${memberClass} (${section})`,
                phone,
                joinDate: joinDate ? new Date(joinDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ') : joinDate,
              }
            : m
        )
      );
    }
    closeEditDrawer();
  };

  const openDeleteModal = (member) => {
    setDeleteModal({ open: true, memberId: member.id, memberName: member.name });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, memberId: null, memberName: '' });
  };

  const confirmDelete = () => {
    setMembers((prev) => prev.filter((m) => m.id !== deleteModal.memberId));
    setSelectedIds((prev) => prev.filter((id) => id !== deleteModal.memberId));
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
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Members List</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Members List</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={openAddDrawer}
        >
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>
          Add Member
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
                          checked={paginatedMembers.length > 0 && selectedIds.length === paginatedMembers.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Join Date</th>
                    <th scope="col">Card No</th>
                    <th scope="col">Student Name</th>
                    <th scope="col">Class</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Book Issue</th>
                    <th scope="col">Issue Date</th>
                    <th scope="col">Return Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMembers.map((member, index) => {
                    const isSelected = selectedIds.includes(member.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <tr key={member.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(member.id)}
                            />
                            <label className="form-check-label">{sl.toString().padStart(2, '0')}</label>
                          </div>
                        </td>
                        <td>{member.joinDate}</td>
                        <td>{member.cardNo}</td>
                        <td>{member.name}</td>
                        <td>{member.className}</td>
                        <td>{member.phone}</td>
                        <td>{member.bookIssue}</td>
                        <td>{member.issueDate}</td>
                        <td>{member.returnDate}</td>
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
                                <Link
                                  to="/library/members/details"
                                  state={{ member }}
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                >
                                  <i className="ri-eye-line"></i> View
                                </Link>
                              </li>
                              <li>
                                <button
                                  type="button"
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openEditDrawer(member)}
                                >
                                  <i className="ri-edit-2-line"></i> Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => alert('Issue Book')}
                                >
                                  <i className="ri-book-open-line"></i> Issue Book
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openDeleteModal(member)}
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
                  {paginatedMembers.length === 0 && (
                    <tr>
                      <td colSpan="10" className="text-center py-20">
                        No members found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredMembers.length > 0 && (
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

      {/* Add Member Drawer */}
      <SlideDrawer
        isOpen={addDrawerOpen}
        onClose={closeAddDrawer}
        title="Add Member"
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
                placeholder="Enter library card no"
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
                placeholder="Enter class"
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
                placeholder="Enter section"
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
                <option value="Emily Johnson">Emily Johnson</option>
                <option value="Michael Brown">Michael Brown</option>
                <option value="Sarah Lee">Sarah Lee</option>
                <option value="William Smith">William Smith</option>
                <option value="Olivia White">Olivia White</option>
                <option value="James Wilson">James Wilson</option>
                <option value="Emma Garcia">Emma Garcia</option>
                <option value="Liam Martinez">Liam Martinez</option>
                <option value="Noah Anderson">Noah Anderson</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="email" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="phone" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Enter phone number"
                required
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="joinDate" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Join Date
              </label>
              <input
                type="date"
                className="form-control"
                id="joinDate"
                name="joinDate"
                required
              />
            </div>

            {/* Book Issue Section */}
            <div className="col-sm-12">
              <h6 className="text-lg mt-16">Book Issue</h6>
            </div>
            <div className="col-sm-6">
              <label htmlFor="subject" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Select Subject
              </label>
              <select
                id="subject"
                name="subject"
                className="form-control form-select"
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
              >
                <option value="" disabled selected>Select a book</option>
                <option value="The Little Prince">The Little Prince</option>
                <option value="Advanced Algebra">Advanced Algebra</option>
                <option value="Physics for Beginners">Physics for Beginners</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="issueDate" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Issue Date
              </label>
              <input
                type="date"
                className="form-control"
                id="issueDate"
                name="issueDate"
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="returnDate" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Return Date
              </label>
              <input
                type="date"
                className="form-control"
                id="returnDate"
                name="returnDate"
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

      {/* Edit Member Drawer */}
      <SlideDrawer
        isOpen={editDrawerOpen}
        onClose={closeEditDrawer}
        title="Edit Member"
      >
        <form onSubmit={handleEditSubmit} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="libraryCardNoEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Library Card No
              </label>
              <input
                type="text"
                className="form-control"
                id="libraryCardNoEdit"
                name="libraryCardNo"
                defaultValue={editingMember?.cardNo || ''}
                placeholder="Enter library card no"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="memberClassEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Class
              </label>
              <input
                type="text"
                className="form-control"
                id="memberClassEdit"
                name="memberClass"
                defaultValue={editingMember?.className?.split(' ')[1] || ''}
                placeholder="Enter class"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="sectionEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Section
              </label>
              <input
                type="text"
                className="form-control"
                id="sectionEdit"
                name="section"
                defaultValue={editingMember?.className?.match(/\(([^)]+)\)/)?.[1] || ''}
                placeholder="Enter section"
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="studentEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Student
              </label>
              <select
                id="studentEdit"
                name="student"
                className="form-control form-select"
                defaultValue={editingMember?.name || ''}
                required
              >
                <option value="" disabled>Select Student</option>
                <option value="Jon Dev">Jon Dev</option>
                <option value="Emily Johnson">Emily Johnson</option>
                <option value="Michael Brown">Michael Brown</option>
                <option value="Sarah Lee">Sarah Lee</option>
                <option value="William Smith">William Smith</option>
                <option value="Olivia White">Olivia White</option>
                <option value="James Wilson">James Wilson</option>
                <option value="Emma Garcia">Emma Garcia</option>
                <option value="Liam Martinez">Liam Martinez</option>
                <option value="Noah Anderson">Noah Anderson</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="emailEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="emailEdit"
                name="email"
                defaultValue={editingMember?.email || ''}
                placeholder="Enter email"
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="phoneEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneEdit"
                name="phone"
                defaultValue={editingMember?.phone || ''}
                placeholder="Enter phone number"
                required
              />
            </div>
            <div className="col-sm-12">
              <label htmlFor="joinDateEdit" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Join Date
              </label>
              <input
                type="date"
                className="form-control"
                id="joinDateEdit"
                name="joinDate"
                defaultValue={editingMember?.joinDate || ''}
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
        title={`Delete Member`}
        message={`Are you sure you want to delete ${deleteModal.memberName}?`}
        confirmText="Yes, Delete"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />
    </div>
  );
};

export default MembersList;