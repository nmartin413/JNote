// JNote: Content Script

(function () {

	var pageStamp = (function () {
		var time = new Date().getTime();
		return time.toString();
	}());
	
	function onError(evt) {
		var opts = {
			text: evt.message,
			file: evt.filename,
			line: evt.lineno,
			page: pageStamp
		};
		chrome.runtime.sendMessage({ type: "error", opts: opts});
	}

	function onBeforeUnload() {
		var opts = {
			page: pageStamp
		};
		chrome.runtime.sendMessage({ type: "unload", opts: opts});
	}

	window.addEventListener('beforeunload', onBeforeUnload, false);
	window.addEventListener('error', onError, false);
}());


