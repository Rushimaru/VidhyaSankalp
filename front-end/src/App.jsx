import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layout components (Sidebar, Navbar, Footer)
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Dashboard
import Dashboard from './pages/Dashboard';

// Students
import AddStudent from './pages/students/Addstudent';
import StudentList from './pages/students/StudentList';
import SuspendedStudent from './pages/students/SuspendedStudent';
import StudentCategory from './pages/students/StudentCategories';
import EditStudent from './pages/students/EditStudent';
import StudentDetails from './pages/students/StudentDetails';

// Teachers
import AddNewTeacher from './pages/teachers/AddNewTeacher';
import TeacherList from './pages/teachers/TeacherList';
import EditTeacher from './pages/teachers/EditTeacher';
import TeacherTimetable from './pages/teachers/TeacherTimetable';
import TeacherDetails from './pages/teachers/TeacherDetails';

// Guardians
import AddNewGuardian from './pages/guardian/AddNewGuardian';
import GuardianList from './pages/guardian/GuardianList';
import EditGuardian from './pages/guardian/EditGuardian';
import GuardianDetails from './pages/guardian/GuardianDetails';

// classes
import SectionList from './pages/classes/SectionList';
import SubjectList from './pages/classes/SubjectList';
import ClassList from './pages/classes/ClassList';
import ClassRoomList from './pages/classes/ClassRoomList';

// examinations
import ExamList from './pages/examinations/ExamList';
import ExamSchedule from './pages/examinations/ExamSchedule';
import ExamResult from './pages/examinations/ExamResult';

// fees
import FeesCollect from './pages/fees/FeesCollect';
import FeesType from './pages/fees/FeesType';
import FeesGroup from './pages/fees/FeesGroup';
import FeesDiscount from './pages/fees/FeesDiscount';

// attendance
import StudentAttendance from './pages/attendance/StudentAttendance';
import TeacherAttendance from './pages/attendance/TeacherAttendance';
import EmployeeAttendance from './pages/attendance/EmployeeAttendance';

// leave
import LeaveTypes from './pages/leaves/LeaveTypes';
import LeaveRequest from './pages/leaves/LeaveRequest';

// certificate
import Certificate from './pages/certificate/Certificate';

// library
import BooksList from './pages/library/BooksList';
import MembersList from './pages/library/MembersList';
import MemberDetails from './pages/library/MemberDetails';
import IssueReturn from './pages/library/IssueReturn';

// accounts
import IncomeHeadList from './pages/accounts/IncomeHeadList';
import IncomeList from './pages/accounts/IncomeList';
import ExpenseHeadList from './pages/accounts/ExpenseHeadList';
import ExpenseList from './pages/accounts/ExpenseList';
import Transaction from './pages/accounts/Transaction';

// HRM 
import EmployeeList from './pages/hrm/EmployeeList';
import EmployeeDetails from './pages/hrm/EmployeeDetails';
import AddNewEmployee from './pages/hrm/AddNewEmployee';
import Payroll from './pages/hrm/Payroll';
import Designation from './pages/hrm/Designation';
import Department from './pages/hrm/Department';

// notice
import NoticeBoard from './pages/notice/NoticeBoard';

// events
import Event from './pages/events/Event';

// messages
import Message from './pages/message/Message';

// subscription
import SubscriptionPlan from './pages/subscription/SubscriptionPlan';

// roles
import RoleAccess from './pages/role/RoleAccess';
import AssignRole from './pages/role/AssignRole';

// auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// settings
import GeneralSettings from './pages/settings/GeneralSettings';
import NotificationSettings from './pages/settings/NotificationSettings';
import Currencies from './pages/settings/Currencies';
import Languages from './pages/settings/Languages';

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

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="app-wrapper">
      <Sidebar />
      <main className="dashboard-main">
        <Navbar onToggleSidebar={() => setSidebarOpen((p) => !p)} />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

