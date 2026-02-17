import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal"; 
import SlideDrawer from "../../components/Slidedrawer"; 
import PayslipModal from "../../components/Payslipmodal"; 
// ─── helpers ─────────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    Approved: "bg-success-100 text-success-600",
    Pending: "bg-warning-100 text-warning-600",
    Rejected: "bg-danger-100 text-danger-600",
    Paid: "bg-success-100 text-success-600",
    Failed: "bg-danger-100 text-danger-600",
  };
  return (
    <span
      className={`${map[status] ?? "bg-neutral-100 text-neutral-600"} px-20 py-4 radius-4 fw-medium text-sm`}
    >
      {status}
    </span>
  );
};
const CardShell = ({ title, children, action }) => (
  <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
    <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
      <h6 className="text-lg fw-semibold mb-0">{title}</h6>
      {action}
    </div>
    <div className="card-body p-0">{children}</div>
  </div>
);
const InfoRow = ({ label, value, highlight }) => (
  <div className="d-flex gap-4">
    <span className="fw-semibold text-sm text-primary-light w-110-px">
      {label}
    </span>
    <span
      className={`fw-normal text-sm ${highlight ? "text-primary-600" : "text-secondary-light"}`}
    >
      : {value}
    </span>
  </div>
);
const attStyle = (v) => {
  const s = v?.toUpperCase();
  if (s === "P") return { color: "#16a34a", fontWeight: 700 };
  if (s === "A") return { color: "#dc2626", fontWeight: 700 };
  if (s === "H") return { color: "#d97706", fontWeight: 700 };
  if (s === "L") return { color: "#2563eb", fontWeight: 700 };
  if (s === "F") return { color: "#7c3aed", fontWeight: 700 };
  return {};
};
const TableToolbar = ({ showExport = true }) => {
  const [year, setYear] = useState("Year 2025/2026");
  const [rows, setRows] = useState("10");
  return (
    <div className="d-flex flex-wrap align-items-center gap-24 justify-content-between px-20 py-12">
      <div className="d-flex flex-wrap align-items-center gap-16">
        <div className="position-relative" style={{ minWidth: 180 }}>
          <input
            type="text"
            className="form-control radius-4"
            placeholder="Search..."
            style={{ paddingLeft: 36 }}
          />
          <span
            className="position-absolute"
            style={{
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
            }}
          >
            <iconify-icon
              icon="ion:search-outline"
              style={{ fontSize: 16 }}
            ></iconify-icon>
          </span>
        </div>
        <select
          className="form-control form-select"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          {[
            "Year 2025/2026",
            "Year 2026/2027",
            "Year 2027/2028",
            "Year 2028/2029",
          ].map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
        {showExport && (
          <div className="dropdown">
            <button
              type="button"
              className="px-12 py-8 border border-neutral-300 radius-8 d-flex align-items-center gap-20"
              data-bs-toggle="dropdown"
            >
              <span className="d-flex align-items-center gap-1 text-secondary-light text-sm">
                <i className="ri-file-upload-line text-md line-height-1"></i>{" "}
                Export
              </span>
              <i className="ri-arrow-down-s-line"></i>
            </button>
            <ul className="dropdown-menu p-12 border bg-base shadow">
              <li>
                <button
                  type="button"
                  className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 d-flex align-items-center gap-10"
                >
                  <i className="ri-file-3-line"></i> PDF
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 d-flex align-items-center gap-10"
                >
                  <i className="ri-file-excel-line"></i> Excel
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="d-flex align-items-center gap-8 text-secondary-light">
        <span>Rows per page:</span>
        <select
          className="form-control form-select"
          style={{ width: "auto" }}
          value={rows}
          onChange={(e) => setRows(e.target.value)}
        >
          {["5", "10", "25", "50", "100"].map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

// ─── static data ──────────────────────────────────────────────────────────────
const TEACHER = {
  name: "Marvin McKinney",
  id: "AD1256589",
  subject: "Mathematics",
  photo: "assets/images/thumbs/teacher-details-img.png",
  class: "Class 6 (2025-26)",
  contractType: "Permanent",
  shift: "Morning",
  workLocation: "2nd Floor",
  dob: "10 Nov 2006",
  gender: "Male",
  joinDate: "05 May 2012",
  phone: "789678456",
  email: "set@example.com",
};
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const CLASS_COLORS = [
  { bg: "bg-warning-100", text: "text-warning-600" },
  { bg: "bg-info-100", text: "text-info-600" },
  { bg: "bg-success-100", text: "text-success-600" },
  { bg: "bg-danger-100", text: "text-danger-600" },
  { bg: "bg-primary-100", text: "text-primary-600" },
];
const ROUTINE_CLASSES = [
  {
    label: "Class: 1 (A)",
    subject: "Math",
    room: "16",
    time: "09:00 AM - 09:45 AM",
  },
  {
    label: "Class: 2 (B)",
    subject: "English",
    room: "10",
    time: "09:50 AM - 10:35 AM",
  },
  {
    label: "Class: 3 (A)",
    subject: "Science",
    room: "22",
    time: "10:40 AM - 11:25 AM",
  },
  {
    label: "Class: 4 (C)",
    subject: "History",
    room: "8",
    time: "11:30 AM - 12:15 PM",
  },
  {
    label: "Class: 5 (B)",
    subject: "CSE",
    room: "25",
    time: "12:20 PM - 01:05 PM",
  },
];
const ATTENDANCE = [
  {
    m: "Jan",
    d: [
      "P",
      "H",
      "A",
      "P",
      "P",
      "P",
      "F",
      "L",
      "H",
      "P",
      "A",
      "P",
      "P",
      "L",
      "H",
      "P",
      "P",
      "P",
      "P",
      "P",
      "F",
      "H",
      "P",
      "P",
      "P",
      "P",
      "P",
      "A",
      "H",
      "P",
    ],
  },
  {
    m: "Feb",
    d: [
      "P",
      "A",
      "P",
      "H",
      "P",
      "F",
      "P",
      "L",
      "A",
      "H",
      "P",
      "F",
      "P",
      "L",
      "H",
      "A",
      "P",
      "P",
      "H",
      "P",
      "F",
      "P",
      "L",
      "A",
      "H",
      "P",
      "F",
      "P",
      "L",
      "A",
    ],
  },
  {
    m: "Mar",
    d: [
      "P",
      "A",
      "P",
      "P",
      "F",
      "H",
      "P",
      "L",
      "P",
      "A",
      "P",
      "H",
      "P",
      "L",
      "F",
      "A",
      "P",
      "H",
      "P",
      "P",
      "A",
      "P",
      "L",
      "P",
      "H",
      "P",
      "A",
      "F",
      "H",
      "P",
    ],
  },
  {
    m: "Apr",
    d: [
      "P",
      "A",
      "P",
      "H",
      "P",
      "F",
      "L",
      "P",
      "H",
      "A",
      "P",
      "P",
      "L",
      "P",
      "F",
      "H",
      "P",
      "A",
      "P",
      "P",
      "H",
      "P",
      "F",
      "L",
      "P",
      "A",
      "P",
      "H",
      "P",
      "H",
    ],
  },
  {
    m: "May",
    d: [
      "P",
      "A",
      "P",
      "H",
      "P",
      "F",
      "L",
      "P",
      "H",
      "A",
      "P",
      "P",
      "L",
      "P",
      "F",
      "H",
      "P",
      "A",
      "P",
      "P",
      "H",
      "P",
      "F",
      "L",
      "P",
      "A",
      "P",
      "H",
      "P",
      "A",
    ],
  },
  ...["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => ({
    m,
    d: Array(30).fill(""),
  })),
];
const LEAVES = [
  {
    sl: "01",
    type: "Medical Leave",
    date: "07 May 2025 - 08 may 2025",
    dur: 1,
    apply: "07 May 2025",
    status: "Approved",
  },
  {
    sl: "02",
    type: "Special Leave",
    date: "07 May 2025 - 08 may 2025",
    dur: 3,
    apply: "07 May 2025",
    status: "Pending",
  },
  {
    sl: "03",
    type: "Medical Leave",
    date: "07 May 2025 - 08 may 2025",
    dur: 5,
    apply: "07 May 2025",
    status: "Approved",
  },
  {
    sl: "04",
    type: "Casual Leave",
    date: "07 May 2025 - 08 may 2025",
    dur: 6,
    apply: "07 May 2025",
    status: "Pending",
  },
  {
    sl: "05",
    type: "Medical Leave",
    date: "07 May 2025 - 08 may 2025",
    dur: 1,
    apply: "07 May 2025",
    status: "Approved",
  },
  {
    sl: "06",
    type: "Special Leave",
    date: "07 May 2025 - 08 may 2025",
    dur: 2,
    apply: "07 May 2025",
    status: "Rejected",
  },
  {
    sl: "07",
    type: "Medical Leave",
    date: "07 May 2025 - 08 may 2025",
    dur: 5,
    apply: "07 May 2025",
    status: "Approved",
  },
  {
    sl: "08",
    type: "Casual Leave",
    date: "07 May 2025 - 08 may 2025",
    dur: 6,
    apply: "07 May 2025",
    status: "Rejected",
  },
  {
    sl: "09",
    type: "Medical Leave",
    date: "07 May 2025 - 08 may 2025",
    dur: 1,
    apply: "07 May 2025",
    status: "Approved",
  },
  {
    sl: "10",
    type: "Special Leave",
    date: "07 May 2025 - 08 may 2025",
    dur: 2,
    apply: "07 May 2025",
    status: "Rejected",
  },
];
const PAYROLL = [
  {
    sl: "01",
    inv: "AD52365",
    for: "Jan 2025",
    date: "07 Jan 2025",
    net: "$5,000",
    method: "Bank",
    status: "Paid",
  },
  {
    sl: "02",
    inv: "AD52366",
    for: "Feb 2025",
    date: "08 Feb 2025",
    net: "$4,800",
    method: "Cash",
    status: "Pending",
  },
  {
    sl: "03",
    inv: "AD52367",
    for: "Mar 2025",
    date: "09 Mar 2025",
    net: "$5,100",
    method: "Bank",
    status: "Paid",
  },
  {
    sl: "04",
    inv: "AD52368",
    for: "Apr 2025",
    date: "06 Apr 2025",
    net: "$4,950",
    method: "Online",
    status: "Failed",
  },
  {
    sl: "05",
    inv: "AD52369",
    for: "May 2025",
    date: "05 May 2025",
    net: "$5,200",
    method: "Bank",
    status: "Paid",
  },
  {
    sl: "06",
    inv: "AD52370",
    for: "Jun 2025",
    date: "06 Jun 2025",
    net: "$4,600",
    method: "Cash",
    status: "Pending",
  },
  {
    sl: "07",
    inv: "AD52371",
    for: "Jul 2025",
    date: "08 Jul 2025",
    net: "$5,300",
    method: "Bank",
    status: "Paid",
  },
  {
    sl: "08",
    inv: "AD52372",
    for: "Aug 2025",
    date: "05 Aug 2025",
    net: "$4,750",
    method: "Online",
    status: "Pending",
  },
  {
    sl: "09",
    inv: "AD52373",
    for: "Sep 2025",
    date: "06 Sep 2025",
    net: "$5,400",
    method: "Bank",
    status: "Paid",
  },
  {
    sl: "10",
    inv: "AD52374",
    for: "Oct 2025",
    date: "07 Oct 2025",
    net: "$4,850",
    method: "Cash",
    status: "Failed",
  },
  {
    sl: "11",
    inv: "AD52375",
    for: "Nov 2025",
    date: "06 Nov 2025",
    net: "$5,150",
    method: "Bank",
    status: "Paid",
  },
  {
    sl: "12",
    inv: "AD52376",
    for: "Dec 2025",
    date: "08 Dec 2025",
    net: "$5,000",
    method: "Online",
    status: "Paid",
  },
];
const LIBRARY = [
  {
    sl: "01",
    book: "Marigold (NCERT)",
    img: "library-img1.png",
    cat: "English",
    no: "8512",
    taken: "05 May 2025",
    last: "05 Jun 2025",
  },
  {
    sl: "02",
    book: "Number Magic",
    img: "library-img2.png",
    cat: "Mathematics",
    no: "85620",
    taken: "05 May 2025",
    last: "05 Jun 2025",
  },
  {
    sl: "03",
    book: "Mental Math",
    img: "library-img3.png",
    cat: "Mathematics",
    no: "8512",
    taken: "05 May 2025",
    last: "05 Jun 2025",
  },
  {
    sl: "04",
    book: "Our Environment",
    img: "library-img4.png",
    cat: "Environmental Studies",
    no: "85620",
    taken: "05 May 2025",
    last: "05 Jun 2025",
  },
  {
    sl: "05",
    book: "Brainvita",
    img: "library-img5.png",
    cat: "General Knowledge",
    no: "8512",
    taken: "05 May 2025",
    last: "05 Jun 2025",
  },
];
const TABS = [
  { id: "teacherDetails", icon: "ri-group-line", label: "Teacher Details" },
  { id: "classRoutine", icon: "ri-file-edit-line", label: "Class Routine" },
  { id: "attendance", icon: "ri-calendar-check-line", label: "Attendance" },
  { id: "leave", icon: "ri-login-box-line", label: "Leave" },
  { id: "payroll", icon: "ri-money-dollar-box-line", label: "Payroll" },
  { id: "library", icon: "ri-book-line", label: "Library" },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
const TeacherDetails = () => {
  const [activeTab, setActiveTab] = useState("teacherDetails");
  const [suspendModal, setSuspendModal] = useState(false);
  const [loginDrawer, setLoginDrawer] = useState(false);
  const [leaveDrawer, setLeaveDrawer] = useState(false);
  const [payslipModal, setPayslipModal] = useState(false);
  const [activePayslip, setActivePayslip] = useState(null);

  const [lf, setLf] = useState({
    type: "",
    from: "",
    to: "",
    days: "",
    reason: "",
  });
  const onLf = (e) => setLf((p) => ({ ...p, [e.target.id]: e.target.value }));

  const openPayslip = (row) => {
    setActivePayslip({
      invoiceNo: `#${row.inv}`,
      teacherName: TEACHER.name,
      phone: TEACHER.phone,
      month: row.for,
      paymentDate: row.date,
      total: row.net,
      paymentType: row.method,
    });
    setPayslipModal(true);
  };

  return (
    <div className="dashboard-main-body">
      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h1 className="fw-semibold mb-4 h6 text-primary-light">
            Teacher Details
          </h1>
          <div>
            <Link
              to="/"
              className="text-secondary-light hover-text-primary hover-underline"
            >
              Dashboard{" "}
            </Link>
            <Link
              to="/teachers"
              className="text-secondary-light hover-text-primary hover-underline"
            >
              {" "}
              / Teacher
            </Link>
            <span className="text-secondary-light"> / Teacher Details</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setLoginDrawer(true)}
          className="btn btn-primary-600 d-flex align-items-center gap-6 bg-base text-primary-light bg-hover-primary-600"
        >
          <span className="d-flex text-md">
            <i className="ri-lock-2-line" />
          </span>
          Login Details
        </button>
      </div>

      <div className="mt-24">
        {/* Profile card */}
        <div className="card h-100">
          <div className="card-body p-24">
            <div className="d-flex gap-32 flex-md-row flex-column">
              <div className="max-w-300-px w-100 text-center">
                <figure className="mb-24 w-120-px h-120-px mx-auto rounded-circle overflow-hidden">
                  <img
                    src={TEACHER.photo}
                    alt="Teacher"
                    className="w-100 h-100 object-fit-cover"
                  />
                </figure>
                <h2 className="h6 text-primary-light mb-16 fw-semibold">
                  {TEACHER.name}
                </h2>
                <p className="mb-0">
                  ID:{" "}
                  <span className="text-primary-600 fw-semibold">
                    {TEACHER.id}
                  </span>
                </p>
                <p className="mb-0">
                  Subject:{" "}
                  <span className="text-primary-light fw-semibold">
                    {TEACHER.subject}
                  </span>
                </p>
                <div className="mt-32 d-flex gap-16 w-100">
                  <button
                    type="button"
                    onClick={() => setSuspendModal(true)}
                    className="btn border fw-medium border-danger-600 bg-hover-danger-200 text-danger-600 text-md d-flex justify-content-center align-items-center gap-8 flex-grow-1 px-12 py-8 radius-8"
                  >
                    <span className="d-flex text-lg">
                      <i className="ri-delete-bin-2-line" />
                    </span>
                    Suspend
                  </button>
                  <Link
                    to="/teachers/edit"
                    className="btn btn-primary-600 border fw-medium border-primary-600 text-md d-flex justify-content-center align-items-center gap-8 flex-grow-1 px-12 py-8 radius-8"
                  >
                    <span className="d-flex text-lg">
                      <i className="ri-edit-line" />
                    </span>
                    Edit
                  </Link>
                </div>
              </div>
              <div>
                <span className="h-100 w-1-px bg-neutral-200" />
              </div>
              <div className="flex-grow-1">
                <div className="pb-16 border-bottom d-flex align-items-center justify-content-between gap-20">
                  <h3 className="h6 text-primary-light text-lg mb-0 fw-semibold">
                    Personal Info
                  </h3>
                  <span className="bg-success-100 text-success-600 px-16 py-4 radius-4 fw-medium text-sm">
                    Active
                  </span>
                </div>
                <div className="mt-16 d-flex flex-column gap-8">
                  <InfoRow label="Class" value={TEACHER.class} />
                  <InfoRow label="Contract Type" value={TEACHER.contractType} />
                  <InfoRow label="Shift" value={TEACHER.shift} />
                  <InfoRow label="Work Location" value={TEACHER.workLocation} />
                  <InfoRow label="Date Of Birth" value={TEACHER.dob} />
                  <InfoRow label="Gender" value={TEACHER.gender} />
                  <InfoRow label="Join Date" value={TEACHER.joinDate} />
                  <InfoRow
                    label="Phone Number"
                    value={TEACHER.phone}
                    highlight
                  />
                  <InfoRow label="Email" value={TEACHER.email} highlight />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="my-16">
          <ul className="nav nav-pills bordered-tab mb-3" role="tablist">
            {TABS.map((tab) => (
              <li key={tab.id} className="nav-item" role="presentation">
                <button
                  type="button"
                  className={`nav-link d-flex align-items-center gap-8 text-secondary-light fw-medium text-sm text-hover-primary-600 text-capitalize bg-transparent px-20 py-12${activeTab === tab.id ? " active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="d-flex tab-icon line-height-1 text-md">
                    <i className={tab.icon} />
                  </span>
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>

          {/* ══ TEACHER DETAILS ══ */}
          {activeTab === "teacherDetails" && (
            <div className="row gy-4">
              <div className="col-md-12">
                <CardShell title="Profile Detail">
                  <div className="p-20">
                    <div className="row gy-4">
                      {[
                        ["Date of Birth", "10 Nov 1995"],
                        ["Martial Status", "Married"],
                        ["Qualification", "MBA"],
                        ["Experience", "7 Years"],
                        ["Father Name", "Ralph Edwards"],
                        ["Mother Name", "Floyd Miles"],
                      ].map(([l, v]) => (
                        <div key={l} className="col-md-3 col-sm-6">
                          <h6 className="text-md mb-2 fw-medium">{l}</h6>
                          <span>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardShell>
              </div>
              <div className="col-md-6">
                <CardShell title="Previous School Details">
                  <div className="p-20 row gy-4">
                    <div className="col-12">
                      <h6 className="text-md mb-2 fw-medium">
                        Previous School Name
                      </h6>
                      <span>Stuyvesant High School</span>
                    </div>
                    <div className="col-12">
                      <h6 className="text-md mb-2 fw-medium">
                        Current School Name
                      </h6>
                      <span>Bronx High School of Science</span>
                    </div>
                  </div>
                </CardShell>
              </div>
              <div className="col-md-6">
                <CardShell title="Address">
                  <div className="p-20 row gy-4">
                    <div className="col-12">
                      <h6 className="text-md mb-2 fw-medium">
                        Current Address
                      </h6>
                      <span>8502 Preston Rd. Inglewood, Maine 98380</span>
                    </div>
                    <div className="col-12">
                      <h6 className="text-md mb-2 fw-medium">
                        Permanent Address
                      </h6>
                      <span>
                        2118 Thornridge Cir. Syracuse, Connecticut 35624
                      </span>
                    </div>
                  </div>
                </CardShell>
              </div>
              <div className="col-md-6">
                <CardShell title="Bank Details">
                  <div className="p-20 row gy-4">
                    <div className="col-sm-4">
                      <h6 className="text-md mb-2 fw-medium">Bank Name</h6>
                      <span>Bank of America</span>
                    </div>
                    <div className="col-sm-4">
                      <h6 className="text-md mb-2 fw-medium">Branch</h6>
                      <span>New York</span>
                    </div>
                    <div className="col-sm-4">
                      <h6 className="text-md mb-2 fw-medium">IFSC Code</h6>
                      <span>5283209832</span>
                    </div>
                  </div>
                </CardShell>
              </div>
              <div className="col-md-6">
                <CardShell title="Medical Details">
                  <div className="p-20 row gy-4">
                    <div className="col-sm-4">
                      <h6 className="text-md mb-2 fw-medium">Blood Group</h6>
                      <span>O+</span>
                    </div>
                    <div className="col-sm-4">
                      <h6 className="text-md mb-2 fw-medium">Height</h6>
                      <span>5.2</span>
                    </div>
                    <div className="col-sm-4">
                      <h6 className="text-md mb-2 fw-medium">Weight</h6>
                      <span>60kg</span>
                    </div>
                  </div>
                </CardShell>
              </div>
              <div className="col-md-6">
                <CardShell title="Documents">
                  <div className="p-20">
                    <div className="p-10 border radius-8">
                      <div className="d-flex align-items-center justify-content-between gap-20">
                        <div className="d-flex align-items-center gap-12">
                          <span className="w-36-px h-36-px radius-4 bg-neutral-50 d-flex justify-content-center align-items-center text-xl">
                            <i className="ri-file-text-line" />
                          </span>
                          <span className="text-md text-secondary-light">
                            BirthCertificate.pdf
                          </span>
                        </div>
                        <button
                          type="button"
                          className="w-36-px h-36-px radius-4 bg-primary-50 bg-hover-primary-100 text-primary-600 d-flex justify-content-center align-items-center text-xl"
                        >
                          <i className="ri-download-2-line" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardShell>
              </div>
              <div className="col-md-6">
                <CardShell title="Social Media">
                  <div className="p-20 row gy-4">
                    <div className="col-sm-4">
                      <h6 className="text-md mb-2 fw-medium">Facebook</h6>
                      <span>www.facebook.com</span>
                    </div>
                    <div className="col-sm-4">
                      <h6 className="text-md mb-2 fw-medium">LinkedIn</h6>
                      <span>www.linkedin.com</span>
                    </div>
                    <div className="col-sm-4">
                      <h6 className="text-md mb-2 fw-medium">Instagram</h6>
                      <span>www.instagram.com</span>
                    </div>
                  </div>
                </CardShell>
              </div>
              <div className="col-md-12">
                <CardShell title="Description">
                  <div className="p-20">
                    <p className="text-secondary-light">
                      Known for their punctuality and positive attitude, he
                      consistently demonstrates a strong commitment to academic
                      excellence and co-curricular participation. He maintains
                      good behavior, shows respect toward teachers and peers,
                      and actively engages in classroom discussions and group
                      activities.
                    </p>
                  </div>
                </CardShell>
              </div>
            </div>
          )}

          {/* ══ CLASS ROUTINE ══ */}
          {activeTab === "classRoutine" && (
            <CardShell title="Class Routine">
              <div className="card-body p-20 d-flex flex-column gap-20">
                <div className="overflow-x-auto d-flex scroll-sm pb-8">
                  <div className="d-flex gap-16 flex-shrink-0 flex-grow-1">
                    {DAYS.map((day) => (
                      <div
                        key={day}
                        className="flex-grow-1"
                        style={{ minWidth: 160 }}
                      >
                        <h6 className="text-md mb-8">{day}</h6>
                        {day === "Sunday" ? (
                          <div className="border radius-8 overflow-hidden">
                            <h6 className="text-sm bg-warning-100 text-warning-600 fw-semibold py-10 px-16 text-center mb-0">
                              Holiday
                            </h6>
                          </div>
                        ) : (
                          <div className="d-flex flex-column gap-16">
                            {ROUTINE_CLASSES.map((cls, i) => (
                              <div
                                key={i}
                                className="border radius-8 overflow-hidden"
                              >
                                <h6
                                  className={`text-sm ${CLASS_COLORS[i].bg} ${CLASS_COLORS[i].text} fw-semibold py-10 px-16 text-center mb-0`}
                                >
                                  {cls.label}
                                </h6>
                                <div className="px-10 py-16 d-flex flex-column gap-10">
                                  <div className="d-flex align-items-center gap-8">
                                    <span className="d-flex line-height-1 text-secondary-light text-lg">
                                      <i className="ri-book-open-line" />
                                    </span>
                                    <div className="text-primary-light text-sm d-flex">
                                      <span className="w-64-px flex-shrink-0">
                                        Subject
                                      </span>
                                      <span className="flex-grow-1">
                                        : {cls.subject}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center gap-8">
                                    <span className="d-flex line-height-1 text-secondary-light text-lg">
                                      <i className="ri-building-4-line" />
                                    </span>
                                    <div className="text-primary-light text-sm d-flex">
                                      <span className="w-64-px flex-shrink-0">
                                        Room No
                                      </span>
                                      <span className="flex-grow-1">
                                        : {cls.room}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center gap-8">
                                    <span className="d-flex line-height-1 text-secondary-light text-lg">
                                      <i className="ri-time-line" />
                                    </span>
                                    <div className="text-primary-light text-sm d-flex">
                                      <span className="flex-grow-1">
                                        {cls.time}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardShell>
          )}

          {/* ══ ATTENDANCE ══ */}
          {activeTab === "attendance" && (
            <CardShell title="Attendance">
              <div className="px-20 pt-20">
                <div className="row row-cols-xxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-3">
                  {[
                    {
                      val: "227",
                      label: "Total Present",
                      bg: "bg-success-600",
                      icon: "solar:check-circle-bold",
                    },
                    {
                      val: "70",
                      label: "Total Absent",
                      bg: "bg-danger-600",
                      icon: "solar:close-circle-bold",
                    },
                    {
                      val: "27",
                      label: "Half Day",
                      bg: "bg-purple-600",
                      icon: "solar:calendar-bold",
                    },
                    {
                      val: "28",
                      label: "Total Late",
                      bg: "bg-info-600",
                      icon: "solar:clock-circle-bold",
                    },
                    {
                      val: "12",
                      label: "Total Holiday",
                      bg: "bg-orange",
                      icon: "solar:sun-2-bold",
                    },
                  ].map((s) => (
                    <div key={s.label} className="col">
                      <div className="card px-20 py-28 radius-8 h-100 border border-neutral-200 shadow-none">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-1">
                          <div>
                            <h6 className="fw-semibold mb-2">{s.val}</h6>
                            <span className="fw-medium text-secondary-light text-sm">
                              {s.label}
                            </span>
                          </div>
                          <span
                            className={`w-48-px h-48-px ${s.bg} flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle`}
                          >
                            <iconify-icon
                              icon={s.icon}
                              style={{ fontSize: "22px", color: "#fff" }}
                            ></iconify-icon>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-24 mb-16 mx-20 d-flex flex-wrap align-items-center justify-content-between gap-16">
                <div className="d-flex flex-wrap align-items-center gap-16">
                  <select className="form-control form-select">
                    {["Jun 2025/2026", "Jun 2026/2027", "Jun 2027/2028"].map(
                      (y) => (
                        <option key={y}>{y}</option>
                      ),
                    )}
                  </select>
                  <div className="dropdown">
                    <button
                      type="button"
                      className="px-12 py-8 border border-neutral-300 radius-8 d-flex align-items-center gap-20"
                      data-bs-toggle="dropdown"
                    >
                      <span className="d-flex align-items-center gap-1 text-secondary-light text-sm">
                        <i className="ri-file-upload-line text-md line-height-1"></i>{" "}
                        Export
                      </span>
                      <i className="ri-arrow-down-s-line"></i>
                    </button>
                    <ul className="dropdown-menu p-12 border bg-base shadow">
                      <li>
                        <button
                          type="button"
                          className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 d-flex align-items-center gap-10"
                        >
                          <i className="ri-file-3-line"></i> PDF
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 d-flex align-items-center gap-10"
                        >
                          <i className="ri-file-excel-line"></i> Excel
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="d-flex align-items-center flex-wrap gap-8">
                  {[
                    ["P", "success", "Present"],
                    ["A", "danger", "Absent"],
                    ["H", "warning", "Holiday"],
                    ["L", "info", "Late"],
                    ["F", "purple", "Half Day"],
                  ].map(([l, c, lbl]) => (
                    <p
                      key={l}
                      className="text-primary-light text-sm fw-medium mb-0"
                    >
                      {lbl}:{" "}
                      <span className={`fw-semibold text-${c}-600`}>{l} </span>
                    </p>
                  ))}
                </div>
              </div>
              <div className="table-responsive overflow-x-auto">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th
                        className="bg-neutral-100 text-sm text-primary-light px-10 py-16"
                        style={{ minWidth: 50 }}
                      >
                        Month
                      </th>
                      {Array.from({ length: 30 }, (_, i) => (
                        <th
                          key={i}
                          className="bg-neutral-100 text-sm text-primary-light px-10 py-16"
                        >
                          {i + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ATTENDANCE.map((row) => (
                      <tr key={row.m}>
                        <td className="px-10 py-16 text-sm fw-semibold">
                          {row.m}
                        </td>
                        {row.d.map((v, i) => (
                          <td
                            key={i}
                            className="px-10 py-14 text-sm text-center"
                          >
                            <span style={attStyle(v)}>{v?.toUpperCase()}</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardShell>
          )}

          {/* ══ LEAVE ══ */}
          {activeTab === "leave" && (
            <CardShell
              title="Leave"
              action={
                <button
                  type="button"
                  onClick={() => setLeaveDrawer(true)}
                  className="btn btn-primary-600 d-flex align-items-center gap-6 py-8 text-sm"
                >
                  <i className="ri-calendar-close-line" /> Apply Leave
                </button>
              }
            >
              <TableToolbar />
              <div className="table-responsive">
                <table className="table bordered-table mb-0 w-100">
                  <thead>
                    <tr>
                      <th className="bg-neutral-100 text-sm text-primary-light px-16 py-12">
                        <div className="form-check style-check d-flex align-items-center">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label"> S.L</label>
                        </div>
                      </th>
                      {[
                        "Leave Type",
                        "Date",
                        "Duration",
                        "Apply Date",
                        "Status",
                      ].map((h) => (
                        <th
                          key={h}
                          className="bg-neutral-100 text-sm text-primary-light px-16 py-12"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {LEAVES.map((r) => (
                      <tr key={r.sl}>
                        <td className="px-16 py-12 text-sm">
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                            />
                            <label className="form-check-label"> {r.sl}</label>
                          </div>
                        </td>
                        <td className="px-16 py-12 text-sm">{r.type}</td>
                        <td className="px-16 py-12 text-sm">{r.date}</td>
                        <td className="px-16 py-12 text-sm">{r.dur}</td>
                        <td className="px-16 py-12 text-sm">{r.apply}</td>
                        <td className="px-16 py-12 text-sm">
                          <StatusBadge status={r.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardShell>
          )}

          {/* ══ PAYROLL ══ */}
          {activeTab === "payroll" && (
            <>
              <div className="pb-20">
                <div className="row g-3">
                  {[
                    {
                      val: "$50,000",
                      label: "Total Net Salary",
                      bg: "bg-success-600",
                      icon: "solar:dollar-minimalistic-bold",
                    },
                    {
                      val: "$5,000",
                      label: "Total Gross Salary",
                      bg: "bg-info-600",
                      icon: "solar:bill-bold",
                    },
                    {
                      val: "$3,000",
                      label: "Total Deduction",
                      bg: "bg-danger-600",
                      icon: "solar:close-circle-bold",
                    },
                  ].map((s) => (
                    <div key={s.label} className="col-xl-3 col-sm-6">
                      <div className="card px-20 py-28 radius-8 h-100 border border-neutral-200 shadow-none">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-1">
                          <div>
                            <h6 className="fw-semibold mb-2">{s.val}</h6>
                            <span className="fw-medium text-secondary-light text-sm">
                              {s.label}
                            </span>
                          </div>
                          <span
                            className={`w-48-px h-48-px ${s.bg} flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle`}
                          >
                            <iconify-icon
                              icon={s.icon}
                              style={{ fontSize: "22px", color: "#fff" }}
                            ></iconify-icon>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <CardShell title="Payroll">
                <TableToolbar />
                <div className="table-responsive">
                  <table className="table bordered-table mb-0 w-100">
                    <thead>
                      <tr>
                        <th className="bg-neutral-100 text-sm text-primary-light px-12 py-12">
                          <div className="form-check style-check d-flex align-items-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                            />
                            <label className="form-check-label"> S.L</label>
                          </div>
                        </th>
                        {[
                          "Invoice ID",
                          "Salary For",
                          "Date",
                          "Net Salary",
                          "Payment Method",
                          "Status",
                          "Action",
                        ].map((h) => (
                          <th
                            key={h}
                            className="bg-neutral-100 text-sm text-primary-light px-12 py-12"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {PAYROLL.map((r) => (
                        <tr key={r.sl}>
                          <td className="px-12 py-12 text-sm">
                            <div className="form-check style-check d-flex align-items-center">
                              <input
                                className="form-check-input"
                                type="checkbox"
                              />
                              <label className="form-check-label">
                                {" "}
                                {r.sl}
                              </label>
                            </div>
                          </td>
                          <td className="px-12 py-12 text-sm">
                            <span className="text-primary-600">{r.inv}</span>
                          </td>
                          <td className="px-12 py-12 text-sm">{r.for}</td>
                          <td className="px-12 py-12 text-sm">{r.date}</td>
                          <td className="px-12 py-12 text-sm">{r.net}</td>
                          <td className="px-12 py-12 text-sm">{r.method}</td>
                          <td className="px-12 py-12 text-sm">
                            <StatusBadge status={r.status} />
                          </td>
                          <td className="px-12 py-12 text-sm">
                            <button
                              type="button"
                              onClick={() => openPayslip(r)}
                              className="bg-neutral-200 bg-hover-neutral-300 text-neutral-600 px-20 py-4 radius-4 fw-medium text-sm"
                            >
                              View Payslip
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardShell>
            </>
          )}

          {/* ══ LIBRARY ══ */}
          {activeTab === "library" && (
            <CardShell title="Library">
              <TableToolbar showExport={false} />
              <div className="table-responsive">
                <table className="table bordered-table mb-0 w-100">
                  <thead>
                    <tr>
                      {[
                        "S.L",
                        "Book Name",
                        "Book Category",
                        "Book Number",
                        "Taken ON",
                        "Last Date",
                      ].map((h) => (
                        <th
                          key={h}
                          className="bg-neutral-100 text-sm text-primary-light px-16 py-12 text-start"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {LIBRARY.map((r) => (
                      <tr key={r.sl}>
                        <td className="px-16 py-12 text-sm text-start">
                          {r.sl}
                        </td>
                        <td className="px-16 py-12 text-sm text-start">
                          <div className="d-flex align-items-center gap-12">
                            <img
                              src={`assets/images/thumbs/${r.img}`}
                              alt={r.book}
                              className="flex-shrink-0 radius-4 w-36-px h-36-px object-fit-cover"
                            />
                            <h6 className="text-md mb-0 fw-medium text-secondary-light">
                              {r.book}
                            </h6>
                          </div>
                        </td>
                        <td className="px-16 py-12 text-sm text-start">
                          {r.cat}
                        </td>
                        <td className="px-16 py-12 text-sm text-start">
                          {r.no}
                        </td>
                        <td className="px-16 py-12 text-sm text-start">
                          {r.taken}
                        </td>
                        <td className="px-16 py-12 text-sm text-start">
                          {r.last}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardShell>
          )}
        </div>
      </div>

      {/* ── OVERLAYS ───────────────────────────────────────────────────────────── */}

      {/* 1. Suspend → reused ConfirmModal */}
      <ConfirmModal
        show={suspendModal}
        onClose={() => setSuspendModal(false)}
        onConfirm={() => {
          alert("Teacher suspended!");
          setSuspendModal(false);
        }}
        title="Suspend Teacher"
        message="Are you sure you want to Suspend this Teacher?"
        confirmText="Yes, Suspend"
        cancelText="Cancel"
        icon="fluent:delete-24-regular"
        variant="danger"
      />

      {/* 2. Login Details → reused SlideDrawer */}
      <SlideDrawer
        isOpen={loginDrawer}
        onClose={() => setLoginDrawer(false)}
        title="Login Details"
      >
        <div className="p-20 d-flex align-items-center gap-20">
          <figure className="w-72-px h-72-px rounded-circle overflow-hidden mb-0">
            <img
              src={TEACHER.photo}
              alt="Teacher"
              className="w-100 h-100 object-fit-cover"
            />
          </figure>
          <div>
            <h2 className="text-xl text-primary-light mb-4">{TEACHER.name}</h2>
            <p className="mb-0">
              Roll No:{" "}
              <span className="text-primary-light fw-semibold">10</span>
            </p>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table bordered-table mb-0 w-100">
            <thead>
              <tr>
                {["User Type", "Email", "Password"].map((h) => (
                  <th
                    key={h}
                    className="bg-neutral-100 text-sm text-primary-light px-16 py-12 text-start"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-16 py-12 text-start">Teacher</td>
                <td className="px-16 py-12 text-start">teacher@example.com</td>
                <td className="px-16 py-12 text-start">15445@#AC</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SlideDrawer>

      {/* 3. Apply Leave → reused SlideDrawer */}
      <SlideDrawer
        isOpen={leaveDrawer}
        onClose={() => setLeaveDrawer(false)}
        title="Apply Leave"
      >
        <form
          className="p-20"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Leave request sent!");
            setLeaveDrawer(false);
          }}
        >
          <div className="row g-3">
            <div className="col-sm-6">
              <label className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Leave Type
              </label>
              <select
                id="type"
                className="form-control form-select"
                value={lf.type}
                onChange={onLf}
              >
                <option value="" disabled>
                  Select a leave type
                </option>
                <option>Sickness</option>
                <option>Accident</option>
                <option>Travel</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                From Date
              </label>
              <input
                type="date"
                id="from"
                className="form-control"
                value={lf.from}
                onChange={onLf}
              />
            </div>
            <div className="col-sm-6">
              <label className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                To Date
              </label>
              <input
                type="date"
                id="to"
                className="form-control"
                value={lf.to}
                onChange={onLf}
              />
            </div>
            <div className="col-sm-6">
              <label className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Leave Days
              </label>
              <select
                id="days"
                className="form-control form-select"
                value={lf.days}
                onChange={onLf}
              >
                <option value="">Full day / First half / Second half</option>
                <option>Full day</option>
                <option>First half</option>
                <option>Second half</option>
              </select>
            </div>
            <div className="col-12">
              <label className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                Reason for Leave
              </label>
              <textarea
                id="reason"
                className="form-control"
                rows={4}
                placeholder="Enter reason for leave..."
                value={lf.reason}
                onChange={onLf}
              />
            </div>
            <div className="col-12 d-flex justify-content-center gap-3 mt-8">
              <button
                type="button"
                onClick={() => setLeaveDrawer(false)}
                className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-50 py-11 radius-8"
                style={{ background: "none", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary-600 border border-primary-600 text-md px-28 py-12 radius-8"
              >
                Send Request
              </button>
            </div>
          </div>
        </form>
      </SlideDrawer>

      {/* 4. View Payslip → new PayslipModal */}
      <PayslipModal
        show={payslipModal}
        onClose={() => setPayslipModal(false)}
        payslip={activePayslip}
      />
    </div>
  );
};

export default TeacherDetails;
