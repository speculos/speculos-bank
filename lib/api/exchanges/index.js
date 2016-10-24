'use strict';

const lib = {
	deps:{
		koaRouter:require('koa-router'),
		koaBody:require('koa-body')
	},
	models:{
		Exchange:require('../../models/Exchange')
	},
	odm:{
		Exchange:require('../../odm/Exchange')
	},
	common:{
		rights:require('../common/rights')
	},
	search:require('./search'),
	create:require('./create'),
	remove:require('./remove')
};

function* loadExchange(p_next) {
	let dbExchange = yield this.mongoDb.collection(lib.odm.Exchange.COLLECTION).findOne({
		_id:new this.mongoDb.ObjectID(this.params.exchange)
	});

	if(!dbExchange) {
		this.throw(404, 'Exchange not found', {code:'exchange.notFound'});
	}

	this.dbExchange = dbExchange;

	yield p_next;
}

let router = new lib.deps.koaRouter();

router.param('exchange', function*(p_id, p_next) {
	this.params.exchange = this.validate(p_id, lib.models.Exchange.VALIDATOR_ID.required());
	yield p_next;
});

router.get('/',
	lib.search
);

router.post('/',
	lib.common.rights.middleware('exchanges.create'),
	lib.deps.koaBody(),
	lib.create
);

router.delete('/:exchange',
	lib.common.rights.middleware('exchanges.remove'),
	loadExchange,
	lib.remove
);

module.exports = router;
