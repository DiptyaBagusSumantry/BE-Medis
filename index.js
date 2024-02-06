require("dotenv").config();
const express = require('express');
const app = express();
const cors = require ("cors")
const router = require('./routes/index.js')
const Models = require('./models/index')
const cookieParser = require ("cookie-parser")
const { createAdmin } = require ('./seeders/AdminSeeders.js')

// //Insialisasi ke Database
Models.sequelizeInstance.sync({force: false, alter: true })
.then( async() => {
    try {
        // const Role = Models.Role
        //     const roles = await Role.findAll()
        //     if(roles.length == 0) {
        //         Role.bulkCreate([
        //         {
        //             name: "Admin"
        //         },{
        //             name: "Relawan"
        //         }
        //     ])
        // }
        const user = await Models.User.findAll()
        if(user.length == 0 ){createAdmin()}
    } catch (error) {
        console.log(error)
    }finally{
        console.log("Synced db.")
    }
})
.catch((err) => {
    console.log("Failed to sync db: " + err.message)    
})

//CHECK SERVER
app.get("/", (req, res) => {
    res.send("API Running")
})

// app.use(cors());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({credentials:true, origin: ['http://localhost:3300','http://127.0.0.1:3300'], exposedHeaders: 'Authorization',methods:["GET", "PUT", "POST", "DELETE",]}))

app.use(router)

app.listen(process.env.PORT || 5000, ()=> {
    console.log('Server running at port 5000')
})
