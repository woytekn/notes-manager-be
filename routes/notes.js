const express = require("express");
const Note = require("../models/Note");
const router = express.Router();

// GET all notes
router.get("/", async (req, res) => {
	try {
		const notes = await Note.find();
		res.json(notes);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// POST a new note
router.post("/", async (req, res) => {
	const note = new Note({
		title: req.body.title,
		content: req.body.content,
	});

	try {
		const newNote = await note.save();
		res.status(201).json(newNote);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// GET a single note by ID
router.get("/:id", async (req, res) => {
	try {
		const note = await Note.findById(req.params.id);
		if (!note) {
			return res.status(404).json({ message: "Note not found" });
		}
		res.json(note);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// DELETE a note
router.delete("/:id", async (req, res) => {
	try {
		const result = await Note.deleteOne({ _id: req.params.id }); // Usuwa dokument o określonym ID
		if (result.deletedCount === 0) {
			return res.status(404).send("Note not found");
		}
		res.status(200).send("Note deleted");
	} catch (err) {
		res.status(500).send(err);
	}
});

// PUT - Edit note
router.put("/:id", async (req, res) => {
	try {
		const note = await Note.findById(req.params.id);
		if (!note) {
			return res.status(404).json({ message: "Note not found" });
		}

		if (req.body.title != null) {
			note.title = req.body.title;
		}
		if (req.body.content != null) {
			note.content = req.body.content;
		}

		const updatedNote = await note.save();
		res.json(updatedNote);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;
