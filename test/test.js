const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require("chai-http");
const { default: knex } = require("knex");
const server = require("../server");
const knexstuff = require("../db/knex")
const token = server.tokenvalue


//Assertion Style

chai.use(chaiHttp);

beforeEach((done)=> {
    knexstuff.migrate.rollback()
    .then(()=>{
        knexstuff.migrate.latest()
        .then(() =>{
            knexstuff.seed.run()
            .then(() =>{
                done();
            })
        })
    })
});

afterEach((done)=>{
    knexstuff.migrate.rollback()
    .then(()=>{
        done()
    })
})


describe('Payment Api',()=>{
    describe("LOGIN /users",()=>{
        it('it should successfully log in a user',(done)=>{
            let logininfo = {
                username:"jojo",
                password:"barcelona"
            }
            chai.request(server)
                .post('/login')
                .send(logininfo)
                .end((err,res) =>{
                    res.should.have.status(200)
                    res.body.should.have.property('message').eql('Login successful')
                    res.body.should.be.a('object');
                done();
                })
        })
    })
    describe("GET /transactions",()=>{
        it('it should get all the transactions',(done)=>{
            chai.request(server)
                .get('/transactions/')
                .set({ Authorization: `Bearer ${token}`})
                .end((err,res) =>{
                    res.should.have.status(200)
                    res.body.should.be.a('array');
                    res.body.length.should.be.eq(3);
                done();
                })
        })
    })
    describe("CREATE /users",()=>{
        it('it should create a user successfully',(done)=>{
            let userinfo ={
                userid : "0556",
                name: "Mimi",
                email: "mimi@gmail.com"
            }
            let userinfo2 ={
                userid : "0557",
                name: "Jojo",
                email: "jojo@gmail.com"
            }
            chai.request(server)
                .post('/createuser')
                .set({ Authorization: `Bearer ${token}`})
                .send(userinfo,userinfo2)
                .end((err,res) =>{
                    res.should.have.status(200)
                    res.body.should.be.a('array');
                done();
                })
        })
    })
    describe("FUND /account",()=>{
        it('it should fund a user account successfully',(done)=>{
            let fundinfo ={
                id : "0556",
                balance: "50000",
            }
            let fundinfo2 ={
                id : "0557",
                balance: "50000",
            }
            chai.request(server)
                .post('/depositmoney')
                .set({ Authorization: `Bearer ${token}`})
                .send(fundinfo,fundinfo2)
                .end((err,res) =>{
                    res.should.have.status(200)
                    res.body.should.be.a('array');
                done();
                })
        })
    })
    describe("WITHDRAW /amount",()=>{
        it('it should debit a user account successfully',(done)=>{
            let withdrawinfo ={
                id : "0556",
                amount: "4000",
                
            }
            chai.request(server)
                .put('/withdraw/')
                .set({ Authorization: `Bearer ${token}`})
                .send(withdrawinfo)
                .end((err,res) =>{
                    res.should.have.status(200)
                    res.body.should.be.a('array');
                done();
                })
        })
    })

    describe("TRANSFER /amount",()=>{
        it('it should transfer fund from a user account to another user account successfully',(done)=>{
            let transferinfo ={
                id : "0556",
                amount: "4000",
                otherid:"0557"
                
            }
            chai.request(server)
                .put('/transfer')
                .set({ Authorization: `Bearer ${token}`})
                .send(transferinfo)
                .end((err,res) =>{
                    res.should.have.status(200)
                    res.body.should.be.a('array');
                done();
                })
        })
    })


        
    
})

