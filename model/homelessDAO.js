//关于流浪的相关数据操作
const DAO = require('../model/DAO')

class DB{
    //获取全部流浪表方法
    getHomeless(){
        return DAO('select * from homeless order by homeId desc ',[]);
    }
    // 信息详情
    gethomelessdetails(homeId){
        return DAO('select homeless.* ,user.userName,user.userPhone,user.userId from homeless,user where homeId=? and homeless.userId=user.userId',[homeId])
    }


    addhomeless(art){
        return DAO('insert into homeless ' +
            '(getmes,userId,homePic,homeTime,detail,address,type,people,phone,sex,pTime)' +
            'values(?,?,?,?,?,?,?,?,?,?,now())',
            [art.getmes,art.userId,art.homePic,art.homeTime,art.detail,art.address,art.type,art.people,art.phone,art.sex])
    }
    addlostPets(art){
        return DAO('insert into lostPets' +
            '(userId,lpmes,lppic,lpTime,address,detail,reward,sex,type,lostpeople,lostphone,pbTime)' +
            'values(?,?,?,?,?,?,?,?,?,?,?,now())',
            [art.userId,art.lpmes,art.lppic,art.lpTime,art.address,art.detail,art.reward,art.sex,art.type,art.lostpeople,art.lostphone])
    }

    delhomeless(homeId){
        return DAO('DELETE FROM homeless WHERE homeId = ?',[homeId])
    }
}
module.exports = new DB();