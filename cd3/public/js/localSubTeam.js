
let form = document.querySelector('form')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  
  let formData = new FormData(form)
  let name = document.getElementById('nameOfTeam').textContent 

    const data = new URLSearchParams();
    for (const pair of formData) {
      data.append(pair[0], pair[1]);
    }
    let response = await fetch(`/addSoccer?name=${name}`, {
      method: 'post',
      body: data
    })

    let loadedSoccer = await response.text()

    document.getElementById("soccers").innerHTML += loadedSoccer

    return false
})