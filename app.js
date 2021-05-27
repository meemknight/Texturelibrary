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

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

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

    let d = new Date();
    m = d.getMinutes();
    m = Math.floor(m /= 15);

    shuffle(imgs[m]);
    imgs[m] = imgs[m].slice(0, 10);

    res.render("pagini/galery", {galery: imgs[m]}) 

    console.log("galery render")
})

app.get(["/", "index.html", "index"], (req, res) => {
    //req cererea
    //res respons

    galery = [
        'geam25_05_202113_03_59.png',
        'geam25_05_202113_04_14.png',
        'geam25_05_202113_04_21.png', 
        'geam25_05_202113_07_13.png', 
        'geam25_05_202113_07_25.png', 
        'geam25_05_202113_08_33.png', 
        'geam25_05_20213_02_07.png', 
        'geam25_05_20213_02_40.png', 
        'im1.png', 
        'im2.png', 
        'im3.png', 
        'im4.png', 
        'im5.png'];

    p = "/resources/imgs/"

    for(let i =0; i<galery.length; i++)
    {
        galery[i] = p + galery[i]
    }

    res.render("pagini/index", {liveGalery: galery[0]})

    console.log("index render")
})


app.get((req, res) =>{
    res.status(404).render("pagini/notFound")
})

app.set('view engine', 'ejs');

app.listen(8080, () => {console.log("server running...")});
