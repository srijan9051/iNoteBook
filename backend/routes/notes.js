const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser=require('../middleware/fetchuser');
const Note = require("../modules/Note");

//ROUTE 1: fetching Note based on user id : GET "/api/notes/fetchallNote" Login Required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
   try {
      const notes = await Note.find({user:req.user.id})
      res.json(notes); 
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
   }
   
})
//ROUTE 2: adding Note based on user id : POST "/api/notes/addnote" Login Required
router.post('/addnote',fetchuser,[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description should have minimum 5 characters").isLength({ min: 5 }),
],async (req,res)=>{
   try {
      const { title,description,tag } = req.body;
   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const note = new Note({
      title,description,tag,user: req.user.id
    })
    const savedNote = await note.save();
   res.json(savedNote);
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
   }
   
})

//ROUTE 3: updating an existing note based on user id : PUT "/api/notes/updatenote" Login Required
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
   try {
      const {title,description,tag} =req.body;
   //create a newNote object
   const newNote = {};
   if(title){newNote.title=title};
   if(description){newNote.description=description};
   if(tag){newNote.tag=tag};

   // Find the note to be update and update it
   let note =await Note.findById(req.params.id);
   if(!note){return res.status(404).send("Not Found")}

   if(note.user.toString()!=req.user.id){
      return res.status(401).send("Not Found")
   }

   note=await Note.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true})
   res.json(note)
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
   }
   
})

//ROUTE 4: deleting an existing note based on user id : DELETE "/api/notes/deletenote" Login Required
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
   try {
       // Find the note to be update and update it
   let note =await Note.findById(req.params.id);
   if(!note){return res.status(404).send("Not Found")}

   if(note.user.toString()!=req.user.id){
      return res.status(401).send("Not Found")
   }

   note=await Note.findByIdAndDelete(req.params.id)
   res.json({"Success":"Note has been deleted",note:note})
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Occured");
   }
  

})
module.exports = router;