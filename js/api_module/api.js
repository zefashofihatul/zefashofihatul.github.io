import {renderMatch} from "../rendering_module/renderMatch.js";
import {dataId} from "../rendering_module/renderDetail.js";
import {getAll, getId} from "../database_module/db.js";
import {renderSaved} from "../rendering_module/renderSaved.js";
import {dataIdSaved} from "../rendering_module/renderSavedById.js";
import {getScore} from "../rendering_module/renderScore.js";
import {dataKlasemen} from "../rendering_module/renderKlasemen.js";

const base_url = "https://api.football-data.org/v2/";
export const totalMatchToShow = 10;

const api_token = "69861396c87d4eb89716236940a82534";
let dataTeam = []; //declare array untuk menampung [{id: int, name: str, logo: str}]

// Fungsi untuk Fetch Match (mendapatkan Pertandingan)
const getMatch = () => {
	if ('caches' in window) {
	    caches.match(`${base_url}competitions/2021/matches?status=SCHEDULED`)
	    .then( response => {
	      	if (response) {
	      		console.log(response);
	        	response.json().then(data => {
	        		console.log(data);
	        		inFetchMatch(data);
	        	})
	      	}
	    })
	}
	fetchApi(`${base_url}competitions/2021/matches?status=SCHEDULED`)
	.then(status)
	.then(json)
	.then(data => {
		inFetchMatch(data);
	})
}

const inFetchMatch = (data) => {
	let article = "";
	let count = 0;
	data.matches.forEach( dataMatch => {
		let idHome = dataMatch.homeTeam.id;
		let idAway = dataMatch.awayTeam.id;
			if (count > totalMatchToShow) {
				return;
			} else {
				let logoHome = dataTeam.find(data => data.team.id === idHome);
				let logoAway = dataTeam.find(data => data.team.id === idAway);
				logoAway = logoAway.team.crestUrl;
				logoHome = logoHome.team.crestUrl;
				article += renderMatch({dataMatch, logoHome, logoAway});
			}
		count += 1;
	})
		document.querySelector('.containerMatch').innerHTML = article;	
	}

// Akhir Fungsi untuk Fetch Match (mendapatkan Pertandingan)

// Fungsi untuk Fetch Match Berdasarkan ID (mendapatkan Pertandingan)
const getMatchById = () => {
	return new Promise ( (resolve, reject) => {
		let urlParams = new URLSearchParams(window.location.search);
		let idParam = urlParams.get("id");
		if ('caches' in window) {
			caches.match(`${base_url}matches/${idParam}`).then( response => {
				if (response) {
					response.json().then(data => {
						inFetchMatchById(data);
						resolve(data);
					})
				}
			})
		}
		fetchApi(`${base_url}matches/${idParam}`)
		.then(status)
		.then(json)
		.then(data => {
			inFetchMatchById(data);
			resolve(data);
		})	
	})
}

const inFetchMatchById = data => {
	let stadium = data.match.venue;
	let date = data.match.utcDate;
	let matchday = data.match.matchday;
	let homeName = data.match.homeTeam.name;
	let homeId = data.match.homeTeam.id;
	let awayName = data.match.awayTeam.name;
	let awayId = data.match.awayTeam.id;
	let head2head = data.head2head;
	dataId({stadium, date, matchday, homeName, awayName, head2head, dataTeam, homeId, awayId});
}
// Akhir Fungsi untuk Fetch Match Berdasarkan ID (mendapatkan Pertandingan)

// Fungsi untuk mendapatkan Data dari IndexedDB
const getSavedArticles = () => {
	getAll().then(response => {
		renderSaved(response, dataTeam);
	})
}
// Akhir Fungsi untuk mendapatkan Data dari IndexedDB

// Fungsi untuk Mengambil data sesuai ID
const getSavedArticleById = () => {
	let urlParams = new URLSearchParams(window.location.search);
  	let idParam = urlParams.get("id");
  	console.log(idParam);
  	getId(idParam).then( response => {
		let stadium = response.venue;
		let date = response.utcDate;
		let matchday = response.matchday;
		let homeName = response.homeTeam.name;
		let homeId = response.homeTeam.id;
		let awayName = response.awayTeam.name;
		let awayId = response.awayTeam.id;
		let head2head = "in next version";
		dataIdSaved({stadium, date, matchday, homeName, awayName, head2head, dataTeam, homeId, awayId});
  	});
}

