import React from 'react';
import Editable from './Editable.jsx';
import Note from './Note.jsx';
import LaneActions from '../actions/LaneActions';

export default ({notes, onValueClick, onEdit, onDelete, onMove}) => {
    return (
        <ul className="notes">{notes.map((note) =>
                <Note className="note" id={note.id} key={note.id} onMove={onMove}>
                    <Editable
                        editing={note.editing}
                        value={note.task}
                        onValueClick={onValueClick.bind(null, note.id)}
                        onEdit={onEdit.bind(null, note.id)}
                        onDelete={onDelete.bind(null, note.id)}/>
                </Note>
        )}</ul>
    );
}
