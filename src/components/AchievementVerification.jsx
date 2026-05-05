import React, { useState } from 'react';
import { 
  Briefcase, Code, Award, Filter, ListOrdered, Calendar, Building,
  ZoomIn, ZoomOut, ExternalLink, FileText, MessageSquare, XCircle, CheckCircle2
} from 'lucide-react';
import './AchievementVerification.css';

const mockAchievements = [
  {
    id: 1,
    type: 'Internship',
    title: 'Summer Internship Completion',
    studentName: 'Rahul Sharma',
    studentId: 'CS2021045',
    company: 'TechCorp India',
    timeAgo: 'Submitted 2 hrs ago',
    priority: 'High Priority',
    points: '50 Points (Tier 1 Company)',
    icon: Briefcase
  },
  {
    id: 2,
    type: 'Hackathon',
    title: 'Smart India Hackathon - 1st Runner Up',
    studentName: 'Priya Patel',
    studentId: 'EC2021089',
    company: 'Hackathon',
    timeAgo: 'Submitted 5 hrs ago',
    priority: null,
    points: '40 Points (National Level)',
    icon: Code
  },
  {
    id: 3,
    type: 'Certification',
    title: 'AWS Solutions Architect Certification',
    studentName: 'Ankit Desai',
    studentId: 'IT2021012',
    company: 'Certification',
    timeAgo: 'Submitted 1 day ago',
    priority: null,
    points: '30 Points (Professional)',
    icon: Award
  }
];

const AchievementVerification = () => {
  const [activeTab, setActiveTab] = useState('All Pending (12)');
  const [selectedItem, setSelectedItem] = useState(mockAchievements[0]);

  const tabs = ['All Pending (12)', 'Internships', 'Hackathons', 'Certifications'];

  return (
    <div className="ach-container">
      {/* LEFT PANEL */}
      <div className="ach-list-panel">
        <div className="ach-panel-header">
          <div>
            <h2>Pending Achievements</h2>
            <p>Review student submissions for placement points.</p>
          </div>
          <div className="ach-panel-actions">
            <button className="btn-outline"><Filter size={16} /> Filter</button>
            <button className="btn-outline"><ListOrdered size={16} /> Sort</button>
          </div>
        </div>

        <div className="ach-tabs">
          {tabs.map(tab => (
            <button 
              key={tab} 
              className={`ach-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="ach-list">
          {mockAchievements.map(ach => {
            const Icon = ach.icon;
            const isSelected = selectedItem.id === ach.id;
            return (
              <div 
                key={ach.id} 
                className={`ach-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedItem(ach)}
              >
                <div className="ach-card-icon">
                  <Icon size={20} color="var(--secondary)" />
                </div>
                <div className="ach-card-content">
                  <div className="ach-card-top">
                    <h4>{ach.title}</h4>
                    {ach.priority && <span className="badge-priority">{ach.priority}</span>}
                  </div>
                  <div className="ach-card-subtitle">
                    {ach.studentName} • {ach.studentId}
                  </div>
                  <div className="ach-card-meta">
                    <span>
                      {ach.type === 'Internship' ? <Building size={14} /> : ach.type === 'Hackathon' ? <Award size={14} /> : <FileText size={14} />} 
                      {ach.company}
                    </span>
                    <span>
                      <Calendar size={14} /> {ach.timeAgo}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="ach-details-panel">
        <div className="hub-header">
          <div>
            <h2>Verification Hub</h2>
            <p>Reviewing document for {selectedItem.studentId}</p>
          </div>
          <div className="badge-under-review">Under Review</div>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <label>STUDENT NAME</label>
            <p>{selectedItem.studentName}</p>
          </div>
          <div className="info-item">
            <label>ACHIEVEMENT TYPE</label>
            <p>{selectedItem.type}</p>
          </div>
          <div className="info-item full-width">
            <label>CLAIMED POINTS</label>
            <p>{selectedItem.points}</p>
          </div>
        </div>

        <div className="document-viewer-container">
          <div className="viewer-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--on-surface)' }}>
              <FileText size={18} /> Uploaded Document
            </span>
            <div className="viewer-actions">
              <ZoomIn size={18} />
              <ZoomOut size={18} />
              <ExternalLink size={18} />
            </div>
          </div>
          <div className="viewer-content">
            <div className="doc-mockup">
              <div className="doc-top">
                <div className="doc-logo-area">
                  <h3>TechCorp<br/>India</h3>
                  <p>Bangalore, Karnataka 560001</p>
                </div>
                <div className="doc-date-area">
                  <p>Date: August 15, 2023</p>
                  <p>Ref: TC/INT/2023/892</p>
                </div>
              </div>
              <div className="doc-title">
                <h2>CERTIFICATE OF<br/>COMPLETION</h2>
              </div>
              <div className="doc-body">
                <p>To Whom It May Concern,</p>
                <br/>
                <p>This is to certify that <strong>Mr. {selectedItem.studentName}</strong>, a student of Computer Science Engineering bearing ID <strong>{selectedItem.studentId}</strong>, has successfully completed a 3-month summer internship program at TechCorp India.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="reviewer-notes">
          <label>Reviewer Notes (Optional)</label>
          <textarea placeholder="Add notes regarding this verification..."></textarea>
        </div>

        <div className="bottom-actions">
          <button className="btn-request-info">
            <MessageSquare size={16} /> Request Info
          </button>
          <div style={{ flex: 1 }}></div>
          <button className="btn-reject-ach">
            <XCircle size={16} /> Reject
          </button>
          <button className="btn-approve-ach">
            <CheckCircle2 size={16} /> Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default AchievementVerification;
