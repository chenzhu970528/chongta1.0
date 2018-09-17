// 发布婚介
const DAO = require('../model/DAO')

class DB{
    // 获取宠物相关信息
    getMatchSearch(){
        return DAO("select type,age,\n" +
            "\tcase\n" +
            "\t\twhen matchmaking.sex=0 then '母' \n" +
            "\t\telse '公'\n" +
            "\tend as sex\n" +
            "from matchmaking, user \n" +
            "where user.userId=matchmaking.relId",[])
    }
    // 获取婚介发布列表数据
    getMatchList(){
        return DAO("select relId,petPic,type,age,sandword,\n" +
            "\tcase \n" +
            "\t\twhen matchmaking.sex=0 then '母' \n" +
            "\t\telse '公' \n" +
            "\tend as sex\n" +
            "from matchmaking,user\n" +
            "where user.userId=matchmaking.relId",[])
    }
    //获取详情
    getMdetail(id){
        return DAO("select title,relId,petPic,userName,headPic,userPhone,wechat,type,age,sandword,medReport,birth,detail,\n" +
            "case " +
            "when matchmaking.sex=0 then '母' " +
            "else '公' " +
            "end as sex, " +
            "case " +
            "when maHistory=0 then '无配种史' " +
            "else '有配种史' " +
            "end as maHistory " +
            "from matchmaking,user where userId=relId and relId=?",[id])
    }
    addMatch(users){
        return DAO('insert into matchmaking (relId,title,sandword,request,detail,address,medReport,birth,type,sex,petPic,age,PetName,maHistory) ' +
            'values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[users.relId,users.title,users.sandword,users.request,users.detail,users.address,users.medReport,users.birth,users.type,users.sex,users.petPic,users.age,users.PetName,users.maHistory])
    }
}
module.exports = new DB();