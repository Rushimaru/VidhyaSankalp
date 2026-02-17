import React, { useState, useEffect } from 'react';

const languages = [
  { id: 'english',    label: 'English',     icon: 'twemoji:flag-united-kingdom' },
  { id: 'japan',      label: 'Japan',        icon: 'twemoji:flag-japan'           },
  { id: 'france',     label: 'France',       icon: 'twemoji:flag-france'          },
  { id: 'germany',    label: 'Germany',      icon: 'twemoji:flag-germany'         },
  { id: 'korea',      label: 'South Korea',  icon: 'twemoji:flag-south-korea'     },
  { id: 'bangladesh', label: 'Bangladesh',   icon: 'twemoji:flag-bangladesh'      },
  { id: 'india',      label: 'India',        icon: 'twemoji:flag-india'           },
  { id: 'canada',     label: 'Canada',       icon: 'twemoji:flag-canada'          },
];

const notifications = [
  { id:1, type:'icon',  title:'Congratulations',    message:'Your profile has been Verified.',              time:'23 Mins ago', iconName:'bitcoin-icons:verify-outline', iconBg:'bg-success-subtle', iconColor:'text-success-main' },
  { id:2, type:'image', title:'Ronald Richards',    message:'You can stitch between artboards',             time:'23 Mins ago', img:'assets/images/notification/profile-1.png' },
  { id:3, type:'text',  title:'Arlene McCoy',       message:'Invite you to prototyping',                    time:'23 Mins ago', initials:'AM', iconBg:'bg-info-subtle', iconColor:'text-info-main' },
  { id:4, type:'image', title:'Robiul Hasan',       message:'Invite you to prototyping',                    time:'23 Mins ago', img:'assets/images/notification/profile-2.png' },
  { id:5, type:'text',  title:'Darlene Robertson',  message:'Invite you to prototyping',                    time:'23 Mins ago', initials:'DR', iconBg:'bg-info-subtle', iconColor:'text-info-main' },
];

const Navbar = ({ onToggleSidebar }) => {
  const [isDarkMode, setIsDarkMode]     = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [searchValue, setSearchValue]   = useState('');

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <div className="navbar-header shadow-1">
      <div className="row align-items-center justify-content-between">
        <div className="col-auto">
          <div className="d-flex flex-wrap align-items-center gap-4">
            <button type="button" className="sidebar-mobile-toggle" onClick={onToggleSidebar}
              aria-label="Toggle Sidebar" style={{background:'none',border:'none',cursor:'pointer'}}>
              <iconify-icon icon="heroicons:bars-3-solid" class="icon" style={{fontSize:'24px'}}></iconify-icon>
            </button>
            <form className="navbar-search" onSubmit={e=>e.preventDefault()}>
              <input type="text" className="bg-transparent" name="search" placeholder="Search"
                value={searchValue} onChange={e=>setSearchValue(e.target.value)} />
              <iconify-icon icon="ion:search-outline" class="icon"></iconify-icon>
            </form>
          </div>
        </div>

        <div className="col-auto">
          <div className="d-flex flex-wrap align-items-center gap-3">

            {/* Theme Toggle */}
            <button type="button" onClick={toggleTheme}
              className="w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
              style={{border:'none',cursor:'pointer'}}>
              <iconify-icon
                icon={isDarkMode ? 'solar:moon-bold-duotone' : 'solar:sun-bold-duotone'}
                style={{fontSize:'20px', color: isDarkMode ? '#6366f1' : '#f59e0b'}}
              ></iconify-icon>
            </button>

            {/* Language Dropdown */}
            <div className="dropdown d-inline-block">
              <button className="has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
                type="button" data-bs-toggle="dropdown" style={{border:'none',cursor:'pointer'}}>
                <iconify-icon icon={selectedLang.icon} style={{fontSize:'22px'}}></iconify-icon>
              </button>
              <div className="dropdown-menu to-top dropdown-menu-sm">
                <div className="py-12 px-16 radius-8 bg-primary-50 mb-16">
                  <h6 className="text-lg text-primary-light fw-semibold mb-0">Choose Your Language</h6>
                </div>
                <div className="max-h-400-px overflow-y-auto scroll-sm pe-8">
                  {languages.map(lang => (
                    <div key={lang.id} className="form-check style-check d-flex align-items-center justify-content-between mb-16">
                      <label className="form-check-label line-height-1 fw-medium text-secondary-light" htmlFor={lang.id}
                        style={{cursor:'pointer'}} onClick={()=>setSelectedLang(lang)}>
                        <span className="text-black d-flex align-items-center gap-3">
                          <iconify-icon icon={lang.icon} style={{fontSize:'28px'}}></iconify-icon>
                          <span className="text-md fw-semibold mb-0">{lang.label}</span>
                        </span>
                      </label>
                      <input className="form-check-input" type="radio" name="language" id={lang.id}
                        checked={selectedLang.id === lang.id} onChange={()=>setSelectedLang(lang)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="dropdown">
              <button className="has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center position-relative"
                type="button" data-bs-toggle="dropdown" style={{border:'none',cursor:'pointer'}}>
                <iconify-icon icon="iconoir:bell" class="text-primary-light" style={{fontSize:'20px'}}></iconify-icon>
                <span className="w-8-px h-8-px bg-danger-600 position-absolute end-0 top-0 rounded-circle mt-2 me-2"></span>
              </button>
              <div className="dropdown-menu to-top dropdown-menu-lg p-0">
                <div className="m-16 py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                  <h6 className="text-lg text-primary-light fw-semibold mb-0">Notifications</h6>
                  <span className="text-primary-600 fw-semibold text-lg w-40-px h-40-px rounded-circle bg-base d-flex justify-content-center align-items-center">05</span>
                </div>
                <div className="max-h-400-px overflow-y-auto scroll-sm pe-4">
                  {notifications.map((n,i) => (
                    <a key={n.id} href="#!" className={`px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between${i%2!==0?' bg-neutral-50':''}`}>
                      <div className="text-black d-flex align-items-center gap-3">
                        <span className={`w-44-px h-44-px ${n.iconBg||'bg-success-subtle'} ${n.iconColor||''} rounded-circle d-flex justify-content-center align-items-center flex-shrink-0`}>
                          {n.type==='icon'  && <iconify-icon icon={n.iconName} style={{fontSize:'22px'}}></iconify-icon>}
                          {n.type==='image' && <img src={n.img} alt={n.title} style={{width:'44px',height:'44px',borderRadius:'50%',objectFit:'cover'}} />}
                          {n.type==='text'  && <span style={{fontSize:'13px',fontWeight:'700'}}>{n.initials}</span>}
                        </span>
                        <div>
                          <h6 className="text-md fw-semibold mb-4">{n.title}</h6>
                          <p className="mb-0 text-sm text-secondary-light text-w-200-px">{n.message}</p>
                        </div>
                      </div>
                      <span className="text-sm text-secondary-light flex-shrink-0">{n.time}</span>
                    </a>
                  ))}
                </div>
                <div className="text-center py-12 px-16">
                  <a href="#!" className="text-primary-600 fw-semibold text-md hover-underline">See All Notification</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;