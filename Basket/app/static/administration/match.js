function competitionParam(teamType) {
  if (teamType != undefined) {
    $.ajax({
      type: "POST",
      url: "/get_competition",
      data: { teamType: teamType },
      success: function (response) {
        console.log(response);
        updateDropdown(response.competitions);
      },
    });
  }
}

function getTeams(teamType) {
  if (teamType != undefined) {
    $.ajax({
      type: "POST",
      url: "/get_teams",
      data: { teamType: teamType },
      success: function (response) {
        console.log(response);
        updateDropdownTeams(response.teams);
      },
    });
  }
}

function updateDropdown(data) {
  var resultContainer = $("#resultContainer");
  resultContainer.empty();

  var teamContainer = $("#teamContainer");
  teamContainer.empty();
  // Créer une nouvelle liste déroulante
  var dropdown = $('<select id="competitionDropdown"></select>');
  dropdown.append('<option value="0">Choisir une compétition</option>');

  // Ajouter chaque compétition comme une option dans la nouvelle liste déroulante
  data.forEach(function (competition) {
    dropdown.append(
      '<option value="' + competition.id + '">' + competition.nom + "</option>"
    );
  });

  resultContainer.append(dropdown);
}

function updateDropdownTeams(data) {
  var teamContainer = $("#teamContainer");
  teamContainer.empty();

  // Créer une nouvelle div pour contenir les deux listes déroulantes
  var dropdownContainer = $('<div class="dropdown-container"></div>');

  // Créer la première liste déroulante
  var dropdown1 = $('<select id="teamsDropdown1"></select>');
  dropdown1.append('<option value="0">Equipe 1</option>');
  data.forEach(function (equipe) {
    dropdown1.append(
      '<option value="' + equipe.id + '">' + equipe.nom + "</option>"
    );
  });

  // Créer la deuxième liste déroulante
  var dropdown2 = $('<select id="teamsDropdown2"></select>');
  dropdown2.append('<option value="0">Equipe 2</option>');
  data.forEach(function (equipe) {
    dropdown2.append(
      '<option value="' + equipe.id + '">' + equipe.nom + "</option>"
    );
  });

  // Ajouter les deux listes déroulantes à la div dropdownContainer avec un espace entre elles
  dropdownContainer.append(dropdown1);
  dropdownContainer.append('<div style="width: 10px;"></div>');
  dropdownContainer.append(dropdown2);

  teamContainer.append(dropdownContainer);
}

function ajoutMatch() {
  var resultContainer = $("#response");
  // Récupérer les valeurs du formulaire
  var teamType = $("input[name='teamType']:checked").val();
  var lieu = $("#lieu").val();
  var dateMatch = $("#dateMatch").val();
  var matchType = $("#matchType").val();
  var competitionId = $("#competitionDropdown").val();
  // Récupérer les valeurs des listes déroulantes (teamsDropdown1 et teamsDropdown2)
  var team1 = $("#teamsDropdown1").val();
  var team2 = $("#teamsDropdown2").val();

  // Valider que les valeurs nécessaires sont présentes
  if (
    !teamType ||
    !lieu ||
    !dateMatch ||
    !matchType ||
    !team1 ||
    !team2 ||
    !competitionId ||
    competitionId === "0" ||
    team1 === "0" ||
    team2 === "0"
  ) {
    alert("Veuillez remplir tous les champs du formulaire.");
    return;
  }
  if (team1 === team2) {
    alert("Veuillez choisir deux équipes différentes");
    return;
  }
  if (team1 === team2) {
    alert("Veuillez choisir deux équipes différentes");
    return;
  }

  // Construire l'objet à envoyer au serveur
  var data = {
    teamType: teamType,
    lieu: lieu,
    dateMatch: dateMatch,
    matchType: matchType,
    competitionId: competitionId,
    team1: team1,
    team2: team2,
  };
  console.log(data);

  // Envoyer les données au serveur via une requête AJAX
  $.ajax({
    type: "POST",
    url: "/ajouter_match",
    data: data,
    success: function (response) {
      // Gérer la réponse du serveur
      if (response.success === 0) {
        var successMessage = $(
          '<p id="successMessage" style="color: green;">Le match a été ajouté avec succès !</p>'
        );
        resultContainer.append(successMessage);
      }
    },
    error: function (error) {
      console.error("Erreur lors de l'ajout du match:", error);
    },
  });
}

$(document).ready(function () {
  var resultContainer = $("#response");
  resultContainer.empty();
  // Sélectionner tous les radio buttons pour le type d'équipe
  var teamTypeRadioButtons = document.querySelectorAll(
    'input[name="teamType"]'
  );

  var selectedTeamType;
  // Ajouter un écouteur d'événements 'change' à chaque radio button pour le type d'équipe
  teamTypeRadioButtons.forEach(function (radioButton) {
    radioButton.addEventListener("change", function () {
      selectedTeamType = radioButton.value;
      competitionParam(selectedTeamType);
      getTeams(selectedTeamType);
    });
  });
});

$("#ajouterMatch").click(function () {
  ajoutMatch();
});
