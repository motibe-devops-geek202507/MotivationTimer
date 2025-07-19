import React, { useEffect } from "react";
import * as bootstrap from "bootstrap";

const styles = {
  modalContent: {
    backgroundColor: "#2c2c2c",
    color: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
    fontFamily: "'Georgia', serif",
  },
  modalHeader: {
    borderBottom: "1px solid #444",
  },
  modalTitle: {
    fontWeight: 600,
    fontSize: "1.25rem",
    color: "#e0e0e0",
  },
  btnClose: {
    filter: "invert(1)",
  },
  modalBodyP: {
    fontSize: "1.1rem",
    lineHeight: 1.5,
    color: "#ddd",
  },
  modalFooter: {
    borderTop: "1px solid #444",
  },
  btnPrimary: {
    backgroundColor: "#444",
    borderColor: "#555",
    color: "#eee",
    fontWeight: 500,
    transition: "background-color 0.3s ease",
  },
};

const ErrorModal = ({ modalId = "errorModal", title = "エラー", message, onClose }) => {
  useEffect(() => {
    const el = document.getElementById(modalId);
    if (el) new bootstrap.Modal(el);
  }, [modalId]);

  const handleClose = () => {
    if (onClose) onClose();

    const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
    if (modal) modal.hide();

    document.body.classList.remove("modal-open");
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) backdrop.remove();
  };

  return (
    <div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={styles.modalContent}>
          <div className="modal-header" style={styles.modalHeader}>
            <h5 className="modal-title" style={styles.modalTitle}>
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="閉じる"
              onClick={handleClose}
              data-bs-dismiss="modal"
              style={styles.btnClose}
            />
          </div>
          <div className="modal-body">
            <p style={styles.modalBodyP}>{message}</p>
          </div>
          <div className="modal-footer" style={styles.modalFooter}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClose}
              data-bs-dismiss="modal"
              style={styles.btnPrimary}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#666")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#444")}
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
