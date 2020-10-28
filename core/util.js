const jwt = require('jsonwebtoken');
const config = require('../config/config');
const qiniu = require("qiniu");
const nodemailer = require('nodemailer');
/**
 * 生成jwt token
 * @param {*} uid 
 * @param {*} scope 
 */
const generateToken = function(uid, scope) {
    const key = config.tokenKey.key;
    const expiresIn = config.tokenKey.expiresIn;
    const token = jwt.sign({ uid, scope }, key, { expiresIn: expiresIn });
    return token
}

/**
 * 上传
 */
const qiniuUpload = function() {
    //初始化参数 需要填写你的 Access Key 和 Secret Key
    let mac = new qiniu.auth.digest.Mac(config.qiniu.accessKey, config.qiniu.secretKey);
    //bucket储存空间名称
    const bucket = config.qiniu.bucket;
    var options = {
        scope: bucket,
        expires: 3600 * 24
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    return putPolicy.uploadToken(mac);
}


/**
 * 获取我的信息校验
 */
const myInfo = (userId, token) => {
    if (userId && token) {
        return true
    } else {
        return false
    }

}

/**
 * 发送邮件
 */
const sendEmail = (to, subject, html) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.163.com',
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
            user: '18220828184@163.com',
            //smtp授权码
            pass: config.emailCode,
        }
    });
    let mailOptions = {
        from: '"<简影网>"18220828184@163.com', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        // 发送text或者html格式
        // text: 'Hello world?', // plain text body
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message sent: %s', info.messageId);
    });

};

//生成随机数
const random = () => {
    return Math.random().toString(36).substr(2, 4);
}



module.exports = {
    generateToken,
    qiniuUpload,
    myInfo,
    sendEmail,
    random
}