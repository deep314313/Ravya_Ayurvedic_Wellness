import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../../styles/AdminCareers.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
// Admin password - Set this in your .env.local file as NEXT_PUBLIC_ADMIN_PASSWORD
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'ravya2026';

export default function AdminCareers() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if already authenticated
    const adminAuth = localStorage.getItem('ravya_admin_auth');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
      fetchApplications();
    } else {
      setLoading(false);
    }
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('ravya_admin_auth', 'true');
      fetchApplications();
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ravya_admin_auth');
    setPassword('');
    setApplications([]);
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      // Send password in query parameter (for API protection)
      const password = ADMIN_PASSWORD;
      const response = await fetch(`${API_URL}/careers/applications?password=${encodeURIComponent(password)}`);
      const data = await response.json();
      
      if (data.success) {
        setApplications(data.data);
        setError('');
      } else {
        setError(data.message || 'Failed to fetch applications');
      }
    } catch (err) {
      setError('Error loading applications. Please check if backend is running.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadResume = (applicationId, fileName) => {
    // Include password in URL for API protection
    const password = ADMIN_PASSWORD;
    window.open(`${API_URL}/careers/applications/${applicationId}/resume?password=${encodeURIComponent(password)}`, '_blank');
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: { bg: '#FFF3CD', color: '#856404', text: 'Pending' },
      reviewed: { bg: '#D1ECF1', color: '#0C5460', text: 'Reviewed' },
      shortlisted: { bg: '#D4EDDA', color: '#155724', text: 'Shortlisted' },
      rejected: { bg: '#F8D7DA', color: '#721C24', text: 'Rejected' }
    };
    
    const style = statusStyles[status] || statusStyles.pending;
    return (
      <span 
        className={styles.statusBadge}
        style={{ backgroundColor: style.bg, color: style.color }}
      >
        {style.text}
      </span>
    );
  };

  // Password login screen
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Admin Login | Ravya</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        <Navbar />
        
        <main className={styles.adminPage}>
          <div className={`container ${styles.container}`}>
            <div className={styles.loginCard}>
              <h1 className={styles.loginTitle}>🔐 Admin Access</h1>
              <p className={styles.loginSubtitle}>Enter password to view career applications</p>
              
              <form onSubmit={handlePasswordSubmit} className={styles.loginForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    autoFocus
                    className={styles.passwordInput}
                  />
                </div>
                
                {passwordError && (
                  <div className={styles.passwordError}>
                    {passwordError}
                  </div>
                )}
                
                <button type="submit" className={styles.loginBtn}>
                  🔓 Login
                </button>
              </form>
              
              <p className={styles.loginNote}>
                💡 Contact administrator if you don&apos;t have the password
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // Main admin dashboard
  return (
    <>
      <Head>
        <title>Admin - Career Applications | Ravya</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Navbar />
      
      <main className={styles.adminPage}>
        <div className={`container ${styles.container}`}>
          <div className={styles.header}>
            <h1 className={styles.title}>Career Applications</h1>
            <div className={styles.headerActions}>
              <button onClick={fetchApplications} className={styles.refreshBtn}>
                🔄 Refresh
              </button>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                🚪 Logout
              </button>
            </div>
          </div>

          {error && (
            <div className={styles.errorBox}>
              <p>❌ {error}</p>
              <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>
                Make sure backend is running at: <code>{API_URL}</code>
              </p>
            </div>
          )}

          {loading ? (
            <div className={styles.loading}>
              <p>Loading applications...</p>
            </div>
          ) : applications.length === 0 ? (
            <div className={styles.empty}>
              <p>📭 No applications yet</p>
            </div>
          ) : (
            <div className={styles.applicationsList}>
              {applications.map((app) => (
                <div key={app._id} className={styles.applicationCard}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.applicantName}>{app.name}</h3>
                      <p className={styles.applicantEmail}>{app.email}</p>
                    </div>
                    {getStatusBadge(app.status)}
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.infoRow}>
                      <span className={styles.label}>📞 Phone:</span>
                      <span className={styles.value}>{app.phone}</span>
                    </div>
                    
                    <div className={styles.infoRow}>
                      <span className={styles.label}>💼 Position:</span>
                      <span className={styles.value}>{app.position}</span>
                    </div>
                    
                    <div className={styles.infoRow}>
                      <span className={styles.label}>📅 Applied:</span>
                      <span className={styles.value}>
                        {new Date(app.appliedAt).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}
                      </span>
                    </div>

                    {app.coverLetter && (
                      <div className={styles.coverLetter}>
                        <span className={styles.label}>📝 Cover Letter:</span>
                        <p className={styles.value}>{app.coverLetter}</p>
                      </div>
                    )}

                    {app.resume && app.resume.fileName && (
                      <div className={styles.resumeSection}>
                        <span className={styles.label}>📄 Resume:</span>
                        <button
                          onClick={() => downloadResume(app._id, app.resume.fileName)}
                          className={styles.downloadBtn}
                        >
                          📥 Download {app.resume.fileName}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.infoBox}>
            <h3>ℹ️ How to Access Resumes:</h3>
            <ol>
              <li>Click the <strong>&quot;Download&quot;</strong> button next to each application</li>
              <li>The resume will download as a PDF or Word document</li>
              <li>All files are stored in MongoDB as base64 encoded data</li>
              <li>You can also access via API: <code>GET {API_URL}/careers/applications/:id/resume</code></li>
            </ol>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

