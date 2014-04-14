

jnote.config = (function () {

	var config;

	(function () {
		if (typeof localStorage.delay === "undefined")
			localStorage.delay = 5000;
		if (typeof localStorage.maxNotes === "undefined")
			localStorage.maxNotes = 3;
		if (typeof localStorage.enableNotifications === "undefined")
			localStorage.enableNotifications = true;
		if (typeof localStorage.enablePageAction === "undefined")
			localStorage.enablePageAction = true;
	}());

	(function () {
		
		config = {};

		Object.defineProperties(config, {
			delay: {
				get: function () {
					return parseInt(localStorage.delay, 10);
				}
			},
			enablePageAction: {
				get: function () {
					return (localStorage.enablePageAction === "true");
				}
			},
			enableNotifications: {
				get: function () {
					return (localStorage.enableNotifications === "true");
				}
			},
			maxNotes: {
				get: function () {
					return parseInt(localStorage.maxNotes, 10);
				}
			}
		});

	}());

	return config;
	
}());
