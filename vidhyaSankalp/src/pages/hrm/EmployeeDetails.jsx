import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import SlideDrawer from '../../components/Slidedrawer';
import ConfirmModal from '../../components/ConfirmModal';

// Sample employee data (if not passed via state)
const sampleEmployee = {
  id: 'AD1256589',
  name: 'Marvin McKinney',
  image: 'teacher-details-img.png',
  subject: 'Mathematics',
  status: 'Active',
  class: 'Class 6 (2025-26)',
  contractType: 'Permanent',
  shift: 'Morning',
  workLocation: '2nd Floor',
  dateOfBirth: '10 Nov 2006',
  gender: 'Male',
  joinDate: '05 May 2012',
  phone: '789678456',
  email: 'set@example.com',
  // additional details for Profile Detail tab
  dobDetail: '10 Nov 1995',
  maritalStatus: 'Married',
  qualification: 'MBA',
  experience: '7 Years',
  fatherName: 'Ralph Edwards',
  motherName: 'Floyd Miles',
  previousSchool: 'Stuyvesant High School',
  currentSchool: 'Bronx High School of Science',
  currentAddress: '8502 Preston Rd. Inglewood, Maine 98380',
  permanentAddress: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
  bankName: 'Bank of America',
  branch: 'New York',
  ifsc: '5283209832',
  bloodGroup: 'O+',
  height: '5.2',
  weight: '60kg',
  document: 'BirthCertificate.pdf',
  facebook: 'www.facebook.com',
  linkedin: 'www.linkedin.com',
  instagram: 'www.instagram.com',
};

// Sample attendance stats
const attendanceStats = [
  { count: 227, label: 'Total Present', icon: 'attendence-icon1.png', bg: 'bg-success-600' },
  { count: 70, label: 'Total Absent', icon: 'attendence-icon2.png', bg: 'bg-danger-600' },
  { count: 27, label: 'Half Day', icon: 'attendence-icon3.png', bg: 'bg-purple-600' },
  { count: 28, label: 'Total Late', icon: 'attendence-icon4.png', bg: 'bg-info-600' },
  { count: 12, label: 'Total Holiday', icon: 'attendence-icon5.png', bg: 'bg-orange' },
];

// Attendance matrix (simplified – just first few months)
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const attendanceMatrix = [
  ['P', 'H', 'A', 'P', 'P', 'P', 'F', 'L', 'H', 'P', 'A', 'P', 'P', 'L', 'H', 'P', 'P', 'P', 'P', 'P', 'F', 'H', 'P', 'P', 'P', 'P', 'P', 'A', 'H', 'p', 'p'],
  ['P', 'A', 'P', 'H', 'P', 'F', 'P', 'L', 'A', 'H', 'P', 'F', 'P', 'L', 'H', 'A', 'P', 'P', 'H', 'P', 'F', 'P', 'L', 'A', 'H', 'P', 'F', 'P', 'L', 'A', 'H'],
  ['P', 'A', 'P', 'P', 'F', 'H', 'P', 'L', 'P', 'A', 'P', 'H', 'P', 'L', 'F', 'A', 'P', 'H', 'P', 'P', 'A', 'P', 'L', 'P', 'H', 'P', 'A', 'F', 'H', 'P', 'P'],
  ['P', 'A', 'P', 'H', 'P', 'F', 'L', 'P', 'H', 'A', 'P', 'P', 'L', 'P', 'F', 'H', 'P', 'A', 'P', 'P', 'H', 'P', 'F', 'L', 'P', 'A', 'P', 'H', 'P', 'H', 'P'],
  ['P', 'A', 'P', 'H', 'P', 'F', 'L', 'P', 'H', 'A', 'P', 'P', 'L', 'P', 'F', 'H', 'P', 'A', 'P', 'P', 'H', 'P', 'F', 'L', 'P', 'A', 'P', 'H', 'P', 'P', 'A'],
  ...Array(7).fill().map(() => Array(31).fill('')),
];

// Sample leave data
const leaveData = [
  { sl: '01', type: 'Medical Leave', dateRange: '07 May 2025 - 08 May 2025', duration: 1, applyDate: '07 May 2025', status: 'Approved' },
  { sl: '02', type: 'Special Leave', dateRange: '07 May 2025 - 08 May 2025', duration: 3, applyDate: '07 May 2025', status: 'Pending' },
  { sl: '03', type: 'Medical Leave', dateRange: '07 May 2025 - 08 May 2025', duration: 5, applyDate: '07 May 2025', status: 'Approved' },
  { sl: '04', type: 'Casual Leave', dateRange: '07 May 2025 - 08 May 2025', duration: 6, applyDate: '07 May 2025', status: 'Pending' },
  { sl: '05', type: 'Medical Leave', dateRange: '07 May 2025 - 08 May 2025', duration: 1, applyDate: '07 May 2025', status: 'Approved' },
  { sl: '06', type: 'Special Leave', dateRange: '07 May 2025 - 08 May 2025', duration: 2, applyDate: '07 May 2025', status: 'Rejected' },
  { sl: '07', type: 'Medical Leave', dateRange: '07 May 2025 - 08 May 2025', duration: 5, applyDate: '07 May 2025', status: 'Approved' },
  { sl: '08', type: 'Casual Leave', dateRange: '07 May 2025 - 08 May 2025', duration: 6, applyDate: '07 May 2025', status: 'Rejected' },
  { sl: '09', type: 'Medical Leave', dateRange: '07 May 2025 - 08 May 2025', duration: 1, applyDate: '07 May 2025', status: 'Approved' },
  { sl: '10', type: 'Special Leave', dateRange: '07 May 2025 - 08 May 2025', duration: 2, applyDate: '07 May 2025', status: 'Rejected' },
];

