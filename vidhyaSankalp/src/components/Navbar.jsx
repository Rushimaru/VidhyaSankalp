import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const languages = [
    { id: 'english', name: 'English', flag: 'flag1.png' },
    { id: 'japan', name: 'Japan', flag: 'flag2.png' },
    { id: 'france', name: 'France', flag: 'flag3.png' },
    { id: 'germany', name: 'Germany', flag: 'flag4.png' },
    { id: 'korea', name: 'South Korea', flag: 'flag5.png' },
    { id: 'bangladesh', name: 'Bangladesh', flag: 'flag6.png' },
    { id: 'india', name: 'India', flag: 'flag7.png' },
    { id: 'canada', name: 'Canada', flag: 'flag8.png' },
  ];

  const notifications = [
    {
      id: 1,
      type: 'success',
      icon: 'bitcoin-icons:verify-outline',
      title: 'Congratulations',
      message: 'Your profile has been Verified. Your profile has been Verified',
      time: '23 Mins ago',
      bgClass: ''
    },
    {
      id: 2,
      type: 'profile',
      image: '../src/assets/images/notification/profile-1.png',
      title: 'Ronald Richards',
      message: 'You can stitch between artboards',
      time: '23 Mins ago',
      bgClass: 'bg-neutral-50'
    },
    {
      id: 3,
      type: 'text',
      initials: 'AM',
      bgClass: 'bg-info-subtle text-info-main',
      title: 'Arlene McCoy',
      message: 'Invite you to prototyping',
      time: '23 Mins ago'
    },
    {
      id: 4,
      type: 'profile',
      image: '../src/assets/images/notification/profile-2.png',
      title: 'Robiul Hasan',
      message: 'Invite you to prototyping',
      time: '23 Mins ago',
      bgClass: 'bg-neutral-50'
    },
    {
      id: 5,
      type: 'text',
      initials: 'DR',
      bgClass: 'bg-info-subtle text-info-main',
      title: 'Darlene Robertson',
      message: 'Invite you to prototyping',
      time: '23 Mins ago'
    }
  ];

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      applyDarkMode(true);
    } else {
      setIsDarkMode(false);
      applyDarkMode(false);
    }
  }, []);

  const applyDarkMode = (dark) => {
    const html = document.documentElement;
    const body = document.body;

    if (dark) {
      html.classList.add('dark');
      html.setAttribute('data-theme', 'dark');
      html.setAttribute('data-bs-theme', 'dark');
      body.setAttribute('data-theme', 'dark');
      body.classList.add('dark');
      body.classList.remove('light');
    } else {
      html.classList.remove('dark');
      html.setAttribute('data-theme', 'light');
      html.setAttribute('data-bs-theme', 'light');
      body.setAttribute('data-theme', 'light');
      body.classList.add('light');
      body.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    applyDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  const toggleMobileSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    sidebar?.classList.toggle('active');
    overlay?.classList.toggle('active');
  };

  const handleLanguageChange = (languageId) => {
    setSelectedLanguage(languageId);
  };

  const selectedLang = languages.find(lang => lang.id === selectedLanguage);

  return (
    <div className="navbar-header shadow-1">
      <div className="row align-items-center justify-content-between">

        {/* Left Side - Mobile Toggle & Search */}
        <div className="col-auto">
          <div className="d-flex flex-wrap align-items-center gap-4">

            {/* Mobile Sidebar Toggle */}
            <button
              type="button"
              className="sidebar-mobile-toggle"
              aria-label="Sidebar Mobile Toggler Button"
              onClick={toggleMobileSidebar}
            >
              <iconify-icon icon="heroicons:bars-3-solid" className="icon"></iconify-icon>
            </button>

            {/* Search Bar */}
            <form className="navbar-search">
              <input
                type="text"
                className="bg-transparent"
                name="search"
                placeholder="Search"
              />
              <iconify-icon icon="ion:search-outline" className="icon"></iconify-icon>
            </form>

          </div>
        </div>

        {/* Right Side */}
        <div className="col-auto">
          <div className="d-flex flex-wrap align-items-center gap-3">

            {/* Theme Toggle Button */}
            <button
              type="button"
              className="w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
              aria-label="Dark & Light Mode Button"
              onClick={toggleTheme}
            >
              {isDarkMode ? (
                <iconify-icon icon="solar:sun-bold-duotone" className="icon text-xl"></iconify-icon>
              ) : (
                <iconify-icon icon="solar:moon-bold-duotone" className="icon text-xl"></iconify-icon>
              )}
            </button>

            {/* Language Dropdown */}
            <div className="dropdown d-inline-block">
              <button
                className="has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-label="Language Change Button"
              >
                <img
                  src={`../src/assets/images/flags/${selectedLang?.flag}`}
                  alt="language"
                  className="w-24 h-24 object-fit-cover rounded-circle"
                />
              </button>
              <div className="dropdown-menu to-top dropdown-menu-sm">
                <div className="py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                  <h6 className="text-lg text-primary-light fw-semibold mb-0">
                    Choose Your Language
                  </h6>
                </div>
                <div className="max-h-400-px overflow-y-auto scroll-sm pe-8">
                  {languages.map((language) => (
                    <div
                      key={language.id}
                      className="form-check style-check d-flex align-items-center justify-content-between mb-16"
                    >
                      <label
                        className="form-check-label line-height-1 fw-medium text-secondary-light"
                        htmlFor={language.id}
                      >
                        <span className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                          <img
                            src={`../src/assets/images/flags/${language.flag}`}
                            alt={language.name}
                            className="w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0"
                          />
                          <span className="text-md fw-semibold mb-0">{language.name}</span>
                        </span>
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="language"
                        id={language.id}
                        checked={selectedLanguage === language.id}
                        onChange={() => handleLanguageChange(language.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Language Dropdown End */}

            {/* Notification Dropdown */}
            <div className="dropdown">
              <button
                className="has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center position-relative"
                type="button"
                data-bs-toggle="dropdown"
                aria-label="Notification Button"
              >
                <iconify-icon icon="iconoir:bell" className="text-primary-light text-xl"></iconify-icon>
                <span className="w-8-px h-8-px bg-danger-600 position-absolute end-0 top-0 rounded-circle mt-2 me-2"></span>
              </button>
              <div className="dropdown-menu to-top dropdown-menu-lg p-0">
                <div className="m-16 py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                  <h6 className="text-lg text-primary-light fw-semibold mb-0">Notifications</h6>
                  <span className="text-primary-600 fw-semibold text-lg w-40-px h-40-px rounded-circle bg-base d-flex justify-content-center align-items-center">
                    {notifications.length.toString().padStart(2, '0')}
                  </span>
                </div>

                <div className="max-h-400-px overflow-y-auto scroll-sm pe-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between ${notification.bgClass || ''}`}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                        {notification.type === 'success' && (
                          <span className="w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                            <iconify-icon icon={notification.icon} className="icon text-xxl"></iconify-icon>
                          </span>
                        )}
                        {notification.type === 'profile' && (
                          <span className="w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                            <img src={notification.image} alt="Profile" />
                          </span>
                        )}
                        {notification.type === 'text' && (
                          <span className={`w-44-px h-44-px ${notification.bgClass} rounded-circle d-flex justify-content-center align-items-center flex-shrink-0`}>
                            {notification.initials}
                          </span>
                        )}
                        <div>
                          <h6 className="text-md fw-semibold mb-4">{notification.title}</h6>
                          <p className="mb-0 text-sm text-secondary-light text-w-200-px">{notification.message}</p>
                        </div>
                      </div>
                      <span className="text-sm text-secondary-light flex-shrink-0">{notification.time}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center py-12 px-16">
                  <button
                    type="button"
                    className="text-primary-600 fw-semibold text-md hover-underline border-0 bg-transparent p-0"
                  >
                    See All Notification
                  </button>
                </div>
              </div>
            </div>
            {/* Notification Dropdown End */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;