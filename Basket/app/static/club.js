var criteres = [
  "Sélectionner un critère",
  "Plus grand joueur",
  "Plus grands joueurs en moyenne",
  "% 3 points",
  "Vainqueur plus de 3 EuroLeague",
  "Lancé franc finale EuroBasket 2002",
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

function updateResultContainerPG(result) {
  var resultContainer = document.getElementById("resultContainer");

  // Créer un élément de paragraphe pour chaque information
  var resulat = document.createElement("h3");
  resulat.textContent = "Résultat de la requête";
  resulat.classList.add("titre");

  var clubNomParagraph = document.createElement("p");
  clubNomParagraph.textContent = "Équipe : " + result.club_nom;

  var joueurNomParagraph = document.createElement("p");
  joueurNomParagraph.textContent = "Joueur : " + result.joueur_nom;

  var tailleJoueurParagraph = document.createElement("p");
  tailleJoueurParagraph.textContent =
    "Taille du joueur : " + result.taille_joueur + " cm";

  // Ajouter les paragraphes à resultContainer
  resultContainer.innerHTML = ""; // Effacer le contenu existant
  resultContainer.appendChild(resulat);
  resultContainer.appendChild(clubNomParagraph);
  resultContainer.appendChild(joueurNomParagraph);
  resultContainer.appendChild(tailleJoueurParagraph);
}

function updateResultContainerTM(result) {
  var resultContainer = document.getElementById("resultContainer");

  // Créer un élément de paragraphe pour chaque information
  var resulat = document.createElement("h3");
  resulat.textContent = "Résultat de la requête";
  resulat.classList.add("titre");

  var clubNomParagraph = document.createElement("p");
  clubNomParagraph.textContent = "Équipe : " + result.club_nom;

  var moyenneTailleParagraph = document.createElement("p");
  moyenneTailleParagraph.textContent =
    "Moyenne de taille : " +
    parseFloat(result.moyenne_taille).toFixed(2) +
    " cm";

  // Ajouter les paragraphes à resultContainer
  resultContainer.innerHTML = ""; // Effacer le contenu existant
  resultContainer.appendChild(resulat);
  resultContainer.appendChild(clubNomParagraph);
  resultContainer.appendChild(moyenneTailleParagraph);
}

function updateResultContainerEL(result) {
  var resultContainer = document.getElementById("resultContainer");

  // Créer la table
  var table = document.createElement("table");
  table.className = "table"; // Add Bootstrap table styling if needed

  // Créer le header de la table
  var thead = table.createTHead();
  var headerRow = thead.insertRow();
  var headers = ["Club", "Nombre de titres"];

  headers.forEach(function (headerText) {
    var th = document.createElement("th");
    th.appendChild(document.createTextNode(headerText));
    headerRow.appendChild(th);
  });

  // Créer le corps de la table
  var tbody = table.createTBody();
  result.forEach(function (club) {
    var row = tbody.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.appendChild(document.createTextNode(club.club_nom));
    cell2.appendChild(document.createTextNode(club.nombre_titre));
  });

  // Vider le précedent contenu et ajouter la table
  resultContainer.innerHTML = "";
  resultContainer.appendChild(table);
}

function updateResultContainerPD(result) {
  var resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = "";

  var title = document.createElement("h3");
  title.textContent = "Meilleur passeur décisif";
  title.classList.add("titre");

  var playerNameParagraph = document.createElement("p");
  playerNameParagraph.textContent = "Nom du joueur: " + result.joueur_nom;

  var avgPassesParagraph = document.createElement("p");
  avgPassesParagraph.textContent =
    "Moyenne d'assistance: " +
    parseFloat(result.moyenne_passe_decisive).toFixed(2);

  resultContainer.appendChild(title);
  resultContainer.appendChild(playerNameParagraph);
  resultContainer.appendChild(avgPassesParagraph);
}

function updateResultContainerLF(result) {
  var resultContainer = document.getElementById("resultContainer");

  // Créer la table
  var table = document.createElement("table");
  table.className = "table";

  // Créer le header de la table
  var thead = table.createTHead();
  var headerRow = thead.insertRow();
  var headers = ["Nom", "Prénom", "Total Lancer Franc"];

  headers.forEach(function (headerText) {
    var th = document.createElement("th");
    th.appendChild(document.createTextNode(headerText));
    headerRow.appendChild(th);
  });

  // Créer le corps de la table
  var tbody = table.createTBody();
  result.forEach(function (player) {
    var row = tbody.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.appendChild(document.createTextNode(player.nom));
    cell2.appendChild(document.createTextNode(player.prenom));
    cell3.appendChild(document.createTextNode(player.total_lancer_franc));
  });

  // Vider le précedent contenu et ajouter la table
  resultContainer.innerHTML = "";
  resultContainer.appendChild(table);
}

function updateResultContainerTroisP(result, currentPage, resultsPerPage) {
  var resultContainer = document.getElementById("resultContainer");
  var startIndex = (currentPage - 1) * resultsPerPage;
  var endIndex = startIndex + resultsPerPage;

  // Créer la table
  var table = document.createElement("table");
  table.className = "table"; // Add Bootstrap table styling if needed

  // Créer le header de la table
  var thead = table.createTHead();
  var headerRow = thead.insertRow();
  var headers = ["Club", "Nom", "Prénom", "Total Lancer Franc"];

  headers.forEach(function (headerText) {
    var th = document.createElement("th");
    th.appendChild(document.createTextNode(headerText));
    headerRow.appendChild(th);
  });

  // Créer le corps de la table
  var tbody = table.createTBody();
  var paginatedResults = result.slice(startIndex, endIndex);
  paginatedResults.forEach(function (entry) {
    var row = tbody.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.appendChild(document.createTextNode(entry.club_nom));
    cell2.appendChild(document.createTextNode(entry.joueur_nom));
    cell3.appendChild(document.createTextNode(entry.joueur_prenom));
    cell4.appendChild(document.createTextNode(entry.total_3_points));
  });

  // Vider le précedent contenu et ajouter la table
  resultContainer.innerHTML = "";
  resultContainer.appendChild(table);

  // Créer la pagination
  var paginationContainer = document.createElement("div");
  paginationContainer.className = "pagination";

  // Bouton précédent
  var prevButton = document.createElement("button");
  prevButton.innerHTML = "Précedent";
  prevButton.className = "btn btn-prev"; // Ajoutez la classe btn-prev
  prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      updateResultContainerTroisP(result, currentPage, resultsPerPage);
    }
  });
  paginationContainer.appendChild(prevButton);

  // Page actuelle
  var pageIndicator = document.createElement("span");
  pageIndicator.innerHTML = "Page " + currentPage;
  paginationContainer.appendChild(pageIndicator);

  // Bouton suivant
  var nextButton = document.createElement("button");
  nextButton.innerHTML = "Suivant";
  nextButton.className = "btn btn-next"; // Ajoutez la classe btn-next
  nextButton.addEventListener("click", function () {
    if (endIndex < result.length) {
      currentPage++;
      updateResultContainerTroisP(result, currentPage, resultsPerPage);
    }
  });
  paginationContainer.appendChild(nextButton);
  resultContainer.appendChild(paginationContainer);
}

