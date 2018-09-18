const DAO =require('../model/DAO')
class DB{
    // 插入婚介详情申请数据
    addaplyDel(aplyId,matId){
        return DAO('insert into maplydel (aplyId,matId,maplyTime,agree) values(?,?,now(),0)',
            [aplyId,matId])
    }
    //同意申请
    agreeMatch(agree){
        return DAO('update maplydel set agree=1 where matId=? and aplyId=?',[agree.matId,agree.aplyId])
    }
}
module.exports = new  DB();