import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { loginSchema, type LoginFormData } from '../validation/auth.schema';
import { useAuth } from '../hooks/useAuth';

function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);

      navigate('/');
    } catch (error: any) {
      setError('root', {
        message:
          error?.response?.data?.message ??
          'Unable to login. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {errors.root && (
        <div className="alert alert-danger">
          {errors.root.message}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">
          Email
        </label>

        <input
          type="email"
          className={`form-control ${
            errors.email ? 'is-invalid' : ''
          }`}
          {...register('email')}
        />

        <div className="invalid-feedback">
          {errors.email?.message}
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label">
          Password
        </label>

        <input
          type="password"
          className={`form-control ${
            errors.password ? 'is-invalid' : ''
          }`}
          {...register('password')}
        />

        <div className="invalid-feedback">
          {errors.password?.message}
        </div>
      </div>

      <button
        className="btn btn-primary w-100"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing In...' : 'Login'}
      </button>
    </form>
  );
}

export default LoginForm;