createDropdownFromList(
  criteres,
  "critereContainer",
  "Critère de sélection :   "
);

createDropdownFromList(
  ["Sélectionner une statistique", "Passeur décisif"],
  "critereContainerClub",
  "Statistique de l'équipe :   "
);

$(document).ready(function () {
  // Écouter les changements dans les selecteurs
  $("#critereContainer select").change(function () {
    var selectedOption = $(this).val();
    var resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = "";
    if (selectedOption !== "Sélectionner un critère") {
      // Envoi de la requête AJAX au serveur pour obtenir les résultats
      $.ajax({
        type: "POST",
        url: "/get_results",
        data: { selectedOption: selectedOption },
        success: function (response) {
          // Mise à jour de l'affichage
          if (selectedOption == "Plus grand joueur") {
            updateResultContainerPG(response.result);
          }
          if (selectedOption == "Plus grands joueurs en moyenne") {
            updateResultContainerTM(response.result);
          }
          if (selectedOption == "Vainqueur plus de 3 EuroLeague") {
            updateResultContainerEL(response.result);
          }
          if (selectedOption == "Lancé franc finale EuroBasket 2002") {
            updateResultContainerLF(response.result);
          }
          if (selectedOption == "% 3 points") {
            updateResultContainerTroisP(response.result, 1, 10);
          } else {
            console.log(response);
          }
        },
        error: function (error) {
          console.log(error);
        },
      });
    }
  });
});

$(document).ready(function () {
  // Écouter les changements dans les selecteurs
  $("#critereContainerClub select,#clubSelector").change(function () {
    var selectedOption = $("#critereContainerClub select").val();
    var selectedClubId = $("#clubSelector").val();
    var resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = "";

    if (selectedOption !== "Sélectionner une statistique") {
      // Envoi de la requête AJAX au serveur pour obtenir les résultats
      $.ajax({
        type: "POST",
        url: "/get_results_club",
        data: {
          selectedClubId: selectedClubId,
          selectedOption: selectedOption,
        },
        success: function (response) {
          // Mise à jour de l'affichage des résultats
          console.log(response);
          if (response.result !== null && response.result.length != 0) {
            updateResultContainerPD(response.result);
          } else {
            var message = document.createElement("p");
            message.textContent = "Aucunes données disponibles !";
            resultContainer.append(message);
          }
        },
        error: function (error) {
          console.log(error);
        },
      });
    }
  });
});
