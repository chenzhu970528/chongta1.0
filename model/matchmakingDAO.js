// 发布婚介
const DAO = require('../model/DAO')

class DB{
    // 获取宠物相关信息
    getMatchSearch(){
        return DAO('call getMatchSearch(@getMatchSearch);',[])
    }

    //获取婚介表里信息，根据本人Id
    getmatchdetails(relId){
        return DAO('select matchmaking.matId,petPic,title,relTime,address,detail,agree from matchmaking,user,maplydel where relId=userId and matchmaking.matId=maplydel.matId and relId=? GROUP BY matchmaking.matId',[relId]);
    }
    // 获取婚介发布列表数据
    getMatchList(){
        return DAO('call getMatchList(@p_getMatchList);',[])
    }
    //获取详情
    getMdetail(id){
        return DAO('call getMdetail1(?,@p_getMdetail);',[id])
    }
    addMatch(users){
        return DAO('insert into matchmaking ' +
            '(relId,title,sandword,request,detail,relTime,birth,type,sex,petPic,age,PetName) ' +
            'values(?,?,?,?,?,now(),?,?,?,?,?,?)',
            [users.relId,users.title,users.sandword,users.request,users.detail,users.birth,users.type,users.sex,users.petPic,users.age,users.PetName])
    }
    //删除婚介发布
        //删除相关del
        deladel(delaplydata){
            return DAO('DELETE from maplydel where matId =?',[delaplydata])
        }
        //删除申请
        delapl(delaplydata){
            return DAO('DELETE from maply where matId=?',[delaplydata])
        }
        //删除发布
        delmatch(delaplydata){
            return DAO('DELETE from matchmaking where matId=?',[delaplydata])
        }
     // 通过审核
    updateT(matId){
        return DAO('update matchmaking set pass=1 where matId=?',[matId])
    }
    // 不通过
    updateF(matId){return DAO('update matchmaking set pass=-1 where matId=?',[matId])}
    // 列表排序
    sortTimeDESC(){return DAO('call sortTimeDESC(@p_sortTimeDESC);',[])};
    sortTimeASC(){return DAO('call sortTimeASC(@p_sortTimeASC);',[])};
    sortHotDESC(){return DAO('call sortHotDESC(@p_sortHotDESC);',[])};
    sortHotASC(){return DAO('call sortHotASC(@p_sortHotASC);',[])};

    countM(){return DAO('select count(*) num from matchmaking',[])};
    countA(){return DAO('select count(*) num from adoptions',[])};
    countF(){return DAO('select count(*) num from forumart',[])};
    countH(){return DAO('select count(*) num from homeless',[])};
}
module.exports = new DB();