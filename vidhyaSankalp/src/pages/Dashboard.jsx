import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Stats Cards Data
  const statsCards = [
    {
      id: 1,
      title: 'Total Student',
      value: '20,000',
      icon: 'dashboard-icon1.png',
      bgColor: 'bg-warning-600',
      gradient: 'gradient-bg-end-1',
      percentage: '10%',
      change: '+5 This Month'
    },
    {
      id: 2,
      title: 'Total Student',
      value: '20,000',
      icon: 'dashboard-icon2.png',
      bgColor: 'bg-blue-600',
      gradient: 'gradient-bg-end-2',
      percentage: '10%',
      change: '+5 This Month'
    },
    {
      id: 3,
      title: 'Total Student',
      value: '20,000',
      icon: 'dashboard-icon3.png',
      bgColor: 'bg-purple-600',
      gradient: 'gradient-bg-end-3',
      percentage: '10%',
      change: '+5 This Month'
    },
    {
      id: 4,
      title: 'Total Student',
      value: '20,000',
      icon: 'dashboard-icon4.png',
      bgColor: 'bg-primary-600',
      gradient: 'gradient-bg-end-4',
      percentage: '10%',
      change: '+5 This Month'
    },
    {
      id: 5,
      title: 'Total Student',
      value: '20,000',
      icon: 'dashboard-icon5.png',
      bgColor: 'bg-success-600',
      gradient: 'gradient-bg-end-5',
      percentage: '10%',
      change: '+5 This Month'
    },
    {
      id: 6,
      title: 'Total Student',
      value: '20,000',
      icon: 'dashboard-icon6.png',
      bgColor: 'bg-cyan-600',
      gradient: 'gradient-bg-end-6',
      percentage: '10%',
      change: '+5 This Month'
    }
  ];

  // Revenue Chart Configuration
  const revenueOptions = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: false }
    },
    colors: ['#25A194', '#FF7A2C'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    }
  };

  const revenueSeries = [
    {
      name: 'Total Fee',
      data: [25, 35, 50, 60, 26, 20, 40, 20, 50, 16, 10, 40]
    },
    {
      name: 'Collected Fee',
      data: [15, 16, 24, 30, 20, 15, 20, 10, 25, 10, 6, 20]
    }
  ];

  // Income vs Expense Chart
  const incomeExpenseOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false }
    },
    colors: ['#16a34a', '#FF9F29'],
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    }
  };

  const incomeExpenseSeries = [
    {
      name: 'Income',
      data: [48, 35, 55, 32, 48, 30, 15, 50, 57]
    },
    {
      name: 'Expense',
      data: [12, 20, 15, 26, 22, 60, 40, 32, 25]
    }
  ];

  // New Admissions Donut Chart
  const admissionsOptions = {
    chart: {
      type: 'donut',
    },
    labels: ['English', 'Math', 'Biology', 'Physics'],
    colors: ['#0A51CE', '#25A194', '#FF7A2C', '#009F5E'],
    legend: {
      show: false
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%'
        }
      }
    },
    dataLabels: {
      enabled: false
    }
  };

  const admissionsSeries = [15, 15, 5, 10];

  // Calendar functionality
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const noticeBoard = [
    { id: 1, name: 'Admin', message: 'Lorem Ipsum is simply dummy text of the printing and typesetti', date: '25 Jan 2024', image: 'notice-board-img1.png' },
    { id: 2, name: 'Kathryn Murphy', message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting industry.', date: '25 Jan 2024', image: 'notice-board-img2.png' },
    { id: 3, name: 'Admin', message: 'Lorem Ipsum is simply dummy text of the printing and typesetti', date: '25 Jan 2024', image: 'notice-board-img3.png' },
    { id: 4, name: 'John Doe', message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum voluptas corporis qui dolore est odit officia fuga?', date: '25 Jan 2024', image: 'notice-board-img2.png' }
  ];

  const leaveRequests = [
    { id: 1, name: 'Darlene Robertson', role: 'English Teacher', days: '3 Days', date: '10 April', image: 'leave-request-img1.png' },
    { id: 2, name: 'Esther Howard', role: 'English Teacher', days: '3 Days', date: '10 April', image: 'leave-request-img2.png' },
    { id: 3, name: 'Kristin Watson', role: 'English Teacher', days: '3 Days', date: '10 April', image: 'leave-request-img3.png' },
    { id: 4, name: 'Leslie Alexander', role: 'English Teacher', days: '3 Days', date: '10 April', image: 'leave-request-img4.png' },
    { id: 5, name: 'Dianne Russell', role: 'English Teacher', days: '3 Days', date: '10 April', image: 'leave-request-img5.png' },
    { id: 6, name: 'Kristin Watson', role: 'English Teacher', days: '3 Days', date: '10 April', image: 'leave-request-img3.png' }
  ];

  const upcomingEvents = [
    { id: 1, time: '09:00 - 09:45', period: 'AM', title: 'Marketing Strategy Kickoff', lead: 'Robert Fox', color: 'purple-600' },
    { id: 2, time: '11:15 - 12:00', period: 'AM', title: 'Product Design Brainstorm', lead: 'Leslie Alexander', color: 'warning-600' },
    { id: 3, time: '02:00 - 03:00', period: 'PM', title: 'Client Feedback Review', lead: 'Courtney Henry', color: 'blue-600' },
    { id: 4, time: '04:15 - 05:00', period: 'PM', title: 'Sprint Planning & Task Allocation', lead: 'Eleanor Pena', color: 'success-600' },
    { id: 5, time: '01:15 - 02:00', period: 'PM', title: 'Client Feedback Review', lead: 'John', color: 'primary-600' },
    { id: 6, time: '11:15 - 12:00', period: 'AM', title: 'Product Design Brainstorm', lead: 'Leslie Alexander', color: 'warning-600' }
  ];

  const topTeachers = [
    { id: 1, name: 'Theresa Webb', email: 'example@gmail.com', subject: 'Mathematics', image: 'top-teacher-img1.png' },
    { id: 2, name: 'Darrell Steward', email: 'example@gmail.com', subject: 'Physics', image: 'top-teacher-img2.png' },
    { id: 3, name: 'Jane Cooper', email: 'example@gmail.com', subject: 'Biology', image: 'top-teacher-img3.png' },
    { id: 4, name: 'Savannah Nguyen', email: 'example@gmail.com', subject: 'English', image: 'top-teacher-img4.png' },
    { id: 5, name: 'Eleanor Pena', email: 'example@gmail.com', subject: 'Math', image: 'top-teacher-img5.png' }
  ];

  const topStudents = [
    { id: 1, name: 'Brooklyn Simmons', class: 'Six', marks: 20, color: 'blue', image: 'avatar-img1.png' },
    { id: 2, name: 'Floyd Miles', class: 'Seven', marks: 35, color: 'red', image: 'avatar-img2.png' },
    { id: 3, name: 'Courtney Henry', class: 'Eight', marks: 45, color: 'warning', image: 'avatar-img2.png' },
    { id: 4, name: 'Kathryn Murphy', class: 'Nine', marks: 65, color: 'green', image: 'avatar-img4.png' },
    { id: 5, name: 'Annette Black', class: 'Ten', marks: 65, color: 'blue', image: 'avatar-img5.png' }
  ];

  return (
    <div className="dashboard-main-body">
      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div className="">
          <h6 className="fw-semibold mb-0">Dashboard</h6>
          <p className="text-neutral-600 mt-4 mb-0">
            School → Manage your school, track attendance, expense, and net worth.
          </p>
        </div>
      </div>

      <div className="mt-24">
        <div className="row gy-4">
          {/* Stats Cards */}
          <div className="col-xxl-8">
            <div className="row gy-4">
              {statsCards.map((card) => (
                <div key={card.id} className="col-xxl-4 col-sm-6">
                  <div className={`card shadow-1 radius-8 ${card.gradient} h-100`}>
                    <div className="card-body p-20">
                      <div className="d-flex flex-wrap align-items-center gap-3 mb-16">
                        <div className={`w-44-px h-44-px ${card.bgColor} rounded-circle d-flex justify-content-center align-items-center`}>
                          <img src={`../src/assets/images/icons/${card.icon}`} alt="Icon" />
                        </div>
                        <p className="fw-medium text-primary-light mb-1">{card.title}</p>
                      </div>
                      <h6 className="mb-0">{card.value}</h6>
                      <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
                        <span className="d-inline-flex align-items-center gap-1 text-primary-600 text-sm fw-semibold">
                          {card.percentage}
                          <iconify-icon icon="bxs:up-arrow" className="text-xs"></iconify-icon>
                        </span>
                        {card.change}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Attendance */}
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
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <span className="w-12-px h-12-px radius-2 bg-primary-600"></span>
                        <span className="text-neutral-600">Present </span>
                      </div>
                      <span className="fw-semibold text-primary-light">87%</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <span className="w-12-px h-12-px radius-2 bg-warning-600"></span>
                        <span className="text-neutral-600">Absent: </span>
                      </div>
                      <span className="fw-semibold text-primary-light">40%</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <span className="w-12-px h-12-px radius-2 bg-purple-600"></span>
                        <span className="text-neutral-600">Late </span>
                      </div>
                      <span className="fw-semibold text-primary-light">20%</span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-2">
                        <span className="w-12-px h-12-px radius-2 bg-success-600"></span>
                        <span className="text-neutral-600">Half day </span>
                      </div>
                      <span className="fw-semibold text-primary-light">20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Statistic, Notice Board, Leave Requests & Calendar Section */}
          <div className="col-12">
            <div className="row gy-4">
              <div className="col-xxl-8">
                <div className="row gy-4">
                  {/* Revenue Statistic with Chart */}
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
                              <span className="text-secondary-light text-sm font-semibold">
                                Collected Fee: <span className="text-primary-light fw-bold">$300</span>
                              </span>
                            </li>
                          </ul>
                          <Chart
                            options={revenueOptions}
                            series={revenueSeries}
                            type="bar"
                            height={250}
                          />
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
                          <div className="dropdown">
                            <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <iconify-icon icon="entypo:dots-three-vertical" className="icon text-secondary-light"></iconify-icon>
                            </button>
                            <ul className="dropdown-menu p-12 border bg-base shadow">
                              <li>
                                <button type="button" className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-10">
                                  <iconify-icon icon="hugeicons:view" className="icon text-lg line-height-1"></iconify-icon>
                                  View
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="ps-20 pt-20 pb-20">
                          <div className="pe-20 d-flex flex-column gap-20 max-h-462-px overflow-y-auto scroll-sm">
                            {noticeBoard.map((notice) => (
                              <div key={notice.id} className="d-flex align-items-start gap-16">
                                <img
                                  src={`../src/assets/images/thumbs/${notice.image}`}
                                  alt="Thumbnail"
                                  className="w-40-px h-40-px rounded-circle object-fit-cover flex-shrink-0"
                                />
                                <div className="">
                                  <h6 className="mb-4 text-lg">{notice.name}</h6>
                                  <p className="text-secondary-light text-sm mb-0">{notice.message}</p>
                                  <span className="text-secondary-light text-sm mb-0 mt-4">{notice.date}</span>
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
                          <div className="dropdown">
                            <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <iconify-icon icon="entypo:dots-three-vertical" className="icon text-secondary-light"></iconify-icon>
                            </button>
                            <ul className="dropdown-menu p-12 border bg-base shadow">
                              <li>
                                <button type="button" className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-10">
                                  <iconify-icon icon="hugeicons:view" className="icon text-lg line-height-1"></iconify-icon>
                                  View
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="ps-20 pt-20 pb-20">
                          <div className="pe-20 d-flex flex-column gap-28 max-h-462-px overflow-y-auto scroll-sm">
                            {leaveRequests.map((request) => (
                              <div key={request.id} className="d-flex align-items-center justify-content-between gap-16">
                                <div className="d-flex align-items-start gap-16">
                                  <img
                                    src={`../src/assets/images/thumbs/${request.image}`}
                                    alt="Thumbnail"
                                    className="w-40-px h-40-px rounded-circle object-fit-cover flex-shrink-0"
                                  />
                                  <div className="">
                                    <h6 className="mb-0 text-lg">{request.name}</h6>
                                    <span className="text-secondary-light text-sm mb-0">{request.role}</span>
                                  </div>
                                </div>
                                <div className="text-end">
                                  <span className="d-block fw-bold text-primary-light">{request.days}</span>
                                  <p className="text-secondary-light text-sm mb-0">Apply on: {request.date}</p>
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

              {/* Calendar & Upcoming Events */}
              <div className="col-xxl-4">
                <div className="card h-100">
                  <div className="card-body p-0">
                    <div className="d-flex flex-wrap align-items-center justify-content-between px-20 py-16 border-bottom border-neutral-200">
                      <h6 className="text-lg mb-0">Calendar</h6>
                    </div>

                    <div className="p-20">
                      <div className="calendar">
                        <div className="calendar__header d-flex justify-content-between align-items-center mb-3">
                          <button type="button" className="calendar__arrow left btn btn-sm" onClick={() => changeMonth(-1)}>
                            <i className="ri-arrow-left-s-line"></i>
                          </button>
                          <p className="display text-md text-secondary-light fw-semibold mb-0">
                            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                          </p>
                          <button type="button" className="calendar__arrow right btn btn-sm" onClick={() => changeMonth(1)}>
                            <i className="ri-arrow-right-s-line"></i>
                          </button>
                        </div>

                        <div className="calendar__week week d-grid mb-2" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
                          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                            <div key={day} className="calendar__week-text text-center fw-semibold text-sm">{day}</div>
                          ))}
                        </div>
                        <div className="days d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
                          {getDaysInMonth().map((day, index) => (
                            <div key={index} className="text-center py-2">
                              {day ? <span className="text-sm">{day}</span> : ''}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="ps-20 pt-20 pb-20 border-top border-neutral-200">
                      <h6 className="text-lg mb-20">Upcoming Events</h6>
                      <div className="pe-20 d-flex flex-column gap-32 overflow-y-auto max-h-500-px scroll-sm">
                        {upcomingEvents.map((event) => (
                          <div key={event.id} className="d-flex align-items-center justify-content-between gap-16">
                            <div className={`ps-10 border-start-width-3-px border-${event.color}`}>
                              <div className="d-flex align-items-end gap-6">
                                <h6 className="text-lg fw-normal mb-0">{event.time}</h6>
                                <span className="text-xs text-secondary-light line-height-1 mb-2">{event.period}</span>
                              </div>
                              <p className="text-secondary-light mt-4 mb-2 text-sm">{event.title}</p>
                              <p className="text-xs text-secondary-light mb-0">
                                Lead by <a href="javascript:void(0)" className="text-primary-600 hover-underline">{event.lead}</a>
                              </p>
                            </div>
                            <div>
                              <a href="javascript:void(0)" className="py-6 px-16 radius-4 bg-neutral-100 text-secondary-light fw-semibold bg-hover-primary-600 hover-text-white">
                                View
                              </a>
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

          {/* User Overview */}
          <div className="col-xxl-4 col-lg-6">
            <div className="card h-100">
              <div className="card-body p-0">
                <div className="d-flex flex-wrap align-items-center justify-content-between px-20 py-16 border-bottom border-neutral-200">
                  <h6 className="text-lg mb-0">User Overview</h6>
                  <div className="dropdown">
                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <iconify-icon icon="entypo:dots-three-vertical" className="icon text-secondary-light"></iconify-icon>
                    </button>
                    <ul className="dropdown-menu p-12 border bg-base shadow">
                      <li>
                        <button type="button" className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-10">
                          <iconify-icon icon="hugeicons:view" className="icon text-lg line-height-1"></iconify-icon>
                          View
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="p-20">
                  <div>
                    <div className="mt-40 mb-24 pe-110 position-relative max-w-288-px mx-auto">
                      <div className="w-170-px h-170-px rounded-circle z-1 position-relative d-inline-flex justify-content-center align-items-center">
                        <img src="../src/assets/images/icons/radial-bg1.png" alt="Image" className="position-absolute top-0 start-0 z-n1 w-100 h-100 object-fit-cover" />
                        <h5 className="text-white">60%</h5>
                      </div>
                      <div className="w-144-px h-144-px rounded-circle z-1 position-relative d-inline-flex justify-content-center align-items-center position-absolute top-0 end-0 mt--36">
                        <img src="../src/assets/images/icons/radial-bg2.png" alt="Image" className="position-absolute top-0 start-0 z-n1 w-100 h-100 object-fit-cover" />
                        <h5 className="text-white">30%</h5>
                      </div>
                      <div className="w-110-px h-110-px rounded-circle z-1 position-relative d-inline-flex justify-content-center align-items-center position-absolute bottom-0 start-50 translate-middle-x ms-48">
                        <img src="../src/assets/images/icons/radial-bg3.png" alt="Image" className="position-absolute top-0 start-0 z-n1 w-100 h-100 object-fit-cover" />
                        <h5 className="text-white">10%</h5>
                      </div>
                    </div>

                    <div className="d-flex align-items-center flex-wrap gap-24 justify-content-evenly">
                      <div className="d-flex flex-column align-items-start">
                        <div className="d-flex align-items-center gap-2">
                          <span className="w-12-px h-12-px rounded-pill bg-success-600"></span>
                          <span className="text-secondary-light text-sm fw-normal">Student</span>
                        </div>
                        <h6 className="text-primary-light fw-semibold mb-0 mt-4 text-lg">750</h6>
                      </div>
                      <div className="d-flex flex-column align-items-start">
                        <div className="d-flex align-items-center gap-2">
                          <span className="w-12-px h-12-px rounded-pill bg-warning-600"></span>
                          <span className="text-secondary-light text-sm fw-normal">Teacher</span>
                        </div>
                        <h6 className="text-primary-light fw-semibold mb-0 mt-4 text-lg">56</h6>
                      </div>
                      <div className="d-flex flex-column align-items-start">
                        <div className="d-flex align-items-center gap-2">
                          <span className="w-12-px h-12-px rounded-pill bg-blue-600"></span>
                          <span className="text-secondary-light text-sm fw-normal">Staffs</span>
                        </div>
                        <h6 className="text-primary-light fw-semibold mb-0 mt-4 text-lg">15</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Income Vs Expense with Chart */}
          <div className="col-xxl-8 col-lg-6">
            <div className="card h-100">
              <div className="card-body p-0">
                <div className="d-flex flex-wrap align-items-center justify-content-between px-20 py-16 border-bottom border-neutral-200">
                  <h6 className="text-lg mb-0">Income Vs Expense</h6>
                  <div className="dropdown">
                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <iconify-icon icon="entypo:dots-three-vertical" className="icon text-secondary-light"></iconify-icon>
                    </button>
                    <ul className="dropdown-menu p-12 border bg-base shadow">
                      <li>
                        <button type="button" className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-10">
                          <iconify-icon icon="hugeicons:view" className="icon text-lg line-height-1"></iconify-icon>
                          View
                        </button>
                      </li>
                    </ul>
                  </div>
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
                      <span className="text-secondary-light text-sm font-semibold">
                        Expense: <span className="text-primary-light fw-bold">$300</span>
                      </span>
                    </li>
                  </ul>
                  <Chart
                    options={incomeExpenseOptions}
                    series={incomeExpenseSeries}
                    type="area"
                    height={260}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Top Teachers */}
          <div className="col-xxl-4 col-lg-6">
            <div className="card h-100">
              <div className="card-body p-0">
                <div className="d-flex flex-wrap align-items-center justify-content-between px-20 py-16 border-bottom border-neutral-200">
                  <h6 className="text-lg mb-0">Top Teachers</h6>
                  <div className="dropdown">
                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <iconify-icon icon="entypo:dots-three-vertical" className="icon text-secondary-light"></iconify-icon>
                    </button>
                    <ul className="dropdown-menu p-12 border bg-base shadow">
                      <li>
                        <button type="button" className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-10">
                          <iconify-icon icon="hugeicons:view" className="icon text-lg line-height-1"></iconify-icon>
                          View
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="ps-20 pt-20 pb-20">
                  <div className="pe-20 d-flex flex-column gap-20 max-h-462-px overflow-y-auto scroll-sm">
                    {topTeachers.map((teacher) => (
                      <div key={teacher.id} className="d-flex align-items-center justify-content-between gap-16">
                        <div className="d-flex align-items-start gap-16">
                          <img
                            src={`../src/assets/images/thumbs/${teacher.image}`}
                            alt="Thumbnail"
                            className="w-40-px h-40-px rounded-circle object-fit-cover flex-shrink-0"
                          />
                          <div className="">
                            <h6 className="mb-0 text-lg">{teacher.name}</h6>
                            <span className="text-secondary-light text-sm mb-0">{teacher.email}</span>
                          </div>
                        </div>
                        <div className="text-end">
                          <span className="d-block fw-semibold text-primary-light">{teacher.subject}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* New Admissions with Donut Chart */}
          <div className="col-xxl-4 col-lg-6">
            <div className="card h-100">
              <div className="card-body p-0">
                <div className="d-flex flex-wrap align-items-center justify-content-between px-20 py-16 border-bottom border-neutral-200">
                  <h6 className="text-lg mb-0">New Admissions</h6>
                  <div className="dropdown">
                    <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <iconify-icon icon="entypo:dots-three-vertical" className="icon text-secondary-light"></iconify-icon>
                    </button>
                    <ul className="dropdown-menu p-12 border bg-base shadow">
                      <li>
                        <button type="button" className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-10">
                          <iconify-icon icon="hugeicons:view" className="icon text-lg line-height-1"></iconify-icon>
                          View
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="p-20">
                  <div className="position-relative text-center">
                    <Chart
                      options={admissionsOptions}
                      series={admissionsSeries}
                      type="donut"
                      height={260}
                    />
                    <div className="text-center position-absolute top-50 start-50 translate-middle" style={{ pointerEvents: 'none' }}>
                      <h5 className="mb-4">50</h5>
                      <span className="text-secondary-light">Total Admissions</span>
                    </div>
                  </div>
                  <ul className="d-flex flex-wrap align-items-center justify-content-center mt-48 gap-24">
                    <li className="d-flex align-items-center gap-2">
                      <span className="w-12-px h-12-px radius-2 bg-success-600 rotate-45-deg"></span>
                      <div className="">
                        <span className="text-secondary-light fw-medium">
                          English: <span className="fw-bold text-primary-light">15</span>
                        </span>
                      </div>
                    </li>
                    <li className="d-flex align-items-center gap-2">
                      <span className="w-12-px h-12-px radius-2 bg-blue-600 rotate-45-deg"></span>
                      <div className="">
                        <span className="text-secondary-light fw-medium">
                          Math: <span className="fw-bold text-primary-light">15</span>
                        </span>
                      </div>
                    </li>
                    <li className="d-flex align-items-center gap-2">
                      <span className="w-12-px h-12-px radius-2 bg-warning-600 rotate-45-deg"></span>
                      <div className="">
                        <span className="text-secondary-light fw-medium">
                          Biology: <span className="fw-bold text-primary-light">5</span>
                        </span>
                      </div>
                    </li>
                    <li className="d-flex align-items-center gap-2">
                      <span className="w-12-px h-12-px radius-2 bg-primary-600 rotate-45-deg"></span>
                      <div className="">
                        <span className="text-secondary-light fw-medium">
                          Physics: <span className="fw-bold text-primary-light">10</span>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Top Student */}
          <div className="col-xxl-4">
            <div className="card radius-12 border-0 h-100">
              <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between py-12 px-20 border-bottom border-neutral-200">
                <h6 className="mb-2 fw-bold text-lg">Top Student</h6>
                <div className="dropdown">
                  <button type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <iconify-icon icon="entypo:dots-three-vertical" className="icon text-secondary-light"></iconify-icon>
                  </button>
                  <ul className="dropdown-menu p-12 border bg-base shadow">
                    <li>
                      <button type="button" className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-10">
                        <iconify-icon icon="hugeicons:view" className="icon text-lg line-height-1"></iconify-icon>
                        View
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex flex-column gap-28">
                  {topStudents.map((student) => (
                    <div key={student.id} className="d-flex align-items-center justify-content-between gap-10">
                      <div className="d-flex align-items-center gap-12">
                        <span className="w-44-px h-44-px rounded-circle d-flex justify-content-center align-items-center">
                          <img
                            src={`../src/assets/images/thumbs/${student.image}`}
                            className="w-44-px h-44-px object-fit-cover rounded-circle"
                            alt="Icon"
                          />
                        </span>
                        <div className="">
                          <h6 className="text-sm mb-2">{student.name}</h6>
                          <span className="text-xs text-secondary-light">Class: {student.class}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-8">
                        <span className="text-sm text-secondary-light">Marks</span>
                        <span className="text-primary-light text-sm d-block text-end">
                          <svg className="radial-progress w-44-px" data-percentage={student.marks} viewBox="0 0 80 80">
                            <circle className={`incomplete stroke-8-px opacity-02 stroke-${student.color}`} cx="40" cy="40" r="35"></circle>
                            <circle className={`complete stroke-8-px stroke-${student.color}`} cx="40" cy="40" r="35"></circle>
                            <text className="percentage fill-black" x="50%" y="57%" transform="matrix(0, 1, -1, 0, 80, 0)">
                              {student.marks}
                            </text>
                          </svg>
                        </span>
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