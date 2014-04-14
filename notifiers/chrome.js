// Notifier for Chrome notifications

jnote.createChromeNotifier = function () {
	var config = jnote.config;

	var self = {};
	var activeNoteIds = self.activeNoteIds = [];

	// Private
	// ----------------------

	function createNotificationId() {
		return new Date().getTime().toString();
	}

	function optionsFromError(error) {
		var opts = {
			type: 'basic',
			title: error.title,
			message: error.text,
			iconUrl: error.icon
		};
		return opts;
	}

	function onNoteCreate(noteId) {
		activeNoteIds.push(noteId);
		_(closeNote).chain().bind(null, noteId).delay(config.delay);
	}

	function closeNote(noteId) {
		console.log("Closing Notification %o", noteId);
		chrome.notifications.clear(noteId, function () {
			activeNoteIds = _(activeNoteIds).without(noteId);
		});
	}

	// Properties
	// ----------------------

	var props = {
		openCount: {
			get: function () { return activeNoteIds.length; }
		}
	};

	// Public
	// ----------------------

	self.addNote =  function(error) {
		var opts = optionsFromError(error);
		var id = createNotificationId();

		var note = chrome.notifications.create(id, opts, onNoteCreate);
	}

	self.closeAllNotes =  function() {
		_(activeNoteIds).each(closeNote);
	}

	Object.defineProperties(self, props);
	return self;
}