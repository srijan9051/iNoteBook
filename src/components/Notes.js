import React, { useContext, useEffect, useRef,useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes,editNote } = context;

    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" });

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, []);


    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    };
    const handleClick = (e) => {
        console.log("updating note",note);
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click();
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const ref = useRef(null);
    const refClose = useRef(null);
    return (
        <>
            <Addnote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title<span style={{"color":"red"}}>*</span></label>
                                    <input placeholder='Minimum 5 characters' type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" onChange={onchange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description<span style={{"color":"red"}}>*</span></label>
                                    <input placeholder='Minimum 5 characters' type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onchange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onchange} />
                                </div>
                               
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container">
                    <h6>{notes.length===0 && 'No note to display'}</h6>
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
                })}
            </div>
        
        </>
    );
};

export default Notes;
