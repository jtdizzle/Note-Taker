var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// function for getting notes from the db
var getNotes = function() {
    return $.ajax({
        url: "/api/notes",
        method: "GET"
    });
};

//function for saving note to db
var saveNote = function(note) {
    return $.ajax({
        url: "/api/notes",
        data: note,
        method: "POST"
    });
};

//function for deleting note from db
var deleteNote = function(id) {
    return $.ajax({
        url: "api/notes/" + id,
        method: "DELETE"
    })
};

//activeNote, display it, otherwise render empty inputs
var renderActiveNote = function() {
    $saveNoteBtn.hide();

    if (typeof activeNote.id === "number") {
        $noteTitle.attr("readonly", true);
        $noteText.attr("readonly", true);
        $noteTitle.val(activeNote.title);
        $noteText.val(activeNote.text);
    } else {
        $noteTitle.attr("readonly", false);
        $noteText.attr("readonly", false);
        $noteTitle.val("");
        $noteText.val("");
    }
};

// Get note data from inputs, save it to db and update view
var handleNoteSave = function() {
    var newNote = {
        title: $noteTitle.val(),
        text: $noteText.val()
    };

    saveNote(newNote);
    getAndRenderNotes();
    renderActiveNote();
};


var handleNoteDelete = function(event) {
    // prevents the click listener for list from being called when button inside is clicked
    event.stopPropagation();

    var note = $(this).data('id');

    if (activeNote.id === note) {
        activeNote = {};
    }

    deleteNote(note);
    getAndRenderNotes();
    renderActiveNote();
};

// Sets activeNote and displays it
var handleNoteView = function() {
    activeNote = $(this).data();
    renderActiveNote();
};

// Sets activeNote to empty object and allows the user to enter new note
var handleNewNoteView = function() {
    activeNote = {};
    renderActiveNote();
};

// note title or text are empty, hide the save button
// else show it
var handleRenderSaveBtn = function() {
    if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
        $saveNoteBtn.hide();
    } else {
        $saveNoteBtn.show();
    }
};

// Render list of note titles
var renderNoteList = function(notes) {
    $noteList.empty();

    var noteListItems = [];

    for (var i = 0; i < notes.length; i++) {
        var note = notes[i];

        var $li = $("<li class='list-group-item'>").data(note);
        $li.data('id', i);

        var $span = $("<span>").text(note.title);
        var $delBtn = $(
            "<i class='fas fa-trash-alt float-right text-danger delete-note' data-id=" + i + ">"
        );

        $li.append($span, $delBtn);
        noteListItems.push($li);
    }

    $noteList.append(noteListItems);
};

// Gets notes from db and renders them to sidebar
var getAndRenderNotes = function() {
    return getNotes().then(function(data) {
        renderNoteList(data);
    });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();