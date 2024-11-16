
import { useState } from 'react';
import AdminMenu from '../components/admin/AdminMenu.jsx';
import AdminWaiters from '../components/admin/AdminWaiters.jsx';
import AdminReviews from '../components/admin/AdminReviews.jsx';

export default function AdminPage() {
  const [activeComponent, setActiveComponent] = useState('Menu');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Menu':
        return <AdminMenu />;
      case 'Waiters':
        return <AdminWaiters />;
      case 'Reviews':
        return <AdminReviews />;
      default:
        return <AdminMenu />;
    }
  };

  return (
    <div className="container mt-4">
        <div className='row'>
            <div className="col"><h1>Admin Dashboard</h1></div>
                <div className="col">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeComponent === 'Menu' ? 'active' : ''}`}
                      onClick={() => setActiveComponent('Menu')}
                    >
                      Menu
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeComponent === 'Waiters' ? 'active' : ''}`}
                      onClick={() => setActiveComponent('Waiters')}
                    >
                      Waiters
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeComponent === 'Reviews' ? 'active' : ''}`}
                      onClick={() => setActiveComponent('Reviews')}
                    >
                      Reviews
                    </button>
                  </li>
                </ul>
            </div>

      </div>
      <div className="mt-4 row">
        {renderComponent()}
      </div>
    </div>
  );
}