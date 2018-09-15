//关于收养发布对象的相关数据操作
const DAO = require('../model/DAO')

class DB{
    //获取全部收养发布表方法
    getAdoptions(){
        return DAO('select * from adoptions',[]);
    }


}
module.exports = new DB();