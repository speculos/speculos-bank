'use strict';

const lib = {
	deps:{
		joi:require('joi')
	}
};

const VALIDATOR_ID = lib.deps.joi.string().regex(/^[0-9a-f]{24}$/).label('exchange.id');
const VALIDATOR_NAME = lib.deps.joi.string().min(1).max(100).label('exchange.name');
const VALIDATOR_URL = lib.deps.joi.string().uri().max(1000).label('exchange.url');

module.exports.VALIDATOR_ID = VALIDATOR_ID;
module.exports.VALIDATOR_NAME = VALIDATOR_NAME;
module.exports.VALIDATOR_URL = VALIDATOR_URL;