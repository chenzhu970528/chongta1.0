//关于收养发布对象的相关数据操作
const DAO = require('../model/DAO')

class DB{
    //获取全部收养发布表方法
    getAdoptions(){
        return DAO('select * from adoptions',[]);
    }
    //发布领养信息
    addAdoptions(art){
        return DAO('insert into adoptions ' +
            '(userId,adoAddress,adoTitle,detail,adoType,limitTime,birth,petType,sex,adoPic,age)' +
            'values(?,?,?,?,?,?,?,?,?,?,?)',
            [art.userId,art.adoAddress,art.adoTitle,art.detail,art.adoType,art.limitTime,art.birth,art.petType,art.sex,art.adoPic,art.age])
    }

}
module.exports = new DB();