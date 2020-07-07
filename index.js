import {getDataTeam} from "./js/api_module/api.js";
import {getKlasemen} from "./js/api_module/api.js";
import {getMatch} from "./js/api_module/api.js";
import {getScores} from "./js/api_module/api.js";
import {getSavedArticles} from "./js/api_module/api.js";
import {deleteId} from "./js/database_module/db.js"

// eventClick untuk delete saved favorite
document.addEventListener('click', (e) => {
  if(e.target.classList.contains('deleteId')) {
    deleteSavedArticles(e.target.dataset.id);
  }
})

 // Fungsi untuk delete Saved articles
const deleteSavedArticles = (id) => {
  deleteId(id).then(response => {
    getSavedArticles();
  })
}
// Akhir Fungsi untuk delete Saved articles

document.addEventListener("DOMContentLoaded", async function() {

 
  // Load page content
  let page = window.location.hash.substr(1);
  console.log(page);
  if (page == "") page = "match";
  loadPage(page);

  // Load Nav Turn into Page
  loadNav();

 const dataTeam = await getDataTeam();

  // Function untuk Mengambil data pages pada pages/
  function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        const content = document.querySelector(".content-page");
        // Kondisi apabila status OK
        if (this.status == 200) {

          content.innerHTML = xhttp.responseText;
          if(page=="match"){
            getMatch();
          }
          if(page=="klasemen"){
            getKlasemen();
          }
          if(page=="score"){
            getScores();
          }
          if(page=="favorites"){
            getSavedArticles();
          }
          // Kondisi apabila status Error
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }

  // Function untuk mengambil & merender list Nav-Content
  function loadNav () {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;
   
        // Muat daftar tautan menu
        document.querySelectorAll(".nav-service").forEach(elm => {
          elm.innerHTML = xhttp.responseText;
        });
   
        // Daftarkan event listener untuk setiap tautan menu
        document.querySelectorAll(".nav-service a").forEach(elm => {
          elm.addEventListener("click", function(event) {

            // Muat konten halaman yang dipanggil
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
            M.Sidenav.init(sideNav).close();
          });
        });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }
});
