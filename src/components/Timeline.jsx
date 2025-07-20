import React, { useMemo } from 'react';
import Cookies from 'js-cookie';

// 日付文字列を「YYYY/MM/DD」形式にフォーマットする
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};

// 秒数を「HH:MM:SS」形式にフォーマットする
const formatDuration = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return [hours, minutes, seconds]
    .map(val => String(val).padStart(2, '0'))
    .join(':');
};

const Timeline = ({ logs, onDeleteLog }) => {
  // useMemoを使って、logsが変更された時だけソート処理を再実行する
  const sortedLogs = useMemo(() => {
    if (!logs || logs.length === 0) {
      return [];
    }
    // 新しい順にソートする
    return [...logs].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [logs]);

  const handleDelete = async (logId) => {
    if (window.confirm('この学習記録を削除しますか？')) {
      try {
        const token = Cookies.get('access_token');
        if (!token) {
          alert('認証トークンが見つかりません。再度ログインしてください。');
          return;
        }

        const response = await fetch(`https://motivationtimer-x-oshi.onrender.com/api/delete-timer-log?id=${logId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          // 削除が成功した場合、親コンポーネントに通知
          onDeleteLog(logId);
        } else {
          alert('削除に失敗しました。');
        }
      } catch (error) {
        console.error('Error deleting timer log:', error);
        alert('削除中にエラーが発生しました。');
      }
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col" className="text-end">Time</th>
            <th scope="col" className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedLogs.length > 0 ? (
            sortedLogs.map(log => (
              <tr key={log.id}>
                <td>{formatDate(log.created_at)}</td>
                <td>{log.description || '学習'}</td>
                <td className="text-end">{formatDuration(log.timer_time)}</td>
                <td className="text-center">
                  <button
                    onClick={() => handleDelete(log.id)}
                    className="btn btn-outline-danger btn-sm"
                    title="削除"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted p-4">
                学習記録はまだありません。
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Timeline;