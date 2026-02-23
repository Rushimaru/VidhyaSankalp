import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SubscriptionPlan = () => {
  const [billingAnnual, setBillingAnnual] = useState(false); // false = monthly, true = annually
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Price data (simplified)
  const plans = {
    basic: { monthly: 99, annually: 990 }, // annual price as example
    pro: { monthly: 199, annually: 1990 },
    enterprise: { monthly: 399, annually: 3990 },
  };

  const handleGetStarted = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
  };

  return (
    <div className="dashboard-main-body">
      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Subscription Plan</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <span className="text-secondary-light"> / Subscription Plan</span>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <div className="card h-100 p-0 radius-12 overflow-hidden mt-24">
          <div className="card-body p-40">
            <div className="row justify-content-center">
              <div className="col-xxl-10">
                <div className="text-center">
                  <h4 className="mb-0">Simple, Transparent Pricing</h4>
                </div>

                {/* Pricing Toggle */}
                <div className="pricing-tab">
                  <div className="form-switch switch-primary d-flex align-items-center gap-3 mt-28 justify-content-center">
                    <label className="form-check-label line-height-1 fw-medium text-secondary-light">
                      Monthly
                    </label>
                    <input
                      className="form-check-input choose-plan-input"
                      type="checkbox"
                      role="switch"
                      checked={billingAnnual}
                      onChange={(e) => setBillingAnnual(e.target.checked)}
                    />
                    <label className="form-check-label line-height-1 fw-medium text-secondary-light">
                      Annually
                    </label>
                  </div>
                </div>

                {/* Pricing Cards */}
                <div className="row gy-4">
                  {/* Basic Plan */}
                  <div className="col-xxl-4 col-sm-6">
                    <div className="pricing-plan position-relative radius-24 overflow-hidden border bg-base">
                      <div className="d-flex align-items-center gap-16">
                        <span className="w-72-px h-72-px d-flex justify-content-center align-items-center radius-16 bg-primary-50">
                          <img src="../src/assets/images/icons/price-icon1.png" alt="Basic" />
                        </span>
                        <div>
                          <span className="fw-medium text-md text-secondary-light">For individuals</span>
                          <h6 className="mb-0">Basic</h6>
                        </div>
                      </div>
                      <p className="mt-16 mb-0 text-secondary-light mb-28">
                        Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.
                      </p>
                      <h3 className="mb-24">
                        $<span className="price-range">{billingAnnual ? plans.basic.annually : plans.basic.monthly}</span>
                        <span className="fw-medium text-md text-secondary-light">
                          {billingAnnual ? '/year' : '/monthly'}
                        </span>
                      </h3>
                      <span className="mb-20 fw-medium">What's included</span>
                      <ul>
                        <li className="d-flex align-items-center gap-16 mb-16">
                          <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                            <iconify-icon icon="iconamoon:check-light" className="text-white text-lg"></iconify-icon>
                          </span>
                          <span className="text-secondary-light text-lg">All analytics features</span>
                        </li>
                        <li className="d-flex align-items-center gap-16 mb-16">
                          <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                            <iconify-icon icon="iconamoon:check-light" className="text-white text-lg"></iconify-icon>
                          </span>
                          <span className="text-secondary-light text-lg">Up to 250,000 tracked visits</span>
                        </li>
                        <li className="d-flex align-items-center gap-16 mb-16">
                          <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                            <iconify-icon icon="iconamoon:check-light" className="text-white text-lg"></iconify-icon>
                          </span>
                          <span className="text-secondary-light text-lg">Normal support</span>
                        </li>
                        <li className="d-flex align-items-center gap-16">
                          <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                            <iconify-icon icon="iconamoon:check-light" className="text-white text-lg"></iconify-icon>
                          </span>
                          <span className="text-secondary-light text-lg">Up to 3 team members</span>
                        </li>
                      </ul>
                      <button
                        type="button"
                        className="bg-primary-600 bg-hover-primary-700 text-white text-center border border-primary-600 text-sm btn-sm px-12 py-10 w-100 radius-8 mt-28"
                        onClick={() => handleGetStarted('Basic')}
                      >
                        Get started
                      </button>
                    </div>
                  </div>

                  {/* Pro Plan (featured) */}
                  <div className="col-xxl-4 col-sm-6">
                    <div className="pricing-plan featured-item position-relative radius-24 overflow-hidden border bg-primary-600 text-white z-1">
                      <img
                        src="../src/assets/images/icons/pricing-shape.png"
                        alt=""
                        className="position-absolute end-0 top-10 z-n1"
                      />
                      <span className="bg-white bg-opacity-25 text-white radius-24 py-8 px-24 text-sm position-absolute end-0 top-0 z-1 rounded-start-top-0 rounded-end-bottom-0">
                        Popular
                      </span>
                      <div className="d-flex align-items-center gap-16">
                        <span className="w-72-px h-72-px d-flex justify-content-center align-items-center radius-16 bg-base">
                          <img src="../src/assets/images/icons/price-icon2.png" alt="Pro" />
                        </span>
                        <div>
                          <span className="fw-medium text-md text-white">For startups</span>
                          <h6 className="mb-0 text-white">Pro</h6>
                        </div>
                      </div>
                      <p className="mt-16 mb-0 text-white mb-28">
                        Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.
                      </p>
                      <h3 className="mb-24 text-white">
                        $<span className="price-range">{billingAnnual ? plans.pro.annually : plans.pro.monthly}</span>
                        <span className="fw-medium text-md text-white">
                          {billingAnnual ? '/year' : '/monthly'}
                        </span>
                      </h3>
                      <span className="mb-20 fw-medium">What's included</span>
                      <ul>
                        <li className="d-flex align-items-center gap-16 mb-16">
                          <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-white rounded-circle text-primary-600">
                            <iconify-icon icon="iconamoon:check-light" className="text-lg"></iconify-icon>
                          </span>
                          <span className="text-white text-lg">All analytics features</span>
                        </li>
                        <li className="d-flex align-items-center gap-16 mb-16">
                          <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-white rounded-circle text-primary-600">
                            <iconify-icon icon="iconamoon:check-light" className="text-lg"></iconify-icon>
                          </span>
                          <span className="text-white text-lg">Up to 250,000 tracked visits</span>
                        </li>
                        <li className="d-flex align-items-center gap-16 mb-16">
                          <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-white rounded-circle text-primary-600">
                            <iconify-icon icon="iconamoon:check-light" className="text-lg"></iconify-icon>
                          </span>
                          <span className="text-white text-lg">Normal support</span>
                        </li>
                        <li className="d-flex align-items-center gap-16">
                          <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-white rounded-circle text-primary-600">
                            <iconify-icon icon="iconamoon:check-light" className="text-lg"></iconify-icon>
                          </span>
                          <span className="text-white text-lg">Up to 3 team members</span>
                        </li>
                      </ul>
                      <button
                        type="button"
                        className="bg-white text-primary-600 text-center border border-white text-sm btn-sm px-12 py-10 w-100 radius-8 mt-28"
                        onClick={() => handleGetStarted('Pro')}
                      >
                        Get started
                      </button>
                    </div>
                  </div>

                  {/* Enterprise Plan */}
                  <div className="col-xxl-4 col-sm-6">
                    <div className="pricing-plan position-relative radius-24 overflow-hidden border bg-base">
                      <div className="d-flex align-items-center gap-16">
                        <span className="w-72-px h-72-px d-flex justify-content-center align-items-center radius-16 bg-primary-50">
                          <img src="../src/assets/images/icons/price-icon3.png" alt="Enterprise" />
                        </span>
                        <div>
                          <span className="fw-medium text-md text-secondary-light">For big companies</span>
                          <h6 className="mb-0">Enterprise</h6>
                        </div>
                      </div>
                      <p className="mt-16 mb-0 text-secondary-light mb-28">
                        Lorem ipsum dolor sit amet doloroli sitiol conse ctetur adipiscing elit.
                      </p>
                      <h3 className="mb-24">
                        $<span className="price-range">{billingAnnual ? plans.enterprise.annually : plans.enterprise.monthly}</span>
                        <span className="fw-medium text-md text-secondary-light">
                          {billingAnnual ? '/year' : '/monthly'}
                        </span>
                      </h3>
                      <span className="mb-20 fw-medium">What's included</span>
                      <ul>
                        <li className="d-flex align-items-center gap-16 mb-16">
                          <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                            <iconify-icon icon="iconamoon:check-light" className="text-white text-lg"></iconify-icon>
                          </span>
                          <span className="text-secondary-light text-lg">All analytics features</span>
                        </li>
                        <li className="d-flex align-items-center gap-16 mb-16">
                          <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                            <iconify-icon icon="iconamoon:check-light" className="text-white text-lg"></iconify-icon>
                          </span>
                          <span className="text-secondary-light text-lg">Up to 250,000 tracked visits</span>
                        </li>
                        <li className="d-flex align-items-center gap-16 mb-16">
                          <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                            <iconify-icon icon="iconamoon:check-light" className="text-white text-lg"></iconify-icon>
                          </span>
                          <span className="text-secondary-light text-lg">Normal support</span>
                        </li>
                        <li className="d-flex align-items-center gap-16">
                          <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                            <iconify-icon icon="iconamoon:check-light" className="text-white text-lg"></iconify-icon>
                          </span>
                          <span className="text-secondary-light text-lg">Up to 3 team members</span>
                        </li>
                      </ul>
                      <button
                        type="button"
                        className="bg-primary-600 bg-hover-primary-700 text-white text-center border border-primary-600 text-sm btn-sm px-12 py-10 w-100 radius-8 mt-28"
                        onClick={() => handleGetStarted('Enterprise')}
                      >
                        Get started
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Modal (you can replace with Bootstrap Modal if needed) */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Get Started</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>You selected the <strong>{selectedPlan}</strong> plan with {billingAnnual ? 'annual' : 'monthly'} billing.</p>
                <p>This is a demo. In a real app, you would proceed to checkout.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                <button type="button" className="btn btn-primary" onClick={closeModal}>Proceed</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlan;