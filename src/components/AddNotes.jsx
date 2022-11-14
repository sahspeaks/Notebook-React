import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext";

function AddNotes(props) {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Added Successfully", 'success');
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="container my-3">

                <h2>Add Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" value={note.title} className="form-control" id="title" name='title' aria-describedby="title" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" value={note.tag} className="form-control" id="tag" name='tag' aria-describedby="tag" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea value={note.description} className="form-control" placeholder="Enter the Description" id="description" name='description' style={{ height: "100px" }} onChange={onChange}></textarea>
                    </div>

                    <button disabled={note.title.length < 1 || note.description.length < 1} type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNotes