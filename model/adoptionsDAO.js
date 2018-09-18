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
            '(userId,adoAddress,adoTitle,detail,adoType,adoTime,limitTime,birth,petType,sex,adoPic,age)' +
            'values(?,?,?,?,?,now(),?,?,?,?,?,?)',
            [art.userId,art.adoAddress,art.adoTitle,art.detail,art.adoType,art.limitTime,art.birth,art.petType,art.sex,art.adoPic,art.age])
    }
    //删除领养信息,对应的有意领养者信息表也删除
    delAdoptions(adoId){
        return DAO('DELETE FROM adoptions WHERE adoptions.adoId = ?',[adoId])
    }
    //从表删除
    delAdoMan(adoId){
        return DAO('DELETE FROM adodetails WHERE adodetails.adoId =  ?',[adoId])
    }

    //删除领养申请
    delAdoApply(addId){
        return DAO('DELETE FROM adodetails WHERE adodetails.addId =  ?',[addId])
    }
}
module.exports = new DB();