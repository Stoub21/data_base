var criteres = [
  "Sélectionner un critère",
  "Vainqueur de la FIBA",
  "Top 10 des sponsors",
];

function createDropdownFromList(array, containerId, label) {
  var container = document.getElementById(containerId);

  // Créer le label
  if (label) {
    var labelElement = document.createElement("label");
    labelElement.textContent = label;
    container.appendChild(labelElement);
  }

  // Créer le sélecteur
  var selectElement = document.createElement("select");

  // Ajouter des options basées sur les éléments de la liste fournie
  array.forEach(function (item) {
    var optionElement = document.createElement("option");
    optionElement.value = item;
    optionElement.textContent = item;
    selectElement.appendChild(optionElement);
  });

  // Ajouter le sélecteur au conteneur
  container.appendChild(selectElement);
}

function updateResultContainerFIBA(result) {
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

function updateResultContainerTop(result) {
  var resultContainer = document.getElementById("resultContainer");

  // Créer une table
  var table = document.createElement("table");
  table.className = "table";

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

function updateResultContainer(result, selectedOption) {
  var resultContainer = document.getElementById("resultContainer");

  // Créer une table
  var table = document.createElement("table");
  table.classList.add("table"); // You can add Bootstrap classes or customize the styling

  // Créer le header de la table
  var headerRow = table.insertRow();

  var headers =
    selectedOption === "Pays sponsorisé"
      ? ["Pays", "Montant"]
      : ["Club", "Montant"];

  for (var i = 0; i < headers.length; i++) {
    var headerCell = document.createElement("th");
    headerCell.textContent = headers[i];
    headerRow.appendChild(headerCell);
  }

  // Créer le corps de la table
  for (var i = 0; i < result.length; i++) {
    var row = table.insertRow();
    var nameCell = row.insertCell(0);
    var sponsorCell = row.insertCell(1);

    // Créer le corps de la table
    nameCell.textContent =
      selectedOption === "Pays sponsorisé"
        ? result[i].pays_nom
        : result[i].club_nom;

    sponsorCell.textContent = result[i].montant_sponsor + " €"; // Add default value in case property is undefined
  }

  // Vider le précedent contenu et ajouter la table
  resultContainer.innerHTML = "";
  resultContainer.appendChild(table);
}

function updateResultContainerFIBA(result) {
  var resultContainer = document.getElementById("resultContainer");

  // Créer un élément de paragraphe pour chaque information
  var title = document.createElement("h3");
  title.textContent = "Résultat de la requête";
  title.classList.add("titre");

  var sponsorNomParagraph = document.createElement("p");
  sponsorNomParagraph.textContent = "Sponsor : " + result.sponsor_nom;

  var nombreVictoiresFibaParagraph = document.createElement("p");
  nombreVictoiresFibaParagraph.textContent =
    "Nombre de victoires FIBA : " + result.nombre_victoires_fiba;

  // Ajouter les paragraphes à resultContainer
  resultContainer.innerHTML = ""; // Effacer le contenu existant
  resultContainer.appendChild(title);
  resultContainer.appendChild(sponsorNomParagraph);
  resultContainer.appendChild(nombreVictoiresFibaParagraph);
}

function updateResultContainerTopSponsors(result) {
  var resultContainer = document.getElementById("resultContainer");

  // Créer la table
  var table = document.createElement("table");
  table.classList.add("table"); // Ajouter une classe Bootstrap pour une meilleure présentation

  // Créer le header de la table
  var thead = document.createElement("thead");
  var headerRow = document.createElement("tr");

  var sponsorHeader = document.createElement("th");
  sponsorHeader.textContent = "Sponsor";
  headerRow.appendChild(sponsorHeader);

  var montantHeader = document.createElement("th");
  montantHeader.textContent = "Montant total";
  headerRow.appendChild(montantHeader);

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Créer le corps de la table
  var tbody = document.createElement("tbody");
  for (var i = 0; i < result.length; i++) {
    var sponsor = result[i];
    var row = document.createElement("tr");
    var sponsorCell = document.createElement("td");
    sponsorCell.textContent = sponsor.sponsor_nom;
    row.appendChild(sponsorCell);
    var montantCell = document.createElement("td");
    montantCell.textContent = sponsor.total_montant + " €";
    row.appendChild(montantCell);

    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  // Vider le précedent contenu et ajouter la table
  resultContainer.innerHTML = "";
  resultContainer.appendChild(table);
}

createDropdownFromList(
  ["Sélectionner un critère", "Pays sponsorisé", "Club sponsorisé"],
  "critereContainerSponsor",
  "Critère de sélection :   "
);

createDropdownFromList(
  criteres,
  "critereContainer",
  "Critère de sélection :   "
);

$(document).ready(function () {
  // Écouter les changements dans les selecteurs
  $("#critereContainerSponsor select, #sponsorSelector").change(function () {
    var selectedOption = $("#critereContainerSponsor select").val();
    var selectedSponsor = $("#sponsorSelector").val();
    console.log(selectedOption);
    var resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = "";
    if (selectedOption !== "Sélectionner un critère") {
      // Envoi de la requête AJAX au serveur pour obtenir les résultats
      $.ajax({
        type: "POST",
        url: "/get_results_sponsor",
        data: {
          selectedOption: selectedOption,
          selectedSponsorId: selectedSponsor,
        },
        success: function (response) {
          console.log(response);
          if (response.result !== null && response.result.length != 0) {
            updateResultContainer(response.result, selectedOption);
          } else {
            resultContainer.innerHTML =
              "<p>Aucunes données récupérées pour la demande</p>";
          }
        },
        error: function (error) {
          console.log(error);
        },
      });
    }
  });
});

$("#critereContainer select").change(function () {
  var selectedOption = $(this).val();
  var selectedSponsor = $("#sponsorSelector").val();
  var resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = "";
  if (selectedOption !== "Sélectionner un critère") {
    // Envoi de la requête AJAX au serveur pour obtenir les résultats
    $.ajax({
      type: "POST",
      url: "/get_results_sponsor",
      data: {
        selectedOption: selectedOption,
        selectedSponsorId: selectedSponsor,
      },
      success: function (response) {
        console.log(response);
        if (selectedOption === "Vainqueur de la FIBA") {
          updateResultContainerFIBA(response.result);
        } else {
          updateResultContainerTopSponsors(response.result);
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  }
});
