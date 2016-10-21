'use strict';

const lib = {
	models:{
		Exchange:require('../../models/Exchange')
	},
	odm:{
		Exchange:require('../../odm/Exchange')
	}
};

module.exports = function*() {
	let name = this.validate(this.request.body.name, lib.models.Exchange.VALIDATOR_NAME.required());
	let url = this.validate(this.request.body.url, lib.models.Exchange.VALIDATOR_URL.required());

	try {
		let result = yield this.mongoDb.collection(lib.odm.Exchange.COLLECTION).insertOne({
			name:name,
			url:url
		});

		this.response.body = {
			id:result.insertedId.toString()
		};
	} catch(p_error) {
		if(p_error.code == 11000) {
			this.throw(409, 'Duplicate exchange', {code:'exchange.duplicate'});
		} else {
			throw p_error;
		}
	}
};