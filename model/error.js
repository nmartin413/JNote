

(function () {

	var typePrefix = "Uncaught ";
	var typeSuffix = ":";

	jnote.createError = function (opts) {
		var self = {};

		self.text = opts.text || "default";
		self.file = opts.file || "unknown";
		self.line = opts.line || -1;
		self.page = opts.page || 0;

		function getType() {
			var fullText = self.text;
			var start = fullText.indexOf(typePrefix);
			var end = fullText.indexOf(typeSuffix);
			if (start === -1 || end === -1) return "unknown";
			else return fullText.substring(start + typePrefix.length, end);
		}

		function getIcon() {
			return "bang_128.png";
		}

		Object.defineProperties(self, {
			shortFilename: {
				get: function () {
					return self.file.split('/').pop();
				}
			},
			title: {
				get: function () {
					var title = self.shortFilename + " @ " + self.line;
					if (title.length > 20) {
						title = title.substring(0, 20);
					}
					return title;
				}
			},

			icon: { get: getIcon },
			type: { get: getType }

		});

		return self;
	}
	
}());
