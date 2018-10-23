const DAO =require('../model/DAO')
class DB{
    // 插入婚介申请数据
    addaply(apldata){
        return DAO('insert into maply (aplyId,matId,detail,petPic,age,birth,type,sex,PetName,maplyTime) values(?,?,?,?,?,?,?,?,?,now())',
            [apldata.aplyId,apldata.matId,apldata.detail,apldata.petPic,apldata.age,apldata.birth,apldata.type,apldata.sex,apldata.PetName])
    }
    // 接受的申请
    showaply(id){
        return DAO ('call showaply(?,@p_showaply);',[id])
    }
    //显示本人的发出的申请
    sendaply1(id){
        return DAO ('call sendaply1(?,@p_sendaply1);',[id])
    }
    sendaply2(id){
        return DAO ('select maplyTime from maply,user where userId=aplyId and userId=?',[id])
    }
    // 删除申请请求
        delAplDel(mdel){
        return DAO('DELETE from maplydel where aplyId=? and matId=?',[mdel.aplyId,mdel.matId])
         }
        delAply(mdel){
        return DAO('DELETE from maply where aplyId=? and matId=?',[mdel.aplyId,mdel.matId])
        }
    //更改申请
    changeaply(changeaplydata){
        return DAO(
            'update maply set detail=?,petPic=?,address=?,medReport=?,age=?,birth=?,type=?,sex=?,PetName=?,maHistory=? where maplyId=?',
            [changeaplydata.detail,changeaplydata.petPic,changeaplydata.address,changeaplydata.medReport,changeaplydata.age,changeaplydata.birth,changeaplydata.type,changeaplydata.sex,changeaplydata.PetName,changeaplydata.maHistory,changeaplydata.maplyId]
        )
    }
    // 热门
    countAply(){
        return DAO('select relId,matchmaking.petPic,matchmaking.PetName,count(*) num ,userName,matchmaking.matId from maply,matchmaking,user\n' +
            'where matchmaking.matId=maply.matId and relId=userId group by maply.matId ORDER BY num desc LIMIT 0,10',[])
    }
    //显示是否被同意
    showAgree(aplyId){
        return DAO('select agree,maplydel.matId\n' +
            'from matchmaking,maply,maplydel\n' +
            'where maplydel.aplyId=maply.aplyId and maplydel.matId=matchmaking.matId and maplydel.matId GROUP BY maplydel.matId HAVING maplydel.matId in (select matId from maplydel where aplyId=?)',[aplyId])
    }
}
module.exports = new  DB();

