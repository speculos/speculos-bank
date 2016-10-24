'use strict';

const lib = {
	odm:{
		Account:require('../../odm/Account')
	}
};

module.exports = function*() {
	yield this.mongoDb.collection(lib.odm.Account.COLLECTION).remove({
		_id:new this.mongoDb.ObjectID(this.params.account)
	});

	this.response.body = null;
};
