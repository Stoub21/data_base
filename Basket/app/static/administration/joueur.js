function ajouterOptionPays() {
  // Requête Ajax pour récupérer la liste des pays
  $.ajax({
    type: "GET",
    url: "/get_pays",
    success: function (response) {
      var dropdown = $("#pays");
      dropdown.empty();
      dropdown.append('<option value="">Sélectionner un pays</option>');

      // Créer le selecteur avec les pays
      response.countries.forEach(function (pays) {
        dropdown.append('<option value="' + pays + '">' + pays + "</option>");
      });
    },
    error: function (error) {
      console.error(error);
    },
  });
}

ajouterOptionPays();

// Fonction pour ajouter un joueur
function ajouterJoueur() {
  var resultContainer = $("#resultContainer");

  // Récupérer les valeurs des champs
  var nom = document.getElementById("nom").value;
  var prenom = document.getElementById("prenom").value;
  var dateNaissance = document.getElementById("dateNaissance").value;
  var taille = document.getElementById("taille").value;
  var pays = document.getElementById("pays").value;

  // Envoyer les données au backend via une requête AJAX
  $.ajax({
    url: "/ajouter_joueur",
    type: "POST",
    contentType: "application/json;charset=UTF-8",
    data: JSON.stringify({
      nom: nom,
      prenom: prenom,
      dateNaissance: dateNaissance,
      taille: taille,
      pays: pays,
    }),
    success: function (response) {
      if (response.message === 0) {
        var successMessage = $(
          '<p id="successMessage" style="color: green;">Le joueur a été ajouté avec succès !</p>'
        );
        resultContainer.append(successMessage);
      }
    },
    error: function (error) {
      // Gérer les erreurs de la requête AJAX
      console.error(error);
    },
  });
}

document.getElementById("ajouterJoueur").onclick = function () {
  ajouterJoueur();
};
