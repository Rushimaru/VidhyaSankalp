import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/* Toast */
const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const add = (message, type = 'success') => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
  };
  return { toasts, success: (m) => add(m, 'success'), error: (m) => add(m, 'error') };
};

const Toast = ({ toasts }) => (
  <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
    {toasts.map((t) => (
      <div key={t.id} style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 18px', borderRadius: 10, minWidth: 280, maxWidth: 380,
        background: t.type === 'success' ? '#16a34a' : '#dc2626',
        color: '#fff', fontWeight: 600, fontSize: 14,
        boxShadow: '0 4px 20px rgba(0,0,0,0.18)', animation: 'slideIn .3s ease',
      }}>
        <span style={{ fontSize: 18 }}>{t.type === 'success' ? '✅' : '❌'}</span>
        {t.message}
      </div>
    ))}
    <style>{`@keyframes slideIn{from{opacity:0;transform:translateX(60px)}to{opacity:1;transform:translateX(0)}}`}</style>
  </div>
);

/* Helpers */
const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
};

const getInitials = (name = '') =>
  name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();

const AVATAR_COLORS = ['#4f46e5','#0891b2','#059669','#d97706','#dc2626','#7c3aed'];
const avatarColor = (name = '') =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

/* Main Component  */
const TeacherList = () => {
  const { token } = useAuth();
  const { toasts, success, error } = useToast();

  // ── Data ──
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [deleting, setDeleting] = useState(false);

  // ── Filters ──
  const [filters, setFilters] = useState({ department: '', status: '' });
  const [search, setSearch]   = useState('');

  // ── Selection & modal ──
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ open: false, teacherId: null, teacherName: '' });

  // ── Pagination ──
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  /* ── Fetch teachers for this school ── */
  const fetchTeachers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/teachers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch teachers.');
      setTeachers(data);
    } catch (err) {
      error(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchTeachers(); }, [fetchTeachers]);

  /* ── Filter + search ── */
  const filteredTeachers = useMemo(() => {
    return teachers.filter((t) => {
      const matchesSearch =
        search === '' ||
        t.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        t.employeeId?.toLowerCase().includes(search.toLowerCase()) ||
        t.email?.toLowerCase().includes(search.toLowerCase()) ||
        t.phoneNumber?.includes(search);

      const matchesDept   = filters.department === '' || t.department === filters.department;
      const matchesStatus =
        filters.status === '' ||
        (filters.status === 'Active' ? t.isActive === true : t.isActive === false);

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [teachers, filters, search]);

  /* ── Pagination ── */
  const totalPages = Math.max(1, Math.ceil(filteredTeachers.length / rowsPerPage));

  const paginatedTeachers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredTeachers.slice(start, start + rowsPerPage);
  }, [filteredTeachers, currentPage, rowsPerPage]);

  /* ── Handlers ── */
  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ department: '', status: '' });
    setSearch('');
    setCurrentPage(1);
  };

  const handleSearch    = (e) => { setSearch(e.target.value); setCurrentPage(1); };
  const handleSelectAll = (e) => setSelectedIds(e.target.checked ? paginatedTeachers.map((t) => t._id) : []);
  const handleSelectRow = (id) => setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  const openDeleteModal  = (t) => setDeleteModal({ open: true, teacherId: t._id, teacherName: t.fullName });
  const closeDeleteModal = () => setDeleteModal({ open: false, teacherId: null, teacherName: '' });

  /* ── Delete ── */
  const confirmDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/teachers/${deleteModal.teacherId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete teacher.');
      setTeachers((prev) => prev.filter((t) => t._id !== deleteModal.teacherId));
      setSelectedIds((prev) => prev.filter((id) => id !== deleteModal.teacherId));
      success(`"${deleteModal.teacherName}" deleted successfully.`);
      closeDeleteModal();
    } catch (err) {
      error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  /* ── Toggle active status ── */
  const toggleStatus = async (teacher) => {
    try {
      const response = await fetch(`/api/teachers/${teacher._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !teacher.isActive }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update status.');
      setTeachers((prev) =>
        prev.map((t) => t._id === teacher._id ? { ...t, isActive: !t.isActive } : t)
      );
      success(`Status updated for "${teacher.fullName}".`);
    } catch (err) {
      error(err.message);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  /* ── Unique departments for filter ── */
  const departments = useMemo(() =>
    [...new Set(teachers.map((t) => t.department).filter(Boolean))].sort(),
  [teachers]);

  /* Render */
  return (
    <div className="dashboard-main-body">
      <Toast toasts={toasts} />

      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Teacher List</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Teacher List</span>
          </div>
        </div>
        <Link to="/teachers/add" className="btn btn-primary-600 d-flex align-items-center gap-6">
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>
          Add Teacher
        </Link>
      </div>

      {/* Main Card */}
      <div className="mt-24">
        <div className="card h-100">
          <div className="card-body p-0 dataTable-wrapper">

            {/* Toolbar */}
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-16 px-20 py-12 border-bottom border-neutral-200">
              <div className="d-flex flex-wrap align-items-center gap-16">

                {/* Export */}
                <div className="dropdown">
                  <button
                    type="button"
                    className="px-12 py-5-px border border-neutral-300 radius-8 d-flex align-items-center gap-20"
                    data-bs-toggle="dropdown" aria-expanded="false"
                  >
                    <span className="d-flex align-items-center gap-1 text-secondary-light text-sm">
                      <i className="ri-file-upload-line text-md line-height-1"></i> Export
                    </span>
                    <i className="ri-arrow-down-s-line"></i>
                  </button>
                  <ul className="dropdown-menu p-12 border bg-base shadow">
                    <li>
                      <button type="button" className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-10">
                        <i className="ri-file-3-line"></i> PDF
                      </button>
                    </li>
                    <li>
                      <button type="button" className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-10">
                        <i className="ri-file-excel-line"></i> Excel
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Search */}
                <form className="navbar-search dt-search m-0" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text" className="dt-input bg-transparent radius-4"
                    placeholder="Search name, ID, email..."
                    value={search} onChange={handleSearch}
                  />
                  <iconify-icon icon="ion:search-outline" className="icon"></iconify-icon>
                </form>

                {/* Filter */}
                <div className="dropdown">
                  <button
                    type="button"
                    className="px-12 py-5-px border border-neutral-300 radius-8 d-flex align-items-center gap-20"
                    data-bs-toggle="dropdown" aria-expanded="false"
                  >
                    <span className="d-flex align-items-center gap-1 text-secondary-light text-sm">
                      <i className="ri-filter-3-line text-md"></i> Filter
                    </span>
                    <i className="ri-arrow-down-s-line"></i>
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
                          <label htmlFor="department" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">Department</label>
                          <select id="department" className="form-control form-select" value={filters.department} onChange={handleFilterChange}>
                            <option value="">All Departments</option>
                            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </div>
                        <div className="col-12">
                          <label htmlFor="status" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">Status</label>
                          <select id="status" className="form-control form-select" value={filters.status} onChange={handleFilterChange}>
                            <option value="">All</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                        <div className="col-6">
                          <button type="reset" className="btn btn-danger-200 text-danger-600 w-100" onClick={resetFilters}>Reset</button>
                        </div>
                        <div className="col-6">
                          <button type="button" className="btn btn-primary-600 w-100" onClick={() => document.activeElement?.blur()}>Apply</button>
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
                    className="dt-input form-control form-select" value={rowsPerPage}
                    onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                  >
                    {[5, 10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="p-0">
              <table className="table bordered-table mb-0 data-table">
                <thead>
                  <tr>
                    <th scope="col">Employee ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Department</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Subjects</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Join Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>

                  {/* Loading skeleton */}
                  {loading && Array.from({ length: 6 }).map((_, i) => (
                    <tr key={`sk-${i}`}>
                      {Array.from({ length: 10 }).map((_, j) => (
                        <td key={j}>
                          <div style={{
                            height: 14, borderRadius: 4,
                            background: 'linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)',
                            backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite',
                          }} />
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Data rows */}
                  {!loading && paginatedTeachers.map((teacher, index) => {
                    const isSelected = selectedIds.includes(teacher._id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <tr key={teacher._id}>
                        <td><span className="text-primary-600">{teacher.employeeId}</span></td>
                        <td>
                          <div className="d-flex align-items-center gap-10">
                            {/* Initials avatar */}
                            <div
                              className="flex-shrink-0 d-flex align-items-center justify-content-center fw-bold radius-8"
                              style={{
                                width: 40, height: 40, borderRadius: 8, fontSize: 14,
                                background: `${avatarColor(teacher.fullName)}22`,
                                color: avatarColor(teacher.fullName),
                              }}
                            >
                              {getInitials(teacher.fullName)}
                            </div>
                            <div>
                              <h6 className="text-md mb-0 fw-medium">{teacher.fullName}</h6>
                              <span className="text-sm text-secondary-light">{teacher.email}</span>
                            </div>
                          </div>
                        </td>
                        <td>{teacher.department || '—'}</td>
                        <td>{teacher.designation || '—'}</td>
                        <td>
                          {teacher.subjectsTaught?.length
                            ? teacher.subjectsTaught.join(', ')
                            : '—'}
                        </td>
                        <td>{teacher.phoneNumber}</td>
                        <td>{formatDate(teacher.joinDate)}</td>
                        <td>
                          <span className={`${teacher.isActive ? 'bg-success-100 text-success-600' : 'bg-danger-100 text-danger-600'} px-24 py-4 radius-4 fw-medium text-sm`}>
                            {teacher.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group">
                            <button
                              type="button" className="text-primary-light text-xl"
                              data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false"
                            >
                              <iconify-icon icon="tabler:dots-vertical"></iconify-icon>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-lg-end border p-12">
                              <li>
                                <Link
                                  to={`/teachers/${teacher._id}`}
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                >
                                  <i className="ri-eye-line"></i> View
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to={`/teachers/edit/${teacher._id}`}
                                  state={{ teacher }}
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                >
                                  <i className="ri-edit-2-line"></i> Edit
                                </Link>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => toggleStatus(teacher)}
                                >
                                  <i className={`ri-${teacher.isActive ? 'pause' : 'play'}-circle-line`}></i>
                                  {teacher.isActive ? 'Set Inactive' : 'Set Active'}
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openDeleteModal(teacher)}
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

                  {/* Empty state */}
                  {!loading && paginatedTeachers.length === 0 && (
                    <tr>
                      <td colSpan="10" className="text-center py-40">
                        <div style={{ fontSize: 48, marginBottom: 12 }}>👨‍🏫</div>
                        <p className="text-secondary-light mb-0">No teachers found.</p>
                        {(search || Object.values(filters).some(Boolean)) && (
                          <button className="btn btn-sm btn-primary-600 mt-12" onClick={resetFilters}>
                            Clear Filters
                          </button>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <style>{`
                @keyframes shimmer {
                  0%   { background-position: 200% 0; }
                  100% { background-position: -200% 0; }
                }
              `}</style>
            </div>

            {/* Pagination */}
            {!loading && filteredTeachers.length > 0 && (
              <div className="d-flex justify-content-between align-items-center gap-3 px-20 py-16 border-top">
                <span className="text-secondary-light text-sm">
                  Showing {(currentPage - 1) * rowsPerPage + 1}–{Math.min(currentPage * rowsPerPage, filteredTeachers.length)} of {filteredTeachers.length} teachers
                </span>
                <div className="d-flex align-items-center gap-8">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => goToPage(currentPage - 1)}
                  >
                    <i className="ri-arrow-left-s-line"></i> Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                    .reduce((acc, p, i, arr) => {
                      if (i > 0 && p - arr[i - 1] > 1) acc.push('...');
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((p, i) =>
                      p === '...'
                        ? <span key={`dot-${i}`} className="px-8 text-secondary-light">…</span>
                        : <button
                            key={p}
                            className={`btn btn-sm ${currentPage === p ? 'btn-primary-600' : 'btn-outline-secondary'}`}
                            onClick={() => goToPage(p)}
                          >{p}</button>
                    )
                  }

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => goToPage(currentPage + 1)}
                  >
                    Next <i className="ri-arrow-right-s-line"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModal.open && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-sm modal-dialog-centered max-w-340-px">
            <div className="modal-content radius-16 bg-base">
              <div className="modal-body pt-32 px-36 pb-24 text-center">
                <span className="mb-16 fs-1 line-height-1 text-danger">
                  <iconify-icon icon="fluent:delete-24-regular"></iconify-icon>
                </span>
                <h6 className="text-lg fw-semibold text-primary-light mb-0">
                  Are you sure you want to delete <br />
                  <span className="text-danger-600">"{deleteModal.teacherName}"</span>?
                </h6>
                <p className="text-sm text-secondary-light mt-8 mb-0">This action cannot be undone.</p>
                <div className="d-flex align-items-center justify-content-center gap-3 mt-24">
                  <button
                    type="button"
                    className="flex-grow-1 border border-neutral-400 bg-hover-neutral-200 text-secondary-light text-md px-24 py-11 radius-8"
                    onClick={closeDeleteModal} disabled={deleting}
                    style={{ background: 'none', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="flex-grow-1 btn btn-danger-600 border border-danger-600 text-md px-16 py-12 radius-8"
                    onClick={confirmDelete} disabled={deleting}
                  >
                    {deleting
                      ? <><span className="spinner-border spinner-border-sm me-2" />Deleting…</>
                      : 'Yes, Delete'
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherList;