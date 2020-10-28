const {HttpException} = require('../core/http-exception');
const errCatch = async (ctx,next)=>{
    try {
        await next()
    } catch (error) {
        console.log(error)
        if(error instanceof HttpException){
            ctx.body = {
                code:error.errCode,
                msg:error.msg,
            }
            ctx.status = error.status;
        }else{
            ctx.body = {
                code:500,
                msg:'服务器错误'
            }
            ctx.status = 500;
        }
    }
}

module.exports = errCatch