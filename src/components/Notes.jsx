import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext";
import AddNotes from './AddNotes';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';
function Notes(props) {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, user, getUser } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
      getUser();
    } else {
      navigate('/login');
    }

    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }

  const handleSubmit = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated Successfylly", 'success');
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='container text-end'><h3>Welcome {user.name}</h3></div>
      <AddNotes showAlert={props.showAlert} />
      {/* edit notes in modal */}

      {/* <!-- Button trigger modal --> */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="title" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} aria-describedby="tag" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" placeholder="Enter the Description" id="edescription" name='edescription' value={note.edescription} style={{ height: "100px" }} onChange={onChange}></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 1 || note.edescription.length < 1} type="button" className="btn btn-primary" onClick={handleSubmit}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <h2>Your Notes</h2>
          <div className="container my-2">{notes.length === 0 && 'No Notes to Display'}</div>
          {notes.map((note) => {
            return (
              <div className="col-lg-4 col-md-6 col-sm-12 mx-0 my-3"
                key={note._id}
              >
                <NoteItem updateNote={updateNote} note={note} showAlert={props.showAlert} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Notes