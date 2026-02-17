import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Dashboard
import Dashboard from './pages/Dashboard';

// Students
import AddStudent from './pages/Students/Addstudent';
import StudentList from './pages/Students/StudentList';
import SuspendedStudent from './pages/Students/SuspendedStudent';
import StudentCategory from './pages/Students/StudentCategories';
import EditStudent from './pages/Students/EditStudent';
import StudentDetails from './pages/Students/StudentDetails';

// Teachers
import AddNewTeacher from './pages/Teachers/AddNewTeacher';
import TeacherList from './pages/Teachers/TeacherList';
import EditTeacher from './pages/Teachers/EditTeacher';
import TeacherTimetable from './pages/Teachers/TeacherTimetable';
import TeacherDetails from './pages/Teachers/TeacherDetails';

// Guardians
import AddNewGuardian from './pages/Guardian/AddNewGuardian';
import GuardianList from './pages/Guardian/GuardianList';
import EditGuardian from './pages/Guardian/EditGuardian';
import GuardianDetails from './pages/Guardian/GuardianDetails';

// ─── Placeholder pages (replace with real components later) ──────────────────
const Placeholder = ({ title }) => (
  <div className="dashboard-main-body">
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
      <div className="text-center">
        <iconify-icon icon="solar:document-bold" style={{ fontSize: '64px', color: '#0A51CE', opacity: 0.4 }}></iconify-icon>
        <h4 className="mt-16 text-primary-light fw-semibold">{title}</h4>
        <p className="text-secondary-light">This page is under construction.</p>
      </div>
    </div>
  </div>
);

// ─── Layout wrapper (Sidebar + Navbar + content area + Footer) ───────────────
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-wrapper">
      <Sidebar />
      <main className="dashboard-main">
        <Navbar onToggleSidebar={() => setSidebarOpen((p) => !p)} />
        {children}
        <Footer />
      </main>
    </div>
  );
};

// ─── App with Router ─────────────────────────────────────────────────────────
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Dashboard */}
          <Route path="/"                         element={<Dashboard />} />

          {/* Students */}
          <Route path="/students"                 element={<StudentList />} />
          <Route path="/students/add"             element={<AddStudent />} />
          <Route path="/students/edit"            element={<EditStudent />} />
          <Route path="/students/details"         element={<StudentDetails />} />
          <Route path="/students/suspend"         element={<SuspendedStudent />} />
          <Route path="/students/categories"      element={<StudentCategory />} />

          {/* Teachers */}
          <Route path="/teachers"                 element={<TeacherList />} />
          <Route path="/teachers/add"             element={<AddNewTeacher />} />
          <Route path="/teachers/edit"            element={<EditTeacher />} />
          <Route path="/teachers/details"         element={<TeacherDetails />} />
          <Route path="/teachers/timetable"       element={<TeacherTimetable />} />

          {/* Guardians */}
          <Route path="/guardians"                element={<GuardianList />} />
          <Route path="/guardians/add"            element={<AddNewGuardian />} />
          <Route path="/guardians/edit"           element={<EditGuardian />} />
          <Route path="/guardians/details"        element={<GuardianDetails />} />

          {/* Classes */}
          <Route path="/classes"                  element={<Placeholder title="Class List" />} />
          <Route path="/classes/section"          element={<Placeholder title="Section" />} />
          <Route path="/classes/subjects"         element={<Placeholder title="Subjects" />} />
          <Route path="/classes/rooms"            element={<Placeholder title="Class Room" />} />

          {/* Examinations */}
          <Route path="/exams"                    element={<Placeholder title="Exams" />} />
          <Route path="/exams/schedule"           element={<Placeholder title="Exam Schedule" />} />
          <Route path="/exams/results"            element={<Placeholder title="Exam Results" />} />

          {/* Fees */}
          <Route path="/fees"                     element={<Placeholder title="Fees Collect" />} />
          <Route path="/fees/type"                element={<Placeholder title="Fees Type" />} />
          <Route path="/fees/group"               element={<Placeholder title="Fees Group" />} />
          <Route path="/fees/discount"            element={<Placeholder title="Fees Discount" />} />

          {/* Attendance */}
          <Route path="/attendance/student"       element={<Placeholder title="Student Attendance" />} />
          <Route path="/attendance/teacher"       element={<Placeholder title="Teacher Attendance" />} />
          <Route path="/attendance/employee"      element={<Placeholder title="Employee Attendance" />} />

          {/* Leaves */}
          <Route path="/leaves/types"             element={<Placeholder title="Leave Types" />} />
          <Route path="/leaves/requests"          element={<Placeholder title="Leave Requests" />} />

          {/* Library */}
          <Route path="/library/books"            element={<Placeholder title="Books List" />} />
          <Route path="/library/members"          element={<Placeholder title="Members List" />} />
          <Route path="/library/details"          element={<Placeholder title="Members Details" />} />
          <Route path="/library/issues"           element={<Placeholder title="Issue Return" />} />

          {/* Accounts */}
          <Route path="/accounts/income-head"     element={<Placeholder title="Income Head" />} />
          <Route path="/accounts/income"          element={<Placeholder title="Income List" />} />
          <Route path="/accounts/expense-head"    element={<Placeholder title="Expense Head" />} />
          <Route path="/accounts/expense"         element={<Placeholder title="Expense List" />} />
          <Route path="/accounts/transaction"     element={<Placeholder title="Transaction" />} />

          {/* HRM */}
          <Route path="/hrm/employees"            element={<Placeholder title="Employee List" />} />
          <Route path="/hrm/details"              element={<Placeholder title="Employee Details" />} />
          <Route path="/hrm/add"                  element={<Placeholder title="Add New Employee" />} />
          <Route path="/hrm/payroll"              element={<Placeholder title="Payroll" />} />
          <Route path="/hrm/designation"          element={<Placeholder title="Designation" />} />
          <Route path="/hrm/department"           element={<Placeholder title="Department" />} />

          {/* Auth */}
          <Route path="/auth/login"               element={<Placeholder title="Login" />} />
          <Route path="/auth/register"            element={<Placeholder title="Register" />} />

          {/* Settings */}
          <Route path="/settings"                 element={<Placeholder title="General Settings" />} />
          <Route path="/settings/notification"    element={<Placeholder title="Notification Settings" />} />
          <Route path="/settings/currencies"      element={<Placeholder title="Currencies" />} />
          <Route path="/settings/languages"       element={<Placeholder title="Languages" />} />

          {/* Single pages */}
          <Route path="/certificate"              element={<Placeholder title="Certificate" />} />
          <Route path="/notice-board"             element={<Placeholder title="Notice Board" />} />
          <Route path="/events"                   element={<Placeholder title="Events" />} />
          <Route path="/messages"                 element={<Placeholder title="Messages" />} />
          <Route path="/subscription"             element={<Placeholder title="Subscription Plan" />} />
          <Route path="/roles"                    element={<Placeholder title="Role & Access" />} />
          <Route path="/assign-role"              element={<Placeholder title="Assign Role" />} />
          <Route path="/profile"                  element={<Placeholder title="My Profile" />} />
          <Route path="/lms"                      element={<Placeholder title="LMS" />} />

          {/* 404 fallback */}
          <Route path="*"                         element={<Placeholder title="404 – Page Not Found" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;