import { Link, Navigate } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container">
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">
                AI Study Buddy
              </h2>

              <LoginForm />

              <div className="text-center mt-3">
                Don't have an account?{' '}
                <Link to="/register">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;