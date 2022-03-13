let express = require("express")
let router = express.Router()

const username = "jojo"
const password = "barcelona"

router.post('/', (req, res, next) =>{
    let p_username = req.body.username
    let p_password = req.body.password

    if(p_username == username && p_password == password) {
        res.send({
            ok:true,
            message: "Login successful"
        })
    } else {
        res.send({
            ok:false,
            message: "Username or passsword incorrect"
        })
    }
})

module.exports = router;