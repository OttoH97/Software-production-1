const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require("body-parser")

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Matkakertomus",
    database: "mydb",
    port:3307,
})

/*app.post('/create', (req,res)=>{
    const idmatkakohde = req.body.idmatkakohde;
    const kohdenimi = req.body.kohdenimi; 
    const maa = req.body.maa;
    const paikkakunta = req.body.paikkakunta;
    const kuvausteksti = req.body.kuvausteksti;
    const kuva = req.body.kuva;
    

    db.query("INSERT INTO matkaaja (idmatkakohde,kohdenimi,maa,paikkakunta,kuvausteksti,kuva) VALUES (?,?,?,?,?,?)"
    ,[id,idmatkakohde,kohdenimi,maa,paikkakunta,kuvausteksti,kuva],
    (err,result)=>{
        if(err){
            console.log(err)
        }else
        res.send("Values inserted")
    }
    );
});*/

app.get('/matkakohde',(req,res)=>{
    db.query("SELECT * FROM matkakohde",(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})
app.get('/tarina',(req,res)=>{
    db.query("SELECT teksti FROM tarina",(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.listen(3001, () => {
    console.log("toimii portissa 3001")
});