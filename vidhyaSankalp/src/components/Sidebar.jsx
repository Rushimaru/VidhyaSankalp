import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// ─── Menu configuration with routes ──────────────────────────────────────────
const menuItems = [
  {
    key: 'students',
    icon: 'ri-graduation-cap-line',
    label: 'Students',
    submenu: [
      { label: 'Add New Student',     path: '/students/add'       },
      { label: 'Student List',        path: '/students'           },
      { label: 'Suspend Student',     path: '/students/suspend'   },
      { label: 'Student Categories',  path: '/students/categories'},
      { label: 'Edit Student',        path: '/students/edit'      },
      { label: 'Student Details',     path: '/students/details'   },
    ],
  },
  {
    key: 'teachers',
    icon: 'ri-user-follow-line',
    label: 'Teachers',
    submenu: [
      { label: 'Add New Teacher',    path: '/teachers/add'      },
      { label: 'Teacher List',       path: '/teachers'          },
      { label: 'Edit Teacher',       path: '/teachers/edit'     },
      { label: 'Teacher Details',    path: '/teachers/details'  },
      { label: 'Teacher Timetable',  path: '/teachers/timetable'},
    ],
  },
  {
    key: 'guardian',
    icon: 'ri-account-circle-line',
    label: 'Guardian',
    submenu: [
      { label: 'Add New Guardian', path: '/guardians/add'     },
      { label: 'Guardian List',    path: '/guardians'         },
      { label: 'Edit Guardian',    path: '/guardians/edit'    },
      { label: 'Guardian Details', path: '/guardians/details' },
    ],
  },
  {
    key: 'classes',
    icon: 'ri-list-view',
    label: 'Classes',
    submenu: [
      { label: 'Section',    path: '/classes/section'  },
      { label: 'Subjects',   path: '/classes/subjects' },
      { label: 'Class List', path: '/classes'          },
      { label: 'Class Room', path: '/classes/rooms'    },
    ],
  },
  {
    key: 'examinations',
    icon: 'ri-file-edit-line',
    label: 'Examinations',
    submenu: [
      { label: 'Exam',          path: '/exams'          },
      { label: 'Exam Schedule', path: '/exams/schedule' },
      { label: 'Exam Result',   path: '/exams/results'  },
    ],
  },
  {
    key: 'fees',
    icon: 'ri-money-dollar-circle-line',
    label: 'Fees Collection',
    submenu: [
      { label: 'Fees Collect',   path: '/fees'          },
      { label: 'Fees Type',      path: '/fees/type'     },
      { label: 'Fees Group',     path: '/fees/group'    },
      { label: 'Fees Discount',  path: '/fees/discount' },
    ],
  },
  {
    key: 'attendance',
    icon: 'ri-calendar-check-line',
    label: 'Attendance',
    submenu: [
      { label: 'Student Attendance',  path: '/attendance/student'  },
      { label: 'Teacher Attendance',  path: '/attendance/teacher'  },
      { label: 'Employee Attendance', path: '/attendance/employee' },
    ],
  },
  {
    key: 'leaves',
    icon: 'ri-time-line',
    label: 'Leaves',
    submenu: [
      { label: 'Leave Types',   path: '/leaves/types'   },
      { label: 'Leave Request', path: '/leaves/requests'},
    ],
  },
  {
    key: 'library',
    icon: 'ri-book-2-line',
    label: 'Library',
    submenu: [
      { label: 'Books List',      path: '/library/books'   },
      { label: 'Members List',    path: '/library/members' },
      { label: 'Members Details', path: '/library/details' },
      { label: 'Issue Return',    path: '/library/issues'  },
    ],
  },
  {
    key: 'accounts',
    icon: 'ri-money-dollar-circle-line',
    label: 'Accounts',
    submenu: [
      { label: 'Income Head',   path: '/accounts/income-head'   },
      { label: 'Income List',   path: '/accounts/income'        },
      { label: 'Expense Head',  path: '/accounts/expense-head'  },
      { label: 'Expense List',  path: '/accounts/expense'       },
      { label: 'Transaction',   path: '/accounts/transaction'   },
    ],
  },
  {
    key: 'hrm',
    icon: 'ri-user-settings-line',
    label: 'HRM',
    submenu: [
      { label: 'Employee List',     path: '/hrm/employees'       },
      { label: 'Employee Details',  path: '/hrm/details'         },
      { label: 'Add New Employee',  path: '/hrm/add'             },
      { label: 'Payroll',           path: '/hrm/payroll'         },
      { label: 'Designation',       path: '/hrm/designation'     },
      { label: 'Department',        path: '/hrm/department'      },
    ],
  },
  {
    key: 'authentication',
    icon: 'ri-shield-check-line',
    label: 'Authentication',
    submenu: [
      { label: 'Login',    path: '/auth/login'    },
      { label: 'Register', path: '/auth/register' },
    ],
  },
  {
    key: 'settings',
    icon: 'ri-user-settings-line',
    label: 'Settings',
    submenu: [
      { label: 'General',       path: '/settings'              },
      { label: 'Notification',  path: '/settings/notification' },
      { label: 'Currencies',    path: '/settings/currencies'   },
      { label: 'Languages',     path: '/settings/languages'    },
    ],
  },
];

