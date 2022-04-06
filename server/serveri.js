const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require("body-parser")
const multer = require('multer')
const path = require('path');
const cookieParser = require('cookie-parser');//npm install cookie-parser
const session = require('express-session');//npm install express-session
const bcrypt = require('bcrypt');//npm install bcrypt
const { useSSRSafeId } = require('@react-aria/ssr')
const saltRounds = 10;

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
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    key: "userId",
    secret : "subscribe",
    resave : false,
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
app.get("/login",(req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn:false})
    }
})
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM matkaaja where email = ? and password = ?",
        [email, password],
        (err, result) => {
            
            if (err) {
                res.send({ err: err })
            }
            
            if (result.length>0) {
                req.session.user = result;
                console.log(req.session.user);
                res.send({message:"Terve " + "" + email,data:result})
            }
            else {
                res.send({ message: "Väärä käyttäjänimi/salasana" });
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

    db.query('INSERT INTO matka (idmatkaaja,alkupvm,loppupvm,yksityinen,idmatka) VALUES (?,?,?,?,?)'
        , [idmatkaaja, alkupvm, loppupvm, yksityinen, idmatka],
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

app.listen(3001, () => {
    console.log("toimii portissa 3001")
});