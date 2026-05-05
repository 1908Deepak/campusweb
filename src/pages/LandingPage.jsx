import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Briefcase, 
  ShieldCheck, 
  Search,
  Building2,
  BookOpen,
  MonitorSmartphone,
  Trophy
} from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <Link to="/" className="landing-nav-logo">
          <div className="logo-icon">C</div>
          Campus Connect
        </Link>
        <div className="landing-nav-links">
          <a href="#solutions" className="nav-link">Solutions</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#partners" className="nav-link">Partners</a>
        </div>
        <div className="nav-actions">
          <Link to="/signin" className="btn-signin">Sign In</Link>
          <Link to="/signin" className="btn-get-started">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <div className="hero-content">
          <motion.div variants={fadeInUp} className="section-label">
            <div style={{ width: 4, height: 4, background: 'var(--secondary)', borderRadius: '50%' }}></div>
            Campus Connect Admin Platform
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="hero-title">
            The Future of<br />
            <span className="text-gradient">Institutional Placement.</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="hero-subtitle">
            A sophisticated conduit streamlining placement workflows, verifying student credentials, and empowering recruiters with actionable, trusted data.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="hero-actions">
            <Link to="/dashboard" className="btn-start-now">
              Start Now <ArrowRight size={16} />
            </Link>
            <a href="#solutions" className="btn-explore">
              Explore Platform
            </a>
          </motion.div>
        </div>

        <motion.div variants={fadeInUp} className="hero-image-wrapper">
          <img src="/hero.png" alt="Institutional abstract tech building" className="hero-image" />
          <div className="hero-floating-card">
            <div className="hero-floating-card-icon">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--on-surface-variant)' }}>VERIFIED</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>ID: #892-XT</div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Repeating Banner Strip */}
      <div className="banner-strip">
        <div className="banner-content">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="banner-item">
              <Briefcase size={14} />
              Offer Received - Salary 2
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <section id="solutions" className="features-section">
        <motion.div 
          className="features-header"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="section-label" style={{ color: 'var(--secondary)', marginBottom: 16 }}>MODULAR TOOLS FOR PRECISION SCALE</div>
          <h2 className="features-title">
            Modular tools for <span className="text-gradient">precision scale.</span>
          </h2>
        </motion.div>

        <motion.div 
          className="features-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="feature-card">
            <div className="feature-icon">
              <Briefcase size={24} />
            </div>
            <h3>Placement Mgmt</h3>
            <p>Smart drive creation and tracking. Automate scheduling, coordinate interviews, and monitor placement metrics across multiple cohorts in real-time.</p>
            <a href="#" className="feature-link">Explore Feature <ArrowRight size={14} /></a>
          </motion.div>

          <motion.div variants={fadeInUp} className="feature-card">
            <div className="feature-icon">
              <ShieldCheck size={24} />
            </div>
            <h3>Verification Hub</h3>
            <p>Automated student and achievement verification. Ensure the integrity of academic records and certifications with institutional-grade cryptographic validation.</p>
            <a href="#" className="feature-link">Explore Feature <ArrowRight size={14} /></a>
          </motion.div>

          <motion.div variants={fadeInUp} className="feature-card">
            <div className="feature-icon">
              <Search size={24} />
            </div>
            <h3>Talent Discovery</h3>
            <p>Direct access to verified student profiles. Advanced querying allows industry partners to surface candidates matching exact technical and academic criteria.</p>
            <a href="#" className="feature-link">Explore Feature <ArrowRight size={14} /></a>
          </motion.div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section id="about" className="mission-section">
        <div className="mission-container">
          <motion.div 
            className="mission-image-wrapper"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src="/mission.png" alt="Colleagues collaborating" className="mission-image" />
          </motion.div>

          <motion.div 
            className="mission-content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="section-label" style={{ marginBottom: 16 }}>OUR METHODOLOGY</div>
            <h2 className="mission-title">Empowering the<br/>Next Generation.</h2>
            <p className="mission-text">
              Campus Connect's mission is to streamline the complex orchestration of collegiate placement and verification. We provide a rigorous, data-driven platform that aligns institutional output with industry demand, eliminating administrative overhead.
            </p>
            <a href="#" className="btn-mission">Read Full Mission</a>
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="partners-section">
        <h4 className="partners-title">Trusted by Network Leaders</h4>
        <div className="partners-logos">
          <div className="partner-logo"><Building2 size={24} /> Meta Corp</div>
          <div className="partner-logo"><MonitorSmartphone size={24} /> TechFlow</div>
          <div className="partner-logo"><BookOpen size={24} /> EduSys</div>
          <div className="partner-logo"><Trophy size={24} /> Global Net</div>
          <div className="partner-logo"><Briefcase size={24} /> WorkHub</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="landing-nav-logo">
              <div className="logo-icon" style={{ width: 24, height: 24, fontSize: 12 }}>C</div>
              Campus Connect
            </div>
            <p>The premier conduit bridging academic potential and industrial excellence through verifiable, data-driven placement orchestration.</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Platform</h4>
              <a href="#">Placement Mgmt</a>
              <a href="#">Verification Hub</a>
              <a href="#">Talent Discovery</a>
              <a href="#">API Access</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Partner Network</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
