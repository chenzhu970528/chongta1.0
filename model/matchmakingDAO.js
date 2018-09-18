// 发布婚介
const DAO = require('../model/DAO')

class DB{
    // 获取宠物相关信息
    getMatchSearch(){
        return DAO('call getMatchSearch(@getMatchSearch);',[])
    }
    // 获取婚介发布列表数据
    getMatchList(){
        return DAO('call getMatchList(@p_getMatchList);',[])
    }
    //获取详情
    getMdetail(id){
        return DAO('call getMdetail(?,@p_getMdetail);',[id])
    }
    addMatch(users){
        return DAO('insert into matchmaking ' +
            '(relId,title,sandword,request,detail,address,medReport,birth,type,sex,petPic,age,PetName,maHistory) ' +
            'values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [users.relId,users.title,users.sandword,users.request,users.detail,users.address,users.medReport,users.birth,users.type,users.sex,users.petPic,users.age,users.PetName,users.maHistory])
    }
    //删除婚介发布
        //删除相关del
        deladel(delaplydata){
            return DAO('DELETE from maplydel where matId =?',[delaplydata])
        }
        //删除申请
        delapl(delaplydata){
            return DAO('DELETE from maply where matId=4',[delaplydata])
        }
        //删除发布
        delmatch(delaplydata){
            return DAO('DELETE from matchmaking where matId=4',[delaplydata])
        }
}
module.exports = new DB();