const _ = require('lodash');
const jwt = require('jsonwebtoken');

const {User} = require('../../db/models');
const config = require('../../config');
const {
    UnauthenticatedError,
    UnauthorizedError,
    ErrorCodes,
} = require('../../helpers/errors/index');

module.exports = async (req, res, next) => {

    const {authorization} = req.headers;
    jwt.verify(authorization, config.auth.local.key, async (err, decoded) => {
        if (err || _.isNil(decoded)) {
            return next(new UnauthenticatedError());
        }
        try {
            const obj = decoded;
            if (_.isNil(obj.roles)) {
                const message = `Token Problem`;
                return next(new UnauthorizedError(0, message));
            }
            let user;
            if (obj.roles[0] === 'guest') {
                user = config.guest;
            } else {
                user = await User.getById(obj.sub);
            }
            if (_.isNil(user)) {
                const message = 'User account is not exists';
                return next(new UnauthorizedError(0, message));
            }


            req.user = user;
            req.user_id = String(user._id);
            next();
        } catch (e) {
            next(e);
        }

    });

};
