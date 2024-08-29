import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const Addnote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault(); // Prevents the page from refreshing
        addNote(note.title, note.description, note.tag); // Calls the context function to add the note
        setNote({ title: "", description: "", tag: "" }); // Resets the form fields after submission
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
  return (
    <div className="container my-3">
            <h2>Add a Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
  )
}

export default Addnote
