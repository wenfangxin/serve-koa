const Sequelize = require('sequelize');
const sequelize = require('../core/db');
const moment = require('moment');

/**
 * 用户模型
 * 注意 使用的 sequelize.sync({ alter: true}) 不要使用unique：true 索引会海量创建 大于64报错  可以使用 column: {unique:'column'} 
 */
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER, //注意 这里的Sequelize是引入的npm包  不是实例化的
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        column: { unique: 'column' }
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        column: { unique: 'column' }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        column: { unique: 'column' }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    introduction: Sequelize.TEXT,
    avart: {
        type: Sequelize.STRING,
        defaultValue: 'http://img.joooyoo.com/Fj9K0WA8OQNuBMNVKRn5xj4WbSG9'
    },
    userType: {
        type: Sequelize.BIGINT,
        defaultValue: 0
    },
    workCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    fansCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    followCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    bImage: {
        type: Sequelize.STRING,
        defaultValue: 'http://img.joooyoo.com/FkCt1oQHz-A6cJQj092_kYvktkWb'
    },
    recommend: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    recommendTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        get() {
            return moment(this.getDataValue('recommendTime')).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    wxId: Sequelize.INTEGER,
    registerTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        get() {
            return moment(this.getDataValue('registerTime')).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    state: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})

// 创建同步表   force = true  时会把存在的表先 drop 掉再创建，好怕怕 alter = true 同步字段 修改同名数据表结构，以适用模型
User.sync({
    alter: true
})

module.exports = User