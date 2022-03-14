const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require("body-parser")

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "katt1mau?",
    database: "mydb",
    port:3307,
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

/*app.post("/api/insert",(req,res)=>{
    const matka = req.body.matka;
    const alkupvm = req.body.alkupvm;
    const loppupvm = req.body.loppupvm;

    const sqlInsert =""
})*/
app.listen(3001, () => {
    console.log("toimii portissa 3001")
});