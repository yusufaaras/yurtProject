import React from 'react';

const DashboardChart = ({ stats }) => {
  const totalLeaveAllowance = 30;
  const usedLeaveDays = 8;
  const lateEntries = 3;
  const remainingLeave = Math.max(totalLeaveAllowance - usedLeaveDays, 0);
  const remainingPercent = Math.min((remainingLeave / totalLeaveAllowance) * 100, 100);

  return (
    <div className="card stats-panel" style={{ marginTop: '2rem' }}>
      <div className="card-header">
        <span style={{ marginRight: '0.5rem' }}>📊</span>
        İstatistik Paneli
      </div>
      <div className="card-body">
        <div className="stats-panel-grid">
          <div className="stats-panel-card">
            <div className="stats-panel-icon">📅</div>
            <div>
              <div className="stats-panel-label">Kullanılan İzin Günü</div>
              <div className="stats-panel-value">{usedLeaveDays} gün</div>
              <div className="stats-panel-note">Bu dönem kullanılan izin</div>
            </div>
          </div>

          <div className="stats-panel-card">
            <div className="stats-panel-icon">⏰</div>
            <div>
              <div className="stats-panel-label">Geç Giriş Sayısı</div>
              <div className="stats-panel-value">{lateEntries}</div>
              <div className="stats-panel-note">Bildirim adedi</div>
            </div>
          </div>

          <div className="stats-panel-progress">
            <div className="stats-panel-label">Kalan İzin Hakkı</div>
            <div className="stats-panel-value">{remainingLeave} / {totalLeaveAllowance} gün</div>
            <div className="stats-progress">
              <div
                className="stats-progress-bar"
                style={{ width: `${remainingPercent}%` }}
              />
            </div>
            <div className="stats-panel-note">Toplam hakkınızdan kalan</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart; 
