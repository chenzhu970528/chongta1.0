//关于收养发布对象的相关数据操作
const DAO = require('../model/DAO')

class ADD{
    //获取指定流浪信息详情
    getAdoDetails(id){
        return DAO('select * from adoptions,user where adoptions.userId = user.userId and adoId = ?',[id]);
    }
    //获取有意领养者
    getAdoDetailsMan(id){
        return DAO('select * from adodetails,user where adodetails.userId = user.userId and adoId = ?',[id]);
    }
    //获取有意领养者详情
    getAdoUser(id){
        return DAO('select * from user ,adodetails where user.userId = adodetails.userId and adodetails.userId = ?',[id]);
    }

}
module.exports = new ADD();