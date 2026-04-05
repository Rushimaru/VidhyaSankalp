import React, { useState } from "react";
import {
  BrowserRouter as Router, Routes, Route, Navigate, Outlet,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SuperAdminLayout from "./components/SuperAdminLayout";
import FacultyLayout from "./components/FacultyLayout";
import StudentLayout from "./components/StudentLayout";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOtp from "./pages/auth/VerifyOtp";

// Dashboard
import Dashboard from "./pages/Dashboard";

// Students (Admin panel)
import AddStudent from "./pages/Students/Addstudent";
import StudentList from "./pages/Students/StudentList";
import EditStudent from "./pages/Students/EditStudent";
import StudentDetails from "./pages/Students/StudentDetails";

// Teachers
import AddNewTeacher from "./pages/teachers/AddNewTeacher";
import TeacherList from "./pages/teachers/TeacherList";
import EditTeacher from "./pages/teachers/EditTeacher";
import TeacherTimetable from "./pages/teachers/TeacherTimetable";
import TeacherDetails from "./pages/teachers/TeacherDetails";

// Guardians
import AddNewGuardian from "./pages/guardian/AddNewGuardian";
import GuardianList from "./pages/guardian/GuardianList";
import EditGuardian from "./pages/guardian/EditGuardian";
import GuardianDetails from "./pages/guardian/GuardianDetails";

// Classes
import SectionList from "./pages/classes/SectionList";
import SubjectList from "./pages/classes/SubjectList";
import ClassList from "./pages/classes/ClassList";
import ClassRoomList from "./pages/classes/ClassRoomList";

// Examinations
import ExamList from "./pages/examinations/ExamList";
import ExamSchedule from "./pages/examinations/ExamSchedule";
import ExamResult from "./pages/examinations/ExamResult";

// Fees
import FeesCollect from "./pages/fees/FeesCollect";
import FeesType from "./pages/fees/FeesType";
import FeesGroup from "./pages/fees/FeesGroup";
import FeesDiscount from "./pages/fees/FeesDiscount";

// Attendance
import StudentAttendance from "./pages/attendance/StudentAttendance";
import TeacherAttendance from "./pages/attendance/TeacherAttendance";
import EmployeeAttendance from "./pages/attendance/EmployeeAttendance";

// Leaves
import LeaveTypes from "./pages/leaves/LeaveTypes";
import LeaveRequest from "./pages/leaves/LeaveRequest";

// Certificate / Library / Accounts / HRM / Notice / Events / Messages
import Certificate from "./pages/certificate/Certificate";
import BooksList from "./pages/library/BooksList";
import MembersList from "./pages/library/MembersList";
import MemberDetails from "./pages/library/MemberDetails";
import IssueReturn from "./pages/library/IssueReturn";
import IncomeHeadList from "./pages/accounts/IncomeHeadList";
import IncomeList from "./pages/accounts/IncomeList";
import ExpenseHeadList from "./pages/accounts/ExpenseHeadList";
import ExpenseList from "./pages/accounts/ExpenseList";
import Transaction from "./pages/accounts/Transaction";
import EmployeeList from "./pages/hrm/EmployeeList";
import EmployeeDetails from "./pages/hrm/EmployeeDetails";
import AddNewEmployee from "./pages/hrm/AddNewEmployee";
import Payroll from "./pages/hrm/Payroll";
import Designation from "./pages/hrm/Designation";
import Department from "./pages/hrm/Department";
import NoticeBoard from "./pages/notice/NoticeBoard";
import Event from "./pages/events/Event";
import Message from "./pages/message/Message";
import SubscriptionPlan from "./pages/subscription/SubscriptionPlan";
import RoleAccess from "./pages/role/RoleAccess";
import AssignRole from "./pages/role/AssignRole";
import GeneralSettings from "./pages/settings/GeneralSettings";
import NotificationSettings from "./pages/settings/NotificationSettings";
import Currencies from "./pages/settings/Currencies";
import Languages from "./pages/settings/Languages";

// ── Super Admin pages
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import InstitutionList from "./pages/super-admin/InstitutionList";
import AddInstitution from "./pages/super-admin/AddInstitution";
import InstitutionDetails from "./pages/super-admin/InstitutionDetails";
import PaymentTracking from "./pages/super-admin/PaymentTracking";
import SubscriptionPlans from "./pages/super-admin/SubscriptionPlans";

// ── Faculty pages
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import FacultyAttendance from "./pages/faculty/FacultyAttendance";
import UploadMaterial from "./pages/faculty/UploadMaterial";
import CreateAssignment from "./pages/faculty/CreateAssignment";

// ── Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentAttendanceSummary from "./pages/student/StudentAttendanceSummary";
import StudyMaterials from "./pages/student/StudyMaterials";
import StudentAssignments from "./pages/student/StudentAssignments";
import FeeStatus from "./pages/student/FeeStatus";
import StudentProfile from "./pages/student/StudentProfile";

// ── Placeholder
const Placeholder = ({ title }) => (
  <div className="dashboard-main-body">
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "400px" }}>
      <div className="text-center">
        <iconify-icon icon="solar:document-bold" style={{ fontSize: "64px", color: "#0A51CE", opacity: 0.4 }} />
        <h4 className="mt-16 text-primary-light fw-semibold">{title}</h4>
        <p className="text-secondary-light">This page is under construction.</p>
      </div>
    </div>
  </div>
);

// ── Admin layout (existing)
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

// ── Public route: redirect to role home if already logged in
const PublicRoute = ({ children }) => {
  const { user, userHome } = useAuth();
  return user ? <Navigate to={userHome} replace /> : children;
};

