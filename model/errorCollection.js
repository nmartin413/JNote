// JNote: PageError

var PageError = (function () {
	var self = {};
	var items = [];

	Object.defineProperty(self, "models", {
		get: function () {
			return _(items).clone();
		}
	});

	self.create = function (opts) {
		var opts = opts || {};

		var error = jnote.createError(opts);

		items.push(error);
		return error;
	};

	self.findAll = function () {
		return _(items).clone();
	};

	self.where = function (params) {
		return _(items).where(params);
	};

	self.findWhere = function (params) {
		return _(items).findWhere(params);
	};

	self.remove = function (target) {
		items = _(items).without(target);
	};

	self.removeWhere = function (params) {
		var targets = self.where(params);
		_(targets).each(self.remove);
		return targets.length;
	};


	return self;

}());