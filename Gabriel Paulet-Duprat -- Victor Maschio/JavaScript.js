function ColorRond() {
    let RondListe = document.querySelectorAll(".rond");
    for (let rond in RondListe) {
        let color = RondListe[rond].id;
        if (color != undefined)
            RondListe[rond].style.backgroundColor = color;
    }
}

class Tshirt {
    constructor(id, img, nom, colors, prix, tags) { /* img est une image, nom le nom du T-shirt, et couleurs une liste contenant les couleurs des apperçu*/
        this._id = id;
        this._img = img;
        this._nom = nom;
        this._colors = colors;
        this._prix = prix;
        this._tags = tags;
    }
    get img() { return this._img };
    get nom() { return this._nom };
    get couleurs() { return this._couleurs };
    get tags() { return this._tags }
    get prix() { return this._prix }
    ConstructTshirt() {
        var UnTshirt = document.getElementById("ProduitBase").innerHTML;
        document.querySelector(".boutique").innerHTML += UnTshirt;
    }
    SetId() { /* Complètement fracassé, le ProduitList[produit] prend des valeurs assez improbables viens surement du quary select all qui select des truc chelou*/
        document.getElementById("Tshirt0").id = this._id;
    }
    SetImg() {
        var produit = document.getElementById(this._id);
        produit.getElementsByTagName("a")[0].getElementsByTagName("img")[0].src = this._img;
    }
    SetNom() {
        var produit = document.getElementById(this._id);
        produit.getElementsByTagName("h2")[0].innerHTML = this._nom;
    }
    SetColor() {
        var k = 0
        var Colors = document.getElementById(this._id).getElementsByClassName("rond");
        while (k < this._colors.length) {
            Colors[k].id = this._colors[k];
            k += 1;
        }
    }
    SetPrix() {
        var produit = document.getElementById(this._id);
        produit.getElementsByTagName("p")[0].innerHTML = this._prix;
    }
    SetTags() {
        var produit = document.getElementById(this._id);
        produit.getElementsByTagName("template")[0].innerHTML = this._tags;
    }
    SetHref() {
        document.getElementById(this._id).getElementsByTagName("a")[0].href += "?id=" + this._id;
    }
    SetAll() {
        this.ConstructTshirt();
        this.SetId();
        this.SetImg();
        this.SetNom();
        this.SetColor();
        this.SetPrix();
        this.SetTags();
        this.SetHref();
    }
    Initiate(object) {
        this._id = object.id;
        this._img = object.img;
        this._nom = object.nom;
        this._colors = object.colors;
        this._prix = object.prix;
        this._tags = object.tags;
        this.SetAll();
    }
}

function Creat_Tshirt(FichierName) { /* Fonction de l'affichage dynamique des Tshirt */
    let contenu_json = [];
    var Tshirtx = new Tshirt();
    fetch(FichierName)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            contenu_json = json;
        })
        .then(function () {
            k = 0
            while (k < contenu_json.length) {
                Tshirtx.Initiate(contenu_json[k]);
                k += 1;
            }
        })
        .then(function () {
            ColorRond();
        });
}


/* Fonction de chargement des pages (header,footer,...)*/
function loader() {
    fetch("header.html")
        .then(response => {
            return response.text();
        })
        .then(data => {
            document.querySelector("header").innerHTML = data;
            liens = document.querySelectorAll("nav a");
            liens.forEach(a => {
                if (a.href == location.protocol + '//' + location.host + location.pathname)
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

window.onload = function () {
    loader();
    if (document.title == "Nos Produits") {
        Creat_Tshirt("Data.json");
    }
    else if (document.title == "Personnalisation") {
        InfoTshirt("Data.json");
    }
}

function InfoTshirt(FichierName) {
    id = new URLSearchParams(window.location.search).get("id")
    let contenu_json = []
    fetch(FichierName)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            contenu_json = json;
        })
        .then(function () {
            document.querySelector("div.Description h1").innerHTML = contenu_json[id].nom;
            document.querySelector("div.Description p").innerHTML = "Prix :" + contenu_json[id].prix;
            document.querySelector("img.ImageProduit").src = contenu_json[id].img;
            for (k in contenu_json[id].colors) {
                copy = document.importNode(template.content, true);
                image = copy.querySelector("a");
                if (k == 0) {
                    image.classList.add("active");
                }
                image.addEventListener("click", function() {
                    selectcolor(contenu_json[id].colors[k])
                });
                image.querySelector("img").src = contenu_json[id].colors[k] + ".jpg";
                document.querySelector("aside.sidebar").append(copy);
            }
        });
}

/* Fonction du bouton retour en haut de la page */
window.onscroll = function () { scroll() };
function scroll() {
    var topbtn = document.getElementById("scrlbutton");
    if (document.documentElement.scrollTop > 100) {
        topbtn.style.display = "block";
    } else {
        topbtn.style.display = "none";
    }
}
function gototop() {
    document.documentElement.scrollTop = 0;
}
/* Fonction de filtrage */
function select(type, value) {
    if (type == 'Tag') {
        Tagactive = document.querySelector("div.filtres button.active");
        Tagactive.classList.remove('active');
        Tag = document.querySelectorAll("div.filtres button");
        Tag.forEach(a => {
            if (a.innerHTML == value) {
                a.classList.add('active');
            }
        })
        Coloractive = document.querySelector("div.filtres div div.active").id;
        Produits = document.querySelectorAll("div.produit");
        Produits.forEach(a => {
            ListeTag = a.querySelector("template.tag").innerHTML.split(',');
            DivRond = a.querySelectorAll("div.rond");
            e = 0;
            DivRond.forEach(d => {
                if (d.id == Coloractive || Coloractive == 'AllColor') {
                    for (k in ListeTag) {
                        if (ListeTag[k] == value || value == 'AllTag') {
                            e += 1;
                        }
                    }
                }
            })
            if (e > 0) {
                a.style.display = "block";
            } else {
                a.style.display = "none";
            }
        })
    } else if (type == 'Color') {
        Coloractive = document.querySelector("div.filtres div div.active");
        Coloractive.classList.remove('active');
        Color = document.querySelectorAll("div.filtres div div");
        Color.forEach(a => {
            if (a.id == value) {
                a.classList.add('active');
            }
        })
        Tagactive = document.querySelector("div.filtres button.active").innerHTML;
        Produits = document.querySelectorAll("div.produit");
        Produits.forEach(a => {
            ListeTag = a.querySelector("template.tag").innerHTML.split(',');
            DivRond = a.querySelectorAll("div.rond");
            e = 0;
            DivRond.forEach(d => {
                if (d.id == value || value == 'AllColor') {
                    for (k in ListeTag) {
                        if (ListeTag[k] == Tagactive || Tagactive == 'AllTag') {
                            e += 1;
                        }
                    }
                }
            })
            if (e > 0) {
                a.style.display = "block";
            } else {
                a.style.display = "none";
            }
        })
    }
}
/* Fonctions de personnalisation */
function selectTshirt(value) {
    sizeactive = document.querySelector("div.Tailles button.active");
    sizeactive.classList.remove('active');
    size = document.querySelectorAll("div.Tailles button");
    size.forEach(a => {
        if (a.innerHTML == value) {
            a.classList.add('active');
        }
    })
}

function buttonnumber(value) {
    number = document.getElementById("number").innerHTML;
    number = parseInt(number);
    if (value == '-' && number > 0) {
        document.getElementById("number").innerHTML = number - 1;
    } else if ((value == '+' && number < 100)) {
        document.getElementById("number").innerHTML = number + 1;
    }

}
function selectcolor(value) {
    coloractive = document.querySelector("aside a.active");
    coloractive.classList.remove('active');
    color = document.querySelectorAll("aside a");
    color.forEach(a => {
        b = a.querySelector("img").src;
        c=b.split('.')[3];
        console.log(c);
        d=c.split('/')[1];
        console.log(d,value);
        if (d == value) {
            a.classList.add('active');
        }
    })
}


/* FONCTION DU STORAGE VERS LE PANIER */
function storage_panier(id, prix, taille, couleur, quantité) {
    var NbProduitPannier = localStorage.getItem("NbProduitPannier");
    if (NbProduitPannier == null) {
        NbProduitPannier = 0;
    }
    NbProduitPannier = parseInt(NbProduitPannier, 10) + 1
    localStorage.removeItem("NbProduitPannier");
    localStorage.setItem("NbProduitPannier", NbProduitPannier);
    NomProduitPannier = "ProduitPanier" + NbProduitPannier;
    var Produit = {
        id: id,
        prix: prix,
        taille: taille,
        couleur: couleur,
        quantité: quantité
    };
    var Produit_JSON = JSON.stringify(Produit);
    console.log(Produit_JSON);
    localStorage.setItem(NomProduitPannier, Produit_JSON);
}