import {
    Link,
    useNavigate,
    useParams,
} from 'react-router-dom';

import { useState } from 'react';

import { useSubject } from '../hooks/useSubject';

import { useNotes } from '../../notes/hooks/useNotes';
import { useCreateNote } from '../../notes/hooks/useCreateNote';
import { useUpdateNote } from '../../notes/hooks/useUpdateNote';
import { useDeleteNote } from '../../notes/hooks/useDeleteNote';

import NoteCard from '../../notes/components/NoteCard';
import NoteForm from '../../notes/components/NoteForm';

import type {
    Note,
} from '../../notes/types/note.types';

import {
    type NoteFormData,
} from '../../notes/validation/note.schema';

function SubjectDetailsPage() {
    const { subjectId } = useParams();

    const navigate = useNavigate();

    const id = Number(subjectId);

    const [showNoteForm, setShowNoteForm] =
        useState(false);

    const [editingNote, setEditingNote] =
        useState<Note | null>(null);

    const {
        data: subject,
        isLoading: subjectLoading,
        isError: subjectError,
    } = useSubject(id);

    const {
        data: notes,
        isLoading: notesLoading,
        isError: notesError,
    } = useNotes(id);

    const createNoteMutation =
        useCreateNote();

    const updateNoteMutation =
        useUpdateNote();

    const deleteNoteMutation =
        useDeleteNote();

    const handleNoteSubmit = async (
        data: NoteFormData
    ) => {
        if (editingNote) {
            await updateNoteMutation.mutateAsync({
                id: editingNote.id,

                payload: {
                    ...data,
                    subjectId: id,
                },
            });
        } else {
            await createNoteMutation.mutateAsync({
                ...data,
                subjectId: id,
            });
        }

        setShowNoteForm(false);
        setEditingNote(null);
    };

    const handleEditNote = (
        note: Note
    ) => {
        setEditingNote(note);
        setShowNoteForm(true);
    };

    const handleDeleteNote = async (
        note: Note
    ) => {
        const confirmed = window.confirm(
            `Delete "${note.title}"?`
        );

        if (!confirmed) {
            return;
        }

        await deleteNoteMutation.mutateAsync(
              note.id,

        );
    };

    if (subjectLoading) {
        return <p>Loading subject...</p>;
    }

    if (subjectError || !subject) {
        return (
            <div>
                <div className="alert alert-danger">
                    Subject not found.
                </div>

                <button
                    className="btn btn-secondary"
                    onClick={() =>
                        navigate('/subjects')
                    }
                >
                    Back to Subjects
                </button>
            </div>
        );
    }

    return (
        <>
            {/* Subject Header */}

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
                                    subject.color ||
                                    '#0d6efd',
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
                    {notes?.length ?? 0} Notes
                </span>
            </div>

            {/* Notes */}

            <div className="card">
                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="mb-0">
                            Notes
                        </h4>

                        {!showNoteForm && (
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setEditingNote(null);
                                    setShowNoteForm(true);
                                }}
                            >
                                + Add Note
                            </button>
                        )}
                    </div>

                    {/* Note Form */}

                    {showNoteForm && (
                        <div className="card bg-light mb-4">
                            <div className="card-body">
                                <h5 className="mb-4">
                                    {editingNote
                                        ? 'Edit Note'
                                        : 'Create Note'}
                                </h5>

                                <NoteForm
                                    note={editingNote}
                                    onSubmit={
                                        handleNoteSubmit
                                    }
                                    isSubmitting={
                                        createNoteMutation.isPending ||
                                        updateNoteMutation.isPending
                                    }
                                    onCancel={() => {
                                        setShowNoteForm(false);
                                        setEditingNote(null);
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Loading */}

                    {notesLoading && (
                        <p>Loading notes...</p>
                    )}

                    {/* Error */}

                    {notesError && (
                        <div className="alert alert-danger">
                            Failed to load notes.
                        </div>
                    )}

                    {/* Empty */}

                    {!notesLoading &&
                        !notesError &&
                        notes?.length === 0 && (
                            <div className="text-center py-5">
                                <h5>No notes yet</h5>

                                <p className="text-muted">
                                    Add your first note to this
                                    subject.
                                </p>
                            </div>
                        )}

                    {/* Notes */}

                    {!notesLoading &&
                        !notesError &&
                        notes &&
                        notes.length > 0 && (
                            <div className="row g-4">
                                {notes.map((note) => (
                                    <div
                                        className="col-md-6 col-lg-4"
                                        key={note.id}
                                    >
                                        <NoteCard
                                            note={note}
                                            onEdit={
                                                handleEditNote
                                            }
                                            onDelete={
                                                handleDeleteNote
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                </div>
            </div>
        </>
    );
}

export default SubjectDetailsPage;