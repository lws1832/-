const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const cookieparser = require('cookie-parser');
const ctoken = require('./jwt');
const auth = require('./middleware/auth');
const bodyparser = require('body-parser');
const mysql = require('mysql')

app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
})

let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'lee'
})
connection.connect();
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}));
app.use(cookieparser());
app.use(express.static('public'));

app.get('/',(req,res)=>{
    let {msg} = req.query;
    res.render('index')
})
app.get('/user/info',auth,(req,res)=>{
    res.send(`hello ${req.userid}`)
})
app.get('/info',(req,res)=>{
    res.render('info')
})
app.post('/info',(req,res)=>{
    let {userid, userpw, username} = req.body;
    let sql = `insert into this(userid,userpw,username) values ('${userid}',' ${userpw}',' ${username}')`;
    connection.query(sql,(error,result)=>{
        if(error){
            console.log(error);
        }else{
            console.log(result)
        }
    })
    res.redirect('/')
    
})
app.post('/auth/local/login',(req,res)=>{
    let {userid,userpw} = req.body;
    console.log('body req : ',userid,userpw);
    let result ={};
    if(userid == 'root' && userpw == 'root'){
        result = {
            result:true,
            msg:'로그인 성공했다.'
        }
        let token = ctoken(userid);
        res.cookie('AccessToken',token,{httpOnly:true,secure:true,})

    }else{
        result = {
            result:false,
            msg:'로그인 실패했다.'
        }
    }
    res.json(result);
})

app.get('/login',(req,res)=>{
    let {id,pw} = req.query;
    if(id==userid && pw==userpw){
        let ctoken=token();
        res.cookie('token',ctoken,{httpOnly:true,secure:true,});
        res.redirect('/?msg=로그인 성공')
    }else{
        res.redirect('/?msg=로그인실패')
    }
})


app.listen(3000,()=>{
    console.log('3124')
})