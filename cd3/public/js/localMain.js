const NUM_LOAD = 4
let cont_Loaded = 0

async function loadMoreElements(){
    let from = (cont_Loaded) * NUM_LOAD
    let to = from + NUM_LOAD

    let response = await fetch(`/loadMoreTeams?from=${from}&to=${to}`)

    let loadedTeams = await response.text()

    document.getElementById("teams_zone").innerHTML += loadedTeams

    cont_Loaded++
} 

loadMoreElements()
