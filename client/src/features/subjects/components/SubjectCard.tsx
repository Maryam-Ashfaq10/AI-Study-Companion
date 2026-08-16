import { useNavigate } from 'react-router-dom';

import type { Subject } from '../types/subject.types';

interface SubjectCardProps {
  subject: Subject;
  onEdit: (subject: Subject) => void;
  onDelete: (subject: Subject) => void;
}

function SubjectCard({
  subject,
  onEdit,
  onDelete,
}: SubjectCardProps) {
  const navigate = useNavigate();

  return (
    <div className="card h-100">
      <div
        style={{
          height: '6px',
          backgroundColor: subject.color || '#0d6efd',
        }}
      />

      <div className="card-body">
        <h5 className="card-title">
          {subject.name}
        </h5>

        <p className="card-text text-muted">
          {subject.description || 'No description'}
        </p>

        <div className="mb-3">
          <span className="badge bg-secondary">
            {subject._count?.notes ?? 0} Notes
          </span>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() =>
              navigate(`/subjects/${subject.id}`)
            }
          >
            View
          </button>

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => onEdit(subject)}
          >
            Edit
          </button>

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(subject)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubjectCard;