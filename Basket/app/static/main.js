function onload() {
  var url = "/pays";
  $("#contentContainer").load(url);
}
onload();
// Charger le contenu de la page dans le container
$(document).ready(function () {
  // Gérer les clics sur les liens avec la classe nav-link-page
  $(".nav-link-page").click(function (event) {
    event.preventDefault(); // Empêcher le comportement par défaut du lien
    var url = $(this).attr("href"); // Récupérer l'URL du lien
    // Charger le contenu de l'URL dans la div contentContainer
    $("#contentContainer").load(url);
  });
});

function updateActiveLink(link) {
  var links = document.querySelectorAll(".navbar-nav .nav-link-page");
  links.forEach(function (el) {
    el.classList.remove("active");
  });
  link.classList.add("active");
}

document
  .querySelector(".navbar-nav")
  .addEventListener("click", function (event) {
    if (
      event.target.tagName === "A" &&
      event.target.classList.contains("nav-link-page")
    ) {
      updateActiveLink(event.target);
    }
  });
