import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NotificationSettings = () => {
  // Initial form state (pre-filled with sample values from HTML)
  const [formData, setFormData] = useState({
    firebaseSecretKey: 'AAAAxGHw9lE:APA91bHKj6OsrD6EhnG5p26oTiQkXvOxTZwZEfVuuuipyUSNM-a8NB_CugVwfvvaosOvWgFAhQJOLMvxtv7e3Sw8DYpaWKwJIN3kjyIPoNRAe541sBz3x7E6sXZkA-ebueqnQiqNtbdP',
    firebasePublicVapidKey: 'BKAvKJbnB3QATdp8n1aUo_uhoNK3exVKLVzy7MP8VKydjjzthdlAWdlku6LQISxm4zA7dWoRACI9AHymf4V64kA',
    firebaseAPIKey: 'AIzaSyDg1xBSwmHKV0usIKxTFL5a6fFTb4s3XVM',
    firebaseAuthDomain: 'wowdash.firebaseapp.com',
    firebaseProjectID: 'wowdash.com',
    firebaseStorageBucket: 'wowdash.appsport.com',
    firebaseMessageSenderID: '52362145',
    firebaseAppID: '1:843456771665:web:ac1e3115e9e17ee1582a70',
    firebaseMeasurmentID: 'G-GSJPS921XW',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Notification settings saved:', formData);
    alert('Notification settings saved (demo)');
    // Here you would send data to API
  };

  // Handle reset (clear form)
  const handleReset = () => {
    setFormData({
      firebaseSecretKey: '',
      firebasePublicVapidKey: '',
      firebaseAPIKey: '',
      firebaseAuthDomain: '',
      firebaseProjectID: '',
      firebaseStorageBucket: '',
      firebaseMessageSenderID: '',
      firebaseAppID: '',
      firebaseMeasurmentID: '',
    });
  };

  return (
    <div className="dashboard-main-body">
      {/* Breadcrumb */}
      <div className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
        <div>
          <h1 className="fw-semibold mb-4 h6 text-primary-light">Notification</h1>
          <div>
            <Link to="/" className="text-secondary-light hover-text-primary hover-underline">Dashboard</Link>
            <Link to="/settings" className="text-secondary-light hover-text-primary hover-underline"> / Settings</Link>
            <span className="text-secondary-light"> / Notification</span>
          </div>
        </div>
        {/* Hidden button as in HTML */}
        <a href="#" className="btn btn-primary-600 d-flex align-items-center gap-6 d-none">
          <span className="d-flex text-md"><i className="ri-add-large-line"></i></span>
          Notification
        </a>
      </div>

      {/* Form Card */}
      <div className="card h-100 p-0 radius-12 overflow-hidden">
        <div className="card-body p-40">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Firebase Secret Key */}
              <div className="col-sm-6">
                <div className="mb-20">
                  <label htmlFor="firebaseSecretKey" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    Firebase secret key
                  </label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="firebaseSecretKey"
                    placeholder="Firebase secret key"
                    value={formData.firebaseSecretKey}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Firebase Public Vapid Key */}
              <div className="col-sm-6">
                <div className="mb-20">
                  <label htmlFor="firebasePublicVapidKey" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    Firebase public vapid key (key pair)
                  </label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="firebasePublicVapidKey"
                    placeholder="Firebase public vapid key (key pair)"
                    value={formData.firebasePublicVapidKey}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Firebase API Key */}
              <div className="col-sm-6">
                <div className="mb-20">
                  <label htmlFor="firebaseAPIKey" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    Firebase API Key
                  </label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="firebaseAPIKey"
                    placeholder="Firebase API Key"
                    value={formData.firebaseAPIKey}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Firebase Auth Domain */}
              <div className="col-sm-6">
                <div className="mb-20">
                  <label htmlFor="firebaseAuthDomain" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    Firebase AUTH Domain
                  </label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="firebaseAuthDomain"
                    placeholder="Firebase AUTH Domain"
                    value={formData.firebaseAuthDomain}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Firebase Project ID */}
              <div className="col-sm-6">
                <div className="mb-20">
                  <label htmlFor="firebaseProjectID" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    Firebase Project ID
                  </label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="firebaseProjectID"
                    placeholder="Firebase Project ID"
                    value={formData.firebaseProjectID}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Firebase Storage Bucket */}
              <div className="col-sm-6">
                <div className="mb-20">
                  <label htmlFor="firebaseStorageBucket" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    Firebase Storage Bucket
                  </label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="firebaseStorageBucket"
                    placeholder="Firebase Storage Bucket"
                    value={formData.firebaseStorageBucket}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Firebase Message Sender ID */}
              <div className="col-sm-6">
                <div className="mb-20">
                  <label htmlFor="firebaseMessageSenderID" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    Firebase Message Sender ID
                  </label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="firebaseMessageSenderID"
                    placeholder="Firebase Message Sender ID"
                    value={formData.firebaseMessageSenderID}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Firebase App ID */}
              <div className="col-sm-6">
                <div className="mb-20">
                  <label htmlFor="firebaseAppID" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    Firebase App ID
                  </label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="firebaseAppID"
                    placeholder="Firebase App ID"
                    value={formData.firebaseAppID}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Firebase Measurement ID */}
              <div className="col-sm-12">
                <div className="mb-20">
                  <label htmlFor="firebaseMeasurmentID" className="form-label fw-semibold text-primary-light text-sm mb-8">
                    Firebase Measurement ID
                  </label>
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="firebaseMeasurmentID"
                    placeholder="Firebase Measurement ID"
                    value={formData.firebaseMeasurmentID}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="d-flex align-items-center justify-content-center gap-3 mt-24">
                <button
                  type="button"
                  className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="btn btn-primary-600 border border-primary-600 text-md px-24 py-12 radius-8"
                >
                  Save Change
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;