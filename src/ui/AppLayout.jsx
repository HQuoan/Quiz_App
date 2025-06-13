// src/layouts/AppLayout.jsx
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
