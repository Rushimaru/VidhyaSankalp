import React, { useState } from 'react';
import Chart from 'react-apexcharts';

// ─── Radial Progress SVG Component ──────────────────────────────────────────
const RadialProgress = ({ marks, color }) => {
  const colorMap = {
    blue: '#3b82f6',
    red: '#ef4444',
    warning: '#f59e0b',
    green: '#22c55e',
  };
  const r = 30;
  const circ = 2 * Math.PI * r;
  const dash = (marks / 100) * circ;
  const hex = colorMap[color] || '#3b82f6';

  return (
    <svg width="48" height="48" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r={r} fill="none" stroke={hex} strokeWidth="8" opacity="0.2" />
      <circle
        cx="40" cy="40" r={r} fill="none"
        stroke={hex} strokeWidth="8"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        transform="rotate(-90 40 40)"
      />
      <text
        x="50%" y="55%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill="#111827"
      >
        {marks}
      </text>
    </svg>
  );
};

// ─── Card Dropdown Menu ───────────────────────────────────────────────────────
const CardMenu = () => (
  <div className="dropdown">
    <button
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
    >
      <iconify-icon icon="entypo:dots-three-vertical" class="icon text-secondary-light"></iconify-icon>
    </button>
    <ul className="dropdown-menu p-12 border bg-base shadow">
      <li>
        <button type="button" className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-10">
          <iconify-icon icon="hugeicons:view" class="icon text-lg line-height-1"></iconify-icon> View
        </button>
      </li>
      <li>
        <button type="button" className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-10">
          <iconify-icon icon="lucide:edit" class="icon text-lg line-height-1"></iconify-icon> Edit
        </button>
      </li>
      <li>
        <button type="button" className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-danger-100 text-hover-danger-600 d-flex align-items-center gap-10">
          <iconify-icon icon="fluent:delete-24-regular" class="icon text-lg line-height-1"></iconify-icon> Delete
        </button>
      </li>
    </ul>
  </div>
);

