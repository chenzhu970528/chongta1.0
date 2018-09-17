const DAO =require('../model/DAO')
class DB{
    // 插入婚介详情申请数据

    addaplyDel(addata){
        return DAO('insert into maplydel (aplyId,matId,maplyTime,agree) values(?,?,?,?)',
            [addata.aplyId,addata.matId,addata.maplyTime,addata.agree])
    }
}
module.exports = new  DB();