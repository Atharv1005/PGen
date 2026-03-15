"use client";

export default function AlertModal({
  message,
  onClose
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="modal-overlay">

      <div className="modal-card">

        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-icon">
          ⚠️
        </div>

        <div className="modal-title">
          Alert
        </div>

        <div className="modal-body">
          {message}
        </div>

        <div className="modal-actions">
          <button
            className="btn-primary"
            onClick={onClose}
          >
            Okay
          </button>
        </div>

      </div>

    </div>
  );
}