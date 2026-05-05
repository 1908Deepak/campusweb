import React from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Bookmark, 
  ArrowRight, 
  Globe, 
  Trophy, 
  Users,
  Building2,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import './InterCollegeDiscovery.css';

const InterCollegeDiscovery = () => {
  const partners = [
    { name: 'Harvard University', logo: 'HU' },
    { name: 'Columbia University', logo: 'CU' },
    { name: 'Carnegie Mellon', logo: 'CM' },
  ];

  return (
    <div className="discovery-container">
      <div className="discovery-header">
        <h1>Inter-College Discovery</h1>
        <p>Explore hackathons, academic symposiums, and cross-campus events from partnering institutions.</p>
      </div>

      <div className="discovery-grid">
        <div className="discovery-main">
          {/* Featured Card */}
          <div className="card-featured">
            <div className="featured-content">
              <div className="badge-featured">Featured Hackathon</div>
              <div className="save-icon"><Bookmark size={20} /></div>
              
              <div className="featured-bottom">
                <div className="featured-meta">
                  <span><MapPin size={16} /> Stanford University</span>
                  <span>•</span>
                  <span>Oct 15-17</span>
                </div>
                <h2>Global AI Innovators Challenge 2024</h2>
                <p>Join students from 50+ universities to build ethical AI solutions for climate change. $50k prize pool and mentorship from top industr...</p>
                <div className="featured-actions">
                  <button className="btn-register">Register Team</button>
                  <button className="btn-details">View Details</button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid-secondary">
            {/* Tech Meetup */}
            <div className="card-discovery">
              <div className="discovery-body">
                <div className="badge-discovery type-tech">Tech Meetup</div>
                <h3>Web3 & Blockchain Developer Mixer</h3>
                <p>A casual networking event for developers interested in decentralized technologies. Hosted by the CS Student Union.</p>
                <div className="discovery-footer">
                  <div className="discovery-meta-sm">
                    <div className="avatar-xs">UC</div>
                    <span>UC Berkeley • Tomorrow</span>
                  </div>
                  <Bookmark size={18} color="var(--secondary)" />
                </div>
              </div>
            </div>

            {/* Workshop */}
            <div className="card-discovery">
              <div className="discovery-body">
                <div className="badge-discovery type-workshop">Workshop</div>
                <h3>Advanced React Patterns Workshop</h3>
                <p>Deep dive into custom hooks, context optimization, and performance rendering. Open to all computer science majors.</p>
                <div className="discovery-footer">
                  <div className="discovery-meta-sm">
                    <div className="avatar-xs">NY</div>
                    <span>NYU • Oct 5</span>
                  </div>
                  <Bookmark size={18} color="var(--secondary)" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="discovery-side">
          {/* Side Notice Card */}
          <div className="side-notice-card">
            <div className="badge-notice"><Globe size={14} /> Cross-Campus Notice</div>
            <h3>MIT Research Symposium Applications Open</h3>
            <p>Undergraduate researchers are invited to submit abstracts for the annual inter-collegiate symposium on Quantum Computing.</p>
            <div className="side-footer">
              <div className="deadline">
                <div className="avatar-xs">M</div>
                <span>Deadline: Sep 30</span>
              </div>
              <Bookmark size={18} color="var(--secondary)" />
            </div>
          </div>

          {/* Partner Institutions */}
          <div className="partners-card">
            <h3>Partner Institutions</h3>
            <div className="partners-list">
              {partners.map((p, i) => (
                <div key={i} className="partner-item">
                  <div className="partner-logo">{p.logo}</div>
                  <span>{p.name}</span>
                  <ChevronRight size={16} />
                </div>
              ))}
            </div>
            <button className="btn-all-partners">View All Partners</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterCollegeDiscovery;
