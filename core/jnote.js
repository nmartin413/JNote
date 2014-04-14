

var jnote = (function () {

	// Closure
	// ----------------------

	var self = {};
	var notifier;

	var defaultInitOpts = {
		notifierType: "webkit"
	};

	// Private
	// ----------------------

	function initNotifier (notifierType) {
		console.log("Init %o notifier...", notifierType);

		if (notifierType === "chrome") {
			notifier = self.createChromeNotifier();
		}
		else if (notifierType === "webkit") {
			notifier = self.createWebkitNotifier();
		}
		else {
			console.error("Invalid Notifier Type: %o", notifierType);
		}
	}

	// Public
	// ----------------------

	self.init = function (opts, cbk) {
		_(opts).defaults(defaultInitOpts);

		console.log("Init JNote...");
		console.log("options: %o", opts);
		

		initNotifier(opts.notifierType);


		console.log("Init finsihed.");
		_(cbk).chain().bind(null, self.config, notifier).defer();
	}

	return self;

}());

