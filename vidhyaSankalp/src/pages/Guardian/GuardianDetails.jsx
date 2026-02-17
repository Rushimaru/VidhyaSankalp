import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SlideDrawer from "../../components/Slidedrawer"; 

// Sample guardian data (you can replace with data from API or location state)
const sampleGuardian = {
  id: 'AD1256589',
  name: 'Marvin McKinney',
  image: 'teacher-details-img.png',
  type: 'Father',
  phone: '+1 21541214',
  occupation: 'N/A',
  address: '8502 Preston Rd. Inglewood, Maine 98380',
  joinDate: '10 Nov 2006',
  login: {
    userType: 'guardian',
    email: 'guardian@example.com',
    password: '15445@#AC',
  },
  children: [
    {
      name: 'Robert Fox',
      relation: 'Father', // note: this is the child's relation to the guardian? The HTML shows "Father" but it's likely the child's name and guardian relation? We'll keep as given.
      image: 'guardian-img1.png',
      phone: '+19854 65642',
      email: 'father@example.com',
    },
    {
      name: 'Brooklyn Simmons',
      relation: 'Mother',
      image: 'guardian-img2.png',
      phone: '+19854 65642',
      email: 'mother@example.com',
    },
  ],
};

const GuardianDetails = () => {
  const location = useLocation();
  // If guardian data was passed via state, use it; otherwise use sample
  const guardian = location.state?.guardian || sampleGuardian;

  const [showLoginDrawer, setShowLoginDrawer] = useState(false);

  return (
    <div className="dashboard-main-body">
      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Guardian Details</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <Link to="/guardians" className="text-secondary-light hover-text-primary hover-underline"> / Guardian</Link>
            <span className="text-secondary-light"> / Guardian Details</span>
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

      {/* Main content */}
      <div className="mt-24">
        {/* Profile card */}
        <div className="card h-100">
          <div className="card-body p-24">
            <div className="d-flex gap-32 flex-md-row flex-column">
              {/* Left column - avatar and basic info */}
              <div className="max-w-300-px w-100 text-center">
                <figure className="mb-24 w-120-px h-120-px mx-auto rounded-circle overflow-hidden">
                  <img
                    src={`/assets/images/thumbs/${guardian.image}`}
                    alt={guardian.name}
                    className="w-100 h-100 object-fit-cover"
                  />
                </figure>
                <h2 className="h6 text-primary-light mb-8 fw-semibold">{guardian.name}</h2>
                <p className="mb-0">
                  ID: <span className="text-primary-600 fw-semibold">{guardian.id}</span>
                </p>
                <div className="mt-20 d-flex gap-16 w-100">
                  <Link
                    to="/guardians/edit"
                    state={{ guardian }}
                    className="btn btn-primary-600 border fw-medium border-primary-600 text-md d-flex justify-content-center align-items-center gap-8 flex-grow-1 px-12 py-8 radius-8"
                  >
                    <span className="d-flex text-lg"><i className="ri-edit-line"></i></span>
                    Edit
                  </Link>
                </div>
              </div>

              {/* Vertical divider */}
              <div><span className="h-100 w-1-px bg-neutral-200"></span></div>

              {/* Right column - personal info */}
              <div className="flex-grow-1">
                <div className="pb-16 border-bottom d-flex align-items-center justify-content-between gap-20">
                  <h3 className="h6 text-primary-light text-lg mb-0 fw-semibold">Personal Info</h3>
                </div>
                <div className="mt-16 d-flex flex-column gap-20">
                  <div className="d-flex gap-4">
                    <span className="fw-semibold text-sm text-primary-light w-110-px">Guardians Type</span>
                    <span className="fw-normal text-sm text-secondary-light">: {guardian.type}</span>
                  </div>
                  <div className="d-flex gap-4">
                    <span className="fw-semibold text-sm text-primary-light w-110-px">Phone Number</span>
                    <span className="fw-normal text-sm text-secondary-light">: {guardian.phone}</span>
                  </div>
                  <div className="d-flex gap-4">
                    <span className="fw-semibold text-sm text-primary-light w-110-px">Occupation</span>
                    <span className="fw-normal text-sm text-secondary-light">: {guardian.occupation}</span>
                  </div>
                  <div className="d-flex gap-4">
                    <span className="fw-semibold text-sm text-primary-light w-110-px">Address</span>
                    <span className="fw-normal text-sm text-secondary-light">: {guardian.address}</span>
                  </div>
                  <div className="d-flex gap-4">
                    <span className="fw-semibold text-sm text-primary-light w-110-px">Join Date</span>
                    <span className="fw-normal text-sm text-secondary-light">: {guardian.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Children/Profile Detail Section */}
        <div className="mt-16">
          <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
              <h6 className="text-lg fw-semibold mb-0">Profile Detail</h6>
            </div>
            <div className="card-body p-0">
              {guardian.children.map((child, index) => (
                <div key={index} className="bg-hover-neutral-50 p-20">
                  <div className="row g-4">
                    <div className="col-sm-4">
                      <div className="d-flex align-items-center gap-12">
                        <figure className="w-48-px h-48-px rounded-circle overflow-hidden mb-0">
                          <img
                            src={`/assets/images/thumbs/${child.image}`}
                            alt={child.name}
                            className="flex-shrink-0 w-100 h-100 object-fit-cover"
                          />
                        </figure>
                        <div>
                          <h6 className="text-md mb-2 fw-medium">{child.name}</h6>
                          <span>{child.relation}</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div>
                        <h6 className="text-md mb-2 fw-medium">Phone</h6>
                        <span>{child.phone}</span>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div>
                        <h6 className="text-md mb-2 fw-medium">Email</h6>
                        <span>{child.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Login Details Drawer */}
      <SlideDrawer
        isOpen={showLoginDrawer}
        onClose={() => setShowLoginDrawer(false)}
        title="Login Details"
      >
        <div className="p-20">
          <div className="d-flex align-items-center gap-20">
            <figure className="w-72-px h-72-px rounded-circle overflow-hidden mb-0">
              <img
                src={`/assets/images/thumbs/${guardian.image}`}
                alt={guardian.name}
                className="w-100 h-100 object-fit-cover"
              />
            </figure>
            <div className="flex-grow-1">
              <h2 className="text-xl text-primary-light mb-4">{guardian.name}</h2>
              <p className="mb-0">ID: <span className="text-primary-light fw-semibold">{guardian.id}</span></p>
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
                <td className="text-start">{guardian.login.userType}</td>
                <td className="text-start">{guardian.login.email}</td>
                <td className="text-start">{guardian.login.password}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SlideDrawer>
    </div>
  );
};

export default GuardianDetails;