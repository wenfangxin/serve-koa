const redis = require('redis');
const config = require('../config/config');

//创建客户端 建立连接
const Redis = redis.createClient(config.redis.port,config.redis.host) 
//监听错误
Redis.on('error',err=>{
    console.error(err);
})

//存储
function set(key,val){
    if(typeof val === 'object'){
        val = JSON.stringify(val)
    }
    Redis.set(key,val,redis.print)
}

//读取
function get(key){
    return new Promise((resolve,reject)=>{
        Redis.get(key,(err,val)=>{
            if(err){
                reject(err)
                return
            }
//会存在val为null的情况
            if(val == null){
                resolve(null)
                return 
            }
//因为 存贮的时候有对象的话 会转为字符串 所以取出来要在转换一下 
            try {
                resolve(JSON.parse(val))
            } catch (error) {
                resolve(val)
            }

        })
    })
}

//删除
 function del(val){
    Redis.del(key,redis.print)
 }

 //设置过期时间
 function expire(key,time){
    Redis.expire(key,time);
 }

 module.exports = {
     set,
     get,
     del,
     expire
 }