const config = {
    db: {
        database: 'test',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'wen25257758521'
    },
    redis: {
        port: 6379,
        host: '127.0.0.1'
    },
    tokenKey: {
        key: 'wen25257758521',
        expiresIn: 60 * 60 * 24 * 5
    },
    qiniu: {
        accessKey: '5Rk28dgFfLHEmoTEZbqsJVHNoWvlTGrzOZ_46pHw',
        secretKey: 'kUF0RPujZFm0pXCmrATJvqReypdu0TH3bvj2-8Yo',
        bucket: "jianyings",
    },
    emailCode: 'wen18220828184'
}
module.exports = config