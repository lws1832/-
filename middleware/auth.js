require('dotenv').config();
const crypto = require('crypto');
const ctoken = require('../jwt');

module.exports = (req, res, next)=>{
    let {AccessToken} = req.cookies;//jwt토큰을 담앗다?
    if(AccessToken == undefined) {
        res.redirect('/?msg=로그인 진행하세요')
        return 
    }

    let = AccessToken = ctoken(userid);
    console.log(AccessToken)

    let [header, payload,sign] = AccessToken.split('.');//점을 기준으로 쪼갠다.
    let signature = getSignature(header,payload)
    console.log(signature)

    if(sign == signature){
        console.log('검증된 토큰')
        let {userid, exp} = JSON.parse(Buffer.from(payload, 'base64').toString())
        console.log(userid)
        console.log(exp)

        let nexp = new Date().getTime();
        //기간 만료 되었을때 처리영역
        if(nexp>exp){
            res.clearCookie('AccessToken')
            res.redirect('/?msg=토큰만료')
        }
        //검증 완료된 영역
        req.userid = userid;
        next();
    }else{
        //만약 최초 생성했던 토큰값이랑 다를경우 처리하는부분
        res.redirect('/?msg=부적절한 토큰')
    }
}

function getSignature(header, Payload){
    const signature = crypto.createHmac('sha256',Buffer.from(process.env.wow))
    .update(`${header} ${Payload}`)
    .digest('base64')
    .replace('=','')
    .replace('==','')
    return signature;
}