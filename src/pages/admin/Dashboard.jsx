import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getContentByType, createContent, updateContent, deleteContent } from '../../api/content';
import './Admin.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('about');
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    bio: '',
    year: '',
    duration: '',
    country: '',
    website: '',
    order: 0
  });
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    fetchContent();
  }, [activeTab]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const data = await getContentByType(activeTab);
      setContent(data);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/olho-admin');
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      bio: '',
      year: '',
      duration: '',
      country: '',
      website: '',
      order: 0
    });
    setImageFile(null);
    setVideoFile(null);
    setEditingItem(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      bio: item.bio || '',
      year: item.year || '',
      duration: item.duration || '',
      country: item.country || '',
      website: item.website || '',
      order: item.order || 0
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('type', activeTab);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('bio', formData.bio);
    data.append('year', formData.year);
    data.append('duration', formData.duration);
    data.append('country', formData.country);
    data.append('website', formData.website);
    data.append('order', formData.order);
    
    if (imageFile) data.append('image', imageFile);
    if (videoFile) data.append('video', videoFile);

    try {
      if (editingItem) {
        await updateContent(editingItem._id, data);
      } else {
        await createContent(data);
      }
      resetForm();
      fetchContent();
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteContent(id);
        fetchContent();
      } catch (error) {
        console.error('Error deleting content:', error);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-logo">
          <h1>OLHO</h1>
          <span>Backoffice</span>
        </div>
        <div className="admin-user">
          <span>{currentUser?.email}</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </header>

      <div className="admin-content">
        <nav className="admin-nav">
          <button 
            className={`nav-tab ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => { setActiveTab('about'); resetForm(); }}
          >
            About
          </button>
          <button 
            className={`nav-tab ${activeTab === 'film' ? 'active' : ''}`}
            onClick={() => { setActiveTab('film'); resetForm(); }}
          >
            Films
          </button>
          <button 
            className={`nav-tab ${activeTab === 'author' ? 'active' : ''}`}
            onClick={() => { setActiveTab('author'); resetForm(); }}
          >
            Authors
          </button>
        </nav>

        <main className="admin-main">
          <div className="admin-toolbar">
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Content</h2>
            <button 
              className="btn-add"
              onClick={() => { resetForm(); setShowForm(true); }}
            >
              + Add New
            </button>
          </div>

          {showForm && (
            <div className="content-form-overlay">
              <form onSubmit={handleSubmit} className="content-form">
                <div className="form-header">
                  <h3>{editingItem ? 'Edit' : 'Add'} {activeTab}</h3>
                  <button type="button" onClick={resetForm} className="btn-close">×</button>
                </div>

                <div className="form-body">
                  <div className="form-group">
                    <label>Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={4}
                    />
                  </div>

                  {activeTab === 'author' && (
                    <div className="form-group">
                      <label>Biography</label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        rows={4}
                      />
                    </div>
                  )}

                  <div className="form-row">
                    {activeTab === 'film' && (
                      <>
                        <div className="form-group">
                          <label>Year</label>
                          <input
                            type="number"
                            value={formData.year}
                            onChange={(e) => setFormData({...formData, year: e.target.value})}
                          />
                        </div>
                        <div className="form-group">
                          <label>Duration</label>
                          <input
                            type="text"
                            value={formData.duration}
                            onChange={(e) => setFormData({...formData, duration: e.target.value})}
                            placeholder="e.g., 12 min"
                          />
                        </div>
                      </>
                    )}
                    <div className="form-group">
                      <label>Country</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                      />
                    </div>
                  </div>

                  {activeTab === 'author' && (
                    <div className="form-group">
                      <label>Website</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                        placeholder="https://"
                      />
                    </div>
                  )}

                  <div className="form-group">
                    <label>Display Order</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                      />
                    </div>
                    <div className="form-group">
                      <label>Video</label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideoFile(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-footer">
                  <button type="button" onClick={resetForm} className="btn-cancel">Cancel</button>
                  <button type="submit" className="btn-save">
                    {editingItem ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="loading-admin">Loading...</div>
          ) : (
            <div className="content-list">
              {content.length === 0 ? (
                <div className="no-content">
                  <p>No {activeTab} content yet. Click "Add New" to create one.</p>
                </div>
              ) : (
                content.map((item) => (
                  <div key={item._id} className="content-item">
                    <div className="content-item-image">
                      {item.image ? (
                        <img src={item.image.startsWith('http') ? item.image : `http://localhost:5000${item.image}`} alt={item.title} />
                      ) : (
                        <div className="placeholder-image">No Image</div>
                      )}
                    </div>
                    <div className="content-item-info">
                      <h4>{item.title}</h4>
                      <p>{item.description?.substring(0, 100) || item.bio?.substring(0, 100)}...</p>
                      {item.year && <span className="meta">Year: {item.year}</span>}
                      {item.country && <span className="meta">Country: {item.country}</span>}
                    </div>
                    <div className="content-item-actions">
                      <button onClick={() => handleEdit(item)} className="btn-edit">Edit</button>
                      <button onClick={() => handleDelete(item._id)} className="btn-delete">Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
