require('dotenv').config();
const crypto = require('crypto');

function createToken(userid){
    let header = {
        "tpy":"JWT",
        "alg":"HS256"
    }
    let exp = new Date().getTime()+((60*60*2)*1000)
    
    let payload = {
        userid,
        exp
    }

    const encdedingHeader = Buffer.from(JSON.stringify(header))
    .toString('base64').replace('=','').replace('==','')

    const encdedingPayload = Buffer.from(JSON.stringify(payload))
    .toString('base64').replace('=','').replace('==','')
    
    const signature = crypto.createHmac('sha256',Buffer.from(process.env.wow))
    .update(`${encdedingHeader} ${encdedingPayload}`).digest('base64').replace('=','').replace('==','')
    
    let jwt = `${encdedingHeader}.${encdedingPayload}.${signature}`
    return jwt;
}

// let token = createToken('userid');
module.exports = createToken;