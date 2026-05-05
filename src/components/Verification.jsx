import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle2, XCircle, GraduationCap, ChevronLeft, ChevronRight, Image as ImageIcon, Award } from 'lucide-react';
import AchievementVerification from './AchievementVerification';
import './Verification.css';

// Generate 24 mock students for pagination testing
const generateMockStudents = () => {
  const departments = ['Computer Science', 'Business Admin', 'Mechanical Eng', 'Data Science', 'Electrical Eng'];
  const courses = ['B.Tech Computer Science', 'MBA Marketing', 'B.Tech Mechanical', 'M.Sc Data Science', 'B.Tech Electrical'];
  const names = ['Sarah Jenkins', 'Marcus King', 'Alex Johnson', 'Emily Davis', 'Michael Brown', 'Jessica Taylor', 'Daniel Wilson', 'Olivia Moore', 'James Taylor', 'Sophia Anderson', 'William Thomas', 'Isabella Jackson', 'Benjamin White', 'Mia Harris', 'Elijah Martin', 'Charlotte Thompson', 'Lucas Garcia', 'Amelia Martinez', 'Mason Robinson', 'Harper Clark', 'Logan Rodriguez', 'Evelyn Lewis', 'Alexander Lee', 'Abigail Walker'];
  
  return names.map((name, index) => {
    const deptIndex = index % departments.length;
    return {
      id: index + 1,
      name,
      appliedTime: index < 5 ? 'Today' : (index < 12 ? 'Yesterday' : '2 Days Ago'),
      department: departments[deptIndex],
      course: courses[deptIndex],
      studentId: `#STU-2024-${(100 + index).toString()}`,
      email: `${name.split(' ')[0].toLowerCase()}.${name.split(' ')[1].toLowerCase()}@university.edu`,
      documentName: index % 2 === 0 ? 'ID_Card_Front.pdf' : 'Enrollment_Proof.jpg',
      dateSubmitted: `Oct ${24 - (index % 5)}, 2023 - 10:${10 + index} AM`,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      status: 'Pending'
    };
  });
};

const generateMockAchievements = () => {
  const names = ['Michael Brown', 'Jessica Taylor', 'Emily Davis', 'Alex Johnson'];
  const types = ['Hackathon', 'Certification', 'Research Paper', 'Internship'];
  const titles = ['First Place - AI Hack 2023', 'AWS Cloud Practitioner', 'Published in IEEE', 'Google Summer Intern'];
  
  return names.map((name, index) => {
    return {
      id: index + 100,
      name,
      appliedTime: index < 2 ? 'Today' : 'Yesterday',
      type: types[index % types.length],
      title: titles[index % titles.length],
      email: `${name.split(' ')[0].toLowerCase()}.${name.split(' ')[1].toLowerCase()}@university.edu`,
      documentName: 'Certificate_Proof.pdf',
      dateSubmitted: `Oct 25, 2023 - 11:${30 + index} AM`,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      status: 'Pending'
    };
  });
};

const initialStudents = generateMockStudents();
const initialAchievements = generateMockAchievements();

