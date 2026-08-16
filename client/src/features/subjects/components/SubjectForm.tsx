import {
  useEffect,
} from 'react';

import {
  useForm,
} from 'react-hook-form';

import {
  zodResolver,
} from '@hookform/resolvers/zod';

import {
  subjectSchema,
 type SubjectFormData,
} from '../validation/subject.schema';

import type {
  Subject,
} from '../types/subject.types';

interface SubjectFormProps {
  subject?: Subject | null;
  onSubmit: (
    data: SubjectFormData
  ) => void;
  isSubmitting?: boolean;
}

function SubjectForm({
  subject,
  onSubmit,
  isSubmitting = false,
}: SubjectFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),

    defaultValues: {
      name: '',
      description: '',
      color: '#0d6efd',
    },
  });

  useEffect(() => {
    if (subject) {
      reset({
        name: subject.name,
        description: subject.description || '',
        color: subject.color || '#0d6efd',
      });
    } else {
      reset({
        name: '',
        description: '',
        color: '#0d6efd',
      });
    }
  }, [subject, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">
          Subject Name
        </label>

        <input
          className={`form-control ${
            errors.name
              ? 'is-invalid'
              : ''
          }`}
          {...register('name')}
        />

        {errors.name && (
          <div className="invalid-feedback">
            {errors.name.message}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">
          Description
        </label>

        <textarea
          rows={3}
          className={`form-control ${
            errors.description
              ? 'is-invalid'
              : ''
          }`}
          {...register('description')}
        />

        {errors.description && (
          <div className="invalid-feedback">
            {errors.description.message}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="form-label">
          Color
        </label>

        <input
          type="color"
          className="form-control form-control-color"
          {...register('color')}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? 'Saving...'
          : subject
            ? 'Update Subject'
            : 'Create Subject'}
      </button>
    </form>
  );
}

export default SubjectForm;