import config from "../conf/index.js";

async function fetchReservations() {

  try {
    const responce = await fetch(`${config.backendEndpoint}/reservations`)
    const json = await responce.json()
    return json;
  } catch (err) {
    return null
  }


 
}

function addReservationToTable(reservations) {
  if(reservations.length ===0) {
    document.querySelector('#no-reservation-banner').style.display = 'block'
    document.querySelector('#reservation-table-parent').style.display = 'none'
  } else {
    document.querySelector('#no-reservation-banner').style.display = 'none'
    document.querySelector('#reservation-table-parent').style.display = 'block'
  }
  let reservationTable = document.querySelector("#reservation-table")
  reservations.forEach(element => {
    const bookingDate = new Date(element.time);

    const formattedDate = bookingDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })

    const formattedTime = bookingDate.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true
    })

    const timeOfBooking = `${formattedDate}, ${formattedTime}`;

    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `
    <td scope="col">${element.id}</td>
    <td scope="col">${element.name}</td>
    <td scope="col">${element.adventureName}</td>
    <td scope="col">${element.person}</td>
    <td scope="col">${new Date(element.date).toLocaleDateString("en-IN")}</td>
    <td scope="col">${element.price}</td>
    <td scope="col">${timeOfBooking}</td>
    <td scope="col"><button class="reservation-visit-button" id=${element.id}>
    <a href="../detail/?adventure=${element.adventure}">Visit Adventure</a></button></td>   
    `
    
    reservationTable.append(tableRow);
  });
}

export { fetchReservations, addReservationToTable };
