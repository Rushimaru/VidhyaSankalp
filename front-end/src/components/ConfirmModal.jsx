import React from 'react';

const ConfirmModal = ({
  show,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  icon = 'fluent:delete-24-regular', // default icon
  variant = 'danger', // 'danger' or 'primary'
}) => {
  if (!show) return null;

  const iconColor = variant === 'danger' ? 'text-danger' : 'text-primary';
  const confirmBtnClass =
    variant === 'danger'
      ? 'flex-grow-1 btn btn-danger border border-danger-600 text-md px-16 py-12 radius-8'
      : 'flex-grow-1 btn btn-primary-600 border border-primary-600 text-md px-16 py-12 radius-8';

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-sm modal-dialog-centered max-w-340-px">
        <div className="modal-content radius-16 bg-base">
          <div className="modal-body pt-32 px-36 pb-24 text-center">
            <span className={`mb-16 fs-1 line-height-1 ${iconColor}`}>
              <iconify-icon icon={icon} className="menu-icon"></iconify-icon>
            </span>
            <h6 className="text-lg fw-semibold text-primary-light mb-0">{title}</h6>
            <p className="text-secondary-light mt-8">{message}</p>
            <div className="d-flex align-items-center justify-content-center gap-3 mt-24">
              <button
                type="button"
                className="flex-grow-1 border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-24 py-11 radius-8"
                onClick={onClose}
              >
                {cancelText}
              </button>
              <button type="button" className={confirmBtnClass} onClick={onConfirm}>
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;