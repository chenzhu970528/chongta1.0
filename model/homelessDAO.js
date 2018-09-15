//关于流浪的相关数据操作
const DAO = require('../model/DAO')

class DB{
    //获取全部流浪表方法
    getHomeless(){
        return DAO('select * from homeless',[]);
    }
    addhomeless(homeless){
        return DAO('insert into homeless (homeId,userId,homePic,homeTime,detail,address) values(?,?,?,?,?,?)',
            [homeless.homeId,homeless.ueseId,homeless.homePic,homeless.homeTime,homeless.detail,homeless.address]
            )
    }
}
module.exports = new DB();