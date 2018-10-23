//关于流浪的相关数据操作
const DAO = require('../model/DAO')

class DB{
    //获取全部流浪表方法
    getHomeless(){
        return DAO('select * from homeless,user where user.userId=homeless.userId ',[]);
    }
    gethomelessdetails(homeId){
        return DAO('select * from homeless,user where homeId=? and homeless.userId=user.\n' +
            'userId',[homeId])
    }
    addhomeless(art){
        return DAO('insert into homeless ' +
            '(getmes,userId,homePic,homeTime,detail,address,type,people,phone,sex)' +
            'values(?,?,?,?,?,?,?,?,?,?)',
            [art.getmes,art.userId,art.homePic,art.homeTime,art.detail,art.address,art.type,art.people,art.phone,art.sex])
    }
    addlostPets(art){
        return DAO('insert into lostPets' +
            '(lpmes,lppic,lpTime,address,detail,reward,sex,type,lostpeople,lostphone)' +
            'values(?,?,?,?,?,?,?,?,?,?)',
            [art.lpmes,art.lppic,art.lpTime,art.address,art.detail,art.reward,art.sex,art.type,art.lostpeople,art.lostphone])
    }

    delhomeless(homeId){
        return DAO('DELETE FROM homeless WHERE homeless.homeId = ?',[homeId])
    }
}
module.exports = new DB();