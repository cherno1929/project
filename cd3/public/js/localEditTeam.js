function isValidUrl(urlString) {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(urlString);
  }
  
  function codeError(tipoError) {
    return `<div class="alert alert-danger d-flex align-items-center" role="alert" id="${tipoError}">
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
      <use xlink:href="#exclamation-triangle-fill" />
    </svg>
    <div>
      Error : ${tipoError}
    </div>
    </div>`
  }
  
  function checkTitle(formData) {
    let name = formData.get('name')
    if (name == "") {
      errZone.innerHTML += codeError("Falta el nombre")
      return false
    }
    let firstChar = name.charAt(0)
    if (firstChar !== firstChar.toUpperCase()) {
      errZone.innerHTML += codeError("El nombre debe de empezar en mayuscula")
      return false
    }
    return true
  }
  
  function checkDescr(formData) {
    let descr = formData.get('descr')
    if (descr == "") {
      errZone.innerHTML += codeError("Falta la descripción")
      return false
    }
    console.log(descr.length)
    if (descr.length > 500 || descr.length < 50) {
      errZone.innerHTML += codeError("La descripción debe tener de 50 a 500 caracteres")
      return false
    }
    return true
  }
  
  function checkImg(formData) {
    let img = formData.get('img')
    if (img == '') {
      errZone.innerHTML += codeError("Falta la imagen")
      return false
    }
    if (isValidUrl(img)) {
      errZone.innerHTML += codeError("La url no es valida")
      return false
    }
  
    return true
  }
  
  
  let form = document.querySelector('form')
  let errZone = document.getElementById('errorZone')
  let orgName = document.getElementById("eq_name").value
  
  form.addEventListener('submit', async (event) => {
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
      fetch(`/confirmEditTeam?name=${orgName}`, {
        method: 'post',
        body: data
      })
      let response = await fetch(`/teamsDisponible?name=${formData.get("name")}`)
      let responseObj = await response.json()

      while(responseObj.disponible){
        let response = await fetch(`/teamsDisponible?name=${formData.get("name")}`)
        let responseObj = await response.json()
      }
      window.location.href = `/team?name=${formData.get("name")}`
     
    }
  })

let teamName = document.getElementById('eq_name').value

async function checkTeamDisponible() {
  let nameTeamValue = document.getElementById('eq_name').value

  let firstChar = nameTeamValue.charAt(0)
  if (firstChar !== firstChar.toUpperCase()) {
    errZone.innerHTML = codeError("El nombre debe de empezar en mayuscula")
  }else{
    errZone.innerHTML = ""
  }

  let response = await fetch(`/teamsDisponible?name=${nameTeamValue}`)

  let responseObj = await response.json()

  if (responseObj.disponible) {
    errZone.innerHTML += codeError(`Nombre no disponible`) 
  }
}