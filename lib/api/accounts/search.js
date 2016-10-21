'use strict';

const lib = {
	deps:{
		joi:require('joi')
	},
	models:{
		Account:require('../../models/Account')
	},
	odm:{
		Account:require('../../odm/Account')
	}
};

const VALIDATOR_SEARCH_TERMS = lib.deps.joi.string().regex(/^\w+( \w+)*$/).max(100).label('searchTerms');

module.exports = function*(p_next) {
	let orders = this.order.parse(['id', 'name'], '+id');
	let name = this.validate(this.request.query.name, VALIDATOR_SEARCH_TERMS.optional());
	let description = this.validate(this.request.query.description, VALIDATOR_SEARCH_TERMS.optional());

	let criterias = {};

	if(name) { criterias.name = {$text:{$search:name}}; }
	if(description) { criterias.description = {$text:{$search:description}}; }

	let cursor = this.mongoDb.collection(lib.odm.Account.COLLECTION).find(criterias, {_id:1, name:1, description:1});

	if(orders.length) {
		let sort = {};
		for(let order of orders) {
			sort[order.field] = order.asc ? 1 : -1;
		}

		cursor = cursor.sort(sort);
	}

	let accounts = [];
	while(yield cursor.hasNext()) {
		let dbAccount = yield cursor.next();
		accounts.push({
			id:dbAccount._id.toString(),
			name:dbAccount.name,
			description:dbAccount.description
		});
	}

	this.response.body = accounts;
};