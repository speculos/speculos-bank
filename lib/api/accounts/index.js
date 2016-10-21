'use strict';

const lib = {
	deps:{
		koaRouter:require('koa-router'),
		koaBody:require('koa-body')
	},
	models:{
		Account:require('../../models/Account')
	},
	odm:{
		Account:require('../../odm/Account')
	},
	common:{
		rights:require('../common/rights')
	},
	search:require('./search'),
	create:require('./create'),
	remove:require('./remove')
};

function* loadAccount(p_next) {
	let dbAccount = yield this.mongoDb.collection(lib.odm.Account.COLLECTION).findOne({
		_id:new this.mongoDb.ObjectID(this.params.account)
	});

	if(!dbAccount) {
		this.throw(404, 'Account not found', {code:'account.notFound'});
	}

	this.dbAccount = dbAccount;

	yield p_next;
}

function checkOwner(p_bypassRight) {
	return function*(p_next) {
		if(this.dbAccount.owner !== this.request.token.user && !this.rights.has(p_bypassRight)) {
			this.throw(409, 'Account not owned', {code:'account.notOwned'});
		}

		yield p_next;
	};
}

let router = new lib.deps.koaRouter();

router.param('account', function*(p_id, p_next) {
	this.params.account = this.validate(p_id, lib.models.Account.VALIDATOR_ID.required());
	yield p_next;
});

router.get('/',
	lib.search
);

router.post('/',
	lib.deps.koaBody(),
	lib.create
);

router.delete('/:exchange',
	loadAccount,
	checkOwner('accounts.remove'),
	lib.remove
);

module.exports = router;