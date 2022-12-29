const express = require('express');
const dbConnection = require('./db/Config')
const user = require('./db/User')
const product = require('./db/Product')
const cors = require('cors');
const app = express();

dbConnection;

const jwt = require('jsonwebtoken');
var jwtKey = "productProject";


const verifyToken = (req, res, next) => {
    let authToken = req.headers['authorization'];
    // console.log(authToken, req.headers);
    if (authToken) 
    {
        jwt.verify(authToken,jwtKey,(err,valid)=>{
        if(err)
        {   
            res.status(401).send({result:'something went wrong'})
        }
        else{
    
            next();
        }
        })
    }
    else {
        res.send({result:'something went wrong'})
        console.log("heyyyy")
        
    }
}



app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

const port = 5000


app.get("/", (req, res) => {
    res.send("hey gannu")
})

app.post("/register", async (req, res) => {
    console.log(req.body)
    const result = new user(req.body);
    let data = await result.save();
    // console.log(data,"result")
    data = data.toObject();
    if (data) {   //jwt auth for register
        jwt.sign({ data }, jwtKey, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                console.log(err);
                res.send({ result: 'something went wrong' })
            }
            else res.send({ data, auth: token })
        })
    }
    else {
        res.send("user found")
    }
    delete data.pwd
})

app.post('/login', async (req, res) => {
    if (req.body.email && req.body.pwd) {
        let User = await user.findOne(req.body).select("-pwd")
        console.log(User)
        if (User) {   //jwt auth
            jwt.sign({ User }, jwtKey, { expiresIn: '2h' }, (err, token) => {
                if (err) {
                    console.log(err);
                    res.send({ result: 'something went wrong' })
                }
                else res.send({ User, auth: token })
            })
        }
        else {
            res.send("user found")
        }
    }
    else {
        res.send("user not found")
    }
})


app.post("/addProduct",verifyToken, async (req, res) => {
    console.log(req.body);
    let data = new product(req.body)
    let result = await data.save();
    res.send(result)
})

app.get('/getProducts', async (req, res) => {
    const get = await product.find();
    if (get.length > 0) {
        res.send(get)
    }
    else {
        console.log(res)
        res.send("no products found")
    }
})




app.listen(`${port}`)
