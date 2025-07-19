// Timeline.js
import React, { useMemo } from 'react';
import '../assets/Timeline.css'; // 作成したCSSをインポート

// 秒数を「XX分YY秒」形式にフォーマットする
const formatDuration = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}分${String(seconds).padStart(2, '0')}秒`;
};

// 日付文字列を「HH:mm」形式にフォーマットする
const formatTime = (dateString) => {
  const date = new Date(dateString);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

const Timeline = ({ logs }) => {
  // logsを日付ごとにグループ化する
  // useMemoを使い、logsが変更された時だけ再計算する
  const groupedLogs = useMemo(() => {
    if (!logs || logs.length === 0) {
      return {};
    }

    // 新しい順にソートしてからグループ化する
    const sortedLogs = [...logs].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return sortedLogs.reduce((acc, log) => {
      const dateKey = log.created_at.split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(log);
      return acc;
    }, {});
  }, [logs]);

  // グループ化されたログがない場合は何も表示しない
  if (Object.keys(groupedLogs).length === 0) {
    return (
        <div className="text-center text-muted p-5">
            <p>学習記録はまだありません。</p>
        </div>
    );
  }

  // 日付のフォーマット関数
  const formatDateHeading = (dateKey) => {
    const date = new Date(dateKey);
    const dayLabels = ['日', '月', '火', '水', '木', '金', '土'];
    return `${date.getMonth() + 1}月${date.getDate()}日 (${dayLabels[date.getDay()]})`;
  };

  return (
    <div className="timeline">
      {Object.keys(groupedLogs).map(dateKey => (
        <div key={dateKey}>
          <h4 className="fw-bold my-4">{formatDateHeading(dateKey)}</h4>
          {groupedLogs[dateKey].map(log => (
            <div className="timeline-item" key={log.id}>
              <div className="timeline-dot"></div>
              <div className="timeline-content card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title fw-bold mb-1">{log.description || '学習'}</h5>
                      <p className="card-text text-muted mb-0">
                        {formatTime(log.created_at)}
                      </p>
                    </div>
                    <div className="text-end">
                      <span className="fs-5 fw-bold text-primary">
                        {formatDuration(log.timer_time)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Timeline;