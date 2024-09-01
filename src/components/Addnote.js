import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "Default" });

    const handleClick = (e) => {
        e.preventDefault(); // Prevents the page from refreshing
        addNote(note.title, note.description, note.tag); // Calls the context function to add the note
        setNote({ title: "", description: "", tag: "Default" }); // Resets the form fields after submission
        props.showAlert("Note added successfully","success")
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
  return (
    <div className="container my-3">
            <h2>Add a Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title<span style={{"color":"red"}}>*</span></label>
                    <input placeholder='Minimum 5 characters' type="text" className="form-control" id="title" name="title" value={note.title} onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description<span style={{"color":"red"}}>*</span></label>
                    <input placeholder='Minimum 5 characters' type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-success" onClick={handleClick}>Add Note</button>
            </form>
        </div>
  )
}

export default Addnote
