import React, { useState } from 'react';
import { 
  Search, Filter, ChevronDown, Folder, MoreVertical, 
  ArrowRight, Users, Bell, HelpCircle, ShieldCheck
} from 'lucide-react';
import './AppliedStudents.css';

import { supabase } from '../supabaseClient';

const AppliedStudents = () => {
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [drives, setDrives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDrives = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('placement_drives')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDrives(data || []);
    } catch (error) {
      console.error('Error fetching drives:', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDrives();
  }, []);

  const candidates = [
    { id: 'STU-2021-0492', name: 'Sarah Jenkins', campus: 'Main Campus', email: 's.jenkins@university.edu', altEmail: 'sarah.j.dev@gmail.com', course: 'B.Tech - Computer Science', status: 'Shortlisted', avatar: 'SJ' },
    { id: 'STU-2021-1022', name: 'Michael Kwan', campus: 'North Campus', email: 'm.kwan@university.edu', altEmail: 'mkwan99@yahoo.com', course: 'B.Tech - Information Tech', status: 'Pending', avatar: 'MK' },
    { id: 'STU-2021-0845', name: 'David Chen', campus: 'Main Campus', email: 'd.chen@university.edu', altEmail: 'david.chen.tech@gmail.com', course: 'B.Tech - Computer Science', status: 'Shortlisted', avatar: 'DC' },
    { id: 'STU-2021-2210', name: 'Aisha Rahman', campus: 'South Campus', email: 'a.rahman@university.edu', altEmail: 'aisha.r@outlook.com', course: 'MCA - Software Eng', status: 'Rejected', avatar: 'AR' },
  ];

  if (selectedDrive) {
    return (
      <div className="applied-container">
        {/* Header stays same */}
        <div className="applied-header">
          <div className="search-box-wrapper">
            <Search size={18} className="search-icon-dim" />
            <input type="text" placeholder="Search..." />
          </div>
          <div className="header-actions">
            <button className="icon-btn-ghost"><Bell size={20} /></button>
            <button className="icon-btn-ghost"><HelpCircle size={20} /></button>
            <div className="admin-profile-pill">
              <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" alt="Admin" />
              <span>Admin Profile</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>

        <div className="applied-content">
          <div className="applied-breadcrumb-nav">
            <span onClick={() => setSelectedDrive(null)}>Applied Students</span>
            <ChevronDown size={14} className="breadcrumb-arrow" style={{ transform: 'rotate(-90deg)' }} />
            <span className="current-crumb">{selectedDrive.company_name} - {selectedDrive.drive_id}</span>
          </div>

          <div className="drive-candidates-header">
            <div className="title-area">
              <h1>Drive Candidates</h1>
              <p>Review and manage students applied for {selectedDrive.company_name} {selectedDrive.job_title} role.</p>
            </div>
            <div className="action-buttons">
              <button className="btn-outline-md"><ArrowRight size={16} style={{ transform: 'rotate(-90deg)' }} /> Export CSV</button>
              <button className="btn-primary-md"><ShieldCheck size={16} /> Bulk Shortlist</button>
            </div>
          </div>

          <div className="candidates-stats-row">
            <div className="stat-card-simple">
              <div className="stat-icon-circle blue">
                <Users size={20} />
              </div>
              <div className="stat-info">
                <span>Total Applicants</span>
                <strong>0</strong>
              </div>
            </div>
            <div className="stat-card-simple">
              <div className="stat-icon-circle green">
                <Users size={20} />
              </div>
              <div className="stat-info">
                <span>Shortlisted</span>
                <strong>0</strong>
              </div>
            </div>
            <div className="candidates-search-bar-row">
              <div className="search-input-with-filters">
                <div className="search-inner">
                  <Search size={18} className="search-icon-dim" />
                  <input type="text" placeholder="Search students by name, ID, or email..." />
                </div>
                <button className="btn-filter-icon">
                  <Filter size={18} /> Filters
                </button>
              </div>
            </div>
          </div>

          <div className="candidates-table-card">
            <table className="candidates-table">
              <thead>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>STUDENT NAME</th>
                  <th>UNIVERSITY ID</th>
                  <th>CONTACT</th>
                  <th>COURSE & BRANCH</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((stu) => (
                  <tr key={stu.id}>
                    <td><input type="checkbox" /></td>
                    <td>
                      <div className="student-info-cell">
                        <div className="student-avatar-small">{stu.avatar}</div>
                        <div className="student-name-stack">
                          <span className="name">{stu.name}</span>
                          <span className="campus">{stu.campus}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className="uni-id">{stu.id}</span></td>
                    <td>
                      <div className="contact-stack">
                        <span className="main-email">{stu.email}</span>
                        <span className="alt-email">{stu.altEmail}</span>
                      </div>
                    </td>
                    <td><span className="course-text">{stu.course}</span></td>
                    <td>
                      <span className={`status-pill ${stu.status.toLowerCase()}`}>
                        {stu.status}
                      </span>
                    </td>
                    <td>
                      <button className="icon-btn-ghost"><MoreVertical size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="table-pagination">
              <span className="pagination-info">Showing 1 to 10 of 0 results</span>
              <div className="pagination-controls">
                <button className="btn-pagination">Previous</button>
                <button className="btn-pagination">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="applied-container">
      {/* Top Header Bar */}
      <div className="applied-header">
        <div className="search-box-wrapper">
          <Search size={18} className="search-icon-dim" />
          <input 
            type="text" 
            placeholder="Search students, drives..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="header-actions">
          <button className="icon-btn-ghost"><Bell size={20} /></button>
          <button className="icon-btn-ghost"><HelpCircle size={20} /></button>
          <div className="admin-profile-pill">
            <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" alt="Admin" />
            <span>Admin Profile</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      <div className="applied-content">
        <div className="applied-title-section">
          <h1>Applied Students</h1>
          <p>Select a drive folder to view received applications.</p>
        </div>

        <div className="applied-filters-row">
          <div className="filter-buttons">
            <button className="btn-filter">
              <Filter size={16} /> Filter
            </button>
            <button className="btn-filter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M6 12h12M10 18h4"/></svg> Sort by: Date
            </button>
          </div>
          <div className="drive-search-wrapper">
            <Search size={16} className="search-icon-dim" />
            <input type="text" placeholder="Search drives..." />
          </div>
        </div>

        <div className="drive-folders-grid">
          {isLoading ? (
            <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--on-surface-variant)' }}>
              Loading drives...
            </div>
          ) : drives.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1', color: 'var(--on-surface-variant)' }}>
              No published drives found.
            </div>
          ) : (
            drives.filter(d => d.status === 'published').map((drive) => (
              <div key={drive.id} className="drive-folder-card" onClick={() => setSelectedDrive(drive)}>
                <div className="card-top">
                  <div className="folder-icon-wrapper">
                    <Folder size={24} fill="var(--secondary)" color="var(--secondary)" fillOpacity="0.1" />
                  </div>
                  <span className={`status-badge active`}>
                    Active
                  </span>
                </div>
                
                <div className="card-middle">
                  <h3>{drive.company_name}</h3>
                  <span className="drive-id">{drive.drive_id}</span>
                </div>

                <div className="card-bottom">
                  <div className="student-avatars">
                    <div className="avatar-group">
                      <img src={`https://i.pravatar.cc/150?u=${drive.id}1`} alt="s1" />
                      <img src={`https://i.pravatar.cc/150?u=${drive.id}2`} alt="s2" />
                      <span className="more-count">+0</span>
                    </div>
                  </div>
                  <button className="view-link">
                    View <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliedStudents;
