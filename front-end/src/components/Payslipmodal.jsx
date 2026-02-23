// PayslipModal.jsx  –  view payslip popup
// ─────────────────────────────────────────
// Usage:
//   <PayslipModal show={bool} onClose={fn} payslip={payslipObj} />
//
// payslip shape (all optional – defaults shown):
//   { invoiceNo, teacherName, phone, month, paymentDate,
//     baseSalary, overtimePay, bonuses, grossSalary, total, paymentType }
import React from 'react';

const DEFAULT = {
  invoiceNo:   '#5695',
  teacherName: 'Jon Dan',
  phone:       '+112515474',
  month:       'January 2025',
  paymentDate: '15 Jan 2025',
  baseSalary:  '$2,000',
  overtimePay: '$1,000',
  bonuses:     '$2,000',
  grossSalary: '$5,000',
  total:       '$5,000',
  paymentType: 'Bank',
};

const PayslipModal = ({ show, onClose, payslip = {} }) => {
  if (!show) return null;
  const p = { ...DEFAULT, ...payslip };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1060,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.55)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-base radius-16"
        style={{
          width: '100%', maxWidth: 600, margin: 16,
          maxHeight: '90vh', overflowY: 'auto',
          boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
          animation: '_payslipPop .18s ease',
        }}
      >
        <div className="p-24">

          {/* ── School header ─────────────────────────────── */}
          <div className="text-center">
            <h6 className="mb-0">School Name</h6>
            <p className="text-secondary-light">Smithbroand, Unit 4, Holler Tower, San Diego</p>
          </div>

          {/* ── Invoice + payslip meta ─────────────────────── */}
          <div className="d-flex align-items-start justify-content-between gap-20 flex-wrap mt-24">
            <div className="d-flex flex-column gap-2">
              {[
                ['Invoice No',    `: ${p.invoiceNo}`],
                ['Teacher Name',  `: ${p.teacherName}`],
                ['Phone',         `: ${p.phone}`],
              ].map(([label, val]) => (
                <div key={label} className="text-sm fw-medium d-flex">
                  <span className="text-primary-light w-110-px text-start">{label}</span>
                  <span className="text-primary-light">{val}</span>
                </div>
              ))}
            </div>
            <div className="d-flex flex-column gap-2">
              <div className="text-sm fw-medium">
                <span className="text-primary-light fw-semibold">Payslip</span>
              </div>
              <div className="text-sm fw-medium">
                <span className="text-secondary-light">Month: {p.month}</span>
              </div>
              <div className="text-sm fw-medium">
                <span className="text-secondary-light">Payment : {p.paymentDate}</span>
              </div>
            </div>
          </div>

          {/* ── Salary breakdown list ──────────────────────── */}
          <ul className="border mt-24 radius-8 overflow-hidden" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {/* header row */}
            <li className="py-10 px-20 d-flex align-items-center justify-content-between gap-20 bg-neutral-50 border-bottom">
              <span className="text-primary-light fw-semibold">Name</span>
              <span className="text-primary-light fw-semibold">Amount</span>
            </li>
            {/* salary lines */}
            {[
              ['Base Salary',  p.baseSalary],
              ['Overtime Pay', p.overtimePay],
              ['Bonuses',      p.bonuses],
              ['Gross Salary', p.grossSalary],
            ].map(([name, amt]) => (
              <li key={name} className="py-10 px-20 d-flex align-items-center justify-content-between gap-20 border-bottom">
                <span className="text-primary-light">{name}</span>
                <span className="text-primary-light">{amt}</span>
              </li>
            ))}
            {/* total row */}
            <li className="py-10 px-20 d-flex align-items-center justify-content-between gap-20 bg-neutral-50">
              <span className="text-primary-light fw-semibold text-lg">Total</span>
              <span className="text-primary-light fw-semibold text-lg">{p.total}</span>
            </li>
          </ul>

          {/* ── Payment type ───────────────────────────────── */}
          <div className="pt-28 ms-16 text-start">
            <p className="text-primary-light fw-medium mb-0">Payment type : {p.paymentType}</p>
          </div>

          {/* ── Thanks note ────────────────────────────────── */}
          <div className="text-center mt-4 pt-24">
            <h6 className="text-xl mb-4">Thanks</h6>
            <p className="text-secondary-light text-sm mb-0">
              If you need further assistance, please feel free to contact HR at{' '}
              <span className="fw-semibold text-primary-light">Example school</span>
            </p>
          </div>

          {/* ── Footer ─────────────────────────────────────── */}
          <div className="text-center mt-4 pt-16 pb-8">
            <p className="text-secondary-light text-sm mb-0">
              Made by <span className="fw-semibold">Wowtheme7.</span>
            </p>
          </div>

          {/* ── Close button ───────────────────────────────── */}
          <div className="text-center mt-16">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-primary-600 border border-primary-600 text-md px-28 py-10 radius-8"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <style>{`@keyframes _payslipPop{from{opacity:0;transform:scale(.94) translateY(-8px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
    </div>
  );
};

export default PayslipModal;