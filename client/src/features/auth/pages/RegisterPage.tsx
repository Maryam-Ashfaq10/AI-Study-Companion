import { Link, Navigate, useNavigate } from 'react-router-dom';

import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../hooks/useAuth';

function RegisterPage() {
  const navigate = useNavigate();

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
                Create Account
              </h2>

              <RegisterForm
                onSuccess={() => navigate('/')}
              />

              <div className="text-center mt-3">
                Already have an account?{' '}
                <Link to="/login">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;