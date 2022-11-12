import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  //get all notes
  const getNotes = async () => {
    //API CALL
    const response = await fetch(`${host}/api/notes/getnotes`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2MjdiMGI2ZWRiNWRmOWM4MmE5ZWJkIn0sImlhdCI6MTY2NzQ4NTY2M30.n49xj3PygLPYFpSEKfhYz2L2VL1Edqf9QNS006G-GtM'
      }
    });
    const json = await response.json();
    setNotes(json);
  }

  //Add a note
  const addNote = async (title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2MjdiMGI2ZWRiNWRmOWM4MmE5ZWJkIn0sImlhdCI6MTY2NzQ4NTY2M30.n49xj3PygLPYFpSEKfhYz2L2VL1Edqf9QNS006G-GtM'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json=await response.json();
    console.log(json);

    const note = {
      "_id": "6363e2468d50b2d3fad256b8c",
      "user": "63627b0b6edb5df9c82a9ebd",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-11-03T15:46:14.176Z",
      "__v": 0
    }
    setNotes(notes.concat(note));
  }


  //Delete a note
  const deleteNote = async (id) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2MjdiMGI2ZWRiNWRmOWM4MmE5ZWJkIn0sImlhdCI6MTY2NzQ4NTY2M30.n49xj3PygLPYFpSEKfhYz2L2VL1Edqf9QNS006G-GtM'
      },
    });
    const json = response.json();
    console.log(json);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM2MjdiMGI2ZWRiNWRmOWM4MmE5ZWJkIn0sImlhdCI6MTY2NzQ4NTY2M30.n49xj3PygLPYFpSEKfhYz2L2VL1Edqf9QNS006G-GtM'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    console.log(json);
    let newNotes=JSON.parse(JSON.stringify(notes));

    //logic to edit note
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );

}
export default NoteState;