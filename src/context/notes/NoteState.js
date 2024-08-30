import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host="http://localhost:5000"
  const notesInitial=[]
  const[notes,setNotes] = useState(notesInitial)

  // Get all notes
  const getNotes =async ()=>{
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjYWU5YjA0ZjFkMjc0YzIwNjgxMWZlIn0sImlhdCI6MTcyNDc0NjMzOH0.7u63y4iZtsKq2wLxZWcuhmcSolBUlVrnI2hceIWS_U0'
      },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
   }

  //Add a Note
   const addNote=async (title,description,tag)=>{
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjYWU5YjA0ZjFkMjc0YzIwNjgxMWZlIn0sImlhdCI6MTcyNDc0NjMzOH0.7u63y4iZtsKq2wLxZWcuhmcSolBUlVrnI2hceIWS_U0'
      },
      body: JSON.stringify({title,description,tag})
    });
    const json= response.json();
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
  const deleteNote=async (id)=>{
     //TODO API call
     const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjYWU5YjA0ZjFkMjc0YzIwNjgxMWZlIn0sImlhdCI6MTcyNDc0NjMzOH0.7u63y4iZtsKq2wLxZWcuhmcSolBUlVrnI2hceIWS_U0'
      },
    });
    const json= response.json();
    console.log(json)
    console.log("Deleting node of note "+id);
    const newNotes = notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes);
  }

  //Edit a Note
  const editNote=async (id,title,description,tag)=>{
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjYWU5YjA0ZjFkMjc0YzIwNjgxMWZlIn0sImlhdCI6MTcyNDc0NjMzOH0.7u63y4iZtsKq2wLxZWcuhmcSolBUlVrnI2hceIWS_U0'
      },
      body: JSON.stringify({title,description,tag})
    });
    const json= response.json();
    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id===id){
        element.title=title;
        element.description=description;
        element.tag=tag;
      }
      
    }
  }

  return (
    <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;