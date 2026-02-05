import React, { useState, useEffect } from 'react';

const Outpass = ({ userType }) => {
  const [outpasses, setOutpasses] = useState([]);
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    reason: '',
  });
  const [lateEntry, setLateEntry] = useState({
    late_reason: '',
    late_time: '',
  });

  useEffect(() => {
    fetchOutpasses();
  }, []);

  const fetchOutpasses = async () => {
    try {
      // Simulate API call - in real app, this would fetch from backend
      const mockOutpasses = [
        {
          id: 1,
          student_name: 'John Doe',
          reason: 'Hastane randevusu',
          start_date: '2025-01-22',
          end_date: '2025-01-22',
          status: 'approved',
        },
        {
          id: 2,
          student_name: 'Alice Smith',
          reason: 'Aile ziyareti',
          start_date: '2025-01-23',
          end_date: '2025-01-25',
          status: 'pending',
        }
      ];
      setOutpasses(mockOutpasses);
    } catch (error) {
      console.error('Error fetching outpasses:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newOutpass = {
        id: Date.now(),
        student_name: localStorage.getItem('userEmail') || 'Öğrenci',
        start_date: formData.start_date,
        end_date: formData.end_date,
        reason: formData.reason,
        status: 'pending'
      };
      setOutpasses([...outpasses, newOutpass]);
      resetForm();
      alert('İzin talebiniz gönderildi!');
    } catch (error) {
      console.error('Error submitting outpass:', error);
    }
  };

  const handleApprove = (id) => {
    setOutpasses(outpasses.map(outpass => 
      outpass.id === id ? { ...outpass, status: 'approved' } : outpass
    ));
  };

  const handleReject = (id) => {
    setOutpasses(outpasses.map(outpass => 
      outpass.id === id ? { ...outpass, status: 'rejected' } : outpass
    ));
  };

  const resetForm = () => {
    setFormData({
      start_date: '',
      end_date: '',
      reason: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLateEntryChange = (e) => {
    setLateEntry({
      ...lateEntry,
      [e.target.name]: e.target.value
    });
  };

  const handleLateSubmit = (e) => {
    e.preventDefault();
    alert('Geç giriş bildiriminiz alındı. Yönetici onayı bekleniyor.');
    setLateEntry({ late_reason: '', late_time: '' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#2ecc71';
      case 'rejected': return '#e74c3c';
      case 'pending': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  return (
    <div>
      <div className="outpass-header">
        <div>
          <h1>Yurt İzin</h1>
          <p className="outpass-subtitle">İzin talebinizi hızlıca oluşturun ve takip edin.</p>
        </div>
      </div>

      {userType === 'student' && (
        <div className="outpass-layout">
          <div className="card outpass-card">
            <div className="card-header">İzin Talep Formu</div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="outpass-form">
                <div className="form-group">
                  <label>Başlangıç Tarihi</label>
                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Bitiş Tarihi</label>
                  <input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    className="form-control"
                    min={formData.start_date || undefined}
                    required
                  />
                </div>
                <div className="form-group form-full">
                  <label>İzin Nedeni</label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                    placeholder="Kısa ve net bir açıklama yazın"
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    İzin Talebi Gönder
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="card outpass-card late-card">
            <div className="card-header">Geç Giriş Bildir</div>
            <div className="card-body">
              <p className="late-desc">
                Geç giriş yapacaksanız kısa bir açıklama ve tahmini saati bırakın.
              </p>
              <form onSubmit={handleLateSubmit} className="late-form">
                <div className="form-group">
                  <label>Geç Giriş Saati</label>
                  <input
                    type="time"
                    name="late_time"
                    value={lateEntry.late_time}
                    onChange={handleLateEntryChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group form-full">
                  <label>Geç Giriş Nedeni</label>
                  <textarea
                    name="late_reason"
                    value={lateEntry.late_reason}
                    onChange={handleLateEntryChange}
                    className="form-control"
                    rows="3"
                    placeholder="Örn: Trafik, sınav uzadı"
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-success">
                    Geç Giriş Bildir
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {userType === 'admin' && (
        <div className="stats-grid" style={{ marginBottom: '2rem' }}>
          <div className="stat-card">
            <h3>Total Requests</h3>
            <div className="number">{outpasses.length}</div>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <div className="number">{outpasses.filter(o => o.status === 'pending').length}</div>
          </div>
          <div className="stat-card">
            <h3>Approved</h3>
            <div className="number">{outpasses.filter(o => o.status === 'approved').length}</div>
          </div>
          <div className="stat-card">
            <h3>Rejected</h3>
            <div className="number">{outpasses.filter(o => o.status === 'rejected').length}</div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          {userType === 'admin' ? 'Tüm İzin Talepleri' : 'İzin Taleplerim'}
        </div>
        <div className="card-body">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  {userType === 'admin' && <th>Student</th>}
                  <th>Başlangıç</th>
                  <th>Bitiş</th>
                  <th>İzin Nedeni</th>
                  <th>Status</th>
                  {userType === 'admin' && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {outpasses
                  .filter(outpass => userType === 'admin' || outpass.student_name === localStorage.getItem('userEmail'))
                  .map(outpass => (
                  <tr key={outpass.id}>
                    <td>{outpass.id}</td>
                    {userType === 'admin' && <td>{outpass.student_name}</td>}
                    <td>{outpass.start_date}</td>
                    <td>{outpass.end_date}</td>
                    <td>{outpass.reason}</td>
                    <td>
                      <span style={{ 
                        color: getStatusColor(outpass.status),
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                      }}>
                        {outpass.status}
                      </span>
                    </td>
                    {userType === 'admin' && (
                      <td>
                        {outpass.status === 'pending' && (
                          <>
                            <button 
                              className="btn btn-success" 
                              onClick={() => handleApprove(outpass.id)}
                              style={{ marginRight: '0.5rem' }}
                            >
                              Approve
                            </button>
                            <button 
                              className="btn btn-danger" 
                              onClick={() => handleReject(outpass.id)}
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
                {outpasses.length === 0 && (
                  <tr>
                    <td colSpan={userType === 'admin' ? "7" : "5"} style={{ textAlign: 'center', padding: '2rem' }}>
                      İzin talebi bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outpass;
