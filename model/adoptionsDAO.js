//关于收养发布对象的相关数据操作
const DAO = require('../model/DAO')

class DB{
    //获取全部领养信息
    getAdoptions(){
        return DAO('select * from adoptions,user where adoptions.userId = user.userId',[]);
    }
    //发布领养信息
    addAdoptions(adoptions){
        return DAO('insert into adoptions (userId,adoAddress,adoTitle,detail) values(?,?,?,?)',
            [adoptions.userId ,adoptions.adoAddress,adoptions.adoTitle,adoptions.detail])
    }
}
module.exports = new DB();