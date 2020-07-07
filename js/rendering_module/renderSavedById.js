import {convertUTCDateToLocalDate} from "./helper.js";
const base_url = "https://api.football-data.org/v2/";
const api_token = "69861396c87d4eb89716236940a82534";

export const dataIdSaved = ({stadium, date, matchday, homeName, awayName, head2head,dataTeam, homeId, awayId}) => 
 {
 if ('caches' in window) {
      caches.match(`${base_url}competitions/2021/standings?standingType=TOTAL`)
      .then( response => {
        if (response) {
          console.log("Menggunakan data dari SW");
          response.json().then( data => {
              showDataIdSaved({data, stadium, date, matchday, homeName, awayName, head2head,dataTeam, homeId, awayId});
          })
        }
      })
    }
  fetchApi(`${base_url}competitions/2021/standings?standingType=TOTAL`)
  .then(status)
  .then(json)
  .then(data => {
    showDataIdSaved({data, stadium, date, matchday, homeName, awayName, head2head,dataTeam, homeId, awayId});
  })
}

const showDataIdSaved = ({data, stadium, date, matchday, homeName, awayName, head2head,dataTeam, homeId, awayId}) => {
  let dateId = convertUTCDateToLocalDate(new Date(`${date}`));
  const table = data.standings[0].table;
  let home = table.find(data => data.team.id === homeId);
  let away = table.find(data => data.team.id === awayId);
  let getHome = getTeamByIdHomeA({home, head2head});
  let getAway = getTeamByIdAwayA({away, head2head});
  let container = `
    <div class="container center">
      <div class="row">
        <h4 class="center">Premier League</h4>
        <h6 class="center light">Stadium: ${stadium}</h6>
        <h6 class="center light">${dateId}</h6>
        <h6 class="center light">Matchday: ${matchday}</h6>
      </div>
      <div class="row">
        ${getHome}
        ${getAway}
      </div>
    </div>
    `;
  document.querySelector('#detailContent').innerHTML = container;
}

const getTeamByIdHomeA = ({home, head2head}) => {
      return `
      <div class="center col l6 m6 s12">
        <h5 class="center">${home.team.name}</h5>
        <img class="center" id="logoDetail" src="${home.team.crestUrl}" alt="logoClub">
          <div class="infoTeam">
              <h6 class="center">${home.team.name}</h6>
              <h6 class="center light">Wins: ${head2head}</h6>
              <h6 class="center light">Draw: ${head2head}</h6>
              <h6 class="center light">Lose: ${head2head}</h6>
          </div>
      </div>
      `;
  }

const getTeamByIdAwayA = ({away, head2head}) => {
      return `
      <div class="col l6 m6 s12 center">
        <h5 class="center">${away.team.name}</h5>
        <img class="center" id="logoDetail" src="${away.team.crestUrl}" alt="logoClub">
          <div class="infoTeam">
              <h6 class="center">${away.team.name}</h6>
              <h6 class="center light">Wins: ${head2head}</h6>
              <h6 class="center light">Draw: ${head2head}</h6>
              <h6 class="center light">Lose: ${head2head}</h6>
          </div>
      </div>
      `
  }

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
      console.log("Error : " + response.status);
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