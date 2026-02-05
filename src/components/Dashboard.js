import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';
import DashboardChart from './DashboardChart';

const Dashboard = ({ userType }) => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRooms: 0,
    monthlyRevenue: 0,
    availableRooms: 0
  });
  const [loading, setLoading] = useState(true);
  const [showLateModal, setShowLateModal] = useState(false);
  const [lateForm, setLateForm] = useState({ time: '', reason: '' });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const data = await apiService.getDashboardStats();
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setLoading(false);
    }
  };

  const handleLateChange = (e) => {
    setLateForm({ ...lateForm, [e.target.name]: e.target.value });
  };

  const handleLateSubmit = (e) => {
    e.preventDefault();
    alert('Geç giriş bildiriminiz alındı. Yönetici onayı bekleniyor.');
    setLateForm({ time: '', reason: '' });
    setShowLateModal(false);
  };

  if (loading) {
    return <div className="loading">Loading dashboard data...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to Hostel Management</h1>
        <p>Monitor and manage your hostel operations efficiently</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card students">
          <span className="icon">👨‍🎓</span>
          <h3>Toplam Öğrencilerimiz</h3>
          <div className="number">{stats.totalStudents}</div>
          <div className="trend">Aktif kayıtlı öğrenci</div>
        </div>
        
        <div className="stat-card rooms">
          <span className="icon">🏢</span>
          <h3>Yurtlarımız</h3>
          <div className="number">{stats.totalRooms}</div>
          <div className="trend">Toplam kapasite</div>
        </div>
        
        <div className="stat-card available">
          <span className="icon">🚌</span>
          <h3>Servis İmkanımız</h3>
          <div className="number">{stats.availableRooms}</div>
          <div className="trend">
            <a className="stat-link" href="/about">Sefer Saatleri &amp; Güzergah</a>
          </div>
        </div>
        
        <div className="stat-card revenue menu-card">
          <span className="icon">🍽️</span>
          <h3>Günün Menüsü</h3>
          <div className="menu-media">
            <img src="/meal-of-day.svg" alt="Günün menüsü" />
            <div>
              <div className="number">Etli Nohut</div>
              <div className="trend">Pirinç pilavı &amp; ayran</div>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Hızlı Aksiyonlar</h2>
        <div className="actions-grid compact">
          <Link to="/outpass" className="action-button">
            <div className="action-icon">📝</div>
            <div className="content">
              <h3>Yurttan İzin Al</h3>
              <p>İzin formunu hızlıca doldur ve gönder</p>
            </div>
          </Link>
          
          <Link to="/meals" className="action-button">
            <div className="action-icon">🍽️</div>
            <div className="content">
              <h3>Yemek Listesini Görüntüle</h3>
              <p>Haftalık yemek listesini incele</p>
            </div>
          </Link>
          
          <button className="action-button danger" onClick={() => setShowLateModal(true)}>
            <div className="action-icon">⏰</div>
            <div className="content">
              <h3>Geç Giriş Bildir</h3>
              <p>Geç giriş bilgini yönetime ilet</p>
            </div>
          </button>
        </div>
      </div>

      {/* Analytics Chart */}
      <DashboardChart stats={stats} />

      <div className="card">
        <div className="card-header">
          System Overview
        </div>
        <div className="card-body">
          <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            Use the navigation menu to access different modules:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>👨‍🎓 Students</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                Manage student registrations and information
              </p>
            </div>
            
            <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>🛏️ Rooms</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                Track room allocations and availability
              </p>
            </div>
            
            <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>💰 Payments</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                Record and monitor payment transactions
              </p>
            </div>
            
            <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: '600' }}>📊 Analytics</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                Generate reports and analytics
              </p>
            </div>
          </div>
        </div>
      </div>

      {showLateModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Geç Giriş Bildir</h2>
              <button className="close-btn" onClick={() => setShowLateModal(false)}>×</button>
            </div>
            <form onSubmit={handleLateSubmit}>
              <div className="form-group">
                <label>Geç Giriş Saati</label>
                <input
                  type="time"
                  name="time"
                  value={lateForm.time}
                  onChange={handleLateChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Geç Giriş Nedeni</label>
                <textarea
                  name="reason"
                  value={lateForm.reason}
                  onChange={handleLateChange}
                  className="form-control"
                  rows="3"
                  placeholder="Örn: Trafik, sınav uzadı"
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowLateModal(false)}>
                  Vazgeç
                </button>
                <button type="submit" className="btn btn-success">
                  Bildirimi Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
