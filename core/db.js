const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'mysql', //数据库类型
    logging: false, //操作时候显示原始的sql语句  
    timezone: '+08:00', //设置为北京时间
    define: {
        // `timestamps` 字段指定是否将创建 `createdAt` 和 `updatedAt` 字段.
        timestamps: false,
        freezeTableName: true, //冻结表名 否则表名自变成复数
        underscored: true, // 字段以下划线（_）来分割（默认是驼峰命名风格）
        charset: 'utf8mb4' //创建表设置utf-8  解决不能插入中文问题
    },
    pool: {
        max: 5, // 连接池最大连接数量
        min: 0, // 连接池最小连接数量
        idle: 10000 // 如果一个线程超过10秒钟没有被使用过就释放该线程
    }
});

module.exports = sequelize;