$(document).ready(function () {
  console.log("test");
  // Sélectionner tous les radio buttons pour le type d'équipe
  var teamTypeRadioButtons = document.querySelectorAll(
    'input[name="teamType"]'
  );

  // Sélectionner tous les radio buttons pour l'opération
  var operationRadioButtons = document.querySelectorAll(
    'input[name="operation"]'
  );

  var selectedTeamType;
  var selectedOperation;
  // Ajouter un écouteur d'événements 'change' à chaque radio button pour le type d'équipe
  teamTypeRadioButtons.forEach(function (radioButton) {
    radioButton.addEventListener("change", function () {
      selectedTeamType = radioButton.value;
      competitionParam(selectedTeamType, selectedOperation);
    });
  });

  // Ajouter un écouteur d'événements 'change' à chaque radio button pour l'opération
  operationRadioButtons.forEach(function (radioButton) {
    radioButton.addEventListener("change", function () {
      selectedOperation = radioButton.value;
      competitionParam(selectedTeamType, selectedOperation);
    });
  });
});

function competitionParam(teamType, operation) {
  if (teamType != undefined && operation != undefined) {
    if (operation === "creation") {
      updateDropdown((data = null), operation, teamType);
    }
    if (operation === "modification" || operation === "suppression") {
      $.ajax({
        type: "POST",
        url: "/get_competition",
        data: { teamType: teamType },
        success: function (response) {
          console.log(response);
          updateDropdown(response.competitions, operation, teamType);
        },
      });
    }
  }
}

function updateDropdown(data, operation, teamType) {
  var resultContainer = $("#resultContainer");
  var textInputContainer = $("<div></div>");
  resultContainer.empty();
  if (operation !== "creation") {
    // Créer une nouvelle liste déroulante
    var dropdown = $('<select id="competitionDropdown"></select>');
    dropdown.append('<option value="0">Choisir une compétition</option>');

    // Ajouter chaque compétition comme une option dans la nouvelle liste déroulante
    data.forEach(function (competition) {
      dropdown.append(
        '<option value="' +
          competition.id +
          '">' +
          competition.nom +
          "</option>"
      );
    });

    resultContainer.append(dropdown);
  }
  // Ajouter un bouton "Sauvegarder"
  if (operation === "modification") {
    var saveButton = $('<button id="saveButton">Sauvegarder</button>');
    var inputText = $(
      '<input type="text" id="inputText" placeholder="Sélectionner une compétition">'
    );
    textInputContainer.append(inputText);

    // Ajouter un écouteur d'événements pour mettre à jour la valeur de la zone de texte
    dropdown.change(function () {
      // Get the selected option
      var selectedOption = dropdown.find("option:selected");

      inputText.val(selectedOption.text());
    });
    resultContainer.append(textInputContainer);
    resultContainer.append(saveButton);

    saveButton.click(function () {
      // Récupérer l'ID de l'option sélectionnée et le contenu de l'input
      var selectedId = dropdown.val();
      var inputValue = inputText.val();
      console.log(selectedId, inputValue);
      // Envoyer une requête AJAX au backend Flask
      $.ajax({
        url: "/update_competition",
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({
          id: selectedId,
          contenu: inputValue,
          teamType: teamType,
        }),
        success: function (response) {
          console.log(response);
          if (response.message === 1) {
            var successMessage = $(
              '<p id="successMessage" style="color: green;">Nom identique, aucune modification nécessaire !</p>'
            );
            resultContainer.append(successMessage);
          }
          if (response.message === 0) {
            var successMessage = $(
              '<p id="successMessage" style="color: green;">Modification effectuée avec succès !</p>'
            );
            resultContainer.append(successMessage);
            // Mettre à jour la valeur de l'option dans le dropdown
            dropdown.find("option:selected").text(inputValue);
          }
          if (response.message === 2) {
            var successMessage = $(
              '<p id="successMessage" style="color: red;"> Erreur lors de la modification, veuillez vérifier votre saisie !</p>'
            );
            resultContainer.append(successMessage);
          }
        },
        error: function (error) {
          console.error(error);
        },
      });
    });
  }

  // Si l'opération est "supprimer", ajouter un bouton "Supprimer"
  if (operation === "suppression") {
    var deleteButton = $('<button id="deleteButton">Supprimer</button>');
    resultContainer.append(deleteButton);

    // Ajouter un gestionnaire d'événements au clic du bouton "Supprimer"
    deleteButton.click(function () {
      // Récupérer l'ID de l'option sélectionnée
      var selectedId = dropdown.val();
      console.log(selectedId);
      // Vérifier si une compétition est sélectionnée
      if (selectedId !== "0") {
        // Confirmer la suppression avec l'utilisateur
        var confirmDelete = confirm(
          "Êtes-vous sûr de vouloir supprimer cette compétition ?"
        );

        if (confirmDelete) {
          // Envoyer une requête AJAX au backend Flask pour supprimer la compétition
          $.ajax({
            url: "/delete_competition",
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
              id: selectedId,
              teamType: teamType,
            }),
            success: function (response) {
              console.log(response);
              if (response.message === 1) {
                dropdown.find('option[value="' + selectedId + '"]').remove();
                var successMessage = $(
                  '<p id="successMessage" style="color: green;">Compétition supprimée avec succès !</p>'
                );
                resultContainer.append(successMessage);
              } else {
                var errorMessage = $(
                  '<p id="errorMessage" style="color: red;">Cette compétition est en cours impossible de la supprimer !</p>'
                );
                resultContainer.append(errorMessage);
              }
            },
            error: function (error) {
              console.error(error);
            },
          });
        }
      }
    });
  }

  if (operation === "creation") {
    var saveButton = $('<button id="saveButton">Créer</button>');
    var inputText = $(
      '<input type="text" id="inputText" placeholder="Nouvelle compétition">'
    );
    textInputContainer.append(inputText);
    textInputContainer.append(saveButton);

    resultContainer.append(textInputContainer);

    saveButton.click(function () {
      var newNom = inputText.val();

      // Vérifier si le champ est vide avant d'envoyer la requête AJAX
      if (newNom.trim() === "") {
        // Afficher un message d'avertissement ou gérer d'une autre manière
        console.log(
          "Le champ est vide. Veuillez entrer un nom pour la nouvelle compétition."
        );
        return;
      }

      // Envoyer une requête AJAX au backend Flask pour créer la nouvelle compétition
      $.ajax({
        url: "/create_competition",
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({
          nom: newNom,
          teamType: teamType,
        }),
        success: function (response) {
          if (response.message) {
            var successMessage = $(
              '<p id="successMessage" style="color: green;">' +
                response.message +
                "</p>"
            );
            resultContainer.append(successMessage);
          }
        },
        error: function (error) {
          console.error(error);
        },
      });
    });
  }
}
