import {getSavedArticleById} from "./api_module/api.js";
import {getMatchById} from "./api_module/api.js";
import {saveForLater} from "./database_module/db.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const save = document.getElementById("save");
  const isFromSaved = urlParams.get("saved");
  if (isFromSaved) {
    save.style.display = 'none';
    getSavedArticleById();
  } else {
    let item = getMatchById();
  }

  save.onclick = () => {
    let item = getMatchById();
    console.log("Tombol FAB di klik.");
    item.then( article => {
      saveForLater(article);
    });
  }
});