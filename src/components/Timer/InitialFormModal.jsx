import React, { useState } from 'react';

const InitialFormModal = ({ onSubmit }) => {
  const [subject, setSubject] = useState('');
  const [minutes, setMinutes] = useState(30);

  const baseMinutes = [1, 2, 3, 4];
  const fiveMinuteSteps = Array.from({ length: 24 }, (_, i) => 5 + i * 5); // 5,10,...,120
  const minuteOptions = [...baseMinutes, ...fiveMinuteSteps];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subject && minutes > 0) {
      onSubmit({ subject, minutes });
    }
  };

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1050,
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
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
                {minuteOptions.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute} minute
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  border: 'none',
                }}
              >
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
