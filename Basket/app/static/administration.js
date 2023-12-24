var criteres = [
  "Sélectionner les données à modifier",
  "Compétition",
  "Sponsor",
  "Joueur",
  "Match",
];

function createDropdownFromList(array, containerId, label) {
  var container = document.getElementById(containerId);

  // Créer un label si fourni
  if (label) {
    var labelElement = document.createElement("label");
    labelElement.textContent = label;
    container.appendChild(labelElement);
  }

  // Créer le sélecteur
  var selectElement = document.createElement("select");

  // Ajouter des options basées sur les éléments du tableau
  array.forEach(function (item) {
    var optionElement = document.createElement("option");
    optionElement.value = item;
    optionElement.textContent = item;
    selectElement.appendChild(optionElement);
  });

  // Ajouter le sélecteur au conteneur
  container.appendChild(selectElement);
}

createDropdownFromList(
  criteres,
  "critereContainer",
  "Critère de sélection :   "
);

$(document).ready(function () {
  // Gérer les clics sur les liens avec la classe nav-link-page
  $("#critereContainer select").change(function () {
    var selectedOption = $(this).val();
    if (selectedOption === "Compétition")
      $("#contentContainerAdmin").load("/competition");
    if (selectedOption === "Sponsor")
      $("#contentContainerAdmin").load("/sponsorAdmin");
    if (selectedOption === "Joueur")
      $("#contentContainerAdmin").load("/joueur");
    if (selectedOption === "Match") $("#contentContainerAdmin").load("/match");

    // Charger le contenu de l'URL dans la div contentContainer
  });
});
