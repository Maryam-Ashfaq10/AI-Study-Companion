import { useEffect } from 'react';

import {
  useForm,
} from 'react-hook-form';

import {
  zodResolver,
} from '@hookform/resolvers/zod';

import {
  noteSchema,
 type NoteFormData,
} from '../validation/note.schema';

import type{
  Note,
} from '../types/note.types';

interface NoteFormProps {
  note?: Note | null;

  onSubmit: (
    data: NoteFormData
  ) => void;

  isSubmitting?: boolean;

  onCancel?: () => void;
}

function NoteForm({
  note,
  onSubmit,
  isSubmitting = false,
  onCancel,
}: NoteFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),

    defaultValues: {
      title: '',
      content: '',
    },
  });

  useEffect(() => {
    if (note) {
      reset({
        title: note.title,
        content: note.content,
      });
    } else {
      reset({
        title: '',
        content: '',
      });
    }
  }, [note, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">
          Note Title
        </label>

        <input
          type="text"
          className={`form-control ${
            errors.title
              ? 'is-invalid'
              : ''
          }`}
          {...register('title')}
        />

        {errors.title && (
          <div className="invalid-feedback">
            {errors.title.message}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">
          Content
        </label>

        <textarea
          rows={10}
          className={`form-control ${
            errors.content
              ? 'is-invalid'
              : ''
          }`}
          {...register('content')}
        />

        {errors.content && (
          <div className="invalid-feedback">
            {errors.content.message}
          </div>
        )}
      </div>

      <div className="d-flex gap-2">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Saving...'
            : note
              ? 'Update Note'
              : 'Create Note'}
        </button>

        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;