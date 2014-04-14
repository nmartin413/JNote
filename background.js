// Main Background Script

console.log('\n\n');

function onInit(config, notifier) {
	if (!config) return console.error("Config not defined...");
	if (!notifier) return console.error("Notifier not defined...");

	chrome.runtime.onMessage.addListener(function (message, context) {
		var opts = message.opts;

		if (message.type === "error") {
			var error = PageError.create(opts);
			var atMax = (notifier.openCount > config.maxNotes);

			if (atMax) return console.log("Notification blocked due to max of %o", config.maxNotes);

			if (config.enableNotifications) {
				notifier.addNote(error);
			}
			if (config.enablePageAction) {
				pageAction.show(context.tab, error);
			}
		}

		if (message.type === "unload") {
			PageError.removeWhere({ page: opts.page });
			notifier.closeAllNotes();
		}

	});
}

var notifierType = (function () {
	if (typeof chrome.notifications === "undefined") return 'webkit';
	if (typeof chrome.notifications.create === "undefined") return 'webkit';
	else return 'chrome';
}());


jnote.init(
	
	{
		notifierType: notifierType
	},

	onInit
);

