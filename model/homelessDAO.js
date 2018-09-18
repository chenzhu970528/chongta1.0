//关于流浪的相关数据操作
const DAO = require('../model/DAO')

class DB{
    //获取全部流浪表方法
    getHomeless(){
        return DAO('select * from homeless,user where user.userId=homeless.userId',[]);
    }
    addhomeless(art){
        return DAO('insert into homeless ' +
            '(getmes,userId,homePic,homeTime,detail,address)' +
            'values(?,?,?,now(),?,?)',
            [art.getmes,art.userId,art.homePic,art.detail,art.address])
    }
    addlostPets(art){
        return DAO('insert into lostPets' +
            '(lpmes,lpPic,lpTime,address,detail,reward)' +
            'values(?,?,?,?,?,?)',
            [art.lpmes,art.lpPic,art.lpTime,art.address,art.detail,art.reward])
    }
}
module.exports = new DB();