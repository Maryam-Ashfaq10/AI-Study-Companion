import { Link, useNavigate, useParams } from 'react-router-dom';

import { useNote } from '../hooks/useNote';

function NoteDetailsPage() {
  const { subjectId, noteId } = useParams();

  const navigate = useNavigate();

  const subjectIdNumber = Number(subjectId);
  const noteIdNumber = Number(noteId);

  const {
    data: note,
    isLoading,
    isError,
  } = useNote(noteIdNumber);

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
            navigate(`/subjects/${subjectIdNumber}`)
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
          ← Back to {note.subject?.name || 'Subject'}
        </Link>
      </div>

      {/* Note */}

      <div className="card">
        <div className="card-body p-4">
          <h2 className="mb-3">
            {note.title}
          </h2>

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
    </>
  );
}

export default NoteDetailsPage;