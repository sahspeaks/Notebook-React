const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');



//ROUTE 1: Get all the notes via GET "api/notes/getnotes" Login required
router.get('/getnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some internal server error has occured");
    }
});
//ROUTE 2: Add a new note via POST "api/notes/addnote" Login required
router.post('/addnote', fetchuser, async (req, res) => {

    try {

        const { title, description, tag } = req.body;
        //if there are errors,return bad request and the error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //creating new note and adding to DB
        const note = new Notes({
            title, description, tag, user: req.user.id
        });
        const saveNote = await note.save();

        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some internal server error has occured");
    }
});

//ROUTE 3: Update an existing note via PUT "api/notes/updatenote" Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;
    try {
        //create new note
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }
        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access Denied!!");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some internal server error has occured");
    }
});
//ROUTE 4: Delete an existing note via DELETE "api/notes/deletenote" Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
   
    try {
        //find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        //check wether this notes belong to exact user we wanna delete
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access Denied!!");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some internal server error has occured");
    }

});


module.exports = router;