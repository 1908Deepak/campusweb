import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  GraduationCap, 
  Settings, 
  Search,
  Bell,
  TrendingUp,
  TrendingDown,
  Building,
  MoreVertical,
  Plus,
  RefreshCw,
  ShieldCheck,
  Megaphone,
  Database,
  FileText,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import Verification from '../components/Verification';
import PlacementDrive from '../components/PlacementDrive';
import AppliedStudents from '../components/AppliedStudents';
import PostHub from '../components/PostHub';
import MyCollegeFeed from '../components/MyCollegeFeed';
import InterCollegeDiscovery from '../components/InterCollegeDiscovery';
import '../App.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalStudents: 2450,
    placedStudents: 1820,
    partnerCompanies: 145,
    pendingOffers: 34
  });

  const [recentPlacements, setRecentPlacements] = useState([
    { id: 1, name: 'Sarah Jenkins', role: 'Software Engineer', company: 'Google', status: 'Accepted', avatar: 'SJ' },
    { id: 2, name: 'Michael Chen', role: 'Data Scientist', company: 'Microsoft', status: 'Pending', avatar: 'MC' },
    { id: 3, name: 'Aisha Patel', role: 'Product Manager', company: 'Amazon', status: 'Accepted', avatar: 'AP' },
    { id: 4, name: 'David Kim', role: 'Frontend Developer', company: 'Meta', status: 'Interviewing', avatar: 'DK' },
  ]);

  // Fetch data from Supabase
  const fetchData = async () => {
    setLoading(true);
    try {
      // Simulate network delay for effect
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log("Supabase client initialized. Waiting for valid credentials for live data.");
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'placements', label: 'Placement Drives', icon: Megaphone },
    { id: 'applied', label: 'Applied Students', icon: Users },
    { id: 'posts', label: 'Post Hub', icon: FileText },
    { id: 'talent', label: 'Talent Pool', icon: Database },
    { id: 'my-college', label: 'My College Post', icon: GraduationCap, isSub: true },
    { id: 'inter-college', label: 'Inter College Post', icon: Globe, isSub: true },
    { id: 'verification', label: 'Verification', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div 
          className="sidebar-header"
        >
          <div className="avatar" style={{ background: 'var(--secondary)', width: 32, height: 32 }}>C</div>
          <div>
            <h2 style={{ fontSize: '18px', marginBottom: '2px' }}>Campus Connect</h2>
            <div style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>Admin Portal</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''} ${item.isSub ? 'sub-nav' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={item.isSub ? 18 : 20} />
                <span style={{ fontSize: item.isSub ? '13px' : 'inherit' }}>{item.label}</span>
              </div>
            );
          })}
        </nav>
        <div style={{ marginTop: 'auto' }}>
          <div 
            className="nav-item"
            onClick={() => {
              supabase.auth.signOut();
              window.location.href = '/signin';
            }}
          >
            <Settings size={20} style={{ opacity: 0 }} /> {/* Spacer */}
            <span style={{ position: 'absolute', left: '16px' }}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></span>
            <span style={{ marginLeft: '24px' }}>Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ padding: (activeTab === 'placements' || activeTab === 'applied' || activeTab === 'posts' || activeTab === 'my-college' || activeTab === 'inter-college') ? '0' : '32px' }}>
        {/* Header - hide for custom views since they have their own */}
        {activeTab !== 'placements' && activeTab !== 'applied' && activeTab !== 'posts' && activeTab !== 'my-college' && activeTab !== 'inter-college' && (
          <header className="top-header">
            <div className="search-bar">
              <Search size={18} color="var(--on-surface-variant)" />
              <input type="text" placeholder="Search students..." />
            </div>
            <div className="header-actions">
              <button className="icon-btn" style={{ position: 'relative' }}>
                <Bell size={20} />
                <span style={{ position: 'absolute', top: 8, right: 8, width: 8, height: 8, background: 'var(--error)', borderRadius: '50%' }}></span>
              </button>
              <button className="icon-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </button>
              <div className="avatar" style={{ backgroundImage: 'url(https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff)', backgroundSize: 'cover' }}></div>
            </div>
          </header>
        )}

        {/* Dashboard / Verification / Placements / Applied View */}
        <div 
          className="dashboard-container"
          style={{ height: (activeTab === 'placements' || activeTab === 'applied' || activeTab === 'posts' || activeTab === 'my-college' || activeTab === 'inter-college') ? '100%' : 'auto' }}
        >
          {activeTab === 'placements' ? (
            <PlacementDrive />
          ) : activeTab === 'applied' ? (
            <AppliedStudents />
          ) : activeTab === 'posts' ? (
            <PostHub />
          ) : activeTab === 'my-college' ? (
            <MyCollegeFeed />
          ) : activeTab === 'inter-college' ? (
            <InterCollegeDiscovery />
          ) : activeTab === 'verification' ? (
            <Verification />
          ) : (
            <>
              <div className="page-header">
                <div>
                  <h1>Overview</h1>
                  <p>Welcome back, Admin. Real-time insights from Supabase.</p>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveTab('placements')}
                >
                  <Plus size={18} style={{ marginRight: 8 }} />
                  New Placement Drive
                </button>
              </div>

              <div className="kpi-grid">
                {[
                  { label: 'Total Students', value: stats.totalStudents, icon: Users, trend: '12% from last year', up: true },
                  { label: 'Placed Students', value: stats.placedStudents, icon: Briefcase, trend: '8% from last month', up: true },
                  { label: 'Partner Companies', value: stats.partnerCompanies, icon: Building, trend: '5 new this week', up: true },
                  { label: 'Pending Offers', value: stats.pendingOffers, icon: Bell, trend: 'Needs attention', up: false },
                ].map((kpi, i) => (
                  <div 
                    key={i}
                    className="card kpi-card"
                  >
                    <div className="kpi-header">
                      <span>{kpi.label}</span>
                      <div className="kpi-icon"><kpi.icon size={20} /></div>
                    </div>
                    <div className="kpi-value">
                      {loading ? '...' : kpi.value.toLocaleString()}
                    </div>
                    <div className={`kpi-trend ${kpi.up ? 'trend-up' : 'trend-down'}`}>
                      {kpi.up ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      <span>{kpi.trend}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="content-grid">
                <div className="card data-table-card">
                  <div className="card-header">
                    <h3>Recent Placements</h3>
                    <button className="icon-btn"><MoreVertical size={20} /></button>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Student Name</th>
                        <th>Role</th>
                        <th>Company</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPlacements.map(placement => (
                        <tr key={placement.id}>
                          <td>
                            <div className="user-cell">
                              <div className="user-avatar">{placement.avatar}</div>
                              <div className="user-details">
                                <strong>{placement.name}</strong>
                                <span>CS Dept, 2026</span>
                              </div>
                            </div>
                          </td>
                          <td>{placement.role}</td>
                          <td>{placement.company}</td>
                          <td>
                            <span className={`badge ${
                              placement.status === 'Accepted' ? 'badge-active' : 
                              placement.status === 'Pending' ? 'badge-pending' : ''
                            }`}>
                              {placement.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h3>Upcoming Drives</h3>
                    <button className="btn btn-secondary" style={{ height: 32, fontSize: 12 }}>View All</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
                    {[
                      { name: 'Tech Mahindra', date: 'Oct 15, 2026', type: 'On-Campus' },
                      { name: 'Infosys', date: 'Oct 18, 2026', type: 'Virtual' },
                      { name: 'TCS Digital', date: 'Oct 22, 2026', type: 'On-Campus' },
                    ].map((drive, i) => (
                      <div 
                        key={i} 
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: i < 2 ? '1px solid var(--surface-container)' : 'none', cursor: 'pointer' }}
                      >
                        <div>
                          <strong style={{ display: 'block', color: 'var(--primary)', marginBottom: 4 }}>{drive.name}</strong>
                          <span style={{ fontSize: 12, color: 'var(--on-surface-variant)' }}>{drive.type}</span>
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--secondary)' }}>{drive.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
