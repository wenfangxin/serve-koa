const router = require('koa-router')();
const User = require('../models/user');
router.prefix('/user')


//获取用户信息
router.get('/userData', async (ctx, next) => {

    let data = await User.findOne({
        where: { id: 1 },
        attributes: ['userName', 'avart', 'email', 'introduction', 'userType','id']
    })
    ctx.body = {
        code: 200,
        data: data
    }
})


module.exports = router