function createDropdownFromList(array, containerId, label) {
  var container = document.getElementById(containerId);

  // Créer un label
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

function updateResultContainer(result) {
  var resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = "";
  if (result.length === 0) {
    var message = document.createElement("p");
    message.textContent = "Aucunes données disponibles !";
    resultContainer.append(message);
  } else {
    // Créer la table
    var table = document.createElement("table");
    table.classList.add("table");

    // Créer le header de la table
    var headerRow = table.createTHead().insertRow(0);
    var headers = ["Joueur", "Total Points"];

    for (var i = 0; i < headers.length; i++) {
      var th = document.createElement("th");
      th.textContent = headers[i];
      headerRow.appendChild(th);
    }

    // Créer le corps de la table
    var tbody = table.createTBody();
    for (var i = 0; i < result.length; i++) {
      var row = tbody.insertRow(i);
      var joueurCell = row.insertCell(0);
      var totalPointsCell = row.insertCell(1);

      joueurCell.textContent = result[i].joueur_nom;
      totalPointsCell.textContent = result[i].total_points;
    }

    // Vider le précedent contenu et ajouter la table
    resultContainer.innerHTML = "";
    resultContainer.appendChild(table);
  }
}

createDropdownFromList(
  ["Sélectionner une statistique", "Top scoreur"],
  "critereContainerPays",
  "Statistique de l'équipe :   "
);

$(document).ready(function () {
  // Écouter les changementsdans les selecteurs
  $("#critereContainerPays select, #paysSelector").change(function () {
    var selectedOption = $("#critereContainerPays select").val();
    console.log(selectedOption);
    var selectedPaysId = $("#paysSelector").val();
    var resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = "";
    if (selectedOption !== "Sélectionner une statistique") {
      // Envoi de la requête AJAX au serveur pour obtenir les résultats
      $.ajax({
        type: "POST",
        url: "/get_results_pays",
        data: {
          selectedPaysId: selectedPaysId,
          selectedOption: selectedOption,
        },
        success: function (response) {
          // Mise à jour de l'affichage des résultats
          updateResultContainer(response.result);
        },
        error: function (error) {
          console.log(error);
        },
      });
    }
  });
});
