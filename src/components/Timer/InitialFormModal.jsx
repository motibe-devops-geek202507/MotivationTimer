import React, { useState } from 'react';

const InitialFormModal = ({ onSubmit }) => {
  const [subject, setSubject] = useState('');
  const [minutes, setMinutes] = useState(30); // 初期値3分

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subject && minutes > 0) {
      onSubmit({ subject, minutes });
    }
  };

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Study Info</h5>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="What are you studying?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />

              <select
                className="form-select"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
              >
                {Array.from({ length: 100 }, (_, i) => i + 1).map((minute) => (
                  <option key={minute} value={minute}>
                    {minute} 分
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Start
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InitialFormModal;
