var bm=document.getElementById("boutonmail")
var m=document.getElementById("mailing")


let modele = new URLSearchParams(window.location.search).get("id")


function toggle(ID){
    var element = document.getElementById(ID);
    if(element.style.display === "none"){
        element.style.display = "block";
    }else{
        element.style.display = "none";
    }
}

class Lunettes {
    constructor(forme, branches, motifs) {        //Style des lunettes
        this._forme = forme;
        this._branches = branches;
        this._motifs = motifs;
    }
}

var mesLunettes = [
    new Lunettes("Rondes", "Larges", "Vertes"),
    new Lunettes("Rondes", "Larges", "Rouge"),
    new Lunettes("Rondes", "Larges", "Léopard"),
    new Lunettes("Rondes", "Larges", "Noires"),
    new Lunettes("Rondes", "Etroites", "Vertes"),
    new Lunettes("Rondes", "Etroites", "Rouge"),
    new Lunettes("Rondes", "Etroites", "Léopard"),
    new Lunettes("Rondes", "Etroites", "Noires"),
    new Lunettes("Carré", "Larges", "Vertes"),
    new Lunettes("Carré", "Larges", "Rouge"),
    new Lunettes("Carré", "Larges", "Léopard"),
    new Lunettes("Carré", "Larges", "Noires"),
    new Lunettes("Carré", "Etroites", "Vertes"),
    new Lunettes("Carré", "Etroites", "Rouge"),
    new Lunettes("Carré", "Etroites", "Léopard"),
    new Lunettes("Carré", "Etroites", "Noires"),
    new Lunettes("Hexagonale", "Larges", "Vertes"),
    new Lunettes("Hexagonale", "Larges", "Rouge"),
    new Lunettes("Hexagonale", "Larges", "Léopard"),
    new Lunettes("Hexagonale", "Larges", "Noires"),
    new Lunettes("Hexagonale", "Etroites", "Vertes"),
    new Lunettes("Hexagonale", "Etroites", "Rouge"),
    new Lunettes("Hexagonale", "Etroites", "Léopard"),
    new Lunettes("Hexagonale", "Etroites", "Noires"),
    new Lunettes("Ovale", "Larges", "Vertes"),
    new Lunettes("Ovale", "Larges", "Rouge"),
    new Lunettes("Ovale", "Larges", "Léopard"),
    new Lunettes("Ovale", "Larges", "Noires"),
    new Lunettes("Ovale", "Etroites", "Vertes"),
    new Lunettes("Ovale", "Etroites", "Rouge"),
    new Lunettes("Ovale", "Etroites", "Léopard"),
    new Lunettes("Ovale", "Etroites", "Noires"),
]



let lunettes = [
    { forme: "Ronde"},
    { forme: "Ovale"},
    { forme: "Carré"},
    { forme: "Hexagonale"}
];

let motifs =[
    "Vert",
    "Rouge",
    "Noires",
    "Léopard"
];

let template = document.querySelector("#choixLunettes");
let templatechoix2 = document.querySelector("#Perso2");

for (const l of lunettes) {
    let clone = document.importNode(template.content, true);

    newContent = clone.firstElementChild.innerHTML
    .replace(/{{forme}}/g, l.forme);

    clone.firstElementChild.innerHTML = newContent

    document.body.appendChild(clone);
}
//Pour remplacer la séction perosnnalisation par des templates
/*
function ApparitionChoix2() {
    for (const l in lunettes){
        let clone = document.importNode(templatechoix2.content, true);

        newContent2 = clone.firstElementChild.innerHTML
        .replace(/{{Motif}}/g, l.forme);
        clone.firstElementChild.innerHTML = newContent2

        document.body.appendChild(clone);
    }    
}
*/

let navigation = [
    { nom: "Catalogue"},
    { nom: "Commande"},
    { nom: "A propos & contact"}
];

function remplir() {
    let str = document.getElementById("test").innerHTML;
    document.getElementById("test").innerHTML = str.replace("ID", modele);
}

function choix1(m) {
    document.getElementById("choix2").style.visibility = "visible";
    m=(m.innerHTML)
    let str = document.getElementById("display").innerHTML;
    document.getElementById("display").innerHTML = str.replace("modèle", m)
    Branches=m
}
function choix2(m) {
    document.getElementById("commande").style.visibility = "visible";
    m=(m.innerHTML)
    let str = document.getElementById("display").innerHTML;
    document.getElementById("display").innerHTML = str + m;
    Motif=m
}