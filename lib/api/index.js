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

module.exports = router;