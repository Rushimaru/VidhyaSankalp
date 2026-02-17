import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Sample timetable data (you can replace with API data)
const timetableData = [
  {
    day: 'Monday',
    classes: [
      { id: 1, className: '1 (A)', subject: 'Math', room: '16', time: '09:00 AM - 09:45 AM', color: 'warning' },
      { id: 2, className: '2 (B)', subject: 'English', room: '10', time: '09:50 AM - 10:35 AM', color: 'info' },
      { id: 3, className: '3 (A)', subject: 'Science', room: '22', time: '10:40 AM - 11:25 AM', color: 'success' },
      { id: 4, className: '4 (C)', subject: 'History', room: '8', time: '11:30 AM - 12:15 PM', color: 'danger' },
      { id: 5, className: '5 (B)', subject: 'CSE', room: '25', time: '12:20 PM - 01:05 PM', color: 'primary' },
    ],
  },
  {
    day: 'Tuesday',
    classes: [
      { id: 6, className: '1 (A)', subject: 'Math', room: '16', time: '09:00 AM - 09:45 AM', color: 'warning' },
      { id: 7, className: '2 (B)', subject: 'English', room: '10', time: '09:50 AM - 10:35 AM', color: 'info' },
      { id: 8, className: '3 (A)', subject: 'Science', room: '22', time: '10:40 AM - 11:25 AM', color: 'success' },
      { id: 9, className: '4 (C)', subject: 'History', room: '8', time: '11:30 AM - 12:15 PM', color: 'danger' },
      { id: 10, className: '5 (B)', subject: 'CSE', room: '25', time: '12:20 PM - 01:05 PM', color: 'primary' },
    ],
  },
  {
    day: 'Wednesday',
    classes: [
      { id: 11, className: '1 (A)', subject: 'Math', room: '16', time: '09:00 AM - 09:45 AM', color: 'warning' },
      { id: 12, className: '2 (B)', subject: 'English', room: '10', time: '09:50 AM - 10:35 AM', color: 'info' },
      { id: 13, className: '3 (A)', subject: 'Science', room: '22', time: '10:40 AM - 11:25 AM', color: 'success' },
      { id: 14, className: '4 (C)', subject: 'History', room: '8', time: '11:30 AM - 12:15 PM', color: 'danger' },
      { id: 15, className: '5 (B)', subject: 'CSE', room: '25', time: '12:20 PM - 01:05 PM', color: 'primary' },
    ],
  },
  {
    day: 'Thursday',
    classes: [
      { id: 16, className: '1 (A)', subject: 'Math', room: '16', time: '09:00 AM - 09:45 AM', color: 'warning' },
      { id: 17, className: '2 (B)', subject: 'English', room: '10', time: '09:50 AM - 10:35 AM', color: 'info' },
      { id: 18, className: '3 (A)', subject: 'Science', room: '22', time: '10:40 AM - 11:25 AM', color: 'success' },
      { id: 19, className: '4 (C)', subject: 'History', room: '8', time: '11:30 AM - 12:15 PM', color: 'danger' },
      { id: 20, className: '5 (B)', subject: 'CSE', room: '25', time: '12:20 PM - 01:05 PM', color: 'primary' },
    ],
  },
  {
    day: 'Friday',
    classes: [
      { id: 21, className: '1 (A)', subject: 'Math', room: '16', time: '09:00 AM - 09:45 AM', color: 'warning' },
      { id: 22, className: '2 (B)', subject: 'English', room: '10', time: '09:50 AM - 10:35 AM', color: 'info' },
      { id: 23, className: '3 (A)', subject: 'Science', room: '22', time: '10:40 AM - 11:25 AM', color: 'success' },
      { id: 24, className: '4 (C)', subject: 'History', room: '8', time: '11:30 AM - 12:15 PM', color: 'danger' },
      { id: 25, className: '5 (B)', subject: 'CSE', room: '25', time: '12:20 PM - 01:05 PM', color: 'primary' },
    ],
  },
  {
    day: 'Saturday',
    classes: [
      { id: 26, className: '1 (A)', subject: 'Math', room: '16', time: '09:00 AM - 09:45 AM', color: 'warning' },
      { id: 27, className: '2 (B)', subject: 'English', room: '10', time: '09:50 AM - 10:35 AM', color: 'info' },
      { id: 28, className: '3 (A)', subject: 'Science', room: '22', time: '10:40 AM - 11:25 AM', color: 'success' },
      { id: 29, className: '4 (C)', subject: 'History', room: '8', time: '11:30 AM - 12:15 PM', color: 'danger' },
      { id: 30, className: '5 (B)', subject: 'CSE', room: '25', time: '12:20 PM - 01:05 PM', color: 'primary' },
    ],
  },
  {
    day: 'Sunday',
    classes: [{ id: 31, className: 'Holiday', color: 'secondary' }], // special holiday card
  },
];

