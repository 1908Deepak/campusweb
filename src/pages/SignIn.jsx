import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Landmark, Briefcase, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './SignIn.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('recruiter'); // 'recruiter' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const userId = data.user.id;

    // Check against the separate tables depending on the selected role
    if (role === 'admin') {
      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('id', userId)
        .single();

      if (adminError || !adminData) {
        await supabase.auth.signOut();
        setError('Access Denied: You are not registered as an Admin.');
        setLoading(false);
        return;
      }
    } else {
      // Assuming you will eventually make a recruiters table too, but for now we just let them through or you can add similar logic here.
      // const { data: recruiterData } = await supabase.from('recruiters').select('*').eq('id', userId).single();
    }

    navigate('/dashboard');
  };

  return (
    <div className="signin-container">
      {/* Left side banner */}
      <div className="signin-left">
        <Link to="/" className="signin-logo">
          <Landmark size={32} />
          <span>Campus Connect</span>
        </Link>
        
        <div className="signin-left-content">
          <h1>
            Bridging academic<br />
            potential with industrial<br />
            excellence.
          </h1>
          <p>
            The definitive platform for institutional placement management and corporate talent acquisition.
          </p>
        </div>

        <div className="signin-stats">
          <div className="stat-item">
            <h3>500+</h3>
            <p>PARTNER INSTITUTIONS</p>
          </div>
          <div className="stat-item">
            <h3>10k+</h3>
            <p>ACTIVE RECRUITERS</p>
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="signin-right">
        <div className="signin-form-container">
          <div className="signin-header">
            <h2>Welcome back</h2>
            <p>Sign in to access your dashboard.</p>
          </div>

          <div className="role-selector">
            <div 
              className={`role-card ${role === 'recruiter' ? 'active' : ''}`}
              onClick={() => setRole('recruiter')}
            >
              <div className="role-icon">
                <Briefcase size={24} color={role === 'recruiter' ? 'var(--secondary)' : 'currentColor'} />
              </div>
              {role === 'recruiter' && <CheckCircle2 className="check-icon" size={20} fill="var(--secondary)" color="white" />}
              <h4>Recruiter Panel</h4>
              <p>Corporate Access</p>
            </div>

            <div 
              className={`role-card ${role === 'admin' ? 'active' : ''}`}
              onClick={() => setRole('admin')}
            >
              <div className="role-icon">
                <ShieldCheck size={24} color={role === 'admin' ? 'var(--secondary)' : 'currentColor'} />
              </div>
              {role === 'admin' && <CheckCircle2 className="check-icon" size={20} fill="var(--secondary)" color="white" />}
              <h4>Admin Panel</h4>
              <p>Institutional Access</p>
            </div>
          </div>

          {error && (
            <div style={{ padding: '12px', marginBottom: '24px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '6px', fontSize: '14px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <div className="form-group-header">
                <label>Work Email</label>
              </div>
              <input 
                type="email" 
                className="input-field" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <div className="form-group-header">
                <label>Password</label>
                <Link to="#" className="forgot-password">Forgot password?</Link>
              </div>
              <input 
                type="password" 
                className="input-field" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="signin-btn" disabled={loading}>
              {loading ? 'Signing in...' : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>
        </div>

        <div className="signin-footer">
          <div>© 2024 Campus Connect.</div>
          <div className="signin-footer-links">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
