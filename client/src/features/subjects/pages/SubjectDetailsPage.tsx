import { Link, useNavigate, useParams } from 'react-router-dom';

import { useSubject } from '../hooks/useSubject';

function SubjectDetailsPage() {
  const { subjectId } = useParams();

  const navigate = useNavigate();

  const id = Number(subjectId);

  const {
    data: subject,
    isLoading,
    isError,
  } = useSubject(id);

  if (isLoading) {
    return <p>Loading subject...</p>;
  }

  if (isError || !subject) {
    return (
      <div>
        <div className="alert alert-danger">
          Subject not found.
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => navigate('/subjects')}
        >
          Back to Subjects
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <Link
            to="/subjects"
            className="text-decoration-none"
          >
            ← Back to Subjects
          </Link>

          <div className="d-flex align-items-center gap-3 mt-3">
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor:
                  subject.color || '#0d6efd',
              }}
            />

            <div>
              <h2 className="mb-1">
                {subject.name}
              </h2>

              <p className="text-muted mb-0">
                {subject.description ||
                  'No description'}
              </p>
            </div>
          </div>
        </div>

        <span className="badge bg-secondary fs-6">
          {subject._count?.notes ?? 0} Notes
        </span>
      </div>

      {/* Notes section */}
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">
              Notes
            </h4>

            <button
              className="btn btn-primary"
              disabled
            >
              + Add Note
            </button>
          </div>

          <div className="text-center py-5">
            <h5>No notes yet</h5>

            <p className="text-muted mb-0">
              Add your first note to this subject.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubjectDetailsPage;