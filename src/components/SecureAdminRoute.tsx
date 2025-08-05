import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SecureAdminRouteProps {
  children: React.ReactNode;
}

const SecureAdminRoute: React.FC<SecureAdminRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const adminToken = localStorage.getItem("adminToken");
      
      if (!adminToken) {
        navigate("/admin/login");
        return;
      }

      try {
        // Basic JWT structure validation
        const parts = adminToken.split('.');
        if (parts.length !== 3) {
          throw new Error('Invalid token format');
        }

        // Decode payload to check expiration
        const payload = JSON.parse(atob(parts[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (payload.exp && payload.exp < currentTime) {
          throw new Error('Token expired');
        }

        // Verify admin role
        if (payload.role !== 'admin') {
          throw new Error('Insufficient permissions');
        }

        setIsValid(true);
      } catch (error) {
        console.error('Token validation failed:', error);
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        navigate("/admin/login");
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [navigate]);

  if (isValidating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Validating access...</p>
        </div>
      </div>
    );
  }

  if (!isValid) {
    return null;
  }

  return <>{children}</>;
};

export default SecureAdminRoute;