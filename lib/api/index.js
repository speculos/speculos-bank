'use strict';

const lib = {
	deps:{
		koaRouter:require('koa-router')
	},
	common:{
		validate:require('./common/validate'),
		parseToken:require('./common/parseToken'),
		rights:require('./common/rights'),
		order:require('./common/order'),
		parseAuthToken:require('./common/parseAuthToken')
	},
	meta:require('./meta'),
	accounts:require('./accounts'),
	exchanges:require('./exchanges')
};

let router = new lib.deps.koaRouter();

router.use(lib.common.validate.attach());
router.use(lib.common.parseToken.attach());
router.use(lib.common.rights.attach());
router.use(lib.common.order.attach());

router.get('/meta',
	lib.meta
);

router.get('/exchanges',
	lib.common.parseAuthToken.middleware(),
	lib.exchanges
);

router.get('/accounts',
	lib.common.parseAuthToken.middleware(),
	lib.accounts
);

module.exports = router;
