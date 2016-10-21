'use strict';

const lib = {
	models:{
		Account:require('../../models/Account')
	},
	odm:{
		Account:require('../../odm/Account')
	}
};

module.exports = function*() {
	let name = this.validate(this.request.body.name, lib.models.Account.VALIDATOR_NAME.required());
	let description = this.validate(this.request.body.description, lib.models.Account.VALIDATOR_DESCRIPTION.required());

	let result = yield this.mongoDb.collection(lib.odm.Account.COLLECTION).insertOne({
		name:name,
		description:description
	});

	this.response.body = {
		id:result.insertedId.toString()
	};
};