const TeacherTimetable = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Form state for new timetable entry
  const [formData, setFormData] = useState({
    day: '',
    teacher: '',
    class: '',
    subject: '',
    room: '',
    fromDate: '',
  });

  // Close sidebar and overlay
  const closeSidebar = () => setSidebarOpen(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Timetable Entry:', formData);
    // Here you would send data to API
    alert('Timetable entry added (demo)');
    closeSidebar();
    // Reset form
    setFormData({ day: '', teacher: '', class: '', subject: '', room: '', fromDate: '' });
  };

  // Export functions (placeholders)
  const exportPDF = () => alert('Export as PDF');
  const exportExcel = () => alert('Export as Excel');

  return (
    <div className="dashboard-main-body">
      {/* Overlay for sidebar */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Teacher Timetable</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Teacher Timetable</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="d-flex text-md">
            <i className="ri-add-large-line"></i>
          </span>
          Add Timetable
        </button>
      </div>

      {/* Main Card */}
      <div className="mt-24">
        <div className="card h-100">
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
                  className="item-search-input dt-input bg-transparent radius-4"
                  name="search"
                  placeholder="Search..."
                />
                <iconify-icon icon="ion:search-outline" className="icon"></iconify-icon>
              </form>

              {/* Filter Dropdown */}
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
                    <button type="button"><i className="ri-close-large-line"></i></button>
                  </div>
                  <form className="p-16" onSubmit={(e) => e.preventDefault()}>
                    <div className="row g-3">
                      <div className="col-12">
                        <label htmlFor="subject" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">Subject</label>
                        <select id="subject" className="form-control form-select">
                          <option value="">Select Subject</option>
                          <option value="Math">Math</option>
                          <option value="English">English</option>
                          <option value="Science">Science</option>
                          <option value="History">History</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label htmlFor="status" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">Status</label>
                        <select id="status" className="form-control form-select">
                          <option value="">Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                      <div className="col-6">
                        <button type="reset" className="btn btn-danger-200 text-danger-600 w-100">Reset</button>
                      </div>
                      <div className="col-6">
                        <button type="submit" className="btn btn-primary-600 w-100">Apply</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Timetable Cards - Horizontal Scroll */}
          <div className="card-body p-20 d-flex flex-column gap-20">
            <div className="overflow-x-auto d-flex scroll-sm pb-8">
              <div className="d-flex gap-16 flex-shrink-0 flex-grow-1">
                {timetableData.map((dayData) => (
                  <div key={dayData.day} className="flex-grow-1" style={{ minWidth: '280px' }}>
                    <h6 className="text-md mb-8">{dayData.day}</h6>
                    <div className="d-flex flex-column gap-16">
                      {dayData.classes.map((cls) => (
                        <div key={cls.id} className="attendance-card border radius-8 overflow-hidden">
                          {cls.className === 'Holiday' ? (
                            <h6 className="text-sm bg-secondary-100 text-secondary-600 fw-semibold py-10 px-16 text-center mb-0 card-title">
                              {cls.className}
                            </h6>
                          ) : (
                            <>
                              <h6 className={`text-sm bg-${cls.color}-100 text-${cls.color}-600 fw-semibold py-10 px-16 text-center mb-0 card-title`}>
                                Class: {cls.className}
                              </h6>
                              <div className="px-10 py-16 d-flex flex-column gap-10">
                                <div className="d-flex align-items-center gap-8">
                                  <span className="d-flex line-height-1 text-secondary-light text-lg">
                                    <i className="ri-book-open-line"></i>
                                  </span>
                                  <div className="text-primary-light text-sm d-flex">
                                    <span className="w-64-px flex-shrink-0">Subject</span>
                                    <span className="flex-grow-1">: {cls.subject}</span>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center gap-8">
                                  <span className="d-flex line-height-1 text-secondary-light text-lg">
                                    <i className="ri-building-4-line"></i>
                                  </span>
                                  <div className="text-primary-light text-sm d-flex">
                                    <span className="w-64-px flex-shrink-0">Room No</span>
                                    <span className="flex-grow-1">: {cls.room}</span>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center gap-8">
                                  <span className="d-flex line-height-1 text-secondary-light text-lg">
                                    <i className="ri-time-line"></i>
                                  </span>
                                  <div className="text-primary-light text-sm d-flex">
                                    <span className="flex-grow-1">{cls.time}</span>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Timetable Sidebar (Custom) */}
      <div className={`my-sidebar bg-white position-fixed end-0 top-0 h-100vh overflow-y-auto z-99 max-w-700-px w-100 translate-x-full duration-300 ${sidebarOpen ? 'active-translate-0' : ''}`}>
        <div className="px-20 py-12 border-bottom d-flex align-items-center justify-content-between gap-20">
          <h5 className="text-lg mb-0">Add New Timetable</h5>
          <button type="button" className="close-my-sidebar text-danger-600 text-lg d-flex" onClick={closeSidebar}>
            <i className="ri-close-large-line"></i>
          </button>
        </div>
        <form className="d-flex flex-column p-20" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="day" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">Day</label>
              <select
                id="day"
                className="form-control form-select"
                value={formData.day}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select a Day</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="teacher" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">Teacher</label>
              <select
                id="teacher"
                className="form-control form-select"
                value={formData.teacher}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select a teacher</option>
                <option value="John Doe">John Doe</option>
                <option value="John Alex">John Alex</option>
                <option value="Bill Gets">Bill Gets</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="class" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">Class</label>
              <select
                id="class"
                className="form-control form-select"
                value={formData.class}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select a class</option>
                <option value="One">One</option>
                <option value="Two">Two</option>
                <option value="Three">Three</option>
                <option value="Four">Four</option>
                <option value="Five">Five</option>
                <option value="Six">Six</option>
                <option value="Seven">Seven</option>
                <option value="Eight">Eight</option>
                <option value="Nine">Nine</option>
                <option value="Ten">Ten</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="subject" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">Subject</label>
              <select
                id="subject"
                className="form-control form-select"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select a subject</option>
                <option value="Math">Math</option>
                <option value="English">English</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="CSE">CSE</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="room" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">Room No</label>
              <select
                id="room"
                className="form-control form-select"
                value={formData.room}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select a Room No</option>
                <option value="101">101</option>
                <option value="102">102</option>
                <option value="103">103</option>
                <option value="104">104</option>
                <option value="105">105</option>
                <option value="106">106</option>
                <option value="107">107</option>
                <option value="108">108</option>
                <option value="109">109</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="fromDate" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">From Date</label>
              <input
                type="date"
                className="form-control"
                id="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-center gap-3 mt-8">
                <button type="button" className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-50 py-11 radius-8" onClick={closeSidebar}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary-600 border border-primary-600 text-md px-28 py-12 radius-8 max-w-156-px w-100">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherTimetable;