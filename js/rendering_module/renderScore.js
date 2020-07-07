import {convertUTCDateToLocalDate} from "./helper.js";

export const getScore = ({dataMatch, logoHome, logoAway}) => {
	var date = convertUTCDateToLocalDate(new Date(`${dataMatch.utcDate}`));
	return `
	<div class="cardCol">
	    <div class="card-panel teal lighten-1" id="match">
	  	<div class="time">${date}</div>
		    <div class="wrap">

		    	<div class="cardHome">
		    		<h4 class="text-white">${dataMatch.score.fullTime.homeTeam}</h4>
		    		<img id="logoTeam" src="${logoHome}" alt="" />
		    		<h5>${dataMatch.homeTeam.name}</h5>
		    	</div>
		    	
		    	<div class="cardAway">
		    		<h4 class="text-white">${dataMatch.score.fullTime.awayTeam}</h4>
		    		<img id="logoTeam" src="${logoAway}" alt="" />
		    		<h5>${dataMatch.awayTeam.name}</h5>
		    	</div>
		    </div>
	    </div>
	</div>`;
}