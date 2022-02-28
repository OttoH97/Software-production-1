const express = require('express')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "mydb",
    port:3307,
})

app.get('/',(req,res)=>{
    //const sqlInsert="INSERT INTO matkaaja (etunimi,sukunimi,nimimerkki,paikkakunta,esittely,kuva,email) VALUES ('Matti','Reissailija','Maza','Tampere','Matti on mies','kuva','matti.reissailija@gmail.com');"
    db.query(sqlInsert,(err,result)=>{
        res.send("Hello world");
    });

})
app.listen(3001, () => {
    console.log("toimii portissa 3001")
});