// Untuk Fetch Score (Hasil Pertandingan)
const getScores = () => {
	if ('caches' in window) {
		caches.match(`${base_url}competitions/2021/matches?status=FINISHED`)
		.then(response => {
	      	if (response) {
				response.json().then( data => {
					inFetchScore(data);
		 	    })
		    }
		})
	}
	let score = "";	
	fetchApi(`${base_url}competitions/2021/matches?status=FINISHED`)
	.then(status)
	.then(json)
	.then( data => {
		inFetchScore(data);
	})
}

const inFetchScore = data => {
	let score = "";	
	let count = 0;
	let dataReverse = data.matches.reverse();
	dataReverse.forEach(dataMatch => {
		let idHome = dataMatch.homeTeam.id;			
		let idAway = dataMatch.awayTeam.id;
		if (count > totalMatchToShow) {
			return;
		} else {
			let logoHome = dataTeam.find(data => data.team.id === idHome);
			let logoAway = dataTeam.find(data => data.team.id === idAway);
			logoAway = logoAway.team.crestUrl;
			logoHome = logoHome.team.crestUrl;
			score += getScore({dataMatch, logoHome, logoAway});
			document.querySelector('.containerMatch').innerHTML = score;
		}		
	count += 1;
	})
}
// Untuk Fetch Score (Hasil Pertandingan)

// Untuk Fetch Klasemen
const getKlasemen = () => {
	if ('caches' in window) {
	    caches.match(`${base_url}competitions/2021/standings?standingType=TOTAL`)
	    .then(response => {
	      if (response) {
			   response.json().then( data => {
			   	inFetchKlasemen(data);
	        })
	      }
	    })
	  }
	let klasemen = "";
	fetchApi(`${base_url}competitions/2021/standings?standingType=TOTAL`)
	.then(status)
	.then(json)
	.then(data => {
		inFetchKlasemen(data);
	})
}

const inFetchKlasemen = data => {
	let klasemen = "";
	const table = data.standings[0].table;
	table.forEach( dataStanding => {
		const pageKlasemen = document.querySelector('#containerKlasemen');
		let name = dataStanding.team.name;
		let logo = dataStanding.team.crestUrl;
		let won = dataStanding.won;
		let lose = dataStanding.lost;
		let draw = dataStanding.draw;
		let points = dataStanding.points;
		let pos = dataStanding.position;
		klasemen += dataKlasemen({pos, logo, name, won, lose, draw, points});
		document.querySelector('#containerKlasemen').innerHTML = klasemen;
	})
}
// Akhir Fetch Klasemen

// FetchAPI factory
const fetchApi = url => {
	return fetch(url, {
		headers: {
    		'X-Auth-Token': api_token
    	}
  	});
}

const status = response => {
	if (response.status !== 200) {
    	console.log(`Error : ${response.status}`);
    	return Promise.reject(new Error(response.statusText));
  	} else {
    	return Promise.resolve(response);
  	}
}

const json = response => {
  	return response.json();
}

const error = error => {
  	console.log("Error : " + error);
}
// Akhir FetchAPI Factory


// dataTeam factory
async function getDataTeam() {
	if ('caches' in window) {
	    caches.match(`${base_url}competitions/2021/standings?standingType=TOTAL`)
	    .then( response => {
	   		if (response) {
		      	console.log("Menggunakan data dari SW");
		        response.json().then( data => {
		        	const dataRes = data.standings[0].table;
					dataRes.forEach(dataStanding => {
						dataTeam.push(dataStanding);
					})
					return data;
		        })
	      	}
	    })
	}
	console.log("menggunakan fetch") ;
	return await getData();
}

const getData = () => {
	return fetchApi(`${base_url}competitions/2021/standings?standingType=TOTAL`)
	.then(status)
	.then(json)
	.then(response => {
		const data = response.standings[0].table;
		data.forEach(dataStanding => {
			dataTeam.push(dataStanding);
			})
		return data;
		})
	}
// akhir dataTeam factory

export {getMatch, getMatchById, getSavedArticles, getSavedArticleById, getScores, getKlasemen, getDataTeam};