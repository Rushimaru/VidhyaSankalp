import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Sample exam result data (matching HTML)
const initialResults = [
  { id: 1, admissionNo: 'AD52365', name: 'Kathryn Murphy', image: 'avatar-img1.png', rollNo: '12', className: 'Class 1 (A)', exam: 'Monthly Test', grandTotal: 644, percent: 92, grade: 'A+', result: 'Pass' },
  { id: 2, admissionNo: 'AD52365', name: 'Kathryn Murphy', image: 'avatar-img1.png', rollNo: '12', className: 'Class 1 (A)', exam: 'Monthly Test', grandTotal: 644, percent: 92, grade: 'A+', result: 'Pass' }, // duplicate in HTML
  { id: 3, admissionNo: 'AD52366', name: 'Jerome Bell', image: 'avatar-img2.png', rollNo: '14', className: 'Class 2 (B)', exam: 'Final Exam', grandTotal: 578, percent: 82, grade: 'A', result: 'Pass' },
  { id: 4, admissionNo: 'AD52367', name: 'Theresa Webb', image: 'avatar-img3.png', rollNo: '16', className: 'Class 3 (C)', exam: 'Mid Term', grandTotal: 430, percent: 70, grade: 'B+', result: 'Pass' },
  { id: 5, admissionNo: 'AD52368', name: 'Cody Fisher', image: 'avatar-img4.png', rollNo: '19', className: 'Class 4 (A)', exam: 'Quarterly Test', grandTotal: 380, percent: 64, grade: 'B', result: 'Fail' },
  { id: 6, admissionNo: 'AD52369', name: 'Annette Black', image: 'avatar-img5.png', rollNo: '10', className: 'Class 5 (B)', exam: 'Final Exam', grandTotal: 698, percent: 96, grade: 'A+', result: 'Pass' },
  { id: 7, admissionNo: 'AD52370', name: 'Jenny Wilson', image: 'avatar-img6.png', rollNo: '07', className: 'Class 6 (A)', exam: 'Half Yearly', grandTotal: 612, percent: 89, grade: 'A', result: 'Pass' },
  { id: 8, admissionNo: 'AD52371', name: 'Darlene Robertson', image: 'avatar-img7.png', rollNo: '18', className: 'Class 7 (C)', exam: 'Monthly Test', grandTotal: 325, percent: 58, grade: 'C', result: 'Fail' },
  { id: 9, admissionNo: 'AD52372', name: 'Wade Warren', image: 'avatar-img8.png', rollNo: '22', className: 'Class 8 (A)', exam: 'Final Exam', grandTotal: 510, percent: 75, grade: 'B+', result: 'Pass' },
  { id: 10, admissionNo: 'AD52373', name: 'Esther Howard', image: 'avatar-img9.png', rollNo: '09', className: 'Class 9 (B)', exam: 'Mid Term', grandTotal: 285, percent: 46, grade: 'D', result: 'Fail' },
  { id: 11, admissionNo: 'AD52374', name: 'Guy Hawkins', image: 'avatar-img10.png', rollNo: '11', className: 'Class 10 (C)', exam: 'Final Exam', grandTotal: 715, percent: 98, grade: 'A+', result: 'Pass' },
];

const ExamResult = () => {
  // ---------- State ----------
  const [results, setResults] = useState(initialResults);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // ---------- Filtered data ----------
  const filteredResults = useMemo(() => {
    return results.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.admissionNo.toLowerCase().includes(search.toLowerCase()) ||
      r.className.toLowerCase().includes(search.toLowerCase()) ||
      r.exam.toLowerCase().includes(search.toLowerCase())
    );
  }, [results, search]);

  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredResults.slice(start, start + rowsPerPage);
  }, [filteredResults, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedResults.map((r) => r.id));
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

  const handleView = (result) => {
    alert(`View details for ${result.name}`);
    // You could navigate to a details page, e.g., navigate(`/exams/results/${result.id}`);
  };

  return (
    <div className="dashboard-main-body">
      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Exam Result</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Exam Result</span>
          </div>
        </div>
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
                          checked={paginatedResults.length > 0 && selectedIds.length === paginatedResults.length}
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Admission No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Roll No</th>
                    <th scope="col">Class</th>
                    <th scope="col">Exam</th>
                    <th scope="col">Grand Total</th>
                    <th scope="col">Percent (%)</th>
                    <th scope="col">Grade</th>
                    <th scope="col">Result</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedResults.map((result, index) => {
                    const isSelected = selectedIds.includes(result.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <tr key={result.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(result.id)}
                            />
                            <label className="form-check-label">{sl.toString().padStart(2, '0')}</label>
                          </div>
                        </td>
                        <td>
                          <span className="text-primary-600">{result.admissionNo}</span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={`/../src/assets/images/thumbs/${result.image}`}
                              alt={result.name}
                              className="flex-shrink-0 me-12 radius-8"
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            />
                            <div>
                              <h6 className="text-md mb-0 fw-medium">{result.name}</h6>
                            </div>
                          </div>
                        </td>
                        <td>{result.rollNo}</td>
                        <td>{result.className}</td>
                        <td>{result.exam}</td>
                        <td>{result.grandTotal}</td>
                        <td>{result.percent}</td>
                        <td>{result.grade}</td>
                        <td>
                          <span
                            className={`${
                              result.result === 'Pass'
                                ? 'bg-success-100 text-success-600'
                                : 'bg-danger-100 text-danger-600'
                            } px-16 py-2 radius-4 fw-medium text-sm`}
                          >
                            {result.result}
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
                                  onClick={() => handleView(result)}
                                >
                                  <i className="ri-eye-line"></i> View
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {paginatedResults.length === 0 && (
                    <tr>
                      <td colSpan="11" className="text-center py-20">
                        No results found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredResults.length > 0 && (
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
  );
};

export default ExamResult;