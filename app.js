const express = require('express');
const path = require('path');

var app = express()

app.use(express.static(path.join(__dirname,"public")))


app.get("/pagina/:id", (req, res) =>{

    console.log("pagina: " + req.params.id);

    res.render("pagini/" + req.params.id);

})

app.get(["/", "index.html", "index"], (req, res) => {
    //req cererea
    //res respons
    res.render("pagini/index") 

    console.log("index render")
})


app.get((req, res) =>{
    res.status.send("eroare 404");
})

app.set('view engine', 'ejs');

app.listen(8080, () => {console.log("server running...")});
