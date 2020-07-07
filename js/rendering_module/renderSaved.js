import {convertUTCDateToLocalDate} from "./helper.js";
let totalMatchToShow = 10;

export const renderSaved = (data, dataTeam) => {
	if (data.length === 0) {
		document.querySelector('.containerFavorites').innerHTML = `
		<h6>Tidak ada file yang disimpan</h6>`
	}
	let article = "";
	let count = 0;
	data.forEach(dataMatch => {
		let date = convertUTCDateToLocalDate(new Date(`${dataMatch.utcDate}`));
		let pageMatch = document.querySelector('.containerFavorites');
		let idHome = dataMatch.homeTeam.id;
		let idAway = dataMatch.awayTeam.id;
		if (count > totalMatchToShow) {
			return;
		} else {
			let logoHome = dataTeam.find(data => data.team.id === idHome);
			let logoAway = dataTeam.find(data => data.team.id === idAway);
			logoAway = logoAway.team.crestUrl;
			logoHome = logoHome.team.crestUrl;
			article += `
				<div class="cardCol">
				    <div class="card-panel teal lighten-1" id="match">
				  	<div class="time">${date}</div>
				    <div class="wrap">
					    	<div class="cardHome">
				    		<img id="logoTeam" src="${logoHome}" alt="" />
				    		<h5>${dataMatch.homeTeam.name}</h5>
				    	</div>
				    	
				    	<div class="cardAway">
				    		<img id="logoTeam" src="${logoAway}" alt="" />
				    		<h5>${dataMatch.awayTeam.name}</h5>
				    	</div>
				    </div>
				    	<div class="container center">
				    	<a class="waves-effect waves-light btn-small darken-2" href="./detail.html?id=${dataMatch.id}&saved=true" >More Info</a>
				    	<a data-id="${dataMatch.id}" class="deleteId waves-effect waves-light btn-small red lighten-2">Delete</a>
				    	</div>
				    </div>
				</div>`;
			pageMatch.innerHTML = article;
		}
		count += 1;
	})
}