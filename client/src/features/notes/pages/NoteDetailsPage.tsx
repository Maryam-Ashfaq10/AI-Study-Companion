import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDeleteNote } from '../hooks/useDeleteNote';
import { useNote } from '../hooks/useNote';
import { useUpdateNote } from '../hooks/useUpdateNote';

import NoteForm from '../components/NoteForm';

import type{
  NoteFormData,
} from '../validation/note.schema';

function NoteDetailsPage() {
  const { subjectId, noteId } = useParams();

  const deleteNoteMutation = useDeleteNote();

  const navigate = useNavigate();

  const subjectIdNumber = Number(subjectId);
  const noteIdNumber = Number(noteId);

  const [isEditing, setIsEditing] = useState(false);

  const {
    data: note,
    isLoading,
    isError,
  } = useNote(noteIdNumber);

  const updateNoteMutation = useUpdateNote();

  const handleUpdate = async (
    data: NoteFormData
  ) => {
    if (!note) {
      return;
    }

    try {
      await updateNoteMutation.mutateAsync({
        id: note.id,

        payload: {
          ...data,
          subjectId: note.subjectId,
        },
      });

      setIsEditing(false);
    } catch (error) {
      console.error(
        'Failed to update note:',
        error
      );
    }
  };

  const handleDelete = async () => {
  if (!note) {
    return;
  }

  const confirmed = window.confirm(
    `Are you sure you want to delete "${note.title}"?`
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteNoteMutation.mutateAsync(
      note.id
    );

    navigate(`/subjects/${note.subjectId}`);
  } catch (error) {
    console.error(
      'Failed to delete note:',
      error
    );
  }
};

  if (isLoading) {
    return <p>Loading note...</p>;
  }

  if (isError || !note) {
    return (
      <div>
        <div className="alert alert-danger">
          Note not found.
        </div>

        <button
          className="btn btn-secondary"
          onClick={() =>
            navigate(
              `/subjects/${subjectIdNumber}`
            )
          }
        >
          Back to Subject
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Back Navigation */}

      <div className="mb-4">
        <Link
          to={`/subjects/${subjectIdNumber}`}
          className="text-decoration-none"
        >
          ← Back to{' '}
          {note.subject?.name || 'Subject'}
        </Link>
      </div>

      {/* Edit Mode */}

      {isEditing ? (
        <div className="card">
          <div className="card-body p-4">
            <h2 className="mb-4">
              Edit Note
            </h2>

            <NoteForm
              note={note}
              onSubmit={handleUpdate}
              isSubmitting={
                updateNoteMutation.isPending
              }
              onCancel={() =>
                setIsEditing(false)
              }
            />
          </div>
        </div>
      ) : (
        /* View Mode */

        <div className="card">
          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-start mb-3">
              <h2 className="mb-0">
                {note.title}
              </h2>

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  setIsEditing(true)
                }
              >
                Edit
              </button>
            </div>

            <div className="text-muted mb-4">
              Updated{' '}
              {new Date(
                note.updatedAt
              ).toLocaleString()}
            </div>

            <hr />

            <div
              className="mt-4"
              style={{
                whiteSpace: 'pre-wrap',
              }}
            >
              {note.content}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NoteDetailsPage;