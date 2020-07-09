import {getSavedArticleById} from "./api_module/api.js";
import {getMatchById} from "./api_module/api.js";
import {saveForLater} from "./database_module/db.js";
import {getId} from "./database_module/db.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idInDataBase = urlParams.get("id"); 
  const save = document.getElementById("save");
  const isFromSaved = urlParams.get("saved");

  if (isFromSaved) {
    save.style.display = 'none';
    getSavedArticleById();
  } else {
    let item = getMatchById();
  }

  getId(idInDataBase).then( response => {
    if (!response) {
      console.log("Id tidak ada dalam database");
    } else {
      save.style.display = 'none';
    }
  })

  save.onclick = () => {
    let item = getMatchById();
    console.log();
    item.then( article => {
      saveForLater(article);
      save.style.display = 'none';
    });
  }
});