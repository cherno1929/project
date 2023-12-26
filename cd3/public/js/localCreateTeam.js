function checkTitle(formData) {
  let name = formData.get('name')
  if (name == "") {
    errZone.innerHTML +=
      `<div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
          <use xlink:href="#exclamation-triangle-fill" />
        </svg>
        <div>
          Error : Falta el nombre
        </div>
        </div>`
    return false
  }
  let firstChar = name.charAt(0)
  if (firstChar !== firstChar.toUpperCase()) {
    errZone.innerHTML +=
      `<div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
          <use xlink:href="#exclamation-triangle-fill" />
        </svg>
        <div>
          Error : El nombre debe de empezar en mayuscula
        </div>
        </div>`
    return false
  }
  return true
}

function checkDescr(formData) {
  let descr = formData.get('descr')
  if (descr == "") {
    errZone.innerHTML +=
      `<div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
          <use xlink:href="#exclamation-triangle-fill" />
        </svg>
        <div>
          Error : Falta la descripción
        </div>
        </div>`
    return false
  }
  console.log(descr.length)
  if (descr.length > 500 || descr.length < 50) {
    errZone.innerHTML +=
      `<div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
          <use xlink:href="#exclamation-triangle-fill" />
        </svg>
        <div>
          Error : La descripción debe tener de 50 a 500 caracteres
        </div>
        </div>`
    return false
  }
  return true
}

function checkImg(formData) {
  let img = formData.get('img')
  if (img == '') {
    errZone.innerHTML +=
      `<div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
          <use xlink:href="#exclamation-triangle-fill" />
        </svg>
        <div>
          Error : Falta la imagen
        </div>
        </div>`
    return false
  }

  // Queda otra comprobación

  return true
}


let form = document.querySelector('form')
let errZone = document.getElementById('errorZone')

form.addEventListener('submit', (event) => {
  event.preventDefault()

  let formData = new FormData(form)

  errZone.innerHTML = ""
  
  let titleCh = checkTitle(formData)
  let desctCh = checkDescr(formData)
  let imgCh = checkImg(formData)

  if (titleCh && desctCh && imgCh) {
    const data = new URLSearchParams();
    for (const pair of formData) {
      data.append(pair[0], pair[1]);
    }
    fetch('/createTeam', {
      method: 'post',
      body: data
    })

  }
})

async function checkTeamDisponible(){
  let nameTeamValue = document.getElementById('eq_name').value 
  let response = await fetch(`/teamsDisponible?name=${nameTeamValue}`)

  let responseObj = await response.json()

  if (responseObj.disponible){
    errZone.innerHTML +=
      `<div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
          <use xlink:href="#exclamation-triangle-fill" />
        </svg>
        <div>
          Error : Nombre ${nameTeamValue} no disponible
        </div>
        </div>`
  }
}