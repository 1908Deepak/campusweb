import React, { useState } from 'react';
import { 
  Building, MapPin, Calendar, Clock, CheckSquare, X,
  Banknote, Bell, HelpCircle, ChevronDown, TrendingUp, Plus
} from 'lucide-react';
import './PlacementDrive.css';

import { supabase } from '../supabaseClient';

const PlacementDrive = () => {
  const [activeView, setActiveView] = useState('list');
  const [isSaving, setIsSaving] = useState(false);
  const [drives, setDrives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch drives from Supabase
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

  // Form States
  const [driveId, setDriveId] = useState('');
  const [companyName, setCompanyName] = useState('');

  // Generate Unique Drive ID
  React.useEffect(() => {
    if (activeView === 'create') {
      const year = new Date().getFullYear();
      const random = Math.floor(1000 + Math.random() * 9000);
      setDriveId(`DRIVE-${year}-${random}`);
    }
  }, [activeView]);
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [driveType, setDriveType] = useState('Virtual');
  const [driveDate, setDriveDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('23:59');
  const [joiningDate, setJoiningDate] = useState('');
  const [minCgpa, setMinCgpa] = useState('');
  const [backlogs, setBacklogs] = useState('Not Allowed');
  const [stipend, setStipend] = useState('');
  const [minCtc, setMinCtc] = useState('');
  const [maxCtc, setMaxCtc] = useState('');
  const [bondDetails, setBondDetails] = useState('No Bond');
  const [streams, setStreams] = useState(['Computer Science', 'IT']);
  const [pipelineSteps, setPipelineSteps] = useState([
    { id: 1, title: 'Resume Screening', description: 'Initial shortlist based on CGPA and relevant projects', duration: '2 Days' }
  ]);

  const handleSave = async (status) => {
    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from('placement_drives')
        .insert([
          {
            drive_id: driveId,
            company_name: companyName,
            job_title: jobTitle,
            location,
            drive_type: driveType,
            drive_date: driveDate,
            deadline: `${deadline}T${deadlineTime}:00`, // Combine date and time
            joining_date: joiningDate,
            min_cgpa: parseFloat(minCgpa) || 0,
            backlogs,
            stipend,
            min_ctc: parseFloat(minCtc) || 0,
            max_ctc: parseFloat(maxCtc) || 0,
            bond_details: bondDetails,
            streams,
            pipeline: pipelineSteps,
            status: status // 'draft' or 'published'
          }
        ]);

      if (error) throw error;
      
      alert(`Drive ${status === 'published' ? 'Published' : 'Saved as Draft'} successfully!`);
      fetchDrives(); // Refresh the list
      if (status === 'published') {
        setActiveView('list');
      }
    } catch (error) {
      console.error('Error saving drive:', error);
      alert('Failed to save drive. Make sure the "placement_drives" table exists in your Supabase database.');
    } finally {
      setIsSaving(false);
    }
  };

  const addStep = () => {
    const newId = pipelineSteps.length > 0 ? Math.max(...pipelineSteps.map(s => s.id)) + 1 : 1;
    setPipelineSteps([...pipelineSteps, { id: newId, title: '', description: '', duration: '' }]);
  };

  const removeStep = (id) => {
    setPipelineSteps(pipelineSteps.filter(step => step.id !== id));
  };

  const updateStep = (id, field, value) => {
    setPipelineSteps(pipelineSteps.map(step => 
      step.id === id ? { ...step, [field]: value } : step
    ));
  };

  return (
    <div className="placement-container">
      {/* Top Header Row */}
      <div className="placement-header-row">
        <div className="placement-breadcrumb">
          <strong 
            onClick={() => setActiveView('list')} 
            style={{ cursor: 'pointer', color: activeView === 'list' ? 'var(--secondary)' : 'inherit' }}
          >
            Placements
          </strong>
          {activeView === 'create' && (
            <>
              <span className="slash">/</span>
              <span 
                className="active-crumb active"
                style={{ cursor: 'pointer' }}
              >
                Create New Drive
              </span>
            </>
          )}
        </div>
        <div className="placement-top-actions">
          <button className="icon-btn-simple"><Bell size={18} /></button>
          <button className="icon-btn-simple"><HelpCircle size={18} /></button>
          <button 
            className="btn-draft" 
            onClick={() => handleSave('draft')}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save as Draft'}
          </button>
          <button 
            className="btn-publish" 
            onClick={() => handleSave('published')}
            disabled={isSaving}
          >
            {isSaving ? 'Publishing...' : 'Publish Drive'} <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="placement-content-grid">
        {activeView === 'create' ? (
          <div className="placement-form">
            <h1>Create Placement Drive</h1>
            <p className="placement-subtitle">
              Fill out the essential details to configure and publish a new hiring event for students.
            </p>

            {/* Basic Information */}
            <div className="form-card">
              <div className="form-card-title">
                <Building size={18} color="var(--secondary)" /> Basic Information
              </div>
              
              <div className="form-row">
                <div className="form-group" style={{ flex: 0.5 }}>
                  <label>Drive ID</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={driveId}
                    readOnly
                    style={{ background: 'var(--surface-container-lowest)', cursor: 'not-allowed', fontWeight: 600, color: 'var(--secondary)' }}
                  />
                </div>
                <div className="form-group" style={{ flex: 1.5 }}>
                  <label>Company Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Acme Corp" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Job Title</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Software Engineer" 
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Job Location</label>
                  <div className="input-with-icon">
                    <MapPin size={16} className="input-icon" />
                    <input 
                      type="text" 
                      placeholder="City" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Drive Type</label>
                  <div className="toggle-group">
                    <button 
                      className={`toggle-btn ${driveType === 'On-Campus' ? 'active' : ''}`}
                      onClick={() => setDriveType('On-Campus')}
                    >
                      On-Campus
                    </button>
                    <button 
                      className={`toggle-btn ${driveType === 'Virtual' ? 'active' : ''}`}
                      onClick={() => setDriveType('Virtual')}
                    >
                      Virtual
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Drive Date</label>
                  <div className="input-with-icon">
                    <Calendar size={16} className="input-icon" />
                    <input 
                      type="date" 
                      value={driveDate}
                      onChange={(e) => setDriveDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Date of Joining</label>
                  <div className="input-with-icon">
                    <Calendar size={16} className="input-icon" />
                    <input 
                      type="date" 
                      value={joiningDate}
                      onChange={(e) => setJoiningDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-row" style={{ marginBottom: 0 }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Deadline Date</label>
                  <div className="input-with-icon">
                    <Clock size={16} className="input-icon" />
                    <input 
                      type="date" 
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group" style={{ flex: 0.5 }}>
                  <label>Time</label>
                  <input 
                    type="time" 
                    className="form-input" 
                    value={deadlineTime}
                    onChange={(e) => setDeadlineTime(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Any Bond or Fee</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 2 Years / No" 
                    value={bondDetails}
                    onChange={(e) => setBondDetails(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Hiring Pipeline Steps */}
            {/* ... */}
            <div className="form-card">
              <div className="form-card-title" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={18} color="var(--secondary)" /> Hiring Pipeline Steps
                </div>
                <button className="add-step-link" onClick={addStep}>
                  <Plus size={14} /> Add Step
                </button>
              </div>

              <div className="pipeline-steps-list">
                {pipelineSteps.map((step, index) => (
                  <div key={step.id} className="pipeline-step-row">
                    <div className="step-number">{index + 1}</div>
                    <div className="step-inputs">
                      <input 
                        type="text" 
                        className="form-input step-title" 
                        placeholder="Step Title (e.g. Technical Interview)" 
                        value={step.title}
                        onChange={(e) => updateStep(step.id, 'title', e.target.value)}
                      />
                      <input 
                        type="text" 
                        className="form-input step-desc" 
                        placeholder="Details or requirements..." 
                        value={step.description}
                        onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                      />
                      <input 
                        type="text" 
                        className="form-input step-duration" 
                        placeholder="Duration (e.g. 2 Days)" 
                        value={step.duration}
                        onChange={(e) => updateStep(step.id, 'duration', e.target.value)}
                      />
                    </div>
                    <button className="remove-step-btn" onClick={() => removeStep(step.id)}>
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Eligibility */}
            <div className="form-card">
              <div className="form-card-title">
                <CheckSquare size={18} color="var(--secondary)" /> Academic Eligibility
              </div>
              
              <div className="form-row" style={{ marginBottom: 0 }}>
                <div className="form-group" style={{ flex: 2 }}>
                  <label>Target Streams</label>
                  <div className="tags-input-container">
                    {streams.map((stream, idx) => (
                      <span key={idx} className="tag">
                        {stream} <X size={14} className="tag-close" onClick={() => setStreams(streams.filter(s => s !== stream))} />
                      </span>
                    ))}
                    <button className="add-tag-btn" onClick={() => {
                      const newStream = prompt('Enter new stream:');
                      if (newStream) setStreams([...streams, newStream]);
                    }}>+ Add Stream</button>
                  </div>
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Min. CGPA</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 7.5" 
                    value={minCgpa}
                    onChange={(e) => setMinCgpa(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Backlogs</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Not Allowed" 
                    value={backlogs}
                    onChange={(e) => setBacklogs(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Compensation Details */}
            <div className="form-card" style={{ marginBottom: 40 }}>
              <div className="form-card-title">
                <Banknote size={18} color="var(--secondary)" /> Compensation Details
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Internship Stipend</label>
                  <div className="input-with-icon">
                    <span className="input-icon">₹</span>
                    <input 
                      type="text" 
                      placeholder="Per month" 
                      value={stipend}
                      onChange={(e) => setStipend(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Min CTC (LPA)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 12" 
                    value={minCtc}
                    onChange={(e) => setMinCtc(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Max CTC (LPA)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 18" 
                    value={maxCtc}
                    onChange={(e) => setMaxCtc(e.target.value)}
                  />
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="placement-list-container" style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h1>Active Placement Drives</h1>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '14px' }}>Manage all ongoing and upcoming campus hiring events.</p>
              </div>
              <button 
                className="btn-publish" 
                onClick={() => setActiveView('create')}
              >
                + Create New Drive
              </button>
            </div>
            
            <div className="drives-table-card" style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--outline-variant)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: 'var(--surface-container-lowest)', borderBottom: '1px solid var(--outline-variant)' }}>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '16px', fontSize: '12px', color: 'var(--on-surface-variant)' }}>DRIVE ID</th>
                    <th style={{ textAlign: 'left', padding: '16px', fontSize: '12px', color: 'var(--on-surface-variant)' }}>COMPANY</th>
                    <th style={{ textAlign: 'left', padding: '16px', fontSize: '12px', color: 'var(--on-surface-variant)' }}>JOB TITLE</th>
                    <th style={{ textAlign: 'left', padding: '16px', fontSize: '12px', color: 'var(--on-surface-variant)' }}>DATE</th>
                    <th style={{ textAlign: 'left', padding: '16px', fontSize: '12px', color: 'var(--on-surface-variant)' }}>STATUS</th>
                    <th style={{ textAlign: 'left', padding: '16px', fontSize: '12px', color: 'var(--on-surface-variant)' }}>APPLICANTS</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: 'var(--on-surface-variant)' }}>Loading drives...</td>
                    </tr>
                  ) : drives.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: 'var(--on-surface-variant)' }}>No active drives found. Create one to get started!</td>
                    </tr>
                  ) : (
                    drives.map((drive) => (
                      <tr key={drive.id} style={{ borderBottom: '1px solid var(--outline-variant)' }}>
                        <td style={{ padding: '16px', fontSize: '13px', color: 'var(--secondary)', fontWeight: 600 }}>{drive.drive_id}</td>
                        <td style={{ padding: '16px', fontWeight: 600 }}>{drive.company_name}</td>
                        <td style={{ padding: '16px' }}>{drive.job_title}</td>
                        <td style={{ padding: '16px' }}>{drive.drive_date}</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ 
                            padding: '4px 8px', 
                            borderRadius: '4px', 
                            fontSize: '11px', 
                            fontWeight: 700,
                            background: drive.status === 'published' ? '#f0fdf4' : '#f1f5f9',
                            color: drive.status === 'published' ? '#166534' : '#475569'
                          }}>
                            {drive.status.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '16px' }}>0 students</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacementDrive;
