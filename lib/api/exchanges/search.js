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
	let orders = this.order.parse(['id', 'name'], '+id');
	let name = this.validate(this.request.query.name, lib.models.Exchange.VALIDATOR_NAME.optional());

	let criterias = {
		name:name
	};

	let cursor = this.mongoDb.collection(lib.odm.Exchange.COLLECTION).find(criterias, {_id:1, name:1, url:1});

	if(orders.length) {
		let sort = {};
		for(let order of orders) {
			sort[order.field] = order.asc ? 1 : -1;
		}

		cursor = cursor.sort(sort);
	}

	let exchanges = [];
	while(yield cursor.hasNext()) {
		let dbExchange = yield cursor.next();
		exchanges.push({
			id:dbExchange._id.toString(),
			name:dbExchange.name,
			url:dbExchange.url
		});
	}

	this.response.body = exchanges;
};
