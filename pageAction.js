var pageAction = (function () {
	var self = {};

	var iconBackground = new Image();
	iconBackground.src = "bang_red_19_sharp.png";

	function createIcon(cbk) {
		var canvas = document.createElement('canvas');
		canvas.width = 19;
		canvas.height = 19;
		var ctx = canvas.getContext('2d');
		ctx.textAlign = "center";
		cbk(canvas, ctx);
	};

	function getIconForPage(page) {
		var imageData;
		var errors = PageError.where({ page: page });
		var iconText = (function () {
			var count = errors.length.toString();
			if (count.length !== 1) return ":(";
			return count;
		}())

		createIcon(function (canvas, ctx) {
			ctx.drawImage(iconBackground, 0, 0);
			ctx.font = "bold 8pt sans-serif";
			ctx.fillStyle = "white";
			ctx.fillText(iconText, 9.5, 13);
			imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		});

		return imageData;
	};

	self.show = function(tab, error) {
		_(function () {
			var icon = getIconForPage(error.page);
			chrome.pageAction.setIcon({
				imageData: icon,
				tabId: tab.id
			})
			chrome.pageAction.show(tab.id);
		}).defer();
	}


	return self;
}());