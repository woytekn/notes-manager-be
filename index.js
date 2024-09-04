const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

mongoose
	.connect("mongodb://host.docker.internal:27017/notes", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
	res.send("Welcome to the Notes API!");
});

// Listen on port
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

const notesRouter = require("./routes/notes");
app.use("/api/notes", notesRouter);
