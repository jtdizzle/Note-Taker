// adding dependencies
const fs = require('fs');
const path = require('path');

//creating exporting function

module.exports = app => {

    fs.readFile("./db/db.json", "utf8", (err, data) => {

        if (err) throw err;

        const noteInput = JSON.parse(data);

        // creating get and post route for notes input

        app.get("/api/notes", function(req, res) {
            res.json(noteInput);
        });

        app.post("/api/notes", function(req, res) {
            let newNote = req.body;
            noteInput.push(newNote);
            updateDb();
            return console.log("New notes added: " + newNote.title);
        });

        //get and delete request for saved notes
        app.get("/api/notes/:id", function(req, res) {
            res.json(noteInput[req.params.id]);
        });

        app.delete("/api/notes/:id", function(req, res) {
            noteInput.splice(req.params.id, 1);
            updateDb();
            console.log("Note has been deleted, ID: " + req.params.id);
        });

        //append and display notes input to html page

        app.get('/notes', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });


        //updates db if user adds or deletes notes

        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(noteInput, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }

    });
  }