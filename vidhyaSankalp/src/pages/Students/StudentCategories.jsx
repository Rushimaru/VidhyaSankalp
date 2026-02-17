import React, { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import ConfirmModal from "../../components/ConfirmModal";

// Sample category data (extracted from HTML)
const initialCategories = [
  { id: 1, name: "General", status: "Active" },
  { id: 2, name: "Special", status: "Inactive" },
  { id: 3, name: "Physically Challenged", status: "Active" },
  { id: 4, name: "General", status: "Inactive" },
  { id: 5, name: "Special", status: "Active" },
  { id: 6, name: "Physically Challenged", status: "Inactive" },
  { id: 7, name: "General", status: "Active" },
  { id: 8, name: "Special", status: "Inactive" },
  { id: 9, name: "Physically Challenged", status: "Active" },
  { id: 10, name: "General", status: "Inactive" },
];

const StudentCategories = () => {
  // ---------- State ----------
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Sidebar (add/edit) state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // { id, name, status } or null for add

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    categoryId: null,
    categoryName: "",
  });

  // Ref for focusing the name input when offcanvas opens
  const nameInputRef = useRef(null);

  // ---------- Filtered data ----------
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [categories, search]);

  const paginatedCategories = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredCategories.slice(start, start + rowsPerPage);
  }, [filteredCategories, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedCategories.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const openAddSidebar = () => {
    setEditingCategory(null);
    setSidebarOpen(true);
  };

  const openEditSidebar = (category) => {
    setEditingCategory(category);
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setEditingCategory(null);
  };

  const handleSubmitCategory = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const status = formData.get("status");

    if (editingCategory) {
      // Edit existing
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id ? { ...c, name, status } : c,
        ),
      );
    } else {
      // Add new
      const newId = Math.max(...categories.map((c) => c.id), 0) + 1;
      setCategories([...categories, { id: newId, name, status }]);
    }
    closeSidebar();
  };

  const openDeleteModal = (category) => {
    setDeleteModal({
      open: true,
      categoryId: category.id,
      categoryName: category.name,
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ open: false, categoryId: null, categoryName: "" });
  };

  const confirmDelete = () => {
    setCategories((prev) =>
      prev.filter((c) => c.id !== deleteModal.categoryId),
    );
    setSelectedIds((prev) =>
      prev.filter((id) => id !== deleteModal.categoryId),
    );
    closeDeleteModal();
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const exportPDF = () => alert("Export as PDF");
  const exportExcel = () => alert("Export as Excel");

  return (
    <div className="dashboard-main-body">
      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h6 className="fw-semibold mb-4">Student Categories</h6>
          <div>
            <Link
              to="/"
              className="text-secondary-light hover-text-primary hover-underline"
            >
              Dashboard
            </Link>
            <span className="text-secondary-light"> / Student Categories</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={openAddSidebar}
        >
          <span className="d-flex text-md">
            <i className="ri-add-large-line"></i>
          </span>
          New Category
        </button>
      </div>

      {/* Main Card */}
      <div className="mt-24">
        <div className="card h-100">
          <div className="card-body dataTable-wrapper p-0">
            {/* Toolbar */}
            <div className="d-flex flex-wrap align-items-center gap-16 px-20 py-12 border-bottom border-neutral-200">
              {/* Export Dropdown */}
              <div className="dropdown">
                <button
                  type="button"
                  className="px-12 py-5-px border border-neutral-300 radius-8 d-flex align-items-center gap-20"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="d-flex align-items-center gap-1 text-secondary-light text-sm">
                    <i className="ri-file-upload-line text-md line-height-1"></i>
                    Export
                  </span>
                  <span>
                    <i className="ri-arrow-down-s-line"></i>
                  </span>
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
              <form
                className="navbar-search dt-search m-0"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  className="dt-input bg-transparent radius-4"
                  placeholder="Search..."
                  value={search}
                  onChange={handleSearch}
                />
                <iconify-icon
                  icon="ion:search-outline"
                  className="icon"
                ></iconify-icon>
              </form>
            </div>

            {/* Table */}
            <div className="p-0">
              <table className="table data-table bordered-table mb-0">
                <thead>
                  <tr>
                    <th scope="col">
                      <div className="form-check style-check d-flex align-items-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            paginatedCategories.length > 0 &&
                            selectedIds.length === paginatedCategories.length
                          }
                          onChange={handleSelectAll}
                        />
                        <label className="form-check-label"> S.L </label>
                      </div>
                    </th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedCategories.map((category, index) => {
                    const isSelected = selectedIds.includes(category.id);
                    const sl = (currentPage - 1) * rowsPerPage + index + 1;
                    return (
                      <tr key={category.id}>
                        <td>
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(category.id)}
                            />
                            <label className="form-check-label">
                              {sl.toString().padStart(2, "0")}
                            </label>
                          </div>
                        </td>
                        <td>{category.name}</td>
                        <td>
                          <span
                            className={`${
                              category.status === "Active"
                                ? "bg-success-100 text-success-600"
                                : "bg-danger-100 text-danger-600"
                            } px-24 py-4 radius-4 fw-medium text-sm`}
                          >
                            {category.status}
                          </span>
                        </td>
                        <td className="text-center">
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
                                  onClick={() => openEditSidebar(category)}
                                >
                                  <i className="ri-edit-2-line"></i> Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6"
                                  onClick={() => openDeleteModal(category)}
                                >
                                  <i className="ri-delete-bin-6-line"></i>{" "}
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {paginatedCategories.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-20">
                        No categories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredCategories.length > 0 && (
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

      {/* Bootstrap Offcanvas for Add/Edit – Customized to match HTML */}
      <Offcanvas
        show={sidebarOpen}
        onHide={closeSidebar}
        placement="end"
        className="max-w-700-px w-100"
        onEntered={() => nameInputRef.current?.focus()}
      >
        {/* Custom header (no default close button) */}
        <div className="px-20 py-12 border-bottom d-flex align-items-center justify-content-between gap-20">
          <h5 className="text-lg mb-0">
            {editingCategory
              ? "Edit Student Category"
              : "Add New Student Category"}
          </h5>
          <button
            type="button"
            className="close-my-sidebar text-danger-600 text-lg d-flex"
            onClick={closeSidebar}
          >
            <i className="ri-close-large-line"></i>
          </button>
        </div>

        <Offcanvas.Body className="p-20">
          <form
            onSubmit={handleSubmitCategory}
            className="d-flex flex-column gap-20"
          >
            <div>
              <label
                htmlFor="studentCategoryName"
                className="text-sm fw-semibold text-primary-light d-inline-block mb-8"
              >
                Student Category Name
              </label>
              <input
                ref={nameInputRef}
                type="text"
                className="form-control"
                id="studentCategoryName"
                name="name"
                defaultValue={editingCategory?.name || ""}
                placeholder="Enter Student Category Name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="studentStatus"
                className="text-sm fw-semibold text-primary-light d-inline-block mb-8"
              >
                Status
              </label>
              <select
                id="studentStatus"
                name="status"
                className="form-control form-select"
                defaultValue={editingCategory?.status || ""}
                required
              >
                <option value="" disabled>
                  Select a Status
                </option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="d-flex align-items-center justify-content-center gap-3 mt-8">
              <button
                type="button"
                className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-50 py-11 radius-8"
                onClick={closeSidebar}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary-600 text-md px-48 py-12 radius-8"
              >
                Save
              </button>
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Delete Confirmation Modal (reusable) */}
      <ConfirmModal
        show={deleteModal.open}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title={`Delete ${deleteModal.categoryName}?`}
        message="This category will be permanently removed."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />
    </div>
  );
};

export default StudentCategories;
