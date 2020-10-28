class HttpException extends Error{
    constructor(errCode=500,msg='服务器异常',status=500){
      super()
      this.errCode = errCode;
      this.msg = msg;
      this.status = status;
    }
}

module.exports = {HttpException};