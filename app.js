const express = require('express');
const path = require('path');
const fs = require('fs')

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

app.get("/galery", (req, res) =>
{
    const textFisier=fs.readFileSync(path.join(__dirname, "/public/resources/img.json"));
	const jsi=JSON.parse(textFisier); //am transformat in obiect
    //console.log(jsi["images"][0]["titlu"]);

    let imgs = [[],[],[],[]];

    rootPath = "/resources/mat/";

    jsi["images"].forEach(i => {
        imgs[i.sfert_ora-1].push(rootPath + i.cale_imagine);
    });

    
    res.render("pagini/galery", {galery: imgs[0]}) 

    console.log("galery render")
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
