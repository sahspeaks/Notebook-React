import React, { useContext } from 'react';
import noteContext from "../context/notes/noteContext";

function NoteItem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <>
            <div className="container">
                <div className="card" >
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title">{note.title}</h5>
                            <button type="button" className="btn btn-light mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", 'success'); }} ><i className="fa-regular fa-trash-can"></i></button>
                            <button type="button" className="btn btn-light mx-2" onClick={() => { updateNote(note) }}><i className="fa-regular fa-pen-to-square"></i></button>
                        </div>
                        <p className="card-text">{note.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem