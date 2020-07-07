import {convertUTCDateToLocalDate} from "./helper.js";

export const renderMatch = ({dataMatch, logoHome, logoAway}) => {
	let date = convertUTCDateToLocalDate(new Date(`${dataMatch.utcDate}`));
	return `
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
	    	<a class="waves-effect waves-light btn-small teal darken-1" href="./detail.html?id=${dataMatch.id}" >More Info</a>
	    	</div>
	    </div>
	</div>`;
}
