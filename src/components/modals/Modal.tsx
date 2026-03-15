"use client";

export default function Modal({ children, onClose }: any) {

  return (
    <div className="modal-overlay">

      <div className="modal-card">

        <button
          className="modal-close"
          onClick={onClose}
        >
          ✕
        </button>

        {children}

      </div>

    </div>
  );

}