// Public route – if user is already logged in, redirect to dashboard
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes (no layout, no protection) */}
          <Route
            path="/auth/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/auth/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* All protected routes are inside Layout and ProtectedRoute */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />

            {/* Students */}
            <Route path="students" element={<StudentList />} />
            <Route path="students/add" element={<AddStudent />} />
            <Route path="students/edit" element={<EditStudent />} />
            <Route path="students/details" element={<StudentDetails />} />
            <Route path="students/suspend" element={<SuspendedStudent />} />
            <Route path="students/categories" element={<StudentCategory />} />

            {/* Teachers */}
            <Route path="teachers" element={<TeacherList />} />
            <Route path="teachers/add" element={<AddNewTeacher />} />
            <Route path="teachers/edit" element={<EditTeacher />} />
            <Route path="teachers/details" element={<TeacherDetails />} />
            <Route path="teachers/timetable" element={<TeacherTimetable />} />

            {/* Guardians */}
            <Route path="guardians" element={<GuardianList />} />
            <Route path="guardians/add" element={<AddNewGuardian />} />
            <Route path="guardians/edit" element={<EditGuardian />} />
            <Route path="guardians/details" element={<GuardianDetails />} />

            {/* Classes */}
            <Route path="classes" element={<ClassList />} />
            <Route path="classes/section" element={<SectionList />} />
            <Route path="classes/subjects" element={<SubjectList />} />
            <Route path="classes/rooms" element={<ClassRoomList />} />

            {/* Examinations */}
            <Route path="exams" element={<ExamList />} />
            <Route path="exams/schedule" element={<ExamSchedule />} />
            <Route path="exams/results" element={<ExamResult />} />

            {/* Fees */}
            <Route path="fees" element={<FeesCollect />} />
            <Route path="fees/type" element={<FeesType />} />
            <Route path="fees/group" element={<FeesGroup />} />
            <Route path="fees/discount" element={<FeesDiscount />} />

            {/* Attendance */}
            <Route path="attendance/student" element={<StudentAttendance />} />
            <Route path="attendance/teacher" element={<TeacherAttendance />} />
            <Route path="attendance/employee" element={<EmployeeAttendance />} />

            {/* Leaves */}
            <Route path="leaves/types" element={<LeaveTypes />} />
            <Route path="leaves/requests" element={<LeaveRequest />} />

            {/* Library */}
            <Route path="library/books" element={<BooksList />} />
            <Route path="library/members" element={<MembersList />} />
            <Route path="library/details" element={<MemberDetails />} />
            <Route path="library/issues" element={<IssueReturn />} />

            {/* Accounts */}
            <Route path="accounts/income-head" element={<IncomeHeadList />} />
            <Route path="accounts/income" element={<IncomeList />} />
            <Route path="accounts/expense-head" element={<ExpenseHeadList />} />
            <Route path="accounts/expense" element={<ExpenseList />} />
            <Route path="accounts/transaction" element={<Transaction />} />

            {/* HRM */}
            <Route path="hrm/employees" element={<EmployeeList />} />
            <Route path="hrm/details" element={<EmployeeDetails />} />
            <Route path="hrm/add" element={<AddNewEmployee />} />
            <Route path="hrm/payroll" element={<Payroll />} />
            <Route path="hrm/designation" element={<Designation />} />
            <Route path="hrm/department" element={<Department />} />

            {/* Settings */}
            <Route path="settings" element={<GeneralSettings />} />
            <Route path="settings/notification" element={<NotificationSettings />} />
            <Route path="settings/currencies" element={<Currencies />} />
            <Route path="settings/languages" element={<Languages />} />

            {/* Single pages */}
            <Route path="certificate" element={<Certificate />} />
            <Route path="notice-board" element={<NoticeBoard />} />
            <Route path="events" element={<Event />} />
            <Route path="messages" element={<Message />} />
            <Route path="subscription" element={<SubscriptionPlan />} />
            <Route path="roles" element={<RoleAccess />} />
            <Route path="assign-role" element={<Placeholder title="Assign Role" />} />
            <Route path="profile" element={<Placeholder title="My Profile" />} />
            <Route path="lms" element={<Placeholder title="LMS" />} />

            {/* 404 fallback inside layout */}
            <Route path="*" element={<Placeholder title="404 – Page Not Found" />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;