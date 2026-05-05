import React, { useState, useEffect } from 'react';
import { 
  Megaphone, 
  MessageSquare, 
  Code, 
  Search, 
  Filter, 
  MoreVertical, 
  Plus, 
  Calendar, 
  Link as LinkIcon, 
  Clock, 
  Globe, 
  Building,
  CheckCircle2,
  Trash2,
  Edit,
  Share2,
  FileText,
  ChevronDown,
  Bell,
  HelpCircle,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Image as ImageIcon
} from 'lucide-react';
import './PostHub.css';

const PostHub = () => {
  const [activeView, setActiveView] = useState('list');
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Fall Semester Registration Deadlines',
      excerpt: 'Important dates for course enrollment and fee payment f...',
      author: 'Registrar Office',
      type: 'Notice',
      scope: 'My College',
      status: 'Live',
      date: 'Oct 12, 2023',
      dateType: 'Published',
      icon: FileText
    },
    {
      id: 2,
      title: 'Annual Tech Symposium: CodeFest 2024',
      excerpt: 'Join universities nationwide for a 48-hour coding marath...',
      author: 'CS Department',
      type: 'Hackathon',
      scope: 'Inter-College',
      status: 'Live',
      date: 'Oct 10, 2023',
      dateType: 'Published',
      icon: Code
    },
    {
      id: 3,
      title: 'Library Hours Update - Finals Week',
      excerpt: 'The central library will remain open 24/7 starting next M...',
      author: 'Library Services',
      type: 'Announcement',
      scope: 'My College',
      status: 'Draft',
      date: 'Oct 14, 2023',
      dateType: 'Last Edited',
      icon: MessageSquare
    },
    {
      id: 4,
      title: 'Campus Parking Lot B Maintenance',
      excerpt: 'Lot B will be closed for repaving from Sept 1st to Sept 5th.',
      author: 'Facilities',
      type: 'Notice',
      scope: 'My College',
      status: 'Expired',
      date: 'Sep 06, 2023',
      dateType: 'Archived',
      icon: Building
    }
  ]);

  // Form States
  const [postTitle, setPostTitle] = useState('');
  const [category, setCategory] = useState('Notice');
  const [distribution, setDistribution] = useState('My College');
  const [audience, setAudience] = useState('All Students & Faculty');
  const [expiryDate, setExpiryDate] = useState('');
  const [regLink, setRegLink] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [content, setContent] = useState('');

  const handleCreatePost = () => {
    setActiveView('create');
  };

  const handleSavePost = (status) => {
    if (editingPost) {
      setPosts(posts.map(p => p.id === editingPost.id ? {
        ...p,
        title: postTitle || 'Untitled Post',
        excerpt: content.substring(0, 60) + '...',
        type: category,
        scope: distribution,
        status: status === 'published' ? 'Live' : 'Draft',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2023' }),
        dateType: status === 'published' ? 'Published' : 'Last Edited',
      } : p));
      setEditingPost(null);
    } else {
      const newPost = {
        id: posts.length + 1,
        title: postTitle || 'Untitled Post',
        excerpt: content.substring(0, 60) + '...',
        author: 'Admin Panel',
        type: category,
        scope: distribution,
        status: status === 'published' ? 'Live' : 'Draft',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2023' }),
        dateType: status === 'published' ? 'Published' : 'Last Edited',
        icon: category === 'Notice' ? Megaphone : category === 'Announcement' ? MessageSquare : Code
      };
      setPosts([newPost, ...posts]);
    }
    setActiveView('list');
    // Reset form
    setPostTitle('');
    setCategory('Notice');
    setDistribution('My College');
    setContent('');
  };

  const [editingPost, setEditingPost] = useState(null);

  const handleEdit = (post) => {
    setEditingPost(post);
    setPostTitle(post.title);
    setCategory(post.type);
    setDistribution(post.scope);
    setContent(post.excerpt); // Using excerpt as content for mock purposes
    setActiveView('create');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  return (
    <div className="post-hub-container">
      {/* Top Header Row */}
      <div className="ph-header-row">
        <div className="ph-breadcrumb">
          <strong 
            onClick={() => setActiveView('list')} 
            style={{ cursor: 'pointer', color: activeView === 'list' ? 'var(--secondary)' : 'inherit' }}
          >
            Post Hub
          </strong>
          {activeView === 'create' && (
            <>
              <span className="ph-slash">/</span>
              <span className="ph-active-crumb">Create New Post</span>
            </>
          )}
        </div>
        <div className="ph-top-actions">
          <button className="ph-icon-btn"><Bell size={18} /></button>
          <button className="ph-icon-btn"><HelpCircle size={18} /></button>
          {activeView === 'create' ? (
            <>
              <button className="ph-btn-secondary" onClick={() => handleSavePost('draft')}>Save as Draft</button>
              <button className="ph-btn-primary" onClick={() => handleSavePost('published')}>Publish Post</button>
              <button className="ph-btn-discard" onClick={() => setActiveView('list')}>Discard</button>
            </>
          ) : (
            <button className="ph-btn-primary" onClick={handleCreatePost}>
              <Plus size={18} /> Create New Post
            </button>
          )}
        </div>
      </div>

      <div className="ph-content">
        {activeView === 'list' ? (
          <div className="ph-list-view">
            <div className="ph-page-title">
              <h1>Content Management</h1>
              <p>Track, edit, and organize all institutional communications.</p>
              <button className="ph-export-btn">
                <Share2 size={16} /> Export CSV
              </button>
            </div>

            <div className="ph-filters-card">
              <div className="ph-filter-group">
                <label>Search Content</label>
                <div className="ph-search-input">
                  <Search size={18} />
                  <input type="text" placeholder="Title, author, keyword..." />
                </div>
              </div>
              <div className="ph-filter-group">
                <label>Post Type</label>
                <select>
                  <option>All Types</option>
                  <option>Notice</option>
                  <option>Announcement</option>
                  <option>Hackathon</option>
                </select>
              </div>
              <div className="ph-filter-group">
                <label>Distribution scope</label>
                <select>
                  <option>Any Scope</option>
                  <option>My College</option>
                  <option>Inter-College</option>
                </select>
              </div>
              <div className="ph-filter-group">
                <label>Status</label>
                <select>
                  <option>All Statuses</option>
                  <option>Live</option>
                  <option>Draft</option>
                  <option>Expired</option>
                </select>
              </div>
            </div>

            <div className="ph-table-card">
              <table className="ph-table">
                <thead>
                  <tr>
                    <th>CONTENT DETAILS</th>
                    <th>TYPE & SCOPE</th>
                    <th>STATUS</th>
                    <th>DATE INFO</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <tr key={post.id}>
                      <td className="ph-td-details">
                        <div className="ph-post-icon">
                          <post.icon size={20} />
                        </div>
                        <div>
                          <div className="ph-post-title">{post.title}</div>
                          <div className="ph-post-excerpt">{post.excerpt}</div>
                          <div className="ph-post-author"><Building size={12} /> {post.author}</div>
                        </div>
                      </td>
                      <td className="ph-td-scope">
                        <span className={`ph-type-badge ph-type-${post.type.toLowerCase()}`}>{post.type}</span>
                        <div className="ph-scope-label">{post.scope}</div>
                      </td>
                      <td>
                        <div className={`ph-status-indicator ph-status-${post.status.toLowerCase()}`}>
                          <span className="ph-dot"></span>
                          {post.status}
                        </div>
                      </td>
                      <td>
                        <div className="ph-date-val">{post.date}</div>
                        <div className="ph-date-label">{post.dateType}</div>
                      </td>
                      <td>
                        <div className="ph-table-actions">
                          <button 
                            className="ph-action-btn ph-edit-btn"
                            onClick={() => handleEdit(post)}
                            title="Edit Post"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            className="ph-action-btn ph-delete-btn"
                            onClick={() => handleDelete(post.id)}
                            title="Delete Post"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="ph-pagination">
                <span>Showing 1 to {posts.length} of 24 entries</span>
                <div className="ph-page-btns">
                  <button className="ph-page-num active">1</button>
                  <button className="ph-page-num">2</button>
                  <button className="ph-page-num">3</button>
                  <span className="ph-dots">...</span>
                  <button className="ph-page-num"><Plus size={14} style={{ transform: 'rotate(45deg)' }} /></button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="ph-create-view">
            <div className="ph-create-header">
              <h1>Draft New Post</h1>
              <p>Create and distribute updates across the academic network.</p>
            </div>

            <div className="ph-create-grid">
              <div className="ph-main-form">
                <div className="ph-form-card">
                  <div className="ph-input-group">
                    <label>POST TITLE</label>
                    <input 
                      type="text" 
                      placeholder="Enter a clear, descriptive title" 
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                    />
                  </div>

                  <div className="ph-category-selector">
                    <label>CATEGORY</label>
                    <div className="ph-category-btns">
                      <button 
                        className={`ph-cat-btn ${category === 'Notice' ? 'active' : ''}`}
                        onClick={() => setCategory('Notice')}
                      >
                        <Megaphone size={20} />
                        Notice
                      </button>
                      <button 
                        className={`ph-cat-btn ${category === 'Announcement' ? 'active' : ''}`}
                        onClick={() => setCategory('Announcement')}
                      >
                        <MessageSquare size={20} />
                        Announcement
                      </button>
                      <button 
                        className={`ph-cat-btn ${category === 'Hackathon' ? 'active' : ''}`}
                        onClick={() => setCategory('Hackathon')}
                      >
                        <Code size={20} />
                        Hackathon
                      </button>
                    </div>
                  </div>
                </div>

                <div className="ph-editor-card">
                  <div className="ph-editor-toolbar">
                    <button><Bold size={18} /></button>
                    <button><Italic size={18} /></button>
                    <button><Underline size={18} /></button>
                    <div className="ph-toolbar-divider"></div>
                    <button><List size={18} /></button>
                    <button><ListOrdered size={18} /></button>
                    <div className="ph-toolbar-divider"></div>
                    <button><LinkIcon size={18} /></button>
                    <button><ImageIcon size={18} /></button>
                  </div>
                  <textarea 
                    className="ph-editor-textarea"
                    placeholder="Compose your message here. Use clear, concise language..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <div className="ph-editor-footer">
                    <span>Markdown supported</span>
                    <span>Words: {content.split(/\s+/).filter(Boolean).length}</span>
                  </div>
                </div>
              </div>

              <div className="ph-side-config">
                <div className="ph-config-card">
                  <div className="ph-card-title"><Share2 size={18} /> Distribution</div>
                  <div className="ph-dist-toggle">
                    <button 
                      className={distribution === 'My College' ? 'active' : ''}
                      onClick={() => setDistribution('My College')}
                    >
                      My College
                    </button>
                    <button 
                      className={distribution === 'Inter-College' ? 'active' : ''}
                      onClick={() => setDistribution('Inter-College')}
                    >
                      Inter-College
                    </button>
                  </div>
                  <div className="ph-input-group mt-16">
                    <label>TARGET AUDIENCE (OPTIONAL)</label>
                    <div className="ph-select-wrapper">
                      <select value={audience} onChange={(e) => setAudience(e.target.value)}>
                        <option>All Students & Faculty</option>
                        <option>Undergraduates</option>
                        <option>Postgraduates</option>
                        <option>Faculty Only</option>
                      </select>
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>

                <div className="ph-config-card">
                  <div className="ph-card-title"><Calendar size={18} /> Event Metadata</div>
                  <div className="ph-input-group">
                    <label>EXPIRY / DEADLINE DATE</label>
                    <div className="ph-date-input">
                      <input 
                        type="date" 
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                      />
                      <Calendar size={18} className="ph-date-icon" />
                    </div>
                  </div>
                  <div className="ph-input-group">
                    <label>REGISTRATION LINK</label>
                    <div className="ph-link-input">
                      <LinkIcon size={16} />
                      <input 
                        type="text" 
                        placeholder="https://" 
                        value={regLink}
                        onChange={(e) => setRegLink(e.target.value)}
                      />
                    </div>
                  </div>
                  <label className="ph-checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={isPinned}
                      onChange={(e) => setIsPinned(e.target.checked)}
                    />
                    <span>Pin to top of feed</span>
                  </label>
                </div>

                <div className="ph-final-actions">
                  <button className="ph-btn-primary full-width" onClick={() => handleSavePost('published')}>
                    <Share2 size={18} style={{ marginRight: 8 }} /> Publish Post
                  </button>
                  <button className="ph-btn-secondary full-width" onClick={() => handleSavePost('draft')}>
                    Save as Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostHub;
