const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require("body-parser")
const multer = require('multer')
const path = require('path');
const cookieParser = require('cookie-parser');//npm install cookie-parser
const session = require('express-session');//npm install express-session
//const bcrypt = require('bcrypt');//npm install bcrypt, voidaan cyptata tietokannan salasanat
const jsonwebtoken = require('jsonwebtoken');
const { useSSRSafeId } = require('@react-aria/ssr')
//const saltRounds = 10;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/data/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + ".jpg")
    }
})

var upload = multer({ storage: storage });

//app.use(cors());
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}))
//cookiet ja session määritelmä ettei käyttäjä kirjaudu ulos sivua päivittäessä
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    key: "userId",
    secret: "matkakertomus",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    }
}))

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Matkakertomus",
    database: "mydb",
    port: 3307,
})

/*Token kirjautuminen ...työn alla
app.use('/login', (req, res) => {
    res.send({
        token: 'test123'
    });
});*/

//Haetaan kirjautuneen käyttäjän omat tiedot
app.post('/kirjautunut', (req, res) => {
    const email = req.body.email;

    db.query("SELECT * FROM matkaaja where email = ?",[email],(err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

//Käyttäjän päivitys
app.post('/paivitatiedot', (req, res) => {
    const etunimi = req.body.etunimi;
    const sukunimi = req.body.sukunimi;
    const nimimerkki = req.body.nimimerkki;
    const paikkakunta = req.body.paikkakunta;
    const esittely = req.body.esittely;
    const idmatkaaja = req.body.idmatkaaja;

    db.query("UPDATE matkaaja SET etunimi = ?, sukunimi = ?, nimimerkki = ?, paikkakunta = ?, esittely = ? WHERE idmatkaaja = ?",
    [etunimi, sukunimi, nimimerkki, paikkakunta, esittely, idmatkaaja],(err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

//login sivulta haetaan tieto onko käyttäjä kirjautunut ja aloitetaan käyttäjälle ????sessio????
app.get("/login", (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false })
    }
})


//Matkaaja taulusta sähköpostin ja salasanan hakeminen
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM matkaaja where email = ? and password = ?",
        [email, password],  //tietokannasta haetaan sposti ja salasana, jotka ovat jo olemassa
        (err, result) => {

            if (err) {
                res.send({ err: err })
            }

            if (result.length > 0) {  //jos palauttaa jotain

                const id = result[0].idmatkaaja;
                const token = jsonwebtoken.sign({ id }, "jwtSecret", {
                    expiresIn: 300,
                })
                req.session.user = result;
                console.log(req.session.user);
                //Tervehdys käyttäjälle
                res.json({ auth: true, token: token, message: "Terve " + "" + email, data: result })
            }
            
            //Jos käyttäjää ei löydy tietokannasta
            else {
                res.json({ auth: false, message: "Käyttäjää ei ole olemassa"})  
            }
        }
    );
});

//app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));

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

app.post('/omatmatkatTarina', (req, res) => {
    const idmatkakohde = req.body.idmatkakohde;
    const pvm = req.body.pvm;
    const teksti = req.body.teksti;
    const idmatka = req.body.idmatka;

    db.query('INSERT INTO tarina (idmatkakohde,pvm,teksti,idmatka) VALUES (?,?,?,?)'
        , [idmatkakohde, pvm, teksti, idmatka],
        (err, result) => {
            if (err) {
                console.log(err)
            } else
                res.send("Values inserted")
        }
    );
});
app.post('/omatmatkat', (req, res) => {
    const idmatkaaja = req.body.idmatkaaja;
    const alkupvm = req.body.alkupvm;
    const loppupvm = req.body.loppupvm;
    const yksityinen = req.body.yksityinen;
    const idmatka = req.body.idmatka;

    db.query('INSERT INTO matka (idmatkaaja,alkupvm,loppupvm,yksityinen) VALUES (?,?,?,?)'
        , [idmatkaaja,alkupvm,loppupvm,yksityinen],
        (err, result) => {
            if (err) {
                console.log(err)
            } else
                res.send("Values inserted")
        }
    );
});



// Rekisteröitymiseen
app.post('/matkaaja', (req, res) => {
    const idmatkaaja = req.body.idmatkaaja;
    const etunimi = req.body.etunimi;
    const sukunimi = req.body.sukunimi;
    const nimimerkki = req.body.nimimerkki;
    const email = req.body.email;
    const password = req.body.password;


    db.query('INSERT INTO matkaaja (idmatkaaja,etunimi,sukunimi,nimimerkki,email,password) VALUES (?,?,?,?,?,?)'
        , [idmatkaaja, etunimi, sukunimi, nimimerkki, email, password],
        (err, result) => {
            if (err) {
                console.log(err)
            } else
                res.send("Values inserted")
        }
    );
});

app.post('/matkakohde', upload.single('kuva'), (req, res) => {
    const kohdenimi = req.body.kohdenimi;
    const maa = req.body.maa;
    const paikkakunta = req.body.paikkakunta;
    const kuvausteksti = req.body.kuvausteksti;
    const kuva = req.file.filename;

    db.query('INSERT INTO matkakohde (kohdenimi,maa,paikkakunta,kuvausteksti,kuva) VALUES (?,?,?,?,?)'
        , [kohdenimi, maa, paikkakunta, kuvausteksti, kuva],
        (err, result) => {
            if (err) {
                console.log(err)
            } else
                res.send(result);
        }
    );
});

app.delete('/matkakohde/:idmatkakohde', (req, res) => {
    const idmatkakohde = req.params.idmatkakohde;
    db.query("DELETE FROM matkakohde WHERE idmatkakohde=?",idmatkakohde, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.post('/matkakohde/:idmatkakohde',upload.single('kuva'), (req, res) => {
    const idmatkakohde = req.params.idmatkakohde;
    const kohdenimi = req.body.kohdenimi;
    const maa = req.body.maa;
    const paikkakunta = req.body.paikkakunta;
    const kuvausteksti = req.body.kuvausteksti;
    var kuva = undefined;

    var query = "UPDATE matkakohde SET kohdenimi = ?, maa = ?, paikkakunta = ?, kuvausteksti = ?"

    if (req.file) {
        kuva = req.file.filename;
        query += ", kuva = '"+ kuva+"'";
    }

    query += " WHERE idmatkakohde = ?";
    

    db.query(query,
    [kohdenimi, maa, paikkakunta, kuvausteksti, idmatkakohde], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.get('/matkakohde/kuva/:tiedostonnimi', function (req, res) {
    if (req.params.tiedostonnimi == null || req.params.tiedostonnimi.length <= 5)
        res.send(404);

    res.sendFile(path.join(__dirname, "./public/data/uploads/" + req.params.tiedostonnimi));
});

app.get('/matkakohde', (req, res) => {
    db.query("SELECT * FROM matkakohde", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.get('/tarina', (req, res) => {
    db.query("SELECT * FROM tarina", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.get('/matkaaja', (req, res) => {
    db.query("SELECT * FROM matkaaja", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})



app.get('/matka', (req, res) => {
    db.query("SELECT * FROM matka", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.get('/matkakohdejatarina', (req, res) => {
    db.query("SELECT matkakohde.idmatkakohde,matkakohde.kohdenimi,matkakohde.maa,matkakohde.paikkakunta,matkakohde.kuvausteksti,tarina.teksti from matkakohde INNER join tarina on matkakohde.idmatkakohde = tarina.idmatkakohde"
        , (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
                console.log(result)
            }
        })
})

app.get('/kuva', (req, res) => {
    db.query("SELECT * FROM kuva", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

module.exports = app.listen(3001, () => {
    console.log("toimii portissa 3001")
});
