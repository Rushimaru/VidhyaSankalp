// SlideDrawer.jsx  –  reusable right-side slide panel
// ─────────────────────────────────────────────────────
// Usage:
//   <SlideDrawer isOpen={bool} onClose={fn} title="My Panel">
//     ...any content...
//   </SlideDrawer>
//
// Props:
//   isOpen   {bool}    show/hide
//   onClose  {fn}      called on backdrop click, ESC, or X button
//   title    {string}  header text
//   children {node}    panel body
// ─────────────────────────────────────────────────────
import React, { useEffect } from 'react';

const SlideDrawer = ({ isOpen, onClose, title, children }) => {
  // ESC key + body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* ── Backdrop ────────────────────────────────── */}
      <div
        onClick={onClose}
        style={{
          position:      'fixed',
          inset:         0,
          zIndex:        1050,
          background:    'rgba(0,0,0,0.45)',
          opacity:       isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition:    'opacity .28s ease',
        }}
      />

      {/* ── Panel ───────────────────────────────────── */}
      <aside
        style={{
          position:   'fixed',
          top:        0,
          right:      0,
          zIndex:     1055,
          width:      '100%',
          maxWidth:   700,
          height:     '100vh',
          overflowY:  'auto',
          background: '#fff',
          transform:  isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform .3s cubic-bezier(.4,0,.2,1)',
          boxShadow:  '-6px 0 32px rgba(0,0,0,0.12)',
        }}
      >
        {/* sticky header */}
        <div
          className="px-20 py-12 border-bottom d-flex align-items-center justify-content-between"
          style={{
            gap:        20,
            position:   'sticky',
            top:        0,
            background: '#fff',
            zIndex:     1,
          }}
        >
          <h5 className="text-lg mb-0 fw-semibold">{title}</h5>
          <button
            onClick={onClose}
            className="text-danger-600 text-xl d-flex line-height-1"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label="Close drawer"
          >
            <i className="ri-close-large-line" />
          </button>
        </div>

        {/* body */}
        {children}
      </aside>
    </>
  );
};

export default SlideDrawer;