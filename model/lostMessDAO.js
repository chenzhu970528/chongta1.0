//关于寻宠消息的相关数据操作
const DAO = require('../model/DAO')

class DB {
    //获取寻宠消息方法
    getlostMess() {
        return DAO('select * from lostMess', []);
    }

    dellostMess(lmId) {
        return DAO('DELETE FROM lostMess WHERE lostMess.lmId = ?', [lpId])
    }
}

module.exports = new DB();