// Sample payroll data
const payrollData = [
  { sl: '01', invoice: 'AD52365', salaryFor: 'Jan 2025', date: '07 Jan 2025', netSalary: '$5,000', paymentMethod: 'Bank', status: 'Paid' },
  { sl: '02', invoice: 'AD52366', salaryFor: 'Feb 2025', date: '08 Feb 2025', netSalary: '$4,800', paymentMethod: 'Cash', status: 'Pending' },
  { sl: '03', invoice: 'AD52367', salaryFor: 'Mar 2025', date: '09 Mar 2025', netSalary: '$5,100', paymentMethod: 'Bank', status: 'Paid' },
  { sl: '04', invoice: 'AD52368', salaryFor: 'Apr 2025', date: '06 Apr 2025', netSalary: '$4,950', paymentMethod: 'Online', status: 'Failed' },
  { sl: '05', invoice: 'AD52369', salaryFor: 'May 2025', date: '05 May 2025', netSalary: '$5,200', paymentMethod: 'Bank', status: 'Paid' },
  { sl: '06', invoice: 'AD52370', salaryFor: 'Jun 2025', date: '06 Jun 2025', netSalary: '$4,600', paymentMethod: 'Cash', status: 'Pending' },
  { sl: '07', invoice: 'AD52371', salaryFor: 'Jul 2025', date: '08 Jul 2025', netSalary: '$5,300', paymentMethod: 'Bank', status: 'Paid' },
  { sl: '08', invoice: 'AD52372', salaryFor: 'Aug 2025', date: '05 Aug 2025', netSalary: '$4,750', paymentMethod: 'Online', status: 'Pending' },
  { sl: '09', invoice: 'AD52373', salaryFor: 'Sep 2025', date: '06 Sep 2025', netSalary: '$5,400', paymentMethod: 'Bank', status: 'Paid' },
  { sl: '10', invoice: 'AD52374', salaryFor: 'Oct 2025', date: '07 Oct 2025', netSalary: '$4,850', paymentMethod: 'Cash', status: 'Failed' },
  { sl: '11', invoice: 'AD52375', salaryFor: 'Nov 2025', date: '06 Nov 2025', netSalary: '$5,150', paymentMethod: 'Bank', status: 'Paid' },
  { sl: '12', invoice: 'AD52376', salaryFor: 'Dec 2025', date: '08 Dec 2025', netSalary: '$5,000', paymentMethod: 'Online', status: 'Paid' },
];

