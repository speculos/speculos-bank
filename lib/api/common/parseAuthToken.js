'use strict';

module.exports.middleware = function() {
	return function*(p_next) {
		this.parseToken({
			algorithm:this.tokens.auth.algorithm,
			publicKey:this.tokens.auth.keys.public,
			issuer:this.tokens.auth.version
		});

		yield p_next;
	};
};
