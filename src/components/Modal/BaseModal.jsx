import React, { useEffect } from "react";
import * as bootstrap from "bootstrap";
import "./BaseModal.css";

const BaseModal = ({ modalId, title, onSubmit, submitLabel, children }) => {
  useEffect(() => {
    const el = document.getElementById(modalId);
    if (el && !bootstrap.Modal.getInstance(el)) {
      new bootstrap.Modal(el);
    }
  }, [modalId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <>
      <div
        className="modal fade base-modal"
        id={modalId}
        tabIndex="-1"
        aria-labelledby={`${modalId}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "600px" }}>
          <div className="modal-content" style={{ height: "auto", overflowY: "auto" }}>
            <form onSubmit={handleSubmit} style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <div className="modal-header">
                <h5 className="modal-title" id={`${modalId}Label`}>
                  {title}
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="閉じる" />
              </div>
              <div className="modal-body" style={{ flexGrow: 1 }}>
                {children}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  閉じる
                </button>
                <button type="submit" className="btn btn-primary">
                  {submitLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BaseModal;
