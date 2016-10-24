'use strict';

const lib = {
	odm:{
		Exchange:require('../../odm/Exchange')
	}
};

module.exports = function*() {
	yield this.mongoDb.collection(lib.odm.Exchange.COLLECTION).remove({
		_id:new this.mongoDb.ObjectID(this.params.exchange)
	});

	this.response.body = null;
};
