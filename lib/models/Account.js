'use strict';

const lib = {
	deps:{
		joi:require('joi')
	}
};

const VALIDATOR_ID = lib.deps.joi.string().regex(/^[0-9a-f]{24}$/).label('account.id');
const VALIDATOR_NAME = lib.deps.joi.string().max(100).label('account.name');
const VALIDATOR_DESCRIPTION = lib.deps.joi.string().max(1000).label('account.description');

module.exports.VALIDATOR_ID = VALIDATOR_ID;
module.exports.VALIDATOR_NAME = VALIDATOR_NAME;
module.exports.VALIDATOR_DESCRIPTION = VALIDATOR_DESCRIPTION;