// ─── Main Dashboard Component ─────────────────────────────────────────────────
const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  // ── Stats Cards  ─────────────────────────────────────────────────────────────
  // Using iconify icons instead of broken PNG files
  const statsCards = [
    { id: 1, title: 'Total Student',   value: '20,000', icon: 'solar:users-group-rounded-bold',         bgColor: 'bg-warning-600', gradient: 'gradient-bg-end-1', percentage: '10%', change: '+5 This Month' },
    { id: 2, title: 'Total Teacher',   value: '1,500',  icon: 'solar:user-speak-bold',                  bgColor: 'bg-blue-600',    gradient: 'gradient-bg-end-2', percentage: '10%', change: '+5 This Month' },
    { id: 3, title: 'Total Staff',     value: '800',    icon: 'solar:users-group-two-rounded-bold',     bgColor: 'bg-purple-600',  gradient: 'gradient-bg-end-3', percentage: '10%', change: '+5 This Month' },
    { id: 4, title: 'Total Parent',    value: '5,000',  icon: 'solar:user-id-bold',                     bgColor: 'bg-primary-600', gradient: 'gradient-bg-end-4', percentage: '10%', change: '+5 This Month' },
    { id: 5, title: 'Total Income',    value: '$20,000',icon: 'solar:dollar-minimalistic-bold',         bgColor: 'bg-success-600', gradient: 'gradient-bg-end-5', percentage: '10%', change: '+5 This Month' },
    { id: 6, title: 'Total Expense',   value: '$8,000', icon: 'solar:wallet-money-bold',                bgColor: 'bg-cyan-600',    gradient: 'gradient-bg-end-6', percentage: '10%', change: '+5 This Month' },
  ];

  // ── Charts ────────────────────────────────────────────────────────────────────
  const revenueOptions = {
    chart: { type: 'bar', stacked: true, toolbar: { show: false } },
    colors: ['#25A194', '#FF7A2C'],
    plotOptions: { bar: { horizontal: false, columnWidth: '65%', borderRadius: 4 } },
    xaxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] },
    yaxis: { labels: { formatter: (v) => `$${v}k` } },
    legend: { show: false },
    dataLabels: { enabled: true, style: { fontSize: '10px' } },
    grid: { borderColor: '#f1f5f9' },
  };
  const revenueSeries = [
    { name: 'Total Fee',     data: [25, 35, 50, 60, 26, 20, 40, 20, 50, 16, 10, 40] },
    { name: 'Collected Fee', data: [15, 16, 24, 30, 20, 15, 20, 10, 25, 10,  6, 20] },
  ];

  const incomeExpenseOptions = {
    chart: { type: 'area', toolbar: { show: false } },
    colors: ['#0A51CE', '#FF9F29'],
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.05 } },
    xaxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'] },
    legend: { show: false },
    dataLabels: { enabled: false },
    grid: { borderColor: '#f1f5f9' },
  };
  const incomeExpenseSeries = [
    { name: 'Income',  data: [48, 35, 55, 32, 48, 30, 15, 50, 57] },
    { name: 'Expense', data: [12, 20, 15, 26, 22, 60, 40, 32, 25] },
  ];

  const admissionsOptions = {
    chart: { type: 'donut' },
    labels: ['English', 'Math', 'Biology', 'Physics'],
    colors: ['#0A51CE', '#25A194', '#FF7A2C', '#009F5E'],
    legend: { show: false },
    plotOptions: { pie: { donut: { size: '72%' } } },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
  };
  const admissionsSeries = [15, 15, 5, 10];

  // ── Calendar helpers ──────────────────────────────────────────────────────────
  const changeMonth = (dir) => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + dir);
    setCurrentDate(d);
  };
  const isToday = (day) =>
    day === today.getDate() &&
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();
  const getDays = () => {
    const y = currentDate.getFullYear(), m = currentDate.getMonth();
    const total = new Date(y, m + 1, 0).getDate();
    const first = new Date(y, m, 1).getDay();
    return [...Array(first).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
  };

  // ── Static lists ──────────────────────────────────────────────────────────────
  const noticeBoard = [
    { id: 1, name: 'Admin',          message: 'Lorem Ipsum is simply dummy text of the printing and typesetting.',                           date: '25 Jan 2024', img: 'notice-board-img1.png' },
    { id: 2, name: 'Kathryn Murphy', message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',                   date: '25 Jan 2024', img: 'notice-board-img2.png' },
    { id: 3, name: 'Admin',          message: 'Lorem Ipsum is simply dummy text of the printing and typesetting.',                           date: '25 Jan 2024', img: 'notice-board-img3.png' },
    { id: 4, name: 'John Doe',       message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum voluptas corporis.',          date: '25 Jan 2024', img: 'notice-board-img2.png' },
  ];

  const leaveRequests = [
    { id: 1, name: 'Darlene Robertson', role: 'English Teacher', days: '3 Days', date: '10 April', img: 'leave-request-img1.png' },
    { id: 2, name: 'Esther Howard',     role: 'English Teacher', days: '3 Days', date: '10 April', img: 'leave-request-img2.png' },
    { id: 3, name: 'Kristin Watson',    role: 'English Teacher', days: '3 Days', date: '10 April', img: 'leave-request-img3.png' },
    { id: 4, name: 'Leslie Alexander',  role: 'English Teacher', days: '3 Days', date: '10 April', img: 'leave-request-img4.png' },
    { id: 5, name: 'Dianne Russell',    role: 'English Teacher', days: '3 Days', date: '10 April', img: 'leave-request-img5.png' },
  ];

  const upcomingEvents = [
    { id: 1, time: '09:00 - 09:45', period: 'AM', title: 'Marketing Strategy Kickoff',       lead: 'Robert Fox',       color: 'purple-600'  },
    { id: 2, time: '11:15 - 12:00', period: 'AM', title: 'Product Design Brainstorm',        lead: 'Leslie Alexander', color: 'warning-600' },
    { id: 3, time: '02:00 - 03:00', period: 'PM', title: 'Client Feedback Review',           lead: 'Courtney Henry',   color: 'blue-600'    },
    { id: 4, time: '04:15 - 05:00', period: 'PM', title: 'Sprint Planning & Task Allocation',lead: 'Eleanor Pena',     color: 'success-600' },
    { id: 5, time: '01:15 - 02:00', period: 'PM', title: 'Client Feedback Review',           lead: 'John',             color: 'primary-600' },
  ];

  const topTeachers = [
    { id: 1, name: 'Theresa Webb',    email: 'example@gmail.com', subject: 'Mathematics', img: 'top-teacher-img1.png' },
    { id: 2, name: 'Darrell Steward', email: 'example@gmail.com', subject: 'Physics',     img: 'top-teacher-img2.png' },
    { id: 3, name: 'Jane Cooper',     email: 'example@gmail.com', subject: 'Biology',     img: 'top-teacher-img3.png' },
    { id: 4, name: 'Savannah Nguyen', email: 'example@gmail.com', subject: 'English',     img: 'top-teacher-img4.png' },
    { id: 5, name: 'Eleanor Pena',    email: 'example@gmail.com', subject: 'Math',        img: 'top-teacher-img5.png' },
  ];

  const topStudents = [
    { id: 1, name: 'Brooklyn Simmons', cls: 'Six',   marks: 20, color: 'blue',    img: 'avatar-img1.png' },
    { id: 2, name: 'Floyd Miles',      cls: 'Seven', marks: 35, color: 'red',     img: 'avatar-img2.png' },
    { id: 3, name: 'Courtney Henry',   cls: 'Eight', marks: 45, color: 'warning', img: 'avatar-img2.png' },
    { id: 4, name: 'Kathryn Murphy',   cls: 'Nine',  marks: 65, color: 'green',   img: 'avatar-img4.png' },
    { id: 5, name: 'Annette Black',    cls: 'Ten',   marks: 65, color: 'blue',    img: 'avatar-img5.png' },
  ];

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="dashboard-main-body">

      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h6 className="fw-semibold mb-0">Dashboard</h6>
          <p className="text-neutral-600 mt-4 mb-0">
            School → Manage your school, track attendance, expense, and net worth.
          </p>
        </div>
      </div>

      <div className="mt-24">
        <div className="row gy-4">

          {/* ═══ STATS CARDS ════════════════════════════════════════════════════ */}
          <div className="col-xxl-8">
            <div className="row gy-4">
              {statsCards.map((card) => (
                <div key={card.id} className="col-xxl-4 col-sm-6">
                  <div className={`card shadow-1 radius-8 ${card.gradient} h-100`}>
                    <div className="card-body p-20">
                      <div className="d-flex flex-wrap align-items-center gap-3 mb-16">

                        {/* ✅ iconify icon — replaces broken dashboard-icon1.png etc. */}
                        <div
                          className={`w-44-px h-44-px ${card.bgColor} rounded-circle d-flex justify-content-center align-items-center`}
                        >
                          <iconify-icon
                            icon={card.icon}
                            style={{ fontSize: '22px', color: '#ffffff' }}
                          ></iconify-icon>
                        </div>

                        <p className="fw-medium text-primary-light mb-1">{card.title}</p>
                      </div>
                      <h6 className="mb-0">{card.value}</h6>
                      <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                        <span className="d-inline-flex align-items-center gap-1 text-primary-600 text-sm fw-semibold">
                          {card.percentage}
                          <iconify-icon icon="bxs:up-arrow" class="text-xs"></iconify-icon>
                        </span>
                        {card.change}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ STUDENT ATTENDANCE ═════════════════════════════════════════════ */}
          <div className="col-xxl-4">
            <div className="card h-100">
              <div className="card-body p-0">
                <div className="d-flex flex-wrap align-items-center justify-content-between px-20 py-16 border-bottom border-neutral-200">
                  <h6 className="text-lg mb-0">Student Attendance</h6>
                </div>
                <div className="p-20">
                  <div className="d-flex gap-6">
                    <div className="h-44-px bg-primary-600 rounded" style={{ width: '87%' }}></div>
                    <div className="h-44-px bg-warning-600 rounded" style={{ width: '40%' }}></div>
                    <div className="h-44-px bg-purple-600 rounded" style={{ width: '20%' }}></div>
                    <div className="h-44-px bg-success-600 rounded" style={{ width: '20%' }}></div>
                  </div>
                  <div className="mt-32 d-flex flex-column gap-24">
                    {[
                      { label: 'Present',  pct: '87%', cls: 'bg-primary-600' },
                      { label: 'Absent:',  pct: '40%', cls: 'bg-warning-600' },
                      { label: 'Late',     pct: '20%', cls: 'bg-purple-600'  },
                      { label: 'Half day', pct: '20%', cls: 'bg-success-600' },
                    ].map(({ label, pct, cls }) => (
                      <div key={label} className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <span className={`w-12-px h-12-px radius-2 ${cls}`}></span>
                          <span className="text-neutral-600">{label}</span>
                        </div>
                        <span className="fw-semibold text-primary-light">{pct}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ REVENUE / NOTICE / LEAVE / CALENDAR ════════════════════════════ */}
          <div className="col-12">
            <div className="row gy-4">
              <div className="col-xxl-8">
                <div className="row gy-4">

                  {/* Revenue Chart */}
                  <div className="col-12">
                    <div className="card h-100">
                      <div className="card-body p-0">
                        <div className="d-flex flex-wrap align-items-center justify-content-between px-20 py-16 border-bottom border-neutral-200">
                          <h6 className="text-lg mb-0">Revenue Statistic</h6>
                        </div>
                        <div className="p-20">
                          <ul className="d-flex flex-wrap align-items-center justify-content-center mb-16 gap-3">
                            <li className="d-flex align-items-center gap-8">
                              <span className="w-12-px h-12-px radius-2 rotate-45-deg bg-primary-600"></span>
                              <span className="text-secondary-light text-sm fw-semibold">
                                Total Fee: <span className="text-primary-light fw-bold">$500</span>
                              </span>
                            </li>
                            <li className="d-flex align-items-center gap-8">
                              <span className="w-12-px h-12-px radius-2 rotate-45-deg bg-warning-600"></span>
                              <span className="text-secondary-light text-sm fw-semibold">
                                Collected Fee: <span className="text-primary-light fw-bold">$300</span>
                              </span>
                            </li>
                          </ul>
                          <Chart options={revenueOptions} series={revenueSeries} type="bar" height={250} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notice Board */}
                  <div className="col-md-6">
                    <div className="card h-100">
                      <div className="card-body p-0">
                        <div className="d-flex flex-wrap align-items-center justify-content-between px-20 py-16 border-bottom border-neutral-200">
                          <h6 className="text-lg mb-0">Notice Board</h6>
                          <CardMenu />
                        </div>
                        <div className="ps-20 pt-20 pb-20">
                          <div className="pe-20 d-flex flex-column gap-20 max-h-462-px overflow-y-auto scroll-sm">
                            {noticeBoard.map((n) => (
                              <div key={n.id} className="d-flex align-items-start gap-16">
                                <img
                                  src={`assets/images/thumbs/${n.img}`}
                                  alt="Thumbnail"
                                  className="w-40-px h-40-px rounded-circle object-fit-cover flex-shrink-0"
                                />
                                <div>
                                  <h6 className="mb-4 text-lg">{n.name}</h6>
                                  <p className="text-secondary-light text-sm mb-0">{n.message}</p>
                                  <span className="text-secondary-light text-sm mb-0 mt-4">{n.date}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Leave Requests */}
                  <div className="col-md-6">
                    <div className="card h-100">
                      <div className="card-body p-0">
                        <div className="d-flex flex-wrap align-items-center justify-content-between px-20 py-16 border-bottom border-neutral-200">
                          <h6 className="text-lg mb-0">Leave Requests</h6>
                          <CardMenu />
                        </div>
                        <div className="ps-20 pt-20 pb-20">
                          <div className="pe-20 d-flex flex-column gap-28 max-h-462-px overflow-y-auto scroll-sm">
                            {leaveRequests.map((r) => (
                              <div key={r.id} className="d-flex align-items-center justify-content-between gap-16">
                                <div className="d-flex align-items-start gap-16">
                                  <img
                                    src={`assets/images/thumbs/${r.img}`}
                                    alt="Thumbnail"
                                    className="w-40-px h-40-px rounded-circle object-fit-cover flex-shrink-0"
                                  />
                                  <div>
                                    <h6 className="mb-0 text-lg">{r.name}</h6>
                                    <span className="text-secondary-light text-sm mb-0">{r.role}</span>
                                  </div>
                                </div>
                                <div className="text-end">
                                  <span className="d-block fw-bold text-primary-light">{r.days}</span>
                                  <p className="text-secondary-light text-sm mb-0">Apply on: {r.date}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar + Upcoming Events */}
              <div className="col-xxl-4">
                <div className="card h-100">
                  <div className="card-body p-0">
                    <div className="d-flex flex-wrap align-items-center justify-content-between px-20 py-16 border-bottom border-neutral-200">
                      <h6 className="text-lg mb-0">Calendar</h6>
                    </div>

                    <div className="p-20">
                      {/* Month header */}
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <button
                          onClick={() => changeMonth(-1)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}
                        >
                          <iconify-icon icon="heroicons:chevron-left" class="text-secondary-light"></iconify-icon>
                        </button>
                        <span className="text-md text-secondary-light fw-semibold">
                          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </span>
                        <button
                          onClick={() => changeMonth(1)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}
                        >
                          <iconify-icon icon="heroicons:chevron-right" class="text-secondary-light"></iconify-icon>
                        </button>
                      </div>

                      {/* Weekday labels */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', textAlign: 'center', marginBottom: '6px' }}>
                        {['Su','Mo','Tu','We','Th','Fr','Sa'].map((d) => (
                          <div key={d} style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', padding: '4px 0' }}>{d}</div>
                        ))}
                      </div>

                      {/* Day cells */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px' }}>
                        {getDays().map((day, i) => (
                          <div
                            key={i}
                            style={{
                              textAlign: 'center',
                              padding: '6px 2px',
                              fontSize: '13px',
                              borderRadius: '50%',
                              width: '32px',
                              height: '32px',
                              lineHeight: '20px',
                              margin: '0 auto',
                              background: isToday(day) ? '#0A51CE' : 'transparent',
                              color:  isToday(day) ? '#fff' : day ? '#374151' : 'transparent',
                              fontWeight: isToday(day) ? '700' : '400',
                              cursor: day ? 'pointer' : 'default',
                            }}
                          >
                            {day || ''}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="ps-20 pt-20 pb-20 border-top border-neutral-200">
                      <h6 className="text-lg mb-20">Upcoming Events</h6>
                      <div className="pe-20 d-flex flex-column gap-32 overflow-y-auto max-h-500-px scroll-sm">
                        {upcomingEvents.map((e) => (
                          <div key={e.id} className="d-flex align-items-center justify-content-between gap-16">
                            <div className={`ps-10 border-start-width-3-px border-${e.color}`}>
                              <div className="d-flex align-items-end gap-6">
                                <h6 className="text-lg fw-normal mb-0">{e.time}</h6>
                                <span className="text-xs text-secondary-light line-height-1 mb-2">{e.period}</span>
                              </div>
                              <p className="text-secondary-light mt-4 mb-2 text-sm">{e.title}</p>
                              <p className="text-xs text-secondary-light mb-0">
                                Lead by <a href="#!" className="text-primary-600 hover-underline">{e.lead}</a>
                              </p>
                            </div>
                            <a href="#!" className="py-6 px-16 radius-4 bg-neutral-100 text-secondary-light fw-semibold bg-hover-primary-600 hover-text-white">
                              View
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ USER OVERVIEW ══════════════════════════════════════════════════ */}
          <div className="col-xxl-4 col-lg-6">
            <div className="card h-100">
              <div className="card-body p-0">
                <div className="d-flex flex-wrap align-items-center justify-content-between px-20 py-16 border-bottom border-neutral-200">
                  <h6 className="text-lg mb-0">User Overview</h6>
                  <CardMenu />
                </div>
                <div className="p-20">
                  {/* ✅ Replaced broken radial-bg images with a pure CSS/SVG donut chart */}
                  <div className="mt-16 mb-24 d-flex justify-content-center align-items-center" style={{ position: 'relative', height: '200px' }}>
                    <svg width="200" height="200" viewBox="0 0 200 200">
                      {/* Student 60% */}
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#22c55e" strokeWidth="28" opacity="0.15" />
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#22c55e" strokeWidth="28"
                        strokeDasharray={`${0.60 * 2 * Math.PI * 80} ${2 * Math.PI * 80}`} strokeLinecap="butt" transform="rotate(-90 100 100)" />
                      {/* Teacher 30% */}
                      <circle cx="100" cy="100" r="54" fill="none" stroke="#f59e0b" strokeWidth="22" opacity="0.15" />
                      <circle cx="100" cy="100" r="54" fill="none" stroke="#f59e0b" strokeWidth="22"
                        strokeDasharray={`${0.30 * 2 * Math.PI * 54} ${2 * Math.PI * 54}`} strokeLinecap="butt" transform="rotate(-90 100 100)" />
                      {/* Staff 10% */}
                      <circle cx="100" cy="100" r="33" fill="none" stroke="#3b82f6" strokeWidth="16" opacity="0.15" />
                      <circle cx="100" cy="100" r="33" fill="none" stroke="#3b82f6" strokeWidth="16"
                        strokeDasharray={`${0.10 * 2 * Math.PI * 33} ${2 * Math.PI * 33}`} strokeLinecap="butt" transform="rotate(-90 100 100)" />
                      <text x="100" y="93"  textAnchor="middle" fill="#22c55e" fontSize="13" fontWeight="700">60%</text>
                      <text x="100" y="108" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700">30%</text>
                      <text x="100" y="121" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="700">10%</text>
                    </svg>
                  </div>
                  <div className="d-flex align-items-center flex-wrap gap-24 justify-content-evenly">
                    {[
                      { label: 'Student', val: '750', cls: 'bg-success-600' },
                      { label: 'Teacher', val: '56',  cls: 'bg-warning-600' },
                      { label: 'Staffs',  val: '15',  cls: 'bg-blue-600'    },
                    ].map(({ label, val, cls }) => (
                      <div key={label} className="d-flex flex-column align-items-start">
                        <div className="d-flex align-items-center gap-2">
                          <span className={`w-12-px h-12-px rounded-pill ${cls}`}></span>
                          <span className="text-secondary-light text-sm fw-normal">{label}</span>
                        </div>
                        <h6 className="text-primary-light fw-semibold mb-0 mt-4 text-lg">{val}</h6>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ INCOME VS EXPENSE ══════════════════════════════════════════════ */}
          <div className="col-xxl-8 col-lg-6">
            <div className="card h-100">
              <div className="card-body p-0">
                <div className="d-flex flex-wrap align-items-center justify-content-between px-20 py-16 border-bottom border-neutral-200">
                  <h6 className="text-lg mb-0">Income Vs Expense</h6>
                  <CardMenu />
                </div>
                <div className="p-20">
                  <ul className="d-flex flex-wrap align-items-center justify-content-center mb-16 gap-3">
                    <li className="d-flex align-items-center gap-8">
                      <span className="w-12-px h-12-px rounded-circle bg-primary-600"></span>
                      <span className="text-secondary-light text-sm fw-semibold">
                        Income: <span className="text-primary-light fw-bold">$500</span>
                      </span>
                    </li>
                    <li className="d-flex align-items-center gap-8">
                      <span className="w-12-px h-12-px rounded-circle bg-warning-600"></span>
                      <span className="text-secondary-light text-sm fw-semibold">
                        Expense: <span className="text-primary-light fw-bold">$300</span>
                      </span>
                    </li>
                  </ul>
                  <Chart options={incomeExpenseOptions} series={incomeExpenseSeries} type="area" height={260} />
                </div>
              </div>
            </div>
          </div>

          {/* ═══ TOP TEACHERS ═══════════════════════════════════════════════════ */}
          <div className="col-xxl-4 col-lg-6">
            <div className="card h-100">
              <div className="card-body p-0">
                <div className="d-flex flex-wrap align-items-center justify-content-between px-20 py-16 border-bottom border-neutral-200">
                  <h6 className="text-lg mb-0">Top Teachers</h6>
                  <CardMenu />
                </div>
                <div className="ps-20 pt-20 pb-20">
                  <div className="pe-20 d-flex flex-column gap-20 max-h-462-px overflow-y-auto scroll-sm">
                    {topTeachers.map((t) => (
                      <div key={t.id} className="d-flex align-items-center justify-content-between gap-16">
                        <div className="d-flex align-items-start gap-16">
                          <img
                            src={`assets/images/thumbs/${t.img}`}
                            alt="Thumbnail"
                            className="w-40-px h-40-px rounded-circle object-fit-cover flex-shrink-0"
                          />
                          <div>
                            <h6 className="mb-0 text-lg">{t.name}</h6>
                            <span className="text-secondary-light text-sm mb-0">{t.email}</span>
                          </div>
                        </div>
                        <span className="d-block fw-semibold text-primary-light">{t.subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ NEW ADMISSIONS ═════════════════════════════════════════════════ */}
          <div className="col-xxl-4 col-lg-6">
            <div className="card h-100">
              <div className="card-body p-0">
                <div className="d-flex flex-wrap align-items-center justify-content-between px-20 py-16 border-bottom border-neutral-200">
                  <h6 className="text-lg mb-0">New Admissions</h6>
                  <CardMenu />
                </div>
                <div className="p-20">
                  <div className="position-relative text-center">
                    <Chart options={admissionsOptions} series={admissionsSeries} type="donut" height={240} />
                    <div
                      className="text-center position-absolute top-50 start-50 translate-middle"
                      style={{ pointerEvents: 'none', transform: 'translate(-50%, -60%)' }}
                    >
                      <h5 className="mb-0">50</h5>
                      <span className="text-secondary-light" style={{ fontSize: '12px' }}>Total</span>
                    </div>
                  </div>
                  <ul className="d-flex flex-wrap align-items-center justify-content-center mt-16 gap-24">
                    {[
                      { label: 'English', val: 15, cls: 'bg-primary-600'  },
                      { label: 'Math',    val: 15, cls: 'bg-success-600'  },
                      { label: 'Biology', val: 5,  cls: 'bg-warning-600'  },
                      { label: 'Physics', val: 10, cls: 'bg-primary-600'  },
                    ].map(({ label, val, cls }) => (
                      <li key={label} className="d-flex align-items-center gap-2" style={{ listStyle: 'none' }}>
                        <span className={`w-12-px h-12-px radius-2 ${cls} rotate-45-deg`}></span>
                        <span className="text-secondary-light fw-medium text-sm">
                          {label}: <span className="fw-bold text-primary-light">{val}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ TOP STUDENT ════════════════════════════════════════════════════ */}
          <div className="col-xxl-4">
            <div className="card radius-12 border-0 h-100">
              <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between py-12 px-20 border-bottom border-neutral-200">
                <h6 className="mb-2 fw-bold text-lg">Top Student</h6>
                <CardMenu />
              </div>
              <div className="card-body">
                <div className="d-flex flex-column gap-28">
                  {topStudents.map((s) => (
                    <div key={s.id} className="d-flex align-items-center justify-content-between gap-10">
                      <div className="d-flex align-items-center gap-12">
                        <img
                          src={`assets/images/thumbs/${s.img}`}
                          className="w-44-px h-44-px object-fit-cover rounded-circle flex-shrink-0"
                          alt="Avatar"
                        />
                        <div>
                          <h6 className="text-sm mb-2">{s.name}</h6>
                          <span className="text-xs text-secondary-light">Class: {s.cls}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-8">
                        <span className="text-sm text-secondary-light">Marks</span>
                        {/* ✅ Pure SVG radial — no broken CSS stroke-* classes */}
                        <RadialProgress marks={s.marks} color={s.color} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;