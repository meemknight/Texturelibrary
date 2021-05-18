const express = require('express');
const path = require('path');

var app = express()

app.use(express.static(path.join(__dirname,"public")))

app.use("/", (req, res) => {
    //req cererea
    //res respons
    res.render("index") 

    console.log("test")
})

app.use((req, res) =>{
    res.status.send("eroare 404");
})

app.set('view engine', 'ejs');

app.listen(8080, () => {console.log("server running...")});
