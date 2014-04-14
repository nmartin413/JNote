// Notifier for HTML5 (Webkit) Notifications

jnote.createWebkitNotifier = function () {
	var config = jnote.config;

	var self = {};
	var currentNotes = [];

	// Private
	// ----------------------

	function showNote(note) {
		currentNotes.push(note);
		note.show();

		setTimeout(function () {
			note.close();
			currentNotes = _(currentNotes).without(note);
		}, config.delay);
	}

	function closeOldestNote() {
		var note = currentNotes.shift();
		note.close();
	}

	// Properties
	// ----------------------

	var props = {
		openCount: {
			get: function () { return currentNotes.length; }
		}
	};
	
	// Public
	// ----------------------

	self.addNote = function (error) {
		var icon = "bang_128.png";
		var title = error.shortFilename + " @ line " + error.line;
		var text = error.text;
		var note = webkitNotifications.createNotification(icon, title, text);
		showNote(note);
	}


	self.closeAllNotes = function() {
		while(currentNotes.length !== 0) {
			closeOldestNote();
		}
	}

	Object.defineProperties(self, props);
	return self;
}