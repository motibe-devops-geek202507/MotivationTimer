import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const TimerLog = () => {
  const { user } = useContext(UserContext);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchLogs = async () => {
        try {
          const response = await fetch(`https://motivationtimer-x-oshi.onrender.com/api/timer-logs?user_id=${user.id}`);
          const data = await response.json();
          setLogs(data);
        } catch (error) {
          console.error('Error fetching timer logs:', error);
        }
      };

      fetchLogs();
    }
  }, [user]);

  return (
    <div>
      <h2>Timer Logs</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.name}</td>
              <td>{log.description}</td>
              <td>{log.timer_time}</td>
              <td>{new Date(log.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimerLog;
