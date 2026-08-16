import { useState } from 'react';

import SubjectCard from '../components/SubjectCard';
import SubjectForm from '../components/SubjectForm';

import { useSubjects } from '../hooks/useSubjects';
import { useCreateSubject } from '../hooks/useCreateSubject';
import { useUpdateSubject } from '../hooks/useUpdateSubject';
import { useDeleteSubject } from '../hooks/useDeleteSubject';

import type { Subject } from '../types/subject.types';

import type {
  SubjectFormData,
} from '../validation/subject.schema';

function SubjectsPage() {
  const [showForm, setShowForm] =
    useState(false);

  const [editingSubject, setEditingSubject] =
    useState<Subject | null>(null);

  const {
    data: subjects,
    isLoading,
    isError,
  } = useSubjects();

  const createMutation =
    useCreateSubject();

  const updateMutation =
    useUpdateSubject();

  const deleteMutation =
    useDeleteSubject();

  const handleSubmit = async (
    data: SubjectFormData
  ) => {
    if (editingSubject) {
      await updateMutation.mutateAsync({
        id: editingSubject.id,
        payload: data,
      });
    } else {
      await createMutation.mutateAsync(data);
    }

    setShowForm(false);
    setEditingSubject(null);
  };

  const handleEdit = (
    subject: Subject
  ) => {
    setEditingSubject(subject);
    setShowForm(true);
  };

  const handleDelete = async (
    subject: Subject
  ) => {
    const confirmed = window.confirm(
      `Delete "${subject.name}"?`
    );

    if (!confirmed) {
      return;
    }

    await deleteMutation.mutateAsync(
      subject.id
    );
  };

  if (isLoading) {
    return <p>Loading subjects...</p>;
  }

  if (isError) {
    return (
      <div className="alert alert-danger">
        Failed to load subjects.
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Subjects</h2>

          <p className="text-muted mb-0">
            Organize your study material by subject.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingSubject(null);
            setShowForm(true);
          }}
        >
          + Add Subject
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="mb-4">
              {editingSubject
                ? 'Edit Subject'
                : 'Create Subject'}
            </h5>

            <SubjectForm
              subject={editingSubject}
              onSubmit={handleSubmit}
              isSubmitting={
                createMutation.isPending ||
                updateMutation.isPending
              }
            />

            <button
              type="button"
              className="btn btn-link mt-2"
              onClick={() => {
                setShowForm(false);
                setEditingSubject(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {subjects?.length === 0 ? (
        <div className="text-center py-5">
          <h5>No subjects yet</h5>

          <p className="text-muted">
            Create your first subject to get started.
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {subjects?.map((subject) => (
            <div
              className="col-md-6 col-lg-4"
              key={subject.id}
            >
              <SubjectCard
                subject={subject}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SubjectsPage;