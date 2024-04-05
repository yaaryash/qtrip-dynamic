import config from "../conf/index.js";

async function init() {

 try {

  let cities = await fetchCities();

  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
  return cities
} catch (error) {
    return null
  }
}


async function fetchCities() {

 try {
   let dataCities = await fetch(config.backendEndpoint + '/cities')
  let responce = dataCities.json()
  console.log(responce)
  return responce
 } catch (error) {
  return null
 }

}

function addCityToDOM(id, city, description, image) {

  const addDetailsToId = document.querySelector("#data");
  const divForCard = document.createElement("div") 
  divForCard.setAttribute("class","col-sm-6 col-lg-3 mb-4")

  const linkElement = document.createElement("a")
  linkElement.setAttribute("href" ,`pages/adventures/?city=${id}`)
  linkElement.setAttribute("id",`${id}`)

  divForCard.appendChild(linkElement)


  const divForImageAndText = document.createElement('div') 
  divForImageAndText.setAttribute("class","tile")

  const elementImg = document.createElement("img")
  elementImg.setAttribute("src" , `${image}`)

  const divForText = document.createElement("div")
  divForText.setAttribute("class" , "tile-text text-center") 


  const elementNameForCity = document.createElement('p');
  elementNameForCity.textContent = city
  const elementForCityDescription = document.createElement('p') 
  elementForCityDescription.textContent = description


  divForText.appendChild(elementNameForCity)
  divForText.appendChild(elementForCityDescription)

  divForImageAndText.appendChild(elementImg)
  divForImageAndText.appendChild(divForText)

  linkElement.appendChild(divForImageAndText);

  addDetailsToId.appendChild(divForCard)
  


}

export { init, fetchCities, addCityToDOM };
