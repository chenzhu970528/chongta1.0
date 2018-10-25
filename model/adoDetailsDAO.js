//关于收养发布对象的相关数据操作
const DAO = require('../model/DAO')

class ADD{
    //获取指定流浪信息详情
    getAdoDetails(id){
        return DAO('select * from adoptions,user where adoptions.userId = user.userId and adoId = ?',[id]);
    }
    //通过本人Id查看流浪信息
    getAdoptionsdetail(userId){
        return DAO('select *,\n' +
            'case\n' +
            '\twhen adoType = 0 then \'领养\'\n' +
            '\telse \'寄养\'\n' +
            'end as adoType1\n' +
            'from adoptions where userId=? order by adoTime desc',[userId]);
    }
    //获取有意领养者
    getAdoDetailsMan(id){
        return DAO('select * from adodetails,user where adodetails.userId = user.userId and adoId = ?',[id]);
    }
    //获取有意领养者详情
    getAdoUser(id){
        return DAO('select * from user ,adodetails where user.userId = adodetails.userId and adodetails.userId = ?',[id]);
    }
    //查看热门
    getHot(){return DAO('select adoptions.adoId,adoptions.userId,adoAddress,adoTitle,adoTime,count(adodetails.userId) num from adoptions,adodetails where adoptions.adoId=adodetails.adoId group by adodetails.adoId ORDER BY num desc LIMIT 0,9',[]);}
}
module.exports = new ADD();