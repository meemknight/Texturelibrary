const express = require('express');
const path = require('path');

var app = express()

app.use(express.static(path.join(__dirname,"public")))


app.get("/page/:id", (req, res) =>{

    console.log("pagina: " + req.params.id);

    //res.render("pagini/" + req.params.id);

    res.render("pagini/" + req.params.id, (err, r)=>
    {
        if(err)
        {
            res.status(404).render("pagini/notFound")
        }else
        {
            res.send(r);
        }

    })

})

app.get(["/", "index.html", "index"], (req, res) => {
    //req cererea
    //res respons
    res.render("pagini/index") 

    console.log("index render")
})


app.get((req, res) =>{
    res.status(404).render("pagini/notFound")
})

app.set('view engine', 'ejs');

app.listen(8080, () => {console.log("server running...")});
