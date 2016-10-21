'use strict';

const lib = {
	odm:{
		Account:require('../../odm/Account')
	}
};

module.exports = function*(p_next) {
	yield this.mongoDb.collection(lib.odm.Account.COLLECTION).remove({
		_id:new this.mongoDb.ObjectID(this.params.account)
	});

	this.response.body = null;
};