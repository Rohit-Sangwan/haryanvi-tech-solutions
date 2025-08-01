import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const adminToken = localStorage.getItem("adminToken");
  
  if (!adminToken) {
    return null; // or loading spinner
  }

  return <>{children}</>;
};

export default AdminRoute;