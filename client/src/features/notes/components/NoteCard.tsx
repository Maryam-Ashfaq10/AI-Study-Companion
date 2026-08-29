import { useNavigate } from 'react-router-dom';

import type {
  Note,
} from '../types/note.types';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
}

function NoteCard({
  note,
  onEdit,
  onDelete,
}: NoteCardProps) {
  const navigate = useNavigate();

  return (
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">
          {note.title}
        </h5>

        <p
          className="card-text text-muted"
          style={{
            whiteSpace: 'pre-line',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {note.content}
        </p>

        <small className="text-muted">
          Updated{' '}
          {new Date(
            note.updatedAt
          ).toLocaleDateString()}
        </small>
      </div>

      <div className="card-footer bg-white border-0">
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() =>
              navigate(`/subjects/${note.subjectId}/notes/${note.id}`)
            }
          >
            View
          </button>

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => onEdit(note)}
          >
            Edit
          </button>

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(note)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;