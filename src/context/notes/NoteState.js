import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial=
  [
    {
      "_id": "66cec9fc3fec794739694ee7e",
      "user": "66cae9b04f1d274c206811fe",
      "title": "My Title updated",
      "description": "read a good book",
      "tag": "personal",
      "date": "2024-08-28T06:54:59.390Z",
      "__v": 0
    },
    {
      "_id": "66cec9ec3fec794739694ee7e",
      "user": "66cae9b04f1d274c206811fe",
      "title": "My Title updated",
      "description": "read a good book",
      "tag": "personal",
      "date": "2024-08-28T06:54:59.390Z",
      "__v": 0
    },
    {
      "_id": "66cec9cd3fec794739694ee7e",
      "user": "66cae9b04f1d274c206811fe",
      "title": "My Title updated",
      "description": "read a good book",
      "tag": "personal",
      "date": "2024-08-28T06:54:59.390Z",
      "__v": 0
    },
    {
      "_id": "66cec9c3cfec794739694ee7e",
      "user": "66cae9b04f1d274c206811fe",
      "title": "My Title updated",
      "description": "read a good book",
      "tag": "personal",
      "date": "2024-08-28T06:54:59.390Z",
      "__v": 0
    },
    {
      "_id": "66cec9c3fbec794739694ee7e",
      "user": "66cae9b04f1d274c206811fe",
      "title": "My Title updated",
      "description": "read a good book",
      "tag": "personal",
      "date": "2024-08-28T06:54:59.390Z",
      "__v": 0
    },
    {
      "_id": "66d00ff03996a32a387bd014c",
      "user": "66cae9b04f1d274c206811fe",
      "title": "My Title2",
      "description": "wake up early again",
      "tag": "personal",
      "date": "2024-08-29T06:06:40.105Z",
      "__v": 0
    }
  ]
  const[notes,setNotes] = useState(notesInitial)

  //Add a Note
   const addNote=(title,description,tag)=>{
    //TODO API call
    const note={
      "_id": "66d00ff03996a32a387bd014c",
      "user": "66cae9b04f1d274c206811fe",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-08-29T06:06:40.105Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
   }
  //Delete a Note
  const deleteNote=()=>{
    
  }

  //Edit a Note
  const editNote=()=>{
    
  }

  return (
    <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;