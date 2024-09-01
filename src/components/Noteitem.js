import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const {note, updateNote} = props;
  return (
    <div className='col-md-3'>
    <div className="card my-3">
    <div className="card-body">
    <span className="position-absolute top-0 start-0 mx-3 translate-middle badge rounded-pill bg-success">
    {note.tag}
    <span className="visually-hidden">unread messages</span>
</span>

      <h5 className="card-title">{note.title}</h5>
      <p className="card-text">{note.description}</p>
      <i className="fa-regular fa-trash-can mx-2"  onClick={()=>{deleteNote(note._id);props.showAlert("Deleted successfully","success")}}></i>
      <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>

    </div>
  </div>
  </div>
  )
}

export default Noteitem
