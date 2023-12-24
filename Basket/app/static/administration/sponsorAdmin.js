$(document).ready(function () {
  // Sélectionner tous les radio buttons pour l'opération
  var operationRadioButtons = document.querySelectorAll(
    'input[name="operation"]'
  );

  var selectedOperation;

  // Ajouter un écouteur d'événements 'change' à chaque radio button pour l'opération
  operationRadioButtons.forEach(function (radioButton) {
    radioButton.addEventListener("change", function () {
      selectedOperation = radioButton.value;
      sponsorParam(selectedOperation);
    });
  });
});

function sponsorParam(operation) {
  if (operation === "creation") {
    generateSponsorForm((data = null), operation);
  }
  if (operation === "modification" || operation === "suppression") {
    $.ajax({
      type: "POST",
      url: "/get_sponsors",
      data: {},
      success: function (response) {
        console.log(response);
        generateSponsorForm(response.sponsors, operation);
      },
    });
  }
}

function generateSponsorForm(data, operation) {
  var resultContainer = $("#resultContainer");
  var textInputContainer = $("<div></div>");
  resultContainer.empty();
  if (operation !== "creation") {
    // Créer une nouvelle liste déroulante
    var dropdown = $('<select id="sponsorDropdown"></select>');
    dropdown.append('<option value="0">Choisir un sponsor</option>');
    // Ajouter chaque compétition comme une option dans la nouvelle liste déroulante
    data.forEach(function (sponsor) {
      dropdown.append(
        '<option value="' + sponsor.id + '">' + sponsor.nom + "</option>"
      );
    });

    resultContainer.append(dropdown);
  }

  if (operation === "modification") {
    var saveButton = $('<button id="saveButton">Sauvegarder</button>');
    var inputText = $(
      '<input type="text" id="inputText" placeholder="Sélectionner un sponsor">'
    );
    textInputContainer.append(inputText);

    // Ajouter un écouteur d'événements pour mettre à jour la valeur de la zone de texte
    dropdown.change(function () {
      var selectedOption = dropdown.find("option:selected");
      inputText.val(selectedOption.text());
    });

    resultContainer.append(textInputContainer);
    resultContainer.append(saveButton);

    saveButton.click(function () {
      var selectedId = dropdown.val();
      var inputValue = inputText.val();

      // Envoyer une requête AJAX au backend Flask pour mettre à jour le sponsor
      $.ajax({
        url: "/update_sponsor",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({
          id: selectedId,
          contenu: inputValue,
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

  // Ajouter un bouton "Supprimer" pour l'opération "suppression"
  if (operation === "suppression") {
    var deleteButton = $('<button id="deleteButton">Supprimer</button>');
    resultContainer.append(deleteButton);

    // Ajouter un gestionnaire d'événements au clic du bouton "Supprimer"
    deleteButton.click(function () {
      var selectedId = dropdown.val();
      console.log(selectedId);
      // Vérifier si un sponsor est sélectionné
      if (selectedId !== "0") {
        // Confirmer la suppression avec l'utilisateur
        var confirmDelete = confirm(
          "Êtes-vous sûr de vouloir supprimer ce sponsor ?"
        );

        if (confirmDelete) {
          // Envoyer une requête AJAX au backend Flask pour supprimer le sponsor
          $.ajax({
            url: "/delete_sponsor",
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
              id: selectedId,
            }),
            success: function (response) {
              console.log(response);
              if (response.message === 1) {
                // Supprimer l'option du dropdown
                dropdown.find('option[value="' + selectedId + '"]').remove();
                var successMessage = $(
                  '<p id="successMessage" style="color: green;">Sponsor supprimé avec succès !</p>'
                );
                resultContainer.append(successMessage);
              } else {
                var errorMessage = $(
                  '<p id="errorMessage" style="color: red;"> Le sponsor sponsosire des équipes impossible de le supprimer !</p>'
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
      '<input type="text" id="inputText" placeholder="Nouveau sponsor">'
    );
    var inputVille = $(
      '<input type="text" id="inputVille" placeholder="Ville du sponsor">'
    );
    textInputContainer.append(inputText);
    textInputContainer.append(inputVille);
    textInputContainer.append(saveButton);

    resultContainer.append(textInputContainer);

    saveButton.click(function () {
      var newNom = inputText.val();
      var newVille = inputVille.val(); // Récupérez la valeur du champ pour la ville

      // Vérifier si les champs sont vides avant d'envoyer la requête AJAX
      if (newNom.trim() === "" || newVille.trim() === "") {
        console.log(
          "Les champs ne peuvent pas être vides. Veuillez remplir tous les champs."
        );
        return;
      }

      // Envoyer une requête AJAX au backend Flask pour créer le nouveau sponsor avec la ville
      $.ajax({
        url: "/create_sponsor",
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify({
          nom: newNom,
          ville: newVille,
        }),
        success: function (response) {
          console.log(response);
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
