const jwt = require('jsonwebtoken');
const config = require('../config/config');

class Auth {
    constructor(level) {
        this.level = level || 0;
    }
    get w() {
        return async(ctx, next) => {
            let token = ctx.request.header.token;
            let userId = ctx.request.header.uid;
            if (!token || !userId) {
                throw new global.err.HttpException(403, '缺少用户身份信息', 200);
            }
            try {
                var becode = jwt.verify(token, config.tokenKey.key)
            } catch (error) {
                console.log(error)
                if (error.name == 'TokenExpiredError') {
                    throw new global.err.HttpException(403, 'token已过期，请重新登录', 200)
                }
                throw new global.err.HttpException(403, 'token不合法', 200)
            }
            //验证token和id是否匹配
            if (becode.uid != userId) {
                throw new global.err.HttpException(403, '用户id和token不匹配', 200)
            }

            //校验权限等级
            if (becode.scope < this.level) {
                throw new global.err.HttpException(403, '权限不足', 200)
            }
            //把uid,scope 存在放在 ctx中 jwt.verify的时候会返回信息
            ctx.auth = {
                uid: becode.uid,
                scope: becode.scope
            }

            await next();
        }
    }
}

module.exports = { Auth }