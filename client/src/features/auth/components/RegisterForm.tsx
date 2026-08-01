import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  registerSchema,
  type RegisterFormData,
} from '../validation/auth.schema';

import { useAuth } from '../hooks/useAuth';

interface RegisterFormProps {
  onSuccess?: () => void;
}

function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      onSuccess?.();
    } catch (error: any) {
      setError('root', {
        message:
          error?.response?.data?.message ??
          'Registration failed',
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
        <label className="form-label">Name</label>

        <input
          className={`form-control ${
            errors.name ? 'is-invalid' : ''
          }`}
          {...register('name')}
        />

        <div className="invalid-feedback">
          {errors.name?.message}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>

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

      <div className="mb-3">
        <label className="form-label">Password</label>

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

      <div className="mb-4">
        <label className="form-label">
          Confirm Password
        </label>

        <input
          type="password"
          className={`form-control ${
            errors.confirmPassword
              ? 'is-invalid'
              : ''
          }`}
          {...register('confirmPassword')}
        />

        <div className="invalid-feedback">
          {errors.confirmPassword?.message}
        </div>
      </div>

      <button
        className="btn btn-success w-100"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? 'Creating Account...'
          : 'Create Account'}
      </button>
    </form>
  );
}

export default RegisterForm;