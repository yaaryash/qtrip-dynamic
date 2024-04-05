
import config from "../conf/index.js";


function getCityFromURL(search) {

  const params = new URLSearchParams(search);
  return params.get('city');
}


async function fetchAdventures(city) {

 try {
    const response = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    // const response = await fetch(config.backendEndpoint + /adventures?city=goa);
    const json = await response.json();
    // console.log(json)
    return json;
    // console.log(json);
  } catch (error) {
    return null;
}
}

function addAdventureToDOM(adventures) {
  
  adventures.forEach((element) => {

    //Adding aother div for Adventure Name & Price
    const textDivForAdventureName = document.createElement("div");
    textDivForAdventureName.setAttribute("class", "d-flex justify-content-between")

    const adventureName = document.createElement("p");
    adventureName.textContent = element.name;
    
    const adventureCost = document.createElement("p");
    adventureCost.textContent = `₹${element.costPerHead}`;

    textDivForAdventureName.appendChild(adventureName);
    textDivForAdventureName.appendChild(adventureCost);

    //Adding aother div for Adventure Duration
    const textDivForAdventureDuration = document.createElement("div");
    textDivForAdventureDuration.setAttribute("class", "d-flex justify-content-between")

    const durationText = document.createElement("p");
    durationText.textContent = "Duration";
    
    const durationTime = document.createElement("p");
    durationTime.textContent = `${element.duration} Hours`;

    textDivForAdventureDuration.appendChild(durationText);
    textDivForAdventureDuration.appendChild(durationTime);

    //Adding aother div for texts
    const divForText = document.createElement("div");
    divForText.setAttribute("class", "card-body")

    divForText.appendChild(textDivForAdventureName);
    divForText.appendChild(textDivForAdventureDuration);

    //Converting the card to a link
    const anchorTagEle = document.createElement("a");
    anchorTagEle.setAttribute("href", `detail/?adventure=${element.id}`);
    anchorTagEle.setAttribute("id", element.id)
    anchorTagEle.setAttribute("class", "w-100")

    //Div for activity-card class.
    const divForActivityCard = document.createElement("div");
    divForActivityCard.setAttribute("class", "activity-card");
    
    //Appending card-link
    divForActivityCard.appendChild(anchorTagEle);

    //Image of Card
    const imageElement = document.createElement("img");
    imageElement.setAttribute("class", "img-fluid ");

    imageElement.setAttribute("src", `${element.image}`);

    //Bannger Tag
    const bannerTag = document.createElement("span");
    bannerTag.setAttribute("class", "category-banner");

    bannerTag.textContent = element.category;

    //Creating Image + Banner Tag div
    const imageDiv = document.createElement("div");
    imageDiv.setAttribute("class", "card-img-top ");
    
    imageDiv.appendChild(imageElement);
    imageDiv.appendChild(bannerTag);

    anchorTagEle.appendChild(imageDiv);
    anchorTagEle.appendChild(divForText);

    // creating a div and will convert it to a link card
    const divForWholeCard = document.createElement("div");
    divForWholeCard.setAttribute("class", "col-sm-6 col-lg-3 my-2");
    divForWholeCard.appendChild(divForActivityCard);

    // Selecting Div where to add & append the card details.
    const divIDToAddDetails = document.getElementById("data");
    divIDToAddDetails.appendChild(divForWholeCard);  
  });


}


function filterByDuration(list, low, high) {
 
  const filteredList= list.filter((key) => key.duration > low && key.duration <= high)
  return filteredList
}


function filterByCategory(list, categoryList) {

  const filteredList = list.filter((adventure) => categoryList.includes(adventure.category))
  return filteredList
}


function filterFunction(list, filters) {

  let filteredList = []
  if (filters["duration"] && filters["category"].length > 0) {
    let choice = filters ["duration"].split('-')
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]) , parseInt(choice[1])
    )
    filteredList = filterByCategory(filteredList, filters["category"]) 
  } 
  else if (filters["duration"]) {
    let choice = filters["duration"].split('-')
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]) , parseInt(choice[1])
    )
  } 
  else if (filters["category"].length > 0) {
    filteredList = filterByCategory(list ,filters["category"])
  } 
  else {
    filteredList = list
  }


  return filteredList;
}

function saveFiltersToLocalStorage(filters) {

  return localStorage.setItem('filters', JSON.stringify(filters))
 
}


function getFiltersFromLocalStorage() {
  return JSON.parse(localStorage.getItem('filters'));
}



function generateFilterPillsAndUpdateDOM(filters) {
  document.getElementById('duration-select').value =filters.duration
  filters["category"].forEach((key) => {
    let ele = document.createElement('div')
    ele.className = 'category-filter'
    ele.innerHTML = `<div>${key}</div>`
    document.getElementById('category-list').appendChild(ele)
  })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
