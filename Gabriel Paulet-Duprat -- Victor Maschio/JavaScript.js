function ColorRond() {
        let RondListe = document.querySelectorAll(".rond");
        for (let rond in RondListe) {
            let color = RondListe[rond].id;
            if (color!=undefined)
                RondListe[rond].style.backgroundColor = color;
        }
}

class Tshirt {
    constructor (id,img,nom,colors,prix,tags){ /* img est une image, nom le nom du T-shirt, et couleurs une liste contenant les couleurs des apperçu*/
    this._id=id;
    this._img=img;
    this._nom=nom;
    this._colors=colors;
    this._prix=prix;
    this._tags=tags;
    }
    get img(){return this._img};
    get nom(){return this._nom};
    get couleurs(){return this._couleurs};
    ConstructTshirt (){
        var UnTshirt = document.getElementById("ProduitBase").innerHTML;
        document.querySelector(".boutique").innerHTML += UnTshirt;
    }
    SetId(){ /* Complètement fracassé, le ProduitList[produit] prend des valeurs assez improbables viens surement du quary select all qui select des truc chelou*/
        document.getElementById("Tshirt0").id = this._id;
    }
    SetImg(){
        var produit = document.getElementById(this._id);
        produit.getElementsByTagName("img")[0].src = this._img;
    }
    SetNom(){
        var produit = document.getElementById(this._id);
        produit.getElementsByTagName("h2")[0].innerHTML = this._nom;
    }
    SetColor(){
        var k=0
        var Colors = document.getElementById(this._id).getElementsByClassName("rond");
        while (k < this._colors.length) {
            console.log(k);
            Colors[k].id=this._colors[k];
            k += 1;
        }
    }
    SetPrix(){
        var produit = document.getElementById(this._id);
        produit.getElementsByTagName("p")[0].innerHTML = this._prix;
    }
    SetTags(){
        var produit = document.getElementById(this._id);
        produit.getElementsByTagName("template")[0].innerHTML = JSON.stringify(this._tags);
    }
    SetAll(){
        this.ConstructTshirt();
        this.SetId();
        this.SetImg();
        this.SetNom();
        this.SetColor();
        this.SetPrix();
        this.SetTags();
    }
    Initiate(object){
        this._id=object.id;
        this._img=object.img;
        this._nom=object.nom;
        this._colors=object.colors;
        this._prix=object.prix;
        this._tags=object.tags;
        this.SetAll();
    }
}   

function loader(){
    fetch("header.html")
    .then(response => {
        return response.text();
    })
    .then(data => {
        document.querySelector("header").innerHTML = data;
        liens = document.querySelectorAll("nav a");
        liens.forEach(a => {
            if(a.href == location.protocol + '//' + location.host + location.pathname)
                a.classList.add('active');
        });
    });
    fetch("footer.html")
    .then(response => {
        return response.text();
    })
    .then(data => {
        document.querySelector("footer").innerHTML = data;
    });
}

window.onload=function() {
    loader();
    if (document.title=="Nos Produits"){
        Creat_Tshirt("Data.json");
 

        }
    }

function Creat_Tshirt(FichierName){

    let contenu_json = [];
    var Tshirtx = new Tshirt();
    fetch(FichierName)   
    .then(function(response) {
        return response.json(); 
    })
    .then(function(json) {
        contenu_json = json;
    })
    .then (function(){
        k=0
        while (k<contenu_json.length){
            Tshirtx.Initiate(contenu_json[k]);
            k+=1;
        }
    })
    .then (function(){
        ColorRond();
    });
}

