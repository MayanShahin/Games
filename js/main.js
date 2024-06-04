"use strict";

import { Details } from "./details.module.js";

let loading = document.querySelector(".loading");
let details = document.getElementById("details");
let cards = document.getElementById("cards");
let header = document.querySelector(".header")
let navbar = document.querySelector(".navbar")

// ====>  Get  API  <====  //
async function getData(cat) {

// ====>  Loading before getting API  <====  //
  loading.classList.replace("d-none","d-flex")

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'f62c27d7d5mshf6c21b64b110a5ep1792a8jsn366c7191c287',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
  let data = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}`,options)
  let res = await data.json();
  loading.classList.add("d-none");   // Stop loading when get data //
  // console.log(res); 
  display(res)
  
 // ====>  click on card to go deltails  <====  //
  document.querySelectorAll(".card").forEach((card)=>{ 
  card.addEventListener("click", ()=>{
    details.classList.remove("d-none");
    cards.classList.add("d-none");
    header.classList.add("d-none");
    navbar.classList.add("d-none");

    // ====> instance of Details Class <====  //
    new Details(card.dataset.id);
    console.log("hello");
  })
  })

}
getData()

// ====>  Display  Data  <====  //
function display(list) {

let cartona = ``;
for(let i = 0; i < list.length; i++){
let info = list[i] ;

  cartona += ` 
  <div class="col-lg-4 col-md-6 col-xl-3 g-4">
  <div data-id="${info.id}" class="card p-3 h-100 bg-transparent" role="button"
  <div class="card p-3 " role="button">
    <img src=${info.thumbnail} class="card-img-top" alt="not found">
    <div class="card-body px-0">
      <div class="caption d-flex justify-content-between">
        <h3 class="card-title h6 small">${info.title}</h3>
        <span class="bg-primary px-2 rounded-3">Free</span>
      </div>
      <p class="card-text small text-center opacity-50">
       ${info.short_description.split(" ", 8)}
      </p>
    </div>
    <div class="card-footer d-flex justify-content-between p-0">
      <span class="badge">${info.genre}</span>
      <span class="badge">${info.platform}</span>
    </div>
  </div>
</div>
  `
}
document.querySelector("#cards").innerHTML = cartona;
}

// ====>  Loop  forEach  nav-link  <====  //
document.querySelectorAll(".nav-link").forEach((link) =>{
  link.addEventListener("click", function() {
    changeActiveLink() 

// ====>  Change  Active  Link  <==== //
function changeActiveLink(){
      document.querySelector(".nav-link.active").classList.remove("active");
      link.classList.add("active");
  } 
      const category = link.dataset.category;
      console.log(category);
      getData(category);
  })
// ====>  To display by default   <==== //
  getData('mmorpg')
})