const Verification = () => {
  const [verificationType, setVerificationType] = useState('student'); // 'student' or 'achievement'
  const [activeFilter, setActiveFilter] = useState('Pending');
  
  const [students, setStudents] = useState(initialStudents);
  const [achievements, setAchievements] = useState(initialAchievements);
  
  const currentDataList = verificationType === 'student' ? students : achievements;
  
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Set default selected item when switching tabs or filters
  useEffect(() => {
    const filtered = currentDataList.filter(s => s.status === activeFilter);
    if (filtered.length > 0) {
      setSelectedItem(filtered[0]);
    } else {
      setSelectedItem(null);
    }
  }, [verificationType, activeFilter]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Notification state
  const [notification, setNotification] = useState(null);

  // Filtered data based on active tab
  const filteredData = currentDataList.filter(s => s.status === activeFilter);
  
  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Auto-hide notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleAction = (itemId, action, e) => {
    e.stopPropagation(); // Prevent row selection
    
    const newStatus = action === 'Approve' ? 'Verified' : 'Rejected';
    
    if (verificationType === 'student') {
      setStudents(prev => prev.map(s => s.id === itemId ? { ...s, status: newStatus } : s));
    } else {
      setAchievements(prev => prev.map(s => s.id === itemId ? { ...s, status: newStatus } : s));
    }
    
    const item = currentDataList.find(s => s.id === itemId);
    const itemName = verificationType === 'student' ? item.name : `${item.name}'s achievement`;
    setNotification(`${itemName} has been ${newStatus.toLowerCase()}.`);
    
    // If we actioned the selected item and they are no longer in the list, select the next available
    if (selectedItem?.id === itemId) {
      const remaining = paginatedData.filter(s => s.id !== itemId);
      if (remaining.length > 0) {
        setSelectedItem(remaining[0]);
      } else {
        setSelectedItem(null);
      }
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="verification-container" style={{ position: 'relative' }}>
      {/* Toast Notification */}
      {notification && (
        <div className="notification-toast">
          {notification.includes('verified') ? <CheckCircle2 size={18} color="green" /> : <XCircle size={18} color="red" />}
          <span>{notification}</span>
        </div>
      )}

      {/* Main Navigation Toggle */}
      <div className="type-toggle-container">
        <button 
          className={`type-toggle-btn ${verificationType === 'student' ? 'active' : ''}`}
          onClick={() => { setVerificationType('student'); setCurrentPage(1); setActiveFilter('Pending'); }}
        >
          <GraduationCap size={18} />
          Student Verification
        </button>
        <button 
          className={`type-toggle-btn ${verificationType === 'achievement' ? 'active' : ''}`}
          onClick={() => { setVerificationType('achievement'); setCurrentPage(1); setActiveFilter('Pending'); }}
        >
          <Award size={18} />
          Achievements Verification
        </button>
      </div>

      {verificationType === 'student' ? (
        <>
          <div className="verification-header-row">
            <div>
              <h1>Student Verification</h1>
              <p>Review and approve pending student registrations.</p>
            </div>
            <div className="filter-tabs">
              {['Pending', 'Verified', 'Rejected'].map(tab => (
                <button 
                  key={tab}
                  className={`filter-tab ${activeFilter === tab ? 'active' : ''}`}
                  onClick={() => {
                    setActiveFilter(tab);
                    setCurrentPage(1);
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="verification-content-grid">
            <div className="table-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1, overflowX: 'auto' }}>
                <table className="verification-table">
                  <thead>
                    <tr>
                      <th>STUDENT</th>
                      <th>DEPARTMENT</th>
                      <th>COURSE</th>
                      <th>ID / EMAIL</th>
                      <th>DOCUMENT</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? paginatedData.map(item => (
                      <tr 
                        key={item.id} 
                        className={selectedItem?.id === item.id ? 'selected' : ''}
                        onClick={() => setSelectedItem(item)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>
                          <div className="student-info">
                            <div className="avatar" style={{ backgroundImage: `url(${item.avatar})` }}></div>
                            <div>
                              <div className="student-name">{item.name}</div>
                              <div className="student-time">Applied {item.appliedTime}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: '13px', color: 'var(--on-surface)' }}>{item.department}</div>
                        </td>
                        <td>
                          <div style={{ fontSize: '13px', color: 'var(--on-surface)' }}>
                            {item.course.split(' ').map((word, i) => i === 0 ? <div key={i}>{word}</div> : <span key={i}>{word} </span>)}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>
                            <div style={{ color: 'var(--on-surface)', marginBottom: '2px' }}>{item.studentId}</div>
                            <div>{item.email}</div>
                          </div>
                        </td>
                        <td>
                          <a href="#" className="doc-link" onClick={(e) => e.preventDefault()}>
                            {item.documentName.includes('pdf') ? <FileText size={16} /> : <ImageIcon size={16} />}
                            {item.documentName.substring(0, 16)}{item.documentName.length > 16 ? '...' : ''}
                          </a>
                        </td>
                        <td>
                          {activeFilter === 'Pending' ? (
                            <div className="table-actions">
                              <button 
                                className="btn-approve-sm"
                                onClick={(e) => handleAction(item.id, 'Approve', e)}
                              >
                                Approve
                              </button>
                              <button 
                                className="btn-reject-sm"
                                onClick={(e) => handleAction(item.id, 'Reject', e)}
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className={`badge-${activeFilter.toLowerCase()}`} style={{ fontSize: '12px', fontWeight: 600 }}>
                              {activeFilter.toUpperCase()}
                            </span>
                          )}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}>
                          No {activeFilter.toLowerCase()} records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {filteredData.length > 0 && (
                <div className="pagination-footer">
                  <div>Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} {activeFilter.toLowerCase()} entries</div>
                  <div className="pagination-controls">
                    <button 
                      className="page-btn" 
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <button 
                        key={i} 
                        className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button 
                      className="page-btn"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {selectedItem && (
              <div className="details-panel">
                <div className="details-header">
                  <h2>Applicant Details</h2>
                  <div className={`badge-${selectedItem.status.toLowerCase()}`}>{selectedItem.status.toUpperCase()}</div>
                </div>

                <div className="applicant-profile">
                  <div className="avatar-large" style={{ backgroundImage: `url(${selectedItem.avatar})` }}></div>
                  <div>
                    <h3>{selectedItem.name}</h3>
                    <p><GraduationCap size={14} /> {selectedItem.course}</p>
                  </div>
                </div>

                <div className="detail-list">
                  <div className="detail-item">
                    <label>STUDENT ID</label>
                    <p>{selectedItem.studentId}</p>
                  </div>
                  <div className="detail-item">
                    <label>COURSE</label>
                    <p>{selectedItem.course}</p>
                  </div>
                  <div className="detail-item">
                    <label>EMAIL ADDRESS</label>
                    <p>{selectedItem.email}</p>
                  </div>
                  <div className="detail-item">
                    <label>DATE SUBMITTED</label>
                    <p>{selectedItem.dateSubmitted}</p>
                  </div>
                  <div className="detail-item">
                    <label>VERIFICATION DOCUMENT</label>
                  </div>
                </div>

                <div className="document-preview-box">
                  <div className="document-image">
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: 60, height: 60, border: '2px solid white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                        <span style={{ fontSize: '24px', fontWeight: 'bold' }}>P</span>
                      </div>
                      <div style={{ fontSize: '10px', letterSpacing: '2px' }}>DOCUMENT PREVIEW</div>
                    </div>
                  </div>
                  <div className="document-file-name">
                    <FileText size={16} color="var(--secondary)" />
                    {selectedItem.documentName}
                  </div>
                </div>
                
                {activeFilter === 'Pending' && (
                  <div className="action-buttons">
                    <button 
                      className="btn-approve"
                      onClick={(e) => handleAction(selectedItem.id, 'Approve', e)}
                    >
                      <CheckCircle2 size={18} />
                      Approve Verification
                    </button>
                    <button 
                      className="btn-reject"
                      onClick={(e) => handleAction(selectedItem.id, 'Reject', e)}
                    >
                      <XCircle size={18} />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <AchievementVerification />
      )}
    </div>
  );
};

export default Verification;
