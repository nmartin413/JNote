var config = jnote.config;

var enablePageAction = document.getElementById('enablePageAction');
var enableNotifications = document.getElementById('enableNotifications');
var delay = document.getElementById('delay');
var maxNotes = document.getElementById('maxNotes');

enablePageAction.checked = config.enablePageAction;
enableNotifications.checked = config.enableNotifications;
delay.value = config.delay;
maxNotes.value = config.maxNotes;


enablePageAction.addEventListener('change', function () {
	localStorage.enablePageAction = enablePageAction.checked;
});

enableNotifications.addEventListener('change', function () {
	localStorage.enableNotifications = enableNotifications.checked;
});

delay.addEventListener('change', function () {
	localStorage.delay = delay.value;
});

maxNotes.addEventListener('change', function () {
	localStorage.maxNotes = maxNotes.value;
});