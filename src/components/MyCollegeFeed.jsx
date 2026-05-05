import React from 'react';
import { 
  Bell, 
  Search, 
  Filter, 
  Calendar, 
  ChevronRight, 
  Users, 
  ShieldAlert, 
  Megaphone, 
  MessageSquare, 
  Code,
  Clock,
  MoreVertical,
  ArrowRight,
  BookOpen,
  UserCheck
} from 'lucide-react';
import './MyCollegeFeed.css';

const MyCollegeFeed = () => {
  const deadlines = [
    { title: 'CS301: Project Phase 2 Submission', date: 'Tomorrow, 11:59 PM', color: '#ef4444' },
    { title: 'Last day to drop courses without \'W\'', date: 'Oct 24, 5:00 PM', color: '#64748b' },
    { title: 'Spring Housing Application Opens', date: 'Nov 01', color: '#64748b' },
  ];

  const contacts = [
    { name: 'Faculty of Engineering', role: 'Dean\'s Office', icon: Users, color: '#4f46e5' },
    { name: 'Student Counseling', role: 'Wellness Center', icon: UserCheck, color: '#10b981' },
  ];

  return (
    <div className="feed-container">
      <div className="feed-header">
        <div className="header-left">
          <h1>My College Feed</h1>
          <p>Internal announcements and updates for Engineering faculty.</p>
        </div>
        <div className="header-right">
          <button className="btn-filter"><Filter size={18} /> Filter</button>
        </div>
      </div>

      <div className="feed-content-grid">
        <div className="feed-main">
          {/* Critical Notice */}
          <div className="card-critical">
            <div className="badge-critical"><ShieldAlert size={14} /> CRITICAL NOTICE</div>
            <span className="time-stamp">Just now</span>
            <h2>Spring Semester Registration Extension</h2>
            <p>Due to unexpected server maintenance issues over the weekend, the deadline for Spring semester course registration has been extended. Ensure all credits are approved by your academic advisor.</p>
            <div className="card-footer">
              <div className="author">
                <div className="avatar-sm">RO</div>
                <span>Registrar's Office</span>
              </div>
              <button className="btn-action">Take Action <ArrowRight size={16} /></button>
            </div>
          </div>

          <div className="post-grid">
            {/* Event Card */}
            <div className="card-post">
              <div className="post-image-placeholder">
                <div className="badge-type type-event">EVENT</div>
                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60" alt="Lecture" />
              </div>
              <div className="post-body">
                <div className="post-meta">Tomorrow, 2:00 PM</div>
                <h3>Guest Lecture: AI in Modern Architecture</h3>
                <p>Join Dr. Sarah Jenkins as she explores the intersection of...</p>
                <div className="post-footer">
                  <span>Room 402, Eng. Block</span>
                  <button className="btn-link">RSVP</button>
                </div>
              </div>
            </div>

            {/* Announcement Card */}
            <div className="card-post">
              <div className="post-body">
                <div className="badge-type type-announcement">ANNOUNCEMENT</div>
                <span className="time-stamp">2 hours ago</span>
                <h3>Campus Wi-Fi Upgrade Schedule</h3>
                <p>IT services will be upgrading the central routers this weekend. Expect intermittent connectivity in the library and student center areas between midnight and 4 AM on Saturday.</p>
                <div className="post-footer">
                  <div className="author">
                    <div className="avatar-xs">IT</div>
                    <span>IT Support Desk</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hackathon Card */}
            <div className="card-post">
              <div className="post-body">
                <div className="badge-type type-hackathon">HACKATHON</div>
                <span className="time-stamp">Yesterday</span>
                <h3>CodeRed 2024 Registration Open</h3>
                <p>Form your teams of up to 4 members. This year's theme focuses on Civic Tech and...</p>
                <div className="post-footer">
                  <div className="avatars-group">
                    <div className="avatar-xs" style={{zIndex: 3}}></div>
                    <div className="avatar-xs" style={{zIndex: 2}}></div>
                    <div className="avatar-xs" style={{zIndex: 1}}>+12</div>
                  </div>
                  <button className="btn-link">View Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="feed-side">
          {/* Upcoming Deadlines */}
          <div className="side-card">
            <div className="side-card-header">
              <Calendar size={18} color="var(--secondary)" />
              <h3>Upcoming Deadlines</h3>
            </div>
            <div className="deadline-list">
              {deadlines.map((d, i) => (
                <div key={i} className="deadline-item">
                  <div className="deadline-dot" style={{ background: d.color }}></div>
                  <div className="deadline-info">
                    <div className="deadline-time" style={{ color: d.color }}>{d.date}</div>
                    <div className="deadline-title">{d.title}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-view-all">View Full Calendar</button>
          </div>

          {/* Quick Contacts */}
          <div className="side-card">
            <h3>Quick Contacts</h3>
            <div className="contact-list">
              {contacts.map((c, i) => (
                <div key={i} className="contact-item">
                  <div className="contact-icon" style={{ background: `${c.color}15`, color: c.color }}>
                    <c.icon size={18} />
                  </div>
                  <div className="contact-info">
                    <div className="contact-name">{c.name}</div>
                    <div className="contact-role">{c.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCollegeFeed;
