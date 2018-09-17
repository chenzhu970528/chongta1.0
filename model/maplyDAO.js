const DAO =require('../model/DAO')
class DB{
    // 插入婚介申请数据
    addaply(apldata){
        return DAO('insert into maply (aplyId,detail,petPic,address,medReport,age,type,sex,PetName,maHistory) values(?,?,?,?,?,?,?,?,?,?)',
            [apldata.aplyId,apldata.detail,apldata.petPic,apldata.sex,apldata.address,apldata.medReport,apldata.age,apldata.type,apldata.PetName,apldata.maHistory])
    }
    // 显示给申请人的信息，接受的申请
    showaply(id){
        return DAO ('select userId,userName,userEmail,userPhone,headPic,maplyTime,maply.detail,maply.sex,maply.type,maply.petPic,maply.age,maply.maHistory ' +
            'from matchmaking,maply,user where matchmaking.matId=maply.matId and userId in ' +
            '(select aplyId from maply where matId in( select matId from matchmaking,user where userId=matchmaking.relId and userId=?)) and userId=maply.aplyId',[id])
    }
    // 显示本人的发出的申请
    // sendaply(id){
    //     return DAO ('select headPic,title,userName,matchmaking.type,matchmaking.age,matchmaking.sex,matchmaking.petName,matchmaking.maHistory,maplyTime ' +
    //         'from user,matchmaking,maply ' +
    //         'where aplyId=userId and matchmaking.matId=maply.matId and userId=?',[id])
    // }
    // 删除申请请求
    delaply(delaply){
        return DAO('delete from maply where aplyId=? and matId=?'[delaply.aplyId,delaply.matId])
    }
    // 更改申请
    // changeaply(changeaplydata){
    //     return DAO(
    //         'update maply set detail=?,petPic=?,address=?,medReport=?,age=?,type=?,sex=?,PetName=?,maHistory=? where matId=? and aplyId=where matId=2 and aplyId=3',
    //         [changeaplydata.detail,changeaplydata.petPic,changeaplydata.address,changeaplydata.medReport,changeaplydata.age,changeaplydata.type,changeaplydata.sex,changeaplydata.PetName,changeaplydata.maHistory,changeaplydata.matId,changeaplydata.aplyId]
    //     )
    // }
}
module.exports = new  DB();

