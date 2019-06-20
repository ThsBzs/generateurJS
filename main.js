$(document).ready(function () {
//Preparation des stocks de phrases
//Premier générateur, forme objet   
const phraseVie = {
	debut: ["Une baignade en mer", "Courir sous la lune", "Construire une maison", "Un repas de famille", "Partir en vacances", "Avoir un enfant", "Ecouter Steevie Wonder", "Rencontrer sa belle-mère"],
	milieu: ["donne souvent", "procure sans nul doute", "promet systématiquement", "assure", "amène", "dispense", "fournit à coup sûr"],
	fin: ["une sérénité sans commune mesure.", "une journée parfaite.", "des résultats inattendus.", "des douleurs au crâne.", "un rhume de cerveau.", "des crampes intestinales.", "de beaux moments."]
};



//Second générateur, forme array
const debut1 = ["Le chien", "Le chat", "La girafe", "Le lion", "Le lapin", "L'ours", "Le suricate"];

const milieu2 = ["est un animal qui", "est une sale bête qui", ", cette grosse peluche,", ", dans son sommeil, ", "semble être un animal qui", ", les soirs de pleine lune,", ", comme tous les animaux,"];

const fin3 = ["aime les massages.", "mange des Kinder Bueno.", "troue mes chaussettes.", "conduit un Uber.", "dort dans mon lit.", "s'endort devant un Disney.", "mange bio.", "vote EELV.", "survit à l'apocalypse.", "se transforme en guéridon."];

    

//*****************************FONCTIONS DE CREATION DE CONTENU******************************** 
//Fonction de génération de citation

function citation(debut, milieu, fin){
    let tab1 = debut.length;//Parcourt chaque tableau / élément d'objet et renvoie sa taille
    let tab2 = milieu.length;
    let tab3 = fin.length;
    resultat = `${debut[Math.floor(Math.random()*tab1)]} ${milieu[Math.floor(Math.random()*tab2)]} ${fin[Math.floor(Math.random()*tab3)]}`;//Récupère un élément au hasard dans ces éléments parcourus
    return resultat;//Renvoie une citation 
    };

    
// Fonction d'insertion du résultat dans le dom
function insererResultatDom(element, texte){
    let newP = document.createElement("li");//Nouvel élément li
    newP.setAttribute("id", "resultat");//Attribution d'un id au nouvel élément pour la mise en page
    newP.style.opacity = 0;//Opacité à 0 pour l'animation fadeIn
    let text = document.createTextNode(texte);//Création du contenu du li
    newP.appendChild(text);//Ajout du contenu dans le li
    let inserT = document.querySelector(element);//Définition de l'élément dans lequel inclure ces nouveaux contenus
    inserT.appendChild(newP);//Insertion
    //Apparition en fadeIn
    apparaitre(newP);
        
    };

    
//*************************FONCTION UTILISANT LES PARAMETRES*************************************
/*Cette fonction récupère les éléments du formulaire (sujet et nombre de citations) pour les passer en paramètre au générateur*/
function generer(sujet, nombre){
    for (i=1; i<= nombre; i++) {
        switch (sujet){
            case "vie": 
                insererResultatDom("#rendu", citation(phraseVie.debut, phraseVie.milieu, phraseVie.fin));
            break;
            case "animaux" :
                insererResultatDom("#rendu", citation(debut1, milieu2, fin3));
            break;
        };
    };
};
    

//***************************FONCTIONS D'ANIMATIONS SIMPLES***********************************
//Fonction d'animation fadeIn, prend en paramètre l'élément concerné
/*Avec setInterval, on fait en sorte que l'opacité augmente de 0.05 à chaque tour, 
sur une durée d'1 seconde pour passer de 0 à 1. 
20 x 0.05 = 1
On fait l'inverse pour fadeOut.*/
function apparaitre (elt){
    let niveauOpacite = 0;//Opacite de départ
    let temps = setInterval(function() {
        niveauOpacite++;//On augmente la valeur 
        elt.style.opacity = 0.05 * niveauOpacite;//On augmente l'opacite à chaque tour
        if(niveauOpacite >= 20) {//Quand on arrive à 1 seconde
            clearInterval(temps); //On supprime la fonction
            temps = undefined;
        }
    }, 50);
};
    
//Fonction d'animation fadeOut, prend en paramètre l'élément concerné
function disparaitre (elt){
    let niveauOpacite = 1;
    let temps = setInterval(function() {
        niveauOpacite--;
        elt.style.opacity = 0.05 * niveauOpacite;
        if(niveauOpacite <= 0) {
            clearInterval(temps);
            temps = undefined;
        }
    }, 50);
};
    
    

//*********************PRISE EN COMPTE DES CITATIONS ET VERIFICATION DU DOM**********************
const form = document.getElementById("form");//Formulaire
      valide = document.getElementById("valider");//Bouton valider
      citationsMax = 5;//Limite de citations
    
let sujet = form.elements.sujet;//Valeur du sujet
    nombre = form.elements.nombre;//Valeur de la quantité
    compteur = 0;//Aucune citation au départ
    resultat = 0;//Aucun LI au départ



//Fonction de compteur
function compter(){
    compteur = (compteur + (Number(nombre.value)));//le compteur récupère la valeur demandée en nombre
    if (compteur <= citationsMax) {//Si la quantité ne dépasse pas 5
        generer(sujet.value, nombre.value);//On génère les citations
    } else {
        generer(sujet.value, (citationsMax - resultat));/*Si le nombre demandé fait dépasser 5, on limite la valeur saisie pour n'afficher au total que 5 citations*/
        apparaitre(alert);//On prévient
        valide.disabled = true;//On désactive le bouton de validation
    };
    let li = document.getElementsByTagName("LI");//On implémente la valeur resultat 
    resultat = li.length;//On peut maintenant la comparer lors de la prochaine itération
};

    
//Action à la validation du formulaire
form.addEventListener("submit", function infos(e){
    compter();//On lance la fonction compter
    supprimer.style.visibility = "visible";//On affiche les boutons
    relancer.style.visibility = "visible";
    e.preventDefault();//On bloque l'envoi pour garder l'affichage
});
    
    
//On supprime le contenu si les paramètres sont modifiés, les boutons et le message d'alerte sont aussi masqués (fonctions préparée plus bas)
sujet.addEventListener("click", function(){
    suppr();
    disparaitre(alert);
    supprimer.style.visibility = "hidden";
    relancer.style.visibility = "hidden";
});
nombre.addEventListener("click", function(){
    suppr();
    disparaitre(alert);
    supprimer.style.visibility = "hidden";
    relancer.style.visibility = "hidden";
});




//***************************ANIMATIONS ET ACTIONS DIVERSES************************
//Suppression du contenu
const rendu = document.getElementById("rendu");//Cadre d'accueil des citations
      supprimer = document.getElementById("remove");//Bouton "Tout supprimer"
      relancer = document.getElementById("refresh");//Bouton "Générer un autre résultat"
      alert = document.getElementById("alert");//Message d'alerte quantité
      fermer = document.getElementById("close");//Croix de fermeture de l'alerte

//Fonction de suppression du contenu
function suppr (){
    while (rendu.firstChild) {//Si la div rendu contient quelque chose
        rendu.removeChild(rendu.firstChild);//On efface ce quelque chose
    };
    compteur = 0;//On remet le compteur à 0
    valide.disabled = false;//On réactive le bouton valider
};
   
    
//*************UTILISATION DES BOUTONS**********
//Bouton "Tout supprimer"
supprimer.addEventListener("click", function(){
    suppr();
    disparaitre(alert);
    supprimer.style.visibility = "hidden";
    relancer.style.visibility = "hidden";
});
    

//Bouton "Générer un autre résultat"
relancer.addEventListener("click", function(){
    suppr();
    compter();
    disparaitre(alert);
});

//Fermeture de l'alerte en fadeout
fermer.addEventListener("click", function(){
    disparaitre(alert);
});



});