const EmployeeDetails = () => {
  const location = useLocation();
  const employee = location.state?.employee || sampleEmployee;

  const [activeTab, setActiveTab] = useState('employeeDetails');
  const [showLoginDrawer, setShowLoginDrawer] = useState(false);
  const [showApplyLeaveDrawer, setShowApplyLeaveDrawer] = useState(false);
  const [showCollectPayrollDrawer, setShowCollectPayrollDrawer] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showPayslipModal, setShowPayslipModal] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  // Handlers
  const handleSuspend = () => {
    alert('Employee suspended');
    setShowSuspendModal(false);
  };

  const handleViewPayslip = (payroll) => {
    setSelectedPayroll(payroll);
    setShowPayslipModal(true);
  };

  // Helper for status badge
  const getStatusClass = (status) => {
    switch (status) {
      case 'Paid': return 'bg-success-100 text-success-600';
      case 'Pending': return 'bg-warning-100 text-warning-600';
      case 'Failed': return 'bg-danger-100 text-danger-600';
      default: return 'bg-secondary-100 text-secondary-600';
    }
  };

  return (
    <div className="dashboard-main-body">
      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Employee Details</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <Link to="/hrm/employees" className="text-secondary-light hover-text-primary hover-underline"> / HRM</Link>
            <span className="text-secondary-light"> / Employee Details</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary-600 d-flex align-items-center gap-6 bg-base text-primary-light bg-hover-primary-600"
          onClick={() => setShowLoginDrawer(true)}
        >
          <span className="d-flex text-md"><i className="ri-lock-2-line"></i></span>
          Login Details
        </button>
      </div>

      {/* Profile Card */}
      <div className="mt-24">
        <div className="card h-100">
          <div className="card-body p-24">
            <div className="d-flex gap-32 flex-md-row flex-column">
              {/* Left column */}
              <div className="max-w-300-px w-100 text-center">
                <figure className="mb-24 w-120-px h-120-px mx-auto rounded-circle overflow-hidden">
                  <img src={`/../src/assets/images/thumbs/${employee.image}`} alt={employee.name} className="w-100 h-100 object-fit-cover" />
                </figure>
                <h2 className="h6 text-primary-light mb-16 fw-semibold">{employee.name}</h2>
                <p className="mb-0">ID: <span className="text-primary-600 fw-semibold">{employee.id}</span></p>
                <p className="mb-0">Subject: <span className="text-primary-light fw-semibold">{employee.subject}</span></p>
                <div className="mt-32 d-flex gap-16 w-100">
                  <button
                    type="button"
                    className="btn border fw-medium border-danger-600 bg-hover-danger-200 text-danger-600 text-md d-flex justify-content-center align-items-center gap-8 flex-grow-1 px-12 py-8 radius-8"
                    onClick={() => setShowSuspendModal(true)}
                  >
                    <span className="d-flex text-lg"><i className="ri-delete-bin-2-line"></i></span>
                    Suspend
                  </button>
                  <Link
                    to="/hrm/edit"
                    state={{ employee }}
                    className="btn btn-primary-600 border fw-medium border-primary-600 text-md d-flex justify-content-center align-items-center gap-8 flex-grow-1 px-12 py-8 radius-8"
                  >
                    <span className="d-flex text-lg"><i className="ri-edit-line"></i></span>
                    Edit
                  </Link>
                </div>
              </div>
              <div><span className="h-100 w-1-px bg-neutral-200"></span></div>
              {/* Right column - personal info */}
              <div className="flex-grow-1">
                <div className="pb-16 border-bottom d-flex align-items-center justify-content-between gap-20">
                  <h3 className="h6 text-primary-light text-lg mb-0 fw-semibold">Personal Info</h3>
                  <span className="bg-success-100 text-success-600 px-16 py-4 radius-4 fw-medium text-sm">{employee.status}</span>
                </div>
                <div className="mt-16 d-flex flex-column gap-8">
                  <div className="d-flex gap-4"><span className="fw-semibold text-sm text-primary-light w-110-px">Class</span><span className="fw-normal text-sm text-secondary-light">: {employee.class}</span></div>
                  <div className="d-flex gap-4"><span className="fw-semibold text-sm text-primary-light w-110-px">Contract Type</span><span className="fw-normal text-sm text-secondary-light">: {employee.contractType}</span></div>
                  <div className="d-flex gap-4"><span className="fw-semibold text-sm text-primary-light w-110-px">Shift</span><span className="fw-normal text-sm text-secondary-light">: {employee.shift}</span></div>
                  <div className="d-flex gap-4"><span className="fw-semibold text-sm text-primary-light w-110-px">Work Location</span><span className="fw-normal text-sm text-secondary-light">: {employee.workLocation}</span></div>
                  <div className="d-flex gap-4"><span className="fw-semibold text-sm text-primary-light w-110-px">Date Of Birth</span><span className="fw-normal text-sm text-secondary-light">: {employee.dateOfBirth}</span></div>
                  <div className="d-flex gap-4"><span className="fw-semibold text-sm text-primary-light w-110-px">Gender</span><span className="fw-normal text-sm text-secondary-light">: {employee.gender}</span></div>
                  <div className="d-flex gap-4"><span className="fw-semibold text-sm text-primary-light w-110-px">Join Date</span><span className="fw-normal text-sm text-secondary-light">: {employee.joinDate}</span></div>
                  <div className="d-flex gap-4"><span className="fw-semibold text-sm text-primary-light w-110-px">Phone Number</span><span className="fw-normal text-sm text-primary-600">: {employee.phone}</span></div>
                  <div className="d-flex gap-4"><span className="fw-semibold text-sm text-primary-light w-110-px">Email</span><span className="fw-normal text-sm text-primary-600">: {employee.email}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="my-16">
          <ul className="nav nav-pills bordered-tab mb-3" role="tablist">
            {['employeeDetails', 'attendance', 'leave', 'payroll'].map((tab) => (
              <li className="nav-item" key={tab}>
                <button
                  className={`nav-link d-flex align-items-center gap-8 text-secondary-light fw-medium text-sm text-hover-primary-600 text-capitalize bg-transparent px-20 py-12 ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                  type="button"
                >
                  <span className="d-flex tab-icon line-height-1 text-md">
                    <i className={tab === 'employeeDetails' ? 'ri-group-line' : tab === 'attendance' ? 'ri-calendar-check-line' : tab === 'leave' ? 'ri-login-box-line' : 'ri-money-dollar-box-line'}></i>
                  </span>
                  {tab === 'employeeDetails' ? 'Employee Details' : tab}
                </button>
              </li>
            ))}
          </ul>

          <div className="tab-content">
            {/* Employee Details Tab */}
            {activeTab === 'employeeDetails' && (
              <div className="tab-pane fade show active">
                <div className="row gy-4">
                  {/* Profile Detail */}
                  <div className="col-md-12">
                    <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                        <h6 className="text-lg fw-semibold mb-0">Profile Detail</h6>
                      </div>
                      <div className="card-body p-0">
                        <div className="p-20">
                          <div className="row gy-4">
                            <div className="col-md-3 col-sm-6"><div><h6 className="text-md mb-2 fw-medium">Date of Birth</h6><span>{employee.dobDetail}</span></div></div>
                            <div className="col-md-3 col-sm-6"><div><h6 className="text-md mb-2 fw-medium">Martial Status</h6><span>{employee.maritalStatus}</span></div></div>
                            <div className="col-md-3 col-sm-6"><div><h6 className="text-md mb-2 fw-medium">Qualification</h6><span>{employee.qualification}</span></div></div>
                            <div className="col-md-3 col-sm-6"><div><h6 className="text-md mb-2 fw-medium">Experience</h6><span>{employee.experience}</span></div></div>
                            <div className="col-md-3 col-sm-6"><div><h6 className="text-md mb-2 fw-medium">Father Name</h6><span>{employee.fatherName}</span></div></div>
                            <div className="col-md-3 col-sm-6"><div><h6 className="text-md mb-2 fw-medium">Mother Name</h6><span>{employee.motherName}</span></div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Previous School Details */}
                  <div className="col-md-6">
                    <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                        <h6 className="text-lg fw-semibold mb-0">Previous School Details</h6>
                      </div>
                      <div className="card-body p-0">
                        <div className="p-20">
                          <div className="row gy-4">
                            <div className="col-sm-12"><div><h6 className="text-md mb-2 fw-medium">Previous School Name</h6><span>{employee.previousSchool}</span></div></div>
                            <div className="col-sm-12"><div><h6 className="text-md mb-2 fw-medium">Current School Name</h6><span>{employee.currentSchool}</span></div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="col-md-6">
                    <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                        <h6 className="text-lg fw-semibold mb-0">Address</h6>
                      </div>
                      <div className="card-body p-0">
                        <div className="p-20">
                          <div className="row gy-4">
                            <div className="col-sm-12"><div><h6 className="text-md mb-2 fw-medium">Current Address</h6><span>{employee.currentAddress}</span></div></div>
                            <div className="col-sm-12"><div><h6 className="text-md mb-2 fw-medium">Permanent Address</h6><span>{employee.permanentAddress}</span></div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bank Details */}
                  <div className="col-md-6">
                    <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                        <h6 className="text-lg fw-semibold mb-0">Bank Details</h6>
                      </div>
                      <div className="card-body p-0">
                        <div className="p-20">
                          <div className="row gy-4">
                            <div className="col-sm-4"><div><h6 className="text-md mb-2 fw-medium">Bank Name</h6><span>{employee.bankName}</span></div></div>
                            <div className="col-sm-4"><div><h6 className="text-md mb-2 fw-medium">Branch</h6><span>{employee.branch}</span></div></div>
                            <div className="col-sm-4"><div><h6 className="text-md mb-2 fw-medium">IFSC Code</h6><span>{employee.ifsc}</span></div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Medical Details */}
                  <div className="col-md-6">
                    <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                        <h6 className="text-lg fw-semibold mb-0">Medical Details</h6>
                      </div>
                      <div className="card-body p-0">
                        <div className="p-20">
                          <div className="row gy-4">
                            <div className="col-sm-4"><div><h6 className="text-md mb-2 fw-medium">Blood Group</h6><span>{employee.bloodGroup}</span></div></div>
                            <div className="col-sm-4"><div><h6 className="text-md mb-2 fw-medium">Height</h6><span>{employee.height}</span></div></div>
                            <div className="col-sm-4"><div><h6 className="text-md mb-2 fw-medium">Weight</h6><span>{employee.weight}</span></div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="col-md-6">
                    <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                        <h6 className="text-lg fw-semibold mb-0">Documents</h6>
                      </div>
                      <div className="card-body p-20">
                        <div className="p-10 border radius-8">
                          <div className="d-flex align-items-center justify-content-between gap-20">
                            <div className="d-flex align-items-center gap-12">
                              <span className="w-36-px h-36-px radius-4 bg-neutral-50 d-flex justify-content-center align-items-center text-xl"><i className="ri-file-text-line"></i></span>
                              <span className="text-md text-secondary-light">{employee.document}</span>
                            </div>
                            <button type="button" className="w-36-px h-36-px radius-4 bg-primary-50 bg-hover-primary-100 text-primary-600 d-flex justify-content-center align-items-center text-xl"><i className="ri-download-2-line"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="col-md-6">
                    <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                      <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                        <h6 className="text-lg fw-semibold mb-0">Social Media</h6>
                      </div>
                      <div className="card-body p-0">
                        <div className="p-20">
                          <div className="row gy-4">
                            <div className="col-sm-4"><div><h6 className="text-md mb-2 fw-medium">Facebook</h6><span>{employee.facebook}</span></div></div>
                            <div className="col-sm-4"><div><h6 className="text-md mb-2 fw-medium">LinkedIn</h6><span>{employee.linkedin}</span></div></div>
                            <div className="col-sm-4"><div><h6 className="text-md mb-2 fw-medium">Instagram</h6><span>{employee.instagram}</span></div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div className="tab-pane fade show active">
                <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                  <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                    <h6 className="text-lg fw-semibold mb-0">Attendance</h6>
                  </div>
                  <div className="card-body p-0">
                    {/* Stats Cards */}
                    <div className="px-20 pt-20">
                      <div className="row row-cols-xxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-3">
                        {attendanceStats.map((stat, i) => (
                          <div className="col" key={i}>
                            <div className="card px-20 py-28 shadow-2 radius-8 h-100 border border-neutral-200 shadow-none gradient-bg-end-7">
                              <div className="card-body p-0">
                                <div className="d-flex flex-wrap align-items-center justify-content-between gap-1">
                                  <div>
                                    <h6 className="fw-semibold mb-2">{stat.count}</h6>
                                    <span className="fw-medium text-secondary-light text-sm">{stat.label}</span>
                                  </div>
                                  <span className={`mb-0 w-48-px h-48-px ${stat.bg} text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0`}>
                                    <img src={`/../src/assets/images/icons/${stat.icon}`} alt={stat.label} />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Filters and Legend */}
                    <div className="mt-24 mb-16 mx-20">
                      <div className="d-flex flex-wrap align-items-center gap-24 justify-content-between">
                        <div className="d-flex flex-wrap align-items-center gap-16">
                          <div>
                            <select className="form-control form-select">
                              <option>Jun 2025/2026</option>
                              <option>Jun 2026/2027</option>
                              <option>Jun 2027/2028</option>
                              <option>Jun 2028/2029</option>
                            </select>
                          </div>
                          <div className="dropdown">
                            <button type="button" className="px-12 py-8 border border-neutral-300 radius-8 d-flex align-items-center gap-20">
                              <span className="d-flex align-items-center gap-1 text-secondary-light text-sm"><i className="ri-file-upload-line text-md line-height-1"></i>Export</span>
                              <span><i className="ri-arrow-down-s-line"></i></span>
                            </button>
                          </div>
                        </div>
                        <div className="d-flex align-items-center flex-wrap gap-8">
                          <p className="text-primary-light text-sm fw-medium mb-0">Present: <span className="fw-semibold text-success-600">P</span></p>
                          <p className="text-primary-light text-sm fw-medium mb-0">Absent: <span className="fw-semibold text-danger-600">A</span></p>
                          <p className="text-primary-light text-sm fw-medium mb-0">Holiday: <span className="fw-semibold text-warning-600">H</span></p>
                          <p className="text-primary-light text-sm fw-medium mb-0">Late: <span className="fw-semibold text-info-600">L</span></p>
                          <p className="text-primary-light text-sm fw-medium mb-0">Half Day: <span className="fw-semibold text-purple-600">F</span></p>
                        </div>
                      </div>
                    </div>

                    {/* Attendance Table */}
                    <div className="table-responsive overflow-x-auto">
                      <table className="table mb-0 table-heading-dark-mode">
                        <thead>
                          <tr>
                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">Month</th>
                            {Array.from({ length: 30 }, (_, i) => (
                              <th key={i} className="bg-neutral-100 text-sm text-primary-light px-10 py-16 text-center">{i + 1}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {months.map((month, idx) => (
                            <tr key={month}>
                              <td className="px-10 py-16 text-sm fw-medium">{month}</td>
                              {attendanceMatrix[idx]?.map((val, i) => (
                                <td key={i} className="px-10 py-14 text-sm text-uppercase text-center">
                                  <span className="attendance">{val}</span>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Leave Tab */}
            {activeTab === 'leave' && (
              <div className="tab-pane fade show active">
                <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                  <div className="card-header border-bottom bg-base py-10 px-20 d-flex align-items-center justify-content-between">
                    <h6 className="text-lg fw-semibold mb-0">Leave</h6>
                    <button
                      type="button"
                      className="btn btn-primary-600 d-flex align-items-center gap-6 py-8 text-sm"
                      onClick={() => setShowApplyLeaveDrawer(true)}
                    >
                      <span className="d-flex text-sm"><i className="ri-calendar-close-line"></i></span>
                      Apply Leave
                    </button>
                  </div>
                  <div className="card-body p-0 dataTable-wrapper">
                    {/* Filters */}
                    <div className="d-flex flex-wrap align-items-center gap-24 justify-content-between px-20 py-12">
                      <div className="d-flex flex-wrap align-items-center gap-16">
                        <form className="navbar-search dt-search m-0">
                          <input type="text" className="dt-input bg-transparent radius-4" placeholder="Search..." />
                          <i className="ri-search-line icon"></i>
                        </form>
                        <div>
                          <select className="form-control form-select">
                            <option>Year 2025/2026</option>
                            <option>Year 2026/2027</option>
                            <option>Year 2027/2028</option>
                            <option>Year 2028/2029</option>
                          </select>
                        </div>
                        <div className="dropdown">
                          <button type="button" className="px-12 py-5-px border border-neutral-300 radius-8 d-flex align-items-center gap-20">
                            <span className="d-flex align-items-center gap-1 text-secondary-light text-sm"><i className="ri-file-upload-line text-md line-height-1"></i>Export</span>
                            <span><i className="ri-arrow-down-s-line"></i></span>
                          </button>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-8 text-secondary-light">
                        <span>Rows per page:</span>
                        <div className="dt-length">
                          <select className="dt-input form-control form-select">
                            <option>5</option><option selected>10</option><option>25</option><option>50</option><option>100</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* Leave Table */}
                    <table className="table bordered-table mb-0 table-heading-dark-mode w-100">
                      <thead>
                        <tr>
                          <th><div className="form-check style-check d-flex align-items-center"><input className="form-check-input" type="checkbox" /><label className="form-check-label">S.L</label></div></th>
                          <th>Leave Type</th><th>Date</th><th>Duration</th><th>Apply Date</th><th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaveData.map((item) => (
                          <tr key={item.sl}>
                            <td><div className="form-check style-check d-flex align-items-center"><input className="form-check-input" type="checkbox" /><label className="form-check-label">{item.sl}</label></div></td>
                            <td>{item.type}</td><td>{item.dateRange}</td><td>{item.duration}</td><td>{item.applyDate}</td>
                            <td><span className={`bg-${item.status === 'Approved' ? 'success' : item.status === 'Pending' ? 'warning' : 'danger'}-100 text-${item.status === 'Approved' ? 'success' : item.status === 'Pending' ? 'warning' : 'danger'}-600 px-20 py-4 radius-4 fw-medium text-sm`}>{item.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Payroll Tab */}
            {activeTab === 'payroll' && (
              <div className="tab-pane fade show active">
                <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                  <div className="card-header border-bottom bg-base py-10 px-20 d-flex align-items-center justify-content-between">
                    <h6 className="text-lg fw-semibold mb-0">Payroll</h6>
                  </div>
                  <div className="card-body p-0 dataTable-wrapper">
                    {/* Filters */}
                    <div className="d-flex flex-wrap align-items-center gap-24 justify-content-between px-20 py-16">
                      <div className="d-flex flex-wrap align-items-center gap-16">
                        <form className="navbar-search dt-search m-0">
                          <input type="text" className="dt-input bg-transparent radius-4" placeholder="Search..." />
                          <i className="ri-search-line icon"></i>
                        </form>
                        <div>
                          <select className="form-control form-select">
                            <option>Year 2025/2026</option>
                            <option>Year 2026/2027</option>
                            <option>Year 2027/2028</option>
                            <option>Year 2028/2029</option>
                          </select>
                        </div>
                        <div className="dropdown">
                          <button type="button" className="px-12 py-5-px border border-neutral-300 radius-8 d-flex align-items-center gap-20">
                            <span className="d-flex align-items-center gap-1 text-secondary-light text-sm"><i className="ri-file-upload-line text-md line-height-1"></i>Export</span>
                            <span><i className="ri-arrow-down-s-line"></i></span>
                          </button>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-8 text-secondary-light">
                        <span>Rows per page:</span>
                        <div className="dt-length">
                          <select className="dt-input form-control form-select">
                            <option>5</option><option selected>10</option><option>25</option><option>50</option><option>100</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* Payroll Table */}
                    <table className="table bordered-table mb-0 table-heading-dark-mode w-100">
                      <thead>
                        <tr>
                          <th><div className="form-check style-check d-flex align-items-center"><input className="form-check-input" type="checkbox" /><label>S.L</label></div></th>
                          <th>Invoice ID</th><th>Salary For</th><th>Date</th><th>Net Salary</th><th>Payment Method</th><th>Status</th><th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payrollData.map((item) => (
                          <tr key={item.sl}>
                            <td><div className="form-check style-check d-flex align-items-center"><input className="form-check-input" type="checkbox" /><label>{item.sl}</label></div></td>
                            <td><span className="text-primary-600">{item.invoice}</span></td>
                            <td>{item.salaryFor}</td><td>{item.date}</td><td>{item.netSalary}</td><td>{item.paymentMethod}</td>
                            <td><span className={`${getStatusClass(item.status)} px-20 py-4 radius-4 fw-medium text-sm`}>{item.status}</span></td>
                            <td>
                              <button
                                type="button"
                                className="bg-neutral-200 bg-hover-neutral-300 text-neutral-600 px-20 py-4 radius-4 fw-medium text-sm"
                                onClick={() => handleViewPayslip(item)}
                              >
                                View Payslip
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========== SIDEBARS ========== */}

      {/* Login Details Sidebar */}
      <SlideDrawer
        isOpen={showLoginDrawer}
        onClose={() => setShowLoginDrawer(false)}
        title="Login Details"
      >
        <div className="p-20">
          <div className="d-flex align-items-center gap-20">
            <figure className="w-72-px h-72-px rounded-circle overflow-hidden mb-0">
              <img src={`/../src/assets/images/thumbs/${employee.image}`} alt={employee.name} className="w-100 h-100 object-fit-cover" />
            </figure>
            <div className="flex-grow-1">
              <h2 className="text-xl text-primary-light mb-4">{employee.name}</h2>
              <p className="mb-0">Roll No: <span className="text-primary-light fw-semibold">10</span></p>
            </div>
          </div>
        </div>
        <div className="table-bottom-info-none">
          <table className="table bordered-table mb-0 table-heading-dark-mode w-100">
            <thead>
              <tr>
                <th className="text-start">User Type</th>
                <th className="text-start">Email</th>
                <th className="text-start">Password</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-start">employee</td>
                <td className="text-start">employee@example.com</td>
                <td className="text-start">15445@#AC</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SlideDrawer>

      {/* Apply Leave Sidebar */}
      <SlideDrawer
        isOpen={showApplyLeaveDrawer}
        onClose={() => setShowApplyLeaveDrawer(false)}
        title="Apply Leave"
      >
        <form onSubmit={(e) => e.preventDefault()} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="leaveType" className="form-label fw-semibold text-primary-light">Leave Type</label>
              <select id="leaveType" className="form-select" defaultValue="">
                <option value="" disabled>Select a leave type</option>
                <option value="Sickness">Sickness</option>
                <option value="Accident">Accident</option>
                <option value="Travel">Travel</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="fromDate" className="form-label fw-semibold text-primary-light">From Date</label>
              <input type="date" className="form-control" id="fromDate" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="toDate" className="form-label fw-semibold text-primary-light">To Date</label>
              <input type="date" className="form-control" id="toDate" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="leaveDays" className="form-label fw-semibold text-primary-light">Leave Days</label>
              <select id="leaveDays" className="form-select" defaultValue="">
                <option value="" disabled>Ex: Full day, first half, second half</option>
                <option value="Full day">Full day</option>
                <option value="First half">First half</option>
                <option value="Second half">Second half</option>
              </select>
            </div>
            <div className="col-12">
              <label htmlFor="reason" className="form-label fw-semibold text-primary-light">Reason for Leave</label>
              <textarea id="reason" className="form-control" rows="3" placeholder="Enter reason..."></textarea>
            </div>
            <div className="col-12">
              <div className="d-flex gap-3 mt-3">
                <button type="button" className="btn btn-outline-danger flex-grow-1" onClick={() => setShowApplyLeaveDrawer(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary flex-grow-1">Send Request</button>
              </div>
            </div>
          </div>
        </form>
      </SlideDrawer>

      {/* Collect Payroll Sidebar (Collect Fees from HTML, but likely for payroll) */}
      <SlideDrawer
        isOpen={showCollectPayrollDrawer}
        onClose={() => setShowCollectPayrollDrawer(false)}
        title="Collect Payroll"
      >
        <form onSubmit={(e) => e.preventDefault()} className="d-flex flex-column p-20">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="payrollType" className="form-label fw-semibold text-primary-light">Payroll Type</label>
              <select id="payrollType" className="form-select" defaultValue="">
                <option value="" disabled>Select payroll type</option>
                <option value="Monthly">Monthly</option>
                <option value="Bonus">Bonus</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="payrollDate" className="form-label fw-semibold text-primary-light">Date</label>
              <input type="date" className="form-control" id="payrollDate" />
            </div>
            <div className="col-sm-6">
              <label htmlFor="payrollAmount" className="form-label fw-semibold text-primary-light">Amount</label>
              <input type="text" className="form-control" id="payrollAmount" value="$5000" disabled />
            </div>
            <div className="col-sm-6">
              <label htmlFor="paymentMethod" className="form-label fw-semibold text-primary-light">Payment Method</label>
              <select id="paymentMethod" className="form-select" defaultValue="Bank">
                <option value="Bank">Bank</option>
                <option value="Cash">Cash</option>
                <option value="Online">Online</option>
              </select>
            </div>
            <div className="col-12">
              <label htmlFor="payrollNote" className="form-label fw-semibold text-primary-light">Note</label>
              <textarea id="payrollNote" className="form-control" rows="3" placeholder="Enter note..."></textarea>
            </div>
            <div className="col-12">
              <div className="d-flex gap-3 mt-3">
                <button type="button" className="btn btn-outline-danger flex-grow-1" onClick={() => setShowCollectPayrollDrawer(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary flex-grow-1">Pay</button>
              </div>
            </div>
          </div>
        </form>
      </SlideDrawer>

      {/* Suspend Modal */}
      <ConfirmModal
        show={showSuspendModal}
        onClose={() => setShowSuspendModal(false)}
        onConfirm={handleSuspend}
        title="Suspend this Employee?"
        message="Are you sure you want to suspend this employee?"
        confirmText="Yes, Suspend"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />

      {/* Payslip Modal */}
      <Modal show={showPayslipModal} onHide={() => setShowPayslipModal(false)} centered size="lg">
        <Modal.Body className="p-24">
          <div className="text-center">
            <h6 className="mb-0">School Name</h6>
            <p className="text-secondary-light">Smithbroand, Unit 4, Holler Tower, San Diego</p>
          </div>
          <div className="d-flex align-items-center justify-content-between gap-20 flex-wrap mt-24">
            <div className="d-flex flex-column">
              <div className="text-sm fw-medium d-flex">
                <span className="text-primary-light w-110-px text-start">Invoice No</span>
                <span className="text-primary-light">: #{selectedPayroll?.invoice || '5695'}</span>
              </div>
              <div className="text-sm fw-medium d-flex">
                <span className="text-primary-light w-110-px text-start">Employee Name</span>
                <span className="text-primary-light">: {employee.name}</span>
              </div>
              <div className="text-sm fw-medium d-flex">
                <span className="text-primary-light w-110-px text-start">Phone</span>
                <span className="text-primary-light">: {employee.phone}</span>
              </div>
            </div>
            <div className="d-flex flex-column">
              <div className="text-sm fw-medium d-flex">
                <span className="text-primary-light text-start">Payslip</span>
              </div>
              <div className="text-sm fw-medium d-flex">
                <span className="text-secondary-light text-start">Month: {selectedPayroll?.salaryFor || 'January 2025'}</span>
              </div>
              <div className="text-sm fw-medium d-flex">
                <span className="text-secondary-light text-start">Payment: {selectedPayroll?.date || '15 Jan 2025'}</span>
              </div>
            </div>
          </div>
          <ul className="border mt-24 radius-8 overflow-hidden">
            <li className="py-10 px-20 d-flex align-items-center justify-content-between gap-20 bg-neutral-50 border-bottom">
              <span className="text-primary-light fw-semibold">Name</span>
              <span className="text-primary-light fw-semibold">Amount</span>
            </li>
            <li className="py-10 px-20 d-flex align-items-center justify-content-between gap-20 border-bottom">
              <span className="text-primary-light">Base Salary</span>
              <span className="text-primary-light">$2000</span>
            </li>
            <li className="py-10 px-20 d-flex align-items-center justify-content-between gap-20 border-bottom">
              <span className="text-primary-light">Overtime Pay</span>
              <span className="text-primary-light">$1000</span>
            </li>
            <li className="py-10 px-20 d-flex align-items-center justify-content-between gap-20 border-bottom">
              <span className="text-primary-light">Bonuses</span>
              <span className="text-primary-light">$2000</span>
            </li>
            <li className="py-10 px-20 d-flex align-items-center justify-content-between gap-20 border-bottom">
              <span className="text-primary-light">Gross Salary</span>
              <span className="text-primary-light">$5000</span>
            </li>
            <li className="py-10 px-20 d-flex align-items-center justify-content-between gap-20 bg-neutral-50">
              <span className="text-primary-light fw-semibold text-lg">Total</span>
              <span className="text-primary-light fw-semibold text-lg">{selectedPayroll?.netSalary || '$5000'}</span>
            </li>
          </ul>
          <div className="pt-28 ms-16 text-start">
            <p className="text-primary-light fw-medium mb-0">Payment type : {selectedPayroll?.paymentMethod || 'Bank'}</p>
          </div>
          <div className="text-center mt-100-px">
            <h6 className="text-xl mb-4">Thanks</h6>
            <p className="text-secondary-light text-sm mb-0">If you need further assistance, please feel free to contact HR at <span className="fw-semibold text-primary-light">Example school</span></p>
          </div>
          <div className="text-center mt-100-px">
            <p className="text-secondary-light text-sm mb-0">Made by <span className="fw-semibold">Wowtheme7.</span></p>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-secondary" onClick={() => setShowPayslipModal(false)}>Close</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmployeeDetails;