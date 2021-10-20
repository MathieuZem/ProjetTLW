let lunettes = [
    { forme: "Ronde"},
    { forme: "Ovale"},
    { forme: "Carré"},
    { forme: "Hexagonale"}
];



var url = window.location.href;
var id = url.substring(52);

let template = document.querySelector("#choixLunettes");


for (const l of lunettes) {
    let clone = document.importNode(template.content, true);

    newContent = clone.firstElementChild.innerHTML
    .replace(/{{forme}}/g, l.forme);

    clone.firstElementChild.innerHTML = newContent

    document.body.appendChild(clone);
}

let navigation = [
    { nom: "Catalogue"},
    { nom: "Commande"},
    { nom: "A propos & contact"}
];
