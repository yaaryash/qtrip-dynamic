import config from "../conf/index.js";


function getAdventureIdFromURL(search) {

  const advParams = new URLSearchParams(search);
  return advParams.get('adventure');


  
}

async function fetchAdventureDetails(adventureId) {
 
   try {
    const responce = await fetch (config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`)

    const json = await responce.json();
    console.log(json)
    return json;


   } catch (err) {
    return null;
   }


}


function addAdventureDetailsToDOM(adventure) {

  document.querySelector('#adventure-name').textContent = adventure.name
  document.querySelector('#adventure-subtitle').textContent = adventure.subtitle
  const photoGallery = document.querySelector("#photo-gallery")
  adventure.images.forEach((imageSrc) => {
    let image = document.createElement("img")
    image.setAttribute('src' ,`${imageSrc}`)
    image.setAttribute('class' , 'activity-card-image')
    
    
    let divForImages = document.createElement("div")
    divForImages.append(image)

    photoGallery.append(divForImages)

  })
  document.querySelector('#adventure-content').textContent = adventure.content

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {

  const photoGallery =document.querySelector('#photo-gallery')
  photoGallery.innerHTML=''
  let carousel = document.createElement('div')
  carousel.setAttribute('id',"carouselExampleIndicators")
  carousel.setAttribute("class", "carousel slide")
  // carousel.setAttribute("data-bs-ride", "carousel")

  let carouselUp = document.createElement("div")
  carouselUp.setAttribute("class","carousel-indicators")
  carouselUp.innerHTML = `
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>

  `
  let carouselImg = document.createElement('div')
  carouselImg.setAttribute("class", "carousel-inner")
  images.forEach((element, index) => {
    const wholeImageDiv = document.createElement("div")
    if(index === 0){
      wholeImageDiv.setAttribute("class", "carousel-item active")
    }else{
      wholeImageDiv.setAttribute("class", "carousel-item")
    }
    let image = document.createElement('img')
    image.setAttribute("class", "activity-card-image");
    image.setAttribute("src", `${element}`);
    wholeImageDiv.appendChild(image)
    carouselImg.appendChild(wholeImageDiv) })

    const carouselButtonOne = document.createElement('button')
    carouselButtonOne.setAttribute('class','carousel-control-prev')
    carouselButtonOne.setAttribute("type","button" )
    carouselButtonOne.setAttribute('data-bs-target','#carouselExampleIndicators')
    carouselButtonOne.setAttribute('data-bs-slide','prev')

    carouselButtonOne.innerHTML =`
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  `

    const carouselButtonTwo = document.createElement('button')
    carouselButtonTwo.setAttribute('class','carousel-control-next')
    carouselButtonTwo.setAttribute("type","button" )
    carouselButtonTwo.setAttribute('data-bs-target','#carouselExampleIndicators')
    carouselButtonTwo.setAttribute('data-bs-slide','next')

    carouselButtonTwo.innerHTML = `
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>

    `
    carousel.appendChild(carouselUp)
    carousel.appendChild(carouselImg)
    carousel.appendChild(carouselButtonOne)
    carousel.appendChild(carouselButtonTwo)



    photoGallery.appendChild(carousel)
    


}

function conditionalRenderingOfReservationPanel(adventure) {

  if(adventure.available) {
    document.querySelector("#reservation-panel-sold-out").style.display = "none"
    document.querySelector("#reservation-panel-available").style.display = "block"
    document.querySelector("#reservation-person-cost").textContent =adventure.costPerHead
  } else {
    document.querySelector("#reservation-panel-sold-out").style.display = "block"
    document.querySelector("#reservation-panel-available").style.display = "none"
  }

}


function calculateReservationCostAndUpdateDOM(adventure, persons) {

  // console.log(persons)
  let cost = parseInt(adventure.costPerHead) * parseInt(persons)
  if(cost) {
    document.querySelector("#reservation-cost").textContent = cost
  } else {
    document.querySelector("#reservation-cost").textContent = 0
  }
}


async function postToApi (formData) {
  const responce = await fetch(
    `${config.backendEndpoint}/reservations/new` , 
    {
    method : "POST",
    body : JSON.stringify(formData),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  const json = await responce.json()
  console.log(json)
  if(responce.ok) {
    alert("Success!")
    window.location.reload();
  } else {
    alert("Failed!")
  }
}
function captureFormSubmit(adventure) {
  const form = document.querySelector("#myForm")

  let formData = {}
  form.addEventListener('submit' , function (e) {
    e.preventDefault()
    formData['name'] = e.target.elements['name'].value
    formData['date'] = e.target.elements['date'].value
    formData['person'] = e.target.elements['person'].value
    formData['adventure'] = adventure.id
    console.log(formData)
    postToApi(formData)

  }) 
}
  // function captureFormSubmit(adventure) {
  //   // TODO: MODULE_RESERVATIONS
  //   // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  //   // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  //   const reservationForm = document.querySelector("#myForm");
  //   const reservationBtn = document.querySelector("button[type='submit']");
  
  //   reservationForm.addEventListener("submit", async (e) => {
  //     e.preventDefault();
  
  //     const {
  //       name,
  //       date,
  //       person    
  //     } = reservationForm.elements;
  
  //     const reservationData = {
  //       name: name.value,
  //       date: date.value,
  //       person: person.value,
  //       adventure: adventure.id
  //     }
  //     console.log(reservationData);
  
  //   const response = await fetch(
  //     `${config.backendEndpoint}/reservations/new`,
  //     // "https://jsonplaceholder.typicode.com/posts",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(reservationData),
  //       headers: {
  //         "Content-type": "application/json; charset=UTF-8"
  //       }
  //     }
  //   );
  
  //   const json = await response.json();
  //         console.log(json);
  //     if(response.ok){
  //       alert("Success!")
  //       window.location.reload();
  //     } else{
  //       alert("Failed!")
  //     }
  //   })
  // }
// }

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
 
  if(adventure.reserved){
    document.querySelector("#reserved-banner").style.display = "block";
  } else{
    document.querySelector("#reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
