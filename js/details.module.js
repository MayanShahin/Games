
export class Details {
  constructor(id){
    document.getElementById("btn_close").addEventListener("click", ()=>{
        document.getElementById("details").classList.add("d-none");
        document.getElementById("cards").classList.remove("d-none");
        document.querySelector(".header").classList.remove("d-none");
        document.querySelector(".navbar").classList.remove("d-none");
    });
    this.getDetails(id)
  }
 async getDetails(id){
  let loading = document.querySelector(".loading")
  loading.classList.replace("d-none","d-flex")
    const options = {
      method: "GET",
      headers: {
         "X-RapidAPI-Key": "f62c27d7d5mshf6c21b64b110a5ep1792a8jsn366c7191c287",
         "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
   };
 let data = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,options)
    let res = await data.json();
    loading.classList.add("d-none")

    displayDetails(res);
    console.log(res);
  } 
};

function displayDetails(game) {
  let detailsBox = ``
  detailsBox += `
  <div class="col-md-4">
  <img src=${game.thumbnail} class="game-img w-100" alt="game-image">
  </div>
  <div class="col-md-8 d-flex flex-column">
    <h3>Title: ${game.title}</h3>
    <p>Category:<span class="badge-details">${game.genre}</p>
    <p>Platform:<span class="badge-details">${game.platform}</p>
    <p>Status:<span class="badge-details">${game.status}</p>
    <p class="small">${game.description}</p>
    <a type="button" class="show btn btn-outline-warning mb-5" target="_blank" href="${game.game_url}">Show Game</a> 
  </div>
  `
  document.getElementById("details-content").innerHTML = detailsBox;
  }
  
