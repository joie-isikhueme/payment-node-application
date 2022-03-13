let express = require('express')
let bodyParser = require('body-parser')
let port = process.env.PORT || 8001
let knex = require('./db/knex')
let methods = require("./methods")
let app = express()
let jwt = require("jsonwebtoken")
const { Server } = require('http')
const username = "jojo"
const password = "barcelona"


// app.use("/login", require("./login.js"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.post('/login',(req, res,next)=> {
    let p_username = req.body.username
    let p_password = req.body.password
    if (p_username == username && p_password == password){
        let token = jwt.sign(
            { username : username },
            'secretkey',
            (err, token) =>{
                res.send({
                    ok:true,
                    message: "Login successful",
                    tokenvalue: token
                })
            })      
    } else{
        res.send({
            ok:false,
            message: "Username or password incorrect"
        })
    }
})
const verifyToken=(req, res, next)=>{
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.tokenvalue = bearerToken
        next()
    }else{
        res.status(403).send('Error! Please pass a valid token')
    }
}
app.get("/", methods.ensureToken,(req, res, next)=>{
    res.render('server', {title:'Express'})
})

app.get('/transactions',verifyToken, (req, res)=>{
    knex.select().from('transactions').then((transactions)=>{
        res.send(transactions)
    })
})
app.post('/createuser',verifyToken, (req, res)=>{
    knex('users').insert({
        userid: req.body.userid,
        name: req.body.name,
        email: req.body.email
    })
    .then(function(){
        knex.select().from('users').then((users)=>{
            res.send(users)
        })
    })
})
app.post('/depositmoney',verifyToken, (req, res)=>{
    knex('transactions').insert({
        id: req.body.userid,
        balance: req.body.balance
    })
    .then(()=>{
        knex.select().from('transactions').then((transactions)=>{
            res.send(transactions)
        })
    })
})

app.put('/withdraw/', verifyToken,(req, res)=>{
    amount=req.body.amount
    id= req.body.id
    knex('transactions').where('id',req.body.id)
                        .update({
                            balance: knex.raw(`balance - ${amount}`),
                        })
       
    .then(()=>{
        knex.select().from('transactions').then((transactions)=>{
            res.send(transactions)
        })
    })
})

app.put('/transfer', verifyToken,(req, res)=>{
    amount=req.body.amount
    otherid = req.body.otherid
    id = req.body.id
    knex('transactions').where('id',req.body.id)
                        .update({
                            balance: knex.raw(`balance - ${amount}`),
                            
                        })  
    .then(()=>{
        knex('transactions').where('id',req.body.otherid)
                    .update({
                        balance: knex.raw(`balance + ${amount}`),
                            
                        }).then(function(){
                            knex.select().from('transactions').then((transactions)=>{
                                res.send(transactions)
                            })
                        })
        
    })
})

app.listen(port, ()=>{
    console.log("listening on port: ", port)
})


module.exports=app