// Dashboard should be at top, followed by other single items
const dashboardItem = { key: 'dashboard', icon: 'ri-home-4-line', label: 'Dashboard', path: '/' };

const singleMenuItems = [
  { key: 'certificate',   icon: 'ri-home-4-line',            label: 'Certificate',       path: '/certificate'   },
  { key: 'notice',        icon: 'ri-booklet-line',           label: 'Notice Board',      path: '/notice-board'  },
  { key: 'event',         icon: 'ri-calendar-event-line',    label: 'Event',             path: '/events'        },
  { key: 'message',       icon: 'ri-message-2-line',         label: 'Message',           path: '/messages'      },
  { key: 'subscription',  icon: 'ri-price-tag-3-line',       label: 'Subscription Plan', path: '/subscription'  },
  { key: 'role',          icon: 'ri-macbook-line',           label: 'Role & Access',     path: '/roles'         },
  { key: 'assign-role',   icon: 'ri-user-follow-line',       label: 'Assign Role',       path: '/assign-role'   },
];

// ─── Sidebar Component ────────────────────────────────────────────────────────
const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Auto-open the dropdown that contains the active route
  const getInitialOpen = () => {
    const open = {};
    menuItems.forEach((item) => {
      if (item.submenu?.some((s) => currentPath === s.path || currentPath.startsWith(s.path + '/'))) {
        open[item.key] = true;
      }
    });
    return open;
  };

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [openDropdowns, setOpenDropdowns]           = useState(getInitialOpen);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const body = document.body;
    const toggleIcon = document.querySelector('.sidebar-toggle i');
    
    if (sidebar) {
      // Toggle collapsed state on sidebar
      const isCollapsed = sidebar.classList.contains('sidebar-collapsed');
      
      if (isCollapsed) {
        sidebar.classList.remove('sidebar-collapsed');
        body.classList.remove('sidebar-collapsed');
        if (toggleIcon) {
          toggleIcon.className = 'ri-contract-left-line';
        }
        setIsSidebarCollapsed(false);
      } else {
        sidebar.classList.add('sidebar-collapsed');
        body.classList.add('sidebar-collapsed');
        if (toggleIcon) {
          toggleIcon.className = 'ri-contract-right-line';
        }
        setIsSidebarCollapsed(true);
      }
    }
  };

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => {
      // Close all other dropdowns, open only the clicked one
      const newState = {};
      Object.keys(prev).forEach((k) => {
        newState[k] = false;
      });
      newState[key] = !prev[key]; // Toggle the clicked dropdown
      return newState;
    });
  };

  const closeSidebar = () => {
    document.querySelector('.sidebar')?.classList.remove('active');
    document.querySelector('.overlay')?.classList.remove('active');
  };

  const isActive = (path) => currentPath === path;
  
  const isSubmenuActive = (submenu) =>
    submenu?.some((s) => currentPath === s.path || currentPath.startsWith(s.path + '/'));

  return (
    <>
      <div className="overlay" onClick={closeSidebar}></div>

      <aside className={`sidebar ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>

        {/* Close button (mobile) */}
        <button type="button" className="sidebar-close-btn" onClick={closeSidebar}>
          <iconify-icon icon="radix-icons:cross-2"></iconify-icon>
        </button>

        {/* ── Logo ─────────────────────────────────────────────────────── */}
        <div className="sidebar-logo d-flex align-items-center justify-content-between">
          <Link to="/" className="">
            <img src="../src/assets/images/logo.png"       alt="logo"      className="light-logo" />
            <img src="../src/assets/images/logo-light.png" alt="logo"      className="dark-logo"  />
            <img src="../src/assets/images/logo-icon.png"  alt="logo icon" className="logo-icon"  />
          </Link>
          <button
            type="button"
            className="text-xxl d-xl-flex d-none line-height-1 sidebar-toggle text-neutral-500"
            onClick={toggleSidebar}
          >
            <i className="ri-contract-left-line"></i>
          </button>
        </div>

        {/* ── Profile ──────────────────────────────────────────────────── */}
        <div className="mx-16 py-12">
          <div className="dropdown profile-dropdown">
            <button
              type="button"
              className="profile-dropdown__button d-flex align-items-center justify-content-between p-10 w-100 overflow-hidden bg-neutral-50 radius-12"
              onClick={() => setIsProfileDropdownOpen((p) => !p)}
            >
              <span className="d-flex align-items-start gap-10">
                <img
                  src="/../src/assets/images/thumbs/leave-request-img2.png"
                  alt="Profile"
                  className="w-40-px h-40-px rounded-circle object-fit-cover flex-shrink-0"
                />
                <span className="profile-dropdown__contents">
                  <span className="h6 mb-0 text-md d-block text-primary-light">Jone Copper</span>
                  <span className="text-secondary-light text-sm mb-0 d-block">Admin</span>
                </span>
              </span>
              <span className="profile-dropdown__icon pe-8 text-xl d-flex line-height-1">
                <i className="ri-arrow-right-s-line"></i>
              </span>
            </button>

            {isProfileDropdownOpen && (
              <ul className="dropdown-menu border p-12 show">
                <li>
                  <Link to="/profile"
                    className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6">
                    <i className="ri-user-3-line"></i> My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings"
                    className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6">
                    <i className="ri-settings-3-line"></i> Setting
                  </Link>
                </li>
                <li>
                  <Link to="/auth/login"
                    className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6">
                    <i className="ri-shut-down-line"></i> Log Out
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* ── Navigation Menu ───────────────────────────────────────────── */}
        <div className="sidebar-menu-area">
          <ul className="sidebar-menu" id="sidebar-menu">

            {/* Dashboard (single item at top) */}
            <li className={isActive(dashboardItem.path) ? 'active-page' : ''}>
              <Link to={dashboardItem.path} className={isActive(dashboardItem.path) ? 'active-menu' : ''}>
                <i className={dashboardItem.icon}></i>
                <span>{dashboardItem.label}</span>
              </Link>
            </li>

            {/* Dropdown items (Students, Teachers, etc.) */}
            {menuItems.map((item) => {
              const open         = openDropdowns[item.key];
              const parentActive = isSubmenuActive(item.submenu);

              return (
                <li key={item.key} className={`dropdown ${open ? 'open' : ''} ${parentActive ? 'active-page' : ''}`}>
                  <a
                    href="#!"
                    onClick={(e) => { e.preventDefault(); toggleDropdown(item.key); }}
                    className={parentActive ? 'active-menu' : ''}
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                  </a>

                  {open && (
                    <ul className="sidebar-submenu">
                      {item.submenu.map((sub) => (
                        <li key={sub.path} className={isActive(sub.path) ? 'active-page' : ''}>
                          <Link
                            to={sub.path}
                            className={isActive(sub.path) ? 'active-menu' : ''}
                          >
                            <i className="ri-circle-fill circle-icon w-auto"></i>
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}

            {/* Other single items (Certificate, Notice Board, etc.) */}
            {singleMenuItems.map((item) => (
              <li key={item.key} className={isActive(item.path) ? 'active-page' : ''}>
                <Link to={item.path} className={isActive(item.path) ? 'active-menu' : ''}>
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}

          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;