// ── Role-gated protected route
const RoleRoute = ({ roles, children }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
  if (roles && !roles.includes(user?.role)) return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ── Public Auth */}
          <Route path="/auth/login"      element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/auth/register"   element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/auth/verify-otp" element={<PublicRoute><VerifyOtp /></PublicRoute>} />

          {/* ── Super Admin Panel */}
          <Route path="/super-admin" element={<RoleRoute roles={['superadmin']}><SuperAdminLayout /></RoleRoute>}>
            <Route index element={<SuperAdminDashboard />} />
            <Route path="institutions" element={<InstitutionList />} />
            <Route path="institutions/add" element={<AddInstitution />} />
            <Route path="institutions/:id" element={<InstitutionDetails />} />
            <Route path="payments" element={<PaymentTracking />} />
            <Route path="plans" element={<SubscriptionPlans />} />
          </Route>

          {/* ── Faculty Panel */}
          <Route path="/faculty" element={<RoleRoute roles={['faculty']}><FacultyLayout /></RoleRoute>}>
            <Route index element={<FacultyDashboard />} />
            <Route path="attendance" element={<FacultyAttendance />} />
            <Route path="materials" element={<UploadMaterial />} />
            <Route path="assignments" element={<CreateAssignment />} />
            <Route path="students" element={<Placeholder title="My Students" />} />
            <Route path="performance" element={<Placeholder title="Student Performance" />} />
          </Route>

          {/* ── Student Panel */}
          <Route path="/student" element={<RoleRoute roles={['student']}><StudentLayout /></RoleRoute>}>
            <Route index element={<StudentDashboard />} />
            <Route path="attendance" element={<StudentAttendanceSummary />} />
            <Route path="materials" element={<StudyMaterials />} />
            <Route path="assignments" element={<StudentAssignments />} />
            <Route path="fees" element={<FeeStatus />} />
            <Route path="profile" element={<StudentProfile />} />
          </Route>

          {/* ── Admin Panel (institution admin) */}
          <Route path="/" element={<RoleRoute roles={['admin', 'superadmin']}><ProtectedRoute><Layout /></ProtectedRoute></RoleRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="students" element={<StudentList />} />
            <Route path="students/add" element={<AddStudent />} />
            <Route path="students/edit/:id" element={<EditStudent />} />
            <Route path="students/:id" element={<StudentDetails />} />
            <Route path="teachers" element={<TeacherList />} />
            <Route path="teachers/add" element={<AddNewTeacher />} />
            <Route path="teachers/edit/:id" element={<EditTeacher />} />
            <Route path="teachers/:id" element={<TeacherDetails />} />
            <Route path="teachers/timetable" element={<TeacherTimetable />} />
            <Route path="guardians" element={<GuardianList />} />
            <Route path="guardians/add" element={<AddNewGuardian />} />
            <Route path="guardians/edit" element={<EditGuardian />} />
            <Route path="guardians/details" element={<GuardianDetails />} />
            <Route path="classes" element={<ClassList />} />
            <Route path="classes/section" element={<SectionList />} />
            <Route path="classes/subjects" element={<SubjectList />} />
            <Route path="classes/rooms" element={<ClassRoomList />} />
            <Route path="exams" element={<ExamList />} />
            <Route path="exams/schedule" element={<ExamSchedule />} />
            <Route path="exams/results" element={<ExamResult />} />
            <Route path="fees" element={<FeesCollect />} />
            <Route path="fees/type" element={<FeesType />} />
            <Route path="fees/group" element={<FeesGroup />} />
            <Route path="fees/discount" element={<FeesDiscount />} />
            <Route path="attendance/student" element={<StudentAttendance />} />
            <Route path="attendance/teacher" element={<TeacherAttendance />} />
            <Route path="attendance/employee" element={<EmployeeAttendance />} />
            <Route path="leaves/types" element={<LeaveTypes />} />
            <Route path="leaves/requests" element={<LeaveRequest />} />
            <Route path="library/books" element={<BooksList />} />
            <Route path="library/members" element={<MembersList />} />
            <Route path="library/details" element={<MemberDetails />} />
            <Route path="library/issues" element={<IssueReturn />} />
            <Route path="accounts/income-head" element={<IncomeHeadList />} />
            <Route path="accounts/income" element={<IncomeList />} />
            <Route path="accounts/expense-head" element={<ExpenseHeadList />} />
            <Route path="accounts/expense" element={<ExpenseList />} />
            <Route path="accounts/transaction" element={<Transaction />} />
            <Route path="hrm/employees" element={<EmployeeList />} />
            <Route path="hrm/details" element={<EmployeeDetails />} />
            <Route path="hrm/add" element={<AddNewEmployee />} />
            <Route path="hrm/payroll" element={<Payroll />} />
            <Route path="hrm/designation" element={<Designation />} />
            <Route path="hrm/department" element={<Department />} />
            <Route path="settings" element={<GeneralSettings />} />
            <Route path="settings/notification" element={<NotificationSettings />} />
            <Route path="settings/currencies" element={<Currencies />} />
            <Route path="settings/languages" element={<Languages />} />
            <Route path="certificate" element={<Certificate />} />
            <Route path="notice-board" element={<NoticeBoard />} />
            <Route path="events" element={<Event />} />
            <Route path="messages" element={<Message />} />
            <Route path="subscription" element={<SubscriptionPlan />} />
            <Route path="roles" element={<RoleAccess />} />
            <Route path="assign-role" element={<Placeholder title="Assign Role" />} />
            <Route path="profile" element={<Placeholder title="My Profile" />} />
            <Route path="lms" element={<Placeholder title="LMS" />} />
            <Route path="*" element={<Placeholder title="404 – Page Not Found" />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
