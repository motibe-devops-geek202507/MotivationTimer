// Dashboard.js
import React, { useMemo } from 'react';
import '../assets/Dashboard.css';

// 秒数を「X時間Y分」の形式に変換するヘルパー関数 (変更なし)
const formatTime = (totalSeconds) => {
    if (totalSeconds === 0) {
        return <>0<span className="fs-5 fw-normal ms-1">時間</span></>;
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return (
        <>
            {hours > 0 && <>{hours}<span className="fs-5 fw-normal ms-1">時間</span></>}
            {minutes > 0 && <>{minutes}<span className="fs-5 fw-normal ms-1">分</span></>}
        </>
    );
};

// YYYY-MM-DD形式の文字列を返すヘルパー関数
const toYYYYMMDD = (date) => {
    return date.toISOString().split('T')[0];
};

const Dashboard = ({ data }) => {
    // useMemoを使って、dataが変更された時だけ再計算する
    const summary = useMemo(() => {
        const now = new Date(); // 現在時刻を基準にする
        const todayStr = toYYYYMMDD(now);
        const thisMonthStr = now.toISOString().substring(0, 7);

        let totalSeconds = 0;
        let todaySeconds = 0;
        let monthSeconds = 0;
        const dailyTotals = {}; // 日付ごとの学習時間を格納するオブジェクト

        data.forEach(item => {
            const itemDateStr = item.created_at.split('T')[0];
            totalSeconds += item.timer_time;
            if (itemDateStr === todayStr) {
                todaySeconds += item.timer_time;
            }
            if (item.created_at.startsWith(thisMonthStr)) {
                monthSeconds += item.timer_time;
            }
            dailyTotals[itemDateStr] = (dailyTotals[itemDateStr] || 0) + item.timer_time;
        });

        return { totalSeconds, todaySeconds, monthSeconds, dailyTotals };
    }, [data]);

    // グラフのX軸に表示する直近7日間の日付を動的に生成
    const chartDates = useMemo(() => {
        const dates = [];
        const today = new Date();
        const dayLabels = ['日', '月', '火', '水', '木', '金', '土'];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            dates.push({
                label: `${date.getMonth() + 1}/${date.getDate()} ${dayLabels[date.getDay()]}`,
                dateKey: toYYYYMMDD(date),
            });
        }
        return dates;
    }, []);

    // グラフのバーの高さを計算する関数
    const getBarHeight = (dateKey) => {
        const dailySeconds = summary.dailyTotals[dateKey] || 0;
        const maxSeconds = 2 * 3600; // グラフの最大値: 2時間
        const heightPercentage = Math.min((dailySeconds / maxSeconds) * 100, 100);
        return `${heightPercentage}%`;
    };

    return (
        <div className="container py-5">
            {/* 上部のサマリーカード */}
            <div className="row g-4 mb-5">
                <div className="col-lg-4">
                    <div className="card stat-card shadow-sm">
                        <div className="card-body text-center p-4">
                            <p className="card-title text-muted">今日</p>
                            <h2 className="fw-bold">{formatTime(summary.todaySeconds)}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card stat-card shadow-sm">
                        <div className="card-body text-center p-4">
                            <p className="card-title text-muted">今月</p>
                            <h2 className="fw-bold">{formatTime(summary.monthSeconds)}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card stat-card shadow-sm">
                        <div className="card-body text-center p-4">
                            <p className="card-title text-muted">総学習時間</p>
                            <h2 className="fw-bold">{formatTime(summary.totalSeconds)}</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* グラフエリア */}
            <div className="card stat-card shadow-sm">
                <div className="card-body p-4">
                    <div className="d-flex">
                        <div className="y-axis-labels">
                            <span>2時間</span><span>1時間30分</span><span>1時間</span><span>30分</span><span>0分</span>
                        </div>
                        <div className="flex-grow-1">
                            <div className="chart-container">
                                <div className="row h-100 w-100 mx-0">
                                    {chartDates.map(day => (
                                        <div key={day.dateKey} className="col d-flex align-items-end justify-content-center p-0" title={`${day.label}: ${formatTime(summary.dailyTotals[day.dateKey] || 0).props.children.join('')}`}>
                                            <div className="chart-bar-item" style={{ height: getBarHeight(day.dateKey) }}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="x-axis-labels">
                                {chartDates.map(day => (
                                    <span key={day.dateKey}